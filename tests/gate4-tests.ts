import { OrderService } from "../src/server/order-service";
import { MpesaService, DarajaCallbackPayload } from "../src/server/mpesa-service";
import { handleApiRequest } from "../src/server/api-router";

let passed = 0;
let failed = 0;

function assert(condition: boolean, testName: string, detail?: string) {
  if (condition) {
    passed++;
    console.log(`  ✓ PASS: ${testName}`);
  } else {
    failed++;
    console.error(`  ✗ FAIL: ${testName}${detail ? ` — ${detail}` : ""}`);
  }
}

async function runGate4TestSuite() {
  console.log("\n=======================================================");
  console.log("   GATE 4 TEST SUITE — M-PESA DARAJA PAYMENT ENGINE");
  console.log("=======================================================\n");

  // Reset in-memory stores before testing
  OrderService._resetStoresForTesting();
  MpesaService._resetStoresForTesting();

  // ---------------------------------------------------------------------------
  // 1. SETUP: Create a verified test order with inventory reservation
  // ---------------------------------------------------------------------------
  console.log("Suite 1: STK Push Initiation Verification");

  const orderRes = await OrderService.createOrder({
    ticketTypeId: "early-bird",
    quantity: 2,
    buyerName: "Wanjiku Kimani",
    buyerPhone: "0712345678",
    idempotencyKey: "test-gate4-order-1",
  });

  assert(orderRes.success === true, "1.1 Create valid order for payment test");
  if (!orderRes.success) return;

  const { orderId, checkoutToken, totalKes } = orderRes;
  assert(totalKes === 2000, "1.2 Authoritative total is KES 2,000 (2 x KES 1,000)");

  // ---------------------------------------------------------------------------
  // 2. STK PUSH INITIATION SECURITY & VALIDATION
  // ---------------------------------------------------------------------------
  // 2.1 Rejects invalid token
  const invalidTokenPush = await MpesaService.initiateStkPush({
    orderId,
    checkoutToken: "invalid-token-12345",
  });
  assert(
    invalidTokenPush.success === false && invalidTokenPush.code === "UNAUTHORIZED",
    "2.1 Rejects STK push with invalid authorization token (UNAUTHORIZED)",
  );

  // 2.2 Valid STK Push initiation
  const validPush = await MpesaService.initiateStkPush({
    orderId,
    checkoutToken,
  });
  assert(validPush.success === true, "2.2 Valid STK Push initiation succeeds");
  assert(
    Boolean(validPush.checkoutRequestId && validPush.merchantRequestId),
    "2.3 Returns valid CheckoutRequestID and MerchantRequestID",
  );

  const checkoutRequestId = validPush.checkoutRequestId!;

  // 2.4 Rate limit / Cooldown enforcement (30s cooldown)
  const rapidPush = await MpesaService.initiateStkPush({
    orderId,
    checkoutToken,
  });
  assert(
    rapidPush.success === false && rapidPush.code === "COOLDOWN_ACTIVE",
    "2.4 Prevents duplicate STK push during active 30s cooldown (COOLDOWN_ACTIVE)",
  );

  // ---------------------------------------------------------------------------
  // 3. PAYMENT STATUS POLLING BEFORE CALLBACK
  // ---------------------------------------------------------------------------
  console.log("\nSuite 2: Payment Status Polling & Token Security");

  // 3.1 Status lookup with invalid token
  const badStatus = MpesaService.getPaymentStatus(orderId, "wrong-token");
  assert(badStatus === null, "3.1 Status lookup with wrong token returns null (secure)");

  // 3.2 Status lookup with valid token while processing
  const processingStatus = MpesaService.getPaymentStatus(orderId, checkoutToken);
  assert(processingStatus !== null, "3.2 Status lookup with valid token returns status");
  assert(
    processingStatus?.paymentStatus === "processing",
    "3.3 Initial payment status is 'processing'",
  );
  assert(processingStatus?.orderStatus === "pending", "3.4 Order status remains 'pending'");

  // ---------------------------------------------------------------------------
  // 4. DARAJA WEBHOOK CALLBACK: SUCCESSFUL PAYMENT FLOW
  // ---------------------------------------------------------------------------
  console.log("\nSuite 3: Webhook Callback Processing & Authoritative Finalization");

  const initialSoldEarlyBird = OrderService.getSoldCount("early-bird");

  const successCallbackPayload: DarajaCallbackPayload = {
    Body: {
      stkCallback: {
        MerchantRequestID: validPush.merchantRequestId!,
        CheckoutRequestID: checkoutRequestId,
        ResultCode: 0,
        ResultDesc: "The service request is processed successfully.",
        CallbackMetadata: {
          Item: [
            { Name: "Amount", Value: 2000 },
            { Name: "MpesaReceiptNumber", Value: "QHD782KLS9" },
            { Name: "TransactionDate", Value: 20261031164500 },
            { Name: "PhoneNumber", Value: 254712345678 },
          ],
        },
      },
    },
  };

  const callbackResult = await MpesaService.processCallback(successCallbackPayload);
  assert(callbackResult.statusCode === 200, "4.1 Webhook returns HTTP 200 to Safaricom");
  assert(
    callbackResult.response.ResultCode === 0,
    "4.2 Webhook response body contains ResultCode 0 (Accepted)",
  );

  // Check updated order status
  const finalizedStatus = MpesaService.getPaymentStatus(orderId, checkoutToken);
  assert(
    finalizedStatus?.paymentStatus === "successful",
    "4.3 Payment status transitioned to 'successful'",
  );
  assert(finalizedStatus?.orderStatus === "paid", "4.4 Order status transitioned to 'paid'");
  assert(
    finalizedStatus?.mpesaReceipt === "QHD782KLS9",
    "4.5 Authoritative M-Pesa receipt number stored (QHD782KLS9)",
  );

  // Check that sold inventory was incremented by quantity 2
  const updatedSoldEarlyBird = OrderService.getSoldCount("early-bird");
  assert(
    updatedSoldEarlyBird === initialSoldEarlyBird + 2,
    "4.6 Ticket soldCount atomically incremented by order quantity (2)",
  );

  // Check active hold reservations
  const activeHold = OrderService.getActiveReservedCount("early-bird");
  assert(
    activeHold === 0,
    "4.7 Reservation transitioned from active hold to completed (0 active hold)",
  );

  // ---------------------------------------------------------------------------
  // 5. REPLAY / DUPLICATE RECEIPT IDEMPOTENCY
  // ---------------------------------------------------------------------------
  console.log("\nSuite 4: Idempotency & Duplicate Receipt Protection");

  // Re-submit the exact same successful callback
  const duplicateCallback = await MpesaService.processCallback(successCallbackPayload);
  assert(
    duplicateCallback.statusCode === 200,
    "5.1 Duplicate callback handled gracefully with HTTP 200",
  );

  // Check that soldCount was NOT incremented again
  const postReplaySold = OrderService.getSoldCount("early-bird");
  assert(
    postReplaySold === updatedSoldEarlyBird,
    "5.2 Duplicate callback does NOT double-increment inventory (Idempotent)",
  );

  // Check that STK push cannot be triggered for an already-paid order
  const paidPush = await MpesaService.initiateStkPush({ orderId, checkoutToken });
  assert(
    paidPush.success === false && paidPush.code === "ALREADY_PAID",
    "5.3 STK Push is blocked on already paid orders (ALREADY_PAID)",
  );

  // ---------------------------------------------------------------------------
  // 6. AMOUNT MISMATCH SECURITY (UNDERPAYMENT / OVERPAYMENT REVIEW)
  // ---------------------------------------------------------------------------
  console.log("\nSuite 5: Amount Mismatch Security (Tamper Protection)");

  const order2 = await OrderService.createOrder({
    ticketTypeId: "couple-pass",
    quantity: 1,
    buyerName: "Otieno Ochieng",
    buyerPhone: "0722000000",
  });
  assert(order2.success === true, "6.1 Create second order for tamper test");
  if (!order2.success) return;

  const push2 = await MpesaService.initiateStkPush({
    orderId: order2.orderId,
    checkoutToken: order2.checkoutToken,
  });
  assert(push2.success === true, "6.2 STK Push initiated for second order");

  // Simulate Safaricom callback reporting KES 500 when order was KES 1800
  const underpaidCallback: DarajaCallbackPayload = {
    Body: {
      stkCallback: {
        MerchantRequestID: push2.merchantRequestId!,
        CheckoutRequestID: push2.checkoutRequestId!,
        ResultCode: 0,
        ResultDesc: "The service request is processed successfully.",
        CallbackMetadata: {
          Item: [
            { Name: "Amount", Value: 500 }, // Underpayment
            { Name: "MpesaReceiptNumber", Value: "QHD999TAMPER" },
            { Name: "PhoneNumber", Value: 254722000000 },
          ],
        },
      },
    },
  };

  await MpesaService.processCallback(underpaidCallback);
  const order2Status = MpesaService.getPaymentStatus(order2.orderId, order2.checkoutToken);
  assert(
    order2Status?.paymentStatus === "payment_review",
    "6.3 Amount mismatch triggers 'payment_review' status instead of marking paid",
  );
  assert(
    order2Status?.orderStatus === "pending",
    "6.4 Order status remains 'pending' when amount does not match authoritative price",
  );

  // ---------------------------------------------------------------------------
  // 7. USER CANCELLATION ON PHONE (ResultCode: 1032)
  // ---------------------------------------------------------------------------
  console.log("\nSuite 6: User Cancellation & Error Code Handling");

  const order3 = await OrderService.createOrder({
    ticketTypeId: "early-bird",
    quantity: 1,
    buyerName: "Amina Abdi",
    buyerPhone: "0733111222",
  });
  assert(order3.success === true, "7.1 Create third order for user cancellation test");
  if (!order3.success) return;

  const push3 = await MpesaService.initiateStkPush({
    orderId: order3.orderId,
    checkoutToken: order3.checkoutToken,
  });

  // User cancels prompt on phone screen (Safaricom code 1032)
  const userCancelledCallback: DarajaCallbackPayload = {
    Body: {
      stkCallback: {
        MerchantRequestID: push3.merchantRequestId!,
        CheckoutRequestID: push3.checkoutRequestId!,
        ResultCode: 1032,
        ResultDesc: "Request cancelled by user.",
      },
    },
  };

  await MpesaService.processCallback(userCancelledCallback);
  const order3Status = MpesaService.getPaymentStatus(order3.orderId, order3.checkoutToken);
  assert(
    order3Status?.paymentStatus === "failed",
    "7.2 Payment status marked as 'failed' on phone cancellation (ResultCode 1032)",
  );
  assert(
    order3Status?.errorMessage?.includes("cancelled") === true,
    "7.3 Error message informs customer that request was cancelled on phone",
  );
  assert(
    order3Status?.orderStatus === "pending",
    "7.4 Order reservation hold is preserved so customer can retry before timer expires",
  );

  // ---------------------------------------------------------------------------
  // 8. END-TO-END HTTP API ROUTER INTEGRATION
  // ---------------------------------------------------------------------------
  console.log("\nSuite 7: HTTP API Router Route Handling");

  // 8.1 POST /api/payments/mpesa/stkpush
  const order4 = await OrderService.createOrder({
    ticketTypeId: "group-of-four",
    quantity: 1,
    buyerName: "Maina Ndegwa",
    buyerPhone: "0799888777",
  });
  assert(order4.success === true, "8.1 Create order for router test");
  if (!order4.success) return;

  const reqPush = new Request("http://localhost:3000/api/payments/mpesa/stkpush", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      order_id: order4.orderId,
      checkout_token: order4.checkoutToken,
    }),
  });
  const resPush = await handleApiRequest(reqPush);
  assert(resPush.status === 200, "8.2 POST /api/payments/mpesa/stkpush returns HTTP 200");
  const dataPush = (await resPush.json()) as { success: boolean; checkoutRequestId: string };
  assert(dataPush.success === true, "8.3 STK Push response payload success = true");

  // 8.2 GET /api/payments/status
  const reqStatus = new Request(
    `http://localhost:3000/api/payments/status?order_id=${order4.orderId}&token=${order4.checkoutToken}`,
    { method: "GET" },
  );
  const resStatus = await handleApiRequest(reqStatus);
  assert(resStatus.status === 200, "8.4 GET /api/payments/status returns HTTP 200");
  const dataStatus = (await resStatus.json()) as { paymentStatus: string; orderStatus: string };
  assert(
    dataStatus.paymentStatus === "processing",
    "8.5 GET /api/payments/status returns paymentStatus 'processing'",
  );

  // 8.3 POST /api/payments/mpesa/callback via HTTP router
  const reqCallback = new Request("http://localhost:3000/api/payments/mpesa/callback", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      Body: {
        stkCallback: {
          MerchantRequestID: "MR_ROUTER_1",
          CheckoutRequestID: dataPush.checkoutRequestId,
          ResultCode: 0,
          ResultDesc: "The service request is processed successfully.",
          CallbackMetadata: {
            Item: [
              { Name: "Amount", Value: 3200 },
              { Name: "MpesaReceiptNumber", Value: "QHD_HTTP_SUCCESS_1" },
              { Name: "PhoneNumber", Value: 254799888777 },
            ],
          },
        },
      },
    }),
  });
  const resCallback = await handleApiRequest(reqCallback);
  assert(resCallback.status === 200, "8.6 POST /api/payments/mpesa/callback returns HTTP 200");

  // 8.4 Verify order is now paid via status route
  const reqStatusAfter = new Request(
    `http://localhost:3000/api/payments/status?order_id=${order4.orderId}&token=${order4.checkoutToken}`,
    { method: "GET" },
  );
  const resStatusAfter = await handleApiRequest(reqStatusAfter);
  const dataStatusAfter = (await resStatusAfter.json()) as {
    orderStatus: string;
    paymentStatus: string;
    mpesaReceipt: string;
  };
  assert(
    dataStatusAfter.orderStatus === "paid" && dataStatusAfter.paymentStatus === "successful",
    "8.7 Order state confirmed as PAID via API status route",
  );
  assert(
    dataStatusAfter.mpesaReceipt === "QHD_HTTP_SUCCESS_1",
    "8.8 M-Pesa receipt confirmed via API status route",
  );

  // ---------------------------------------------------------------------------
  // SUMMARY
  // ---------------------------------------------------------------------------
  console.log("\n=======================================================");
  console.log(`GATE 4 TEST RESULTS: ${passed} Passed, ${failed} Failed`);
  console.log("=======================================================\n");

  if (failed > 0) {
    process.exit(1);
  }
  process.exit(0);
}

runGate4TestSuite().catch((err) => {
  console.error("Test execution failed:", err);
  process.exit(1);
});
