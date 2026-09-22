import { OrderService } from "./order-service";
import { MpesaService, DarajaCallbackPayload } from "./mpesa-service";
import { TicketsServerService } from "./tickets.server";
import { AdminServerService } from "./admin-service";
import { RefundService } from "./refund-service";
import { WhatsAppNotificationService } from "./whatsapp-service";
import {
  sendTicketConfirmationEmail,
  sendEventReminder24hEmail,
  sendRefundNoticeEmail,
  generateBookingConfirmationEmailHtml,
  generateEventReminder24hEmailHtml,
  generateRefundNoticeEmailHtml,
} from "./email.server";
import { SlidingWindowRateLimiter } from "./rate-limiter";
import {
  validateTicketSchema,
  processRefundSchema,
  sendWhatsAppNotificationSchema,
  sendEmailNotificationSchema,
} from "../lib/validation/api-schemas";
import { sanitizeObject } from "../lib/validation/sanitizer";
import { isCloudSqlConfigured } from "../db/index.ts";

export async function handleApiRequest(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const pathname = url.pathname;
  const method = request.method.toUpperCase();

  // Helper for JSON responses with defensive security headers and strict CORS
  const json = (data: unknown, status = 200) => {
    return new Response(JSON.stringify(data), {
      status,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store, max-age=0",
        "X-Content-Type-Options": "nosniff",
        "X-Frame-Options": "SAMEORIGIN",
        "Strict-Transport-Security": "max-age=63072000; includeSubDomains; preload",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PATCH, DELETE, OPTIONS",
        "Access-Control-Allow-Headers":
          "Content-Type, Authorization, X-Requested-With, Idempotency-Key",
      },
    });
  };

  // Helper for error responses
  const errorJson = (
    message: string,
    code = "ERROR",
    status = 400,
    extra?: Record<string, unknown>,
  ) => {
    return json({ success: false, code, message, ...(extra || {}) }, status);
  };

  // Handle CORS preflight
  if (method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PATCH, DELETE, OPTIONS",
        "Access-Control-Allow-Headers":
          "Content-Type, Authorization, X-Requested-With, Idempotency-Key",
        "Access-Control-Max-Age": "86400",
      },
    });
  }

  try {
    // --------------------------------------------------------------------------
    // 1. Health check
    // --------------------------------------------------------------------------
    if (pathname === "/api/health") {
      return json({
        status: "ok",
        runtime: process.env.VERCEL ? "vercel" : "node",
        time: new Date().toISOString(),
        databases: {
          cloudSqlConfigured: isCloudSqlConfigured(),
          supabaseConfigured: Boolean(
            process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY,
          ),
          firebaseConfigured: Boolean(
            process.env.FIREBASE_PROJECT_ID || process.env.VITE_FIREBASE_PROJECT_ID,
          ),
        },
        services: {
          mpesaConfigured: Boolean(
            process.env.MPESA_CONSUMER_KEY && process.env.MPESA_CONSUMER_SECRET,
          ),
          resendConfigured: Boolean(process.env.RESEND_API_KEY),
          whatsappConfigured: Boolean(
            process.env.WHATSAPP_API_KEY || process.env.TWILIO_AUTH_TOKEN,
          ),
        },
      });
    }

    // --------------------------------------------------------------------------
    // 2. POST /api/orders/create (or /api/orders/reserve)
    // --------------------------------------------------------------------------
    if (
      (pathname === "/api/orders/create" || pathname === "/api/orders/reserve") &&
      method === "POST"
    ) {
      let body: Record<string, unknown>;
      try {
        body = (await request.json()) as Record<string, unknown>;
      } catch {
        return errorJson("Invalid JSON request body.", "INVALID_JSON", 400);
      }

      const ticketTypeId = String(body["ticket_type_id"] || body["ticketTypeId"] || "");
      const quantity = parseInt(String(body["quantity"] || "1"), 10);
      const buyerName = String(body["buyer_name"] || body["buyerName"] || "");
      const buyerPhone = String(body["buyer_phone"] || body["buyerPhone"] || "");
      const buyerEmail =
        body["buyer_email"] || body["buyerEmail"]
          ? String(body["buyer_email"] || body["buyerEmail"])
              .trim()
              .toLowerCase()
          : undefined;
      const idempotencyKey =
        body["idempotency_key"] || body["idempotencyKey"]
          ? String(body["idempotency_key"] || body["idempotencyKey"])
          : undefined;

      // Extract client IP for rate limiting
      const clientIp =
        request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
        request.headers.get("x-real-ip") ||
        "127.0.0.1";

      const result = await OrderService.createOrder({
        ticketTypeId,
        quantity,
        buyerName,
        buyerPhone,
        buyerEmail,
        idempotencyKey,
        clientIp,
      });

      if (!result.success) {
        let status = 400;
        if (result.code === "RATE_LIMITED") status = 429;
        if (result.code === "TICKET_NOT_FOUND" || result.code === "EVENT_NOT_FOUND") status = 404;
        if (result.code === "INSUFFICIENT_INVENTORY" || result.code === "IDEMPOTENCY_CONFLICT")
          status = 409;
        return json(result, status);
      }

      return json(result, 201);
    }

    // --------------------------------------------------------------------------
    // 2b. POST /api/orders/submit-mpesa-code (Buyer Manual M-Pesa Code Entry)
    // --------------------------------------------------------------------------
    if (pathname === "/api/orders/submit-mpesa-code" && method === "POST") {
      let body: Record<string, unknown>;
      try {
        body = (await request.json()) as Record<string, unknown>;
      } catch {
        return errorJson("Invalid JSON request body.", "INVALID_JSON", 400);
      }

      const orderId = String(body["order_id"] || body["orderId"] || "");
      const checkoutToken =
        body["token"] || body["checkoutToken"]
          ? String(body["token"] || body["checkoutToken"])
          : undefined;
      const rawInput = String(
        body["mpesa_code"] ||
          body["mpesaCode"] ||
          body["mpesa_message"] ||
          body["mpesaMessage"] ||
          "",
      );
      const buyerEmail =
        body["buyer_email"] || body["buyerEmail"]
          ? String(body["buyer_email"] || body["buyerEmail"])
              .trim()
              .toLowerCase()
          : undefined;

      if (!orderId) {
        return errorJson("order_id is required.", "INVALID_INPUT", 400);
      }

      if (!rawInput || rawInput.trim().length < 5) {
        return errorJson(
          "Please enter a valid M-Pesa transaction confirmation message or reference code.",
          "INVALID_INPUT",
          400,
        );
      }

      // Automatically extract 10-character uppercase alphanumeric M-Pesa code from pasted text or code
      const codeRegexMatch = rawInput.match(/\b([A-Z0-9]{10})\b/i);
      const extractedCode = codeRegexMatch
        ? codeRegexMatch[1].toUpperCase()
        : rawInput.trim().toUpperCase();

      const result = OrderService.submitMpesaCode({
        orderId,
        checkoutToken,
        mpesaCode: extractedCode,
        mpesaMessage: rawInput.trim(),
        buyerEmail,
      });

      if (!result.success) {
        return json(result, result.code === "NOT_FOUND" ? 404 : 400);
      }

      return json({
        success: true,
        orderId,
        mpesaCode: extractedCode,
        status: "pending_approval",
        message: "M-Pesa code submitted. Ticket approval dispatched to admin.",
        order: result.order,
      });
    }

    // --------------------------------------------------------------------------
    // 3. GET /api/orders/:id (Lookup order status with secure session token)
    // --------------------------------------------------------------------------
    const orderMatch = pathname.match(/^\/api\/orders\/([a-zA-Z0-9_-]+)$/);
    if (orderMatch && method === "GET") {
      const orderId = orderMatch[1];
      const token =
        url.searchParams.get("token") ||
        request.headers.get("authorization")?.replace(/^Bearer\s+/i, "");

      if (!token) {
        return errorJson("Authorization token required for order lookup.", "UNAUTHORIZED", 401);
      }

      const order = OrderService.getOrder(orderId, token);
      if (!order) {
        return errorJson("Order not found or authorization token invalid.", "UNAUTHORIZED", 401);
      }

      return json(order);
    }

    // --------------------------------------------------------------------------
    // 4. POST /api/orders/cancel
    // --------------------------------------------------------------------------
    if (pathname === "/api/orders/cancel" && method === "POST") {
      let body: Record<string, unknown>;
      try {
        body = (await request.json()) as Record<string, unknown>;
      } catch {
        return errorJson("Invalid JSON request body.", "INVALID_JSON", 400);
      }

      const orderId = String(body["order_id"] || body["orderId"] || "");
      const token = String(body["token"] || body["checkoutToken"] || "");

      if (!orderId || !token) {
        return errorJson("order_id and token are required.", "INVALID_INPUT", 400);
      }

      const cancelResult = OrderService.cancelOrder(orderId, token);
      if (!cancelResult.success) {
        let status = 400;
        if (cancelResult.code === "UNAUTHORIZED") status = 401;
        if (cancelResult.code === "NOT_FOUND") status = 404;
        if (cancelResult.code === "ORDER_EXPIRED") status = 410;
        return json(cancelResult, status);
      }

      return json({ success: true, message: "Reservation released successfully." });
    }

    // --------------------------------------------------------------------------
    // 5. POST /api/payments/mpesa/stkpush (Initiate Daraja STK Push)
    // --------------------------------------------------------------------------
    if (pathname === "/api/payments/mpesa/stkpush" && method === "POST") {
      let body: Record<string, unknown>;
      try {
        body = (await request.json()) as Record<string, unknown>;
      } catch {
        return errorJson("Invalid JSON request body.", "INVALID_JSON", 400);
      }

      const orderId = String(body["order_id"] || body["orderId"] || "");
      const checkoutToken = String(body["checkout_token"] || body["checkoutToken"] || "");

      if (!orderId || !checkoutToken) {
        return errorJson("order_id and checkout_token are required.", "INVALID_INPUT", 400);
      }

      const clientIp =
        request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
        request.headers.get("x-real-ip") ||
        "127.0.0.1";

      const stkResult = await MpesaService.initiateStkPush({
        orderId,
        checkoutToken,
        clientIp,
      });

      if (!stkResult.success) {
        let status = 400;
        if (stkResult.code === "UNAUTHORIZED") status = 401;
        if (stkResult.code === "ORDER_EXPIRED") status = 410;
        if (stkResult.code === "ALREADY_PAID") status = 409;
        if (stkResult.code === "COOLDOWN_ACTIVE") status = 429;
        if (stkResult.code === "DARAJA_ERROR") status = 502;
        return json(stkResult, status);
      }

      return json(stkResult, 200);
    }

    // --------------------------------------------------------------------------
    // 6. POST /api/payments/mpesa/callback (Safaricom Daraja Webhook Handler)
    // --------------------------------------------------------------------------
    if (pathname === "/api/payments/mpesa/callback" && method === "POST") {
      let callbackBody: DarajaCallbackPayload;
      try {
        callbackBody = (await request.json()) as DarajaCallbackPayload;
      } catch {
        return errorJson("Invalid JSON callback payload.", "INVALID_JSON", 400);
      }

      const { statusCode, response } = await MpesaService.processCallback(callbackBody);
      return json(response, statusCode);
    }

    // --------------------------------------------------------------------------
    // 7. GET /api/payments/status (Polling Endpoint for Checkout Client)
    // --------------------------------------------------------------------------
    if (pathname === "/api/payments/status" && method === "GET") {
      const orderId = url.searchParams.get("order_id") || url.searchParams.get("orderId");
      const token =
        url.searchParams.get("token") ||
        request.headers.get("authorization")?.replace(/^Bearer\s+/i, "");

      if (!orderId || !token) {
        return errorJson(
          "order_id and checkout token are required for payment status.",
          "UNAUTHORIZED",
          401,
        );
      }

      const statusResult = MpesaService.getPaymentStatus(orderId, token);
      if (!statusResult) {
        return errorJson("Order not found or authorization token invalid.", "UNAUTHORIZED", 401);
      }

      // If payment is successful, ensure tickets are issued
      if (statusResult.paymentStatus === "successful" || statusResult.orderStatus === "paid") {
        try {
          await TicketsServerService.issueTicketsForOrder(orderId, token);
        } catch (e) {
          console.warn("Could not auto-issue tickets on poll:", e);
        }
      }

      return json(statusResult);
    }

    // --------------------------------------------------------------------------
    // 8. POST /api/pay/verify (Idempotency Gate for Payment Verification)
    // --------------------------------------------------------------------------
    if (pathname === "/api/pay/verify" && method === "POST") {
      let body: Record<string, unknown>;
      try {
        body = (await request.json()) as Record<string, unknown>;
      } catch {
        return errorJson("Invalid JSON request body.", "INVALID_JSON", 400);
      }

      const idempotencyKey = String(body["idempotency_key"] || body["idempotencyKey"] || "");
      const orderId = String(body["order_id"] || body["orderId"] || "");
      const token = String(body["token"] || body["checkout_token"] || body["checkoutToken"] || "");
      const mpesaReceipt = body["mpesa_receipt"] ? String(body["mpesa_receipt"]) : undefined;

      const clientIp =
        request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
        request.headers.get("x-real-ip") ||
        "127.0.0.1";

      const verifyResult = await TicketsServerService.verifyPayment({
        idempotencyKey,
        orderId,
        token,
        mpesaReceipt,
        clientIp,
      });

      if (!verifyResult.success) {
        let status = 400;
        if (verifyResult.code === "TRANSACTION_PENDING") status = 409;
        if (verifyResult.code === "ORDER_NOT_FOUND") status = 404;
        return json(verifyResult, status);
      }

      return json(verifyResult, 200);
    }

    // --------------------------------------------------------------------------
    // 9. GET /api/tickets/recover/verify (Verify Recovery Token & List Tickets)
    // --------------------------------------------------------------------------
    if (pathname === "/api/tickets/recover/verify" && method === "GET") {
      const token = url.searchParams.get("token");
      if (!token) {
        return errorJson("Recovery token parameter required.", "TOKEN_REQUIRED", 400);
      }

      const verifyResult = TicketsServerService.verifyRecoveryToken(token);
      if (!verifyResult.valid) {
        return json(
          {
            success: false,
            expired: verifyResult.expired,
            message: verifyResult.expired
              ? "This recovery link has expired. Please request a new link."
              : "Invalid or forged recovery token.",
          },
          401,
        );
      }

      return json({
        success: true,
        email: verifyResult.email,
        tickets: verifyResult.tickets,
      });
    }

    // --------------------------------------------------------------------------
    // 10. POST /api/tickets/recover (Initiate Recovery Link Dispatch)
    // --------------------------------------------------------------------------
    if (pathname === "/api/tickets/recover" && method === "POST") {
      let body: Record<string, unknown>;
      try {
        body = (await request.json()) as Record<string, unknown>;
      } catch {
        return errorJson("Invalid JSON request body.", "INVALID_JSON", 400);
      }

      const email = body["email"] ? String(body["email"]).trim() : undefined;
      const phone = body["phone"] ? String(body["phone"]).trim() : undefined;

      if (!email && !phone) {
        return errorJson("Please provide an email address or phone number.", "INPUT_REQUIRED", 400);
      }

      const clientIp =
        request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
        request.headers.get("x-real-ip") ||
        "127.0.0.1";

      const baseUrl =
        process.env.APP_URL || `${url.protocol}//${request.headers.get("host") || url.host}`;

      const recoveryResult = await TicketsServerService.recoverTicket({
        email,
        phone,
        clientIp,
        baseUrl,
      });

      if (!recoveryResult.success) {
        return json(recoveryResult, recoveryResult.code === "RATE_LIMITED" ? 429 : 400);
      }

      return json(recoveryResult, 200);
    }

    // --------------------------------------------------------------------------
    // 11. GET /api/tickets/:code (Signature-Verified Digital Ticket Lookup)
    // --------------------------------------------------------------------------
    const ticketMatch = pathname.match(/^\/api\/tickets\/([a-zA-Z0-9_-]+)$/);
    if (ticketMatch && method === "GET") {
      const code = ticketMatch[1];
      const lookupResult = TicketsServerService.getTicketByCode(code);

      if (!lookupResult.success || !lookupResult.ticket) {
        return errorJson(lookupResult.message || "Ticket not found.", "TICKET_NOT_FOUND", 404);
      }

      return json({
        success: true,
        ticket: lookupResult.ticket,
      });
    }

    // --------------------------------------------------------------------------
    // 12. POST /api/tickets/validate & POST /api/tickets/checkin (Authoritative Gate Validation)
    // --------------------------------------------------------------------------
    if (
      (pathname === "/api/tickets/validate" || pathname === "/api/tickets/checkin") &&
      method === "POST"
    ) {
      const clientIp =
        request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
        request.headers.get("x-real-ip") ||
        "127.0.0.1";

      // Rate limit: 60 checks per minute per IP for scanner protection
      const rateCheck = SlidingWindowRateLimiter.check(clientIp, "ticket_validate", {
        windowMs: 60000,
        maxRequests: 60,
      });

      if (!rateCheck.allowed) {
        return errorJson("Scanner rate limit exceeded. Please wait a moment.", "RATE_LIMITED", 429);
      }

      let rawBody: Record<string, unknown>;
      try {
        rawBody = (await request.json()) as Record<string, unknown>;
      } catch {
        return errorJson("Invalid JSON request body.", "INVALID_JSON", 400);
      }

      const body = sanitizeObject(rawBody);
      const parseResult = validateTicketSchema.safeParse({
        ticket_code: body["ticket_code"] || body["code"] || body["ticket_number"],
        qr_hash: body["qr_hash"] || body["qrHash"],
        event_id: body["event_id"] || body["eventId"] || "hauntings-of-the-rift-2026",
        staff_name: body["staff_name"] || body["staffName"] || "Gate Security Staff",
        gate_location: body["gate_location"] || body["gateLocation"] || "Main Top Cliff Entrance",
      });

      if (!parseResult.success) {
        return errorJson(
          parseResult.error.errors[0]?.message || "Invalid ticket payload",
          "VALIDATION_ERROR",
          400,
        );
      }

      const { ticket_code, qr_hash, event_id, staff_name, gate_location } = parseResult.data;

      const checkInResult = await TicketsServerService.validateAndCheckinTicket({
        ticket_code,
        qr_hash,
        event_id,
        staff_name,
        gate_location,
        clientIp,
      });

      return json(checkInResult, checkInResult.httpStatus);
    }

    // --------------------------------------------------------------------------
    // 12b. GET /api/tickets/stats (Live Gate Check-in Stats)
    // --------------------------------------------------------------------------
    if (pathname === "/api/tickets/stats" && method === "GET") {
      const stats = TicketsServerService.getCheckinStats();
      return json({ success: true, ...stats });
    }

    // --------------------------------------------------------------------------
    // 13. GET /api/admin/overview (Dashboard Metrics & Analytics)
    // --------------------------------------------------------------------------
    if (pathname === "/api/admin/overview" && method === "GET") {
      const overview = AdminServerService.getOverviewMetrics();
      return json({ success: true, ...overview });
    }

    // --------------------------------------------------------------------------
    // 14. GET /api/admin/tickets (Ticket Management Data Table)
    // --------------------------------------------------------------------------
    if (pathname === "/api/admin/tickets" && method === "GET") {
      const search = url.searchParams.get("search") || undefined;
      const status = url.searchParams.get("status") || undefined;
      const tier = url.searchParams.get("tier") || undefined;

      const tickets = AdminServerService.getTickets({ search, status, tier });
      return json({ success: true, count: tickets.length, tickets });
    }

    // --------------------------------------------------------------------------
    // 15. POST /api/admin/tickets/revoke (Manually Invalidate Pass)
    // --------------------------------------------------------------------------
    if (pathname === "/api/admin/tickets/revoke" && method === "POST") {
      let body: Record<string, unknown>;
      try {
        body = (await request.json()) as Record<string, unknown>;
      } catch {
        return errorJson("Invalid JSON request body.", "INVALID_JSON", 400);
      }

      const code = String(body["code"] || "");
      const reason = String(body["reason"] || "Manual organizer revocation");
      const actorEmail = String(body["actor_email"] || body["actorEmail"] || "admin@verve.co.ke");
      const actorId = body["actor_id"] ? String(body["actor_id"]) : undefined;

      const clientIp =
        request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
        request.headers.get("x-real-ip") ||
        "127.0.0.1";

      const result = await AdminServerService.revokeTicket({
        code,
        reason,
        actorEmail,
        actorId,
        clientIp,
      });

      return json(result, result.success ? 200 : 400);
    }

    // --------------------------------------------------------------------------
    // 16. POST /api/admin/tickets/resend (Resend Ticket Email to Buyer)
    // --------------------------------------------------------------------------
    if (pathname === "/api/admin/tickets/resend" && method === "POST") {
      let body: Record<string, unknown>;
      try {
        body = (await request.json()) as Record<string, unknown>;
      } catch {
        return errorJson("Invalid JSON request body.", "INVALID_JSON", 400);
      }

      const code = String(body["code"] || "");
      const actorEmail = String(body["actor_email"] || body["actorEmail"] || "admin@verve.co.ke");
      const actorId = body["actor_id"] ? String(body["actor_id"]) : undefined;

      const clientIp =
        request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
        request.headers.get("x-real-ip") ||
        "127.0.0.1";

      const result = await AdminServerService.resendTicketEmail({
        code,
        actorEmail,
        actorId,
        clientIp,
      });

      return json(result, result.success ? 200 : 400);
    }

    // --------------------------------------------------------------------------
    // 16b. GET /api/admin/orders/pending (Fetch orders awaiting M-Pesa verification)
    // --------------------------------------------------------------------------
    if (pathname === "/api/admin/orders/pending" && method === "GET") {
      const pendingOrders = OrderService.getPendingOrders();
      return json({
        success: true,
        count: pendingOrders.length,
        orders: pendingOrders,
      });
    }

    // --------------------------------------------------------------------------
    // 16c. POST /api/admin/orders/approve (Admin approves order, issues tickets & sends email)
    // --------------------------------------------------------------------------
    if (pathname === "/api/admin/orders/approve" && method === "POST") {
      let body: Record<string, unknown>;
      try {
        body = (await request.json()) as Record<string, unknown>;
      } catch {
        return errorJson("Invalid JSON request body.", "INVALID_JSON", 400);
      }

      const orderId = String(body["order_id"] || body["orderId"] || "");
      const adminEmail = String(body["admin_email"] || body["adminEmail"] || "admin@verve.co.ke");

      if (!orderId) {
        return errorJson("order_id is required.", "INVALID_INPUT", 400);
      }

      // 1. Approve order state in authoritative service
      const approveResult = OrderService.approveOrder({
        orderId,
        adminEmail,
      });

      if (!approveResult.success || !approveResult.order) {
        return json(approveResult, approveResult.code === "NOT_FOUND" ? 404 : 400);
      }

      const order = approveResult.order;

      // 2. Issue authoritative tickets for order
      let tickets: Awaited<ReturnType<typeof TicketsServerService.issueTicketsForApprovedOrder>> =
        [];
      try {
        tickets = await TicketsServerService.issueTicketsForApprovedOrder(orderId);
      } catch (err) {
        console.error("Failed to issue tickets for order:", err);
      }

      // 3. Send ticket confirmation email to buyer if email provided
      let emailResult = { success: false, simulated: false, reason: "No email provided on order" };
      const recipientEmail = order.buyerEmail;

      if (recipientEmail) {
        try {
          const emailResponse = await sendTicketConfirmationEmail({
            to: recipientEmail,
            buyerName: order.buyerName,
            orderNumber: order.orderNumber,
            totalKes: order.totalKes,
            ticketTier: order.ticketName,
            quantity: order.quantity,
            tickets: tickets.map((t) => ({
              ticketNumber: t.ticketNumber,
              tierName: t.tierName,
              admitsCount: t.admitsCount,
              qrHash: t.qrHash,
              qrDataUrl: `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(
                JSON.stringify({
                  code: t.ticketNumber,
                  hash: t.qrHash,
                  event: "HALLOWEEN_RIFT_2026",
                  admits: t.admitsCount,
                }),
              )}`,
            })),
          });
          emailResult = {
            success: emailResponse.success,
            simulated: "simulated" in emailResponse ? Boolean(emailResponse.simulated) : false,
            reason: emailResponse.success
              ? "Email dispatched successfully"
              : "Email service returned failure",
          };
        } catch (emailErr) {
          console.error("Error sending ticket email:", emailErr);
          emailResult = {
            success: false,
            simulated: false,
            reason: emailErr instanceof Error ? emailErr.message : "Error sending email",
          };
        }
      }

      return json({
        success: true,
        message: `Order ${order.orderNumber} successfully approved and ${tickets.length} ticket(s) issued.`,
        order,
        tickets,
        emailDelivery: emailResult,
      });
    }

    // --------------------------------------------------------------------------
    // 16d. POST /api/admin/orders/reject (Admin rejects order with reason)
    // --------------------------------------------------------------------------
    if (pathname === "/api/admin/orders/reject" && method === "POST") {
      let body: Record<string, unknown>;
      try {
        body = (await request.json()) as Record<string, unknown>;
      } catch {
        return errorJson("Invalid JSON request body.", "INVALID_JSON", 400);
      }

      const orderId = String(body["order_id"] || body["orderId"] || "");
      const reason = String(
        body["reason"] || "M-Pesa transaction reference could not be verified.",
      );
      const adminEmail = String(body["admin_email"] || body["adminEmail"] || "admin@verve.co.ke");

      if (!orderId) {
        return errorJson("order_id is required.", "INVALID_INPUT", 400);
      }

      const rejectResult = OrderService.rejectOrder({
        orderId,
        reason,
        adminEmail,
      });

      if (!rejectResult.success) {
        return json(rejectResult, rejectResult.code === "NOT_FOUND" ? 404 : 400);
      }

      return json({
        success: true,
        message: `Order ${orderId} marked as rejected.`,
        order: rejectResult.order,
      });
    }

    // --------------------------------------------------------------------------
    // 16e. POST /api/admin/orders/seed-demo (Seed a sample pending approval order)
    // --------------------------------------------------------------------------
    if (pathname === "/api/admin/orders/seed-demo" && method === "POST") {
      const demoOrder = await OrderService.createOrder({
        ticketTypeId: "rift-coven",
        quantity: 1,
        buyerName: "Faith Chebet",
        buyerPhone: "0712345678",
        buyerEmail: "faith.chebet@example.com",
      });

      if (demoOrder.success) {
        OrderService.submitMpesaCode({
          orderId: demoOrder.orderId,
          mpesaCode: "TLK99XW82A",
          mpesaMessage:
            "TLK99XW82A Confirmed. Ksh 10,000 sent to HALLOWEEN RIFT PARTY on 21/09/2026 at 2:30 PM. New M-PESA balance is Ksh 45,210.",
          buyerEmail: "faith.chebet@example.com",
        });
        return json({
          success: true,
          message: "Demo pending order created for verification testing.",
          orderId: demoOrder.orderId,
        });
      }
      return json({ success: false, message: "Failed to create demo order." }, 500);
    }

    // --------------------------------------------------------------------------
    // 17. GET /api/admin/promotions (Promotion Codes List)
    // --------------------------------------------------------------------------
    if (pathname === "/api/admin/promotions" && method === "GET") {
      const promotions = AdminServerService.getPromotions();
      return json({ success: true, count: promotions.length, promotions });
    }

    // --------------------------------------------------------------------------
    // 18. POST /api/admin/promotions (Create New Promotion Code)
    // --------------------------------------------------------------------------
    if (pathname === "/api/admin/promotions" && method === "POST") {
      let body: Record<string, unknown>;
      try {
        body = (await request.json()) as Record<string, unknown>;
      } catch {
        return errorJson("Invalid JSON request body.", "INVALID_JSON", 400);
      }

      const code = String(body["code"] || "");
      const name = body["name"] ? String(body["name"]) : undefined;
      const discountType = String(body["discount_type"] || body["discountType"] || "percentage") as
        "percentage" | "fixed";
      const discountValue = Number(body["discount_value"] ?? body["discountValue"] ?? 0);
      const maxUses = Number(body["max_uses"] ?? body["maxUses"] ?? 100);
      const expiresAt =
        body["expires_at"] || body["expiresAt"]
          ? String(body["expires_at"] || body["expiresAt"])
          : null;
      const isActive = body["is_active"] !== false && body["isActive"] !== false;
      const actorEmail = String(body["actor_email"] || body["actorEmail"] || "admin@verve.co.ke");
      const actorId = body["actor_id"] ? String(body["actor_id"]) : undefined;

      const clientIp =
        request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
        request.headers.get("x-real-ip") ||
        "127.0.0.1";

      const result = await AdminServerService.createPromotion({
        code,
        name,
        discountType,
        discountValue,
        maxUses,
        expiresAt,
        isActive,
        actorEmail,
        actorId,
        clientIp,
      });

      return json(result, result.success ? 201 : 400);
    }

    // --------------------------------------------------------------------------
    // 19. POST /api/admin/promotions/toggle (Quick Toggle Status)
    // --------------------------------------------------------------------------
    if (
      (pathname === "/api/admin/promotions/toggle" ||
        (pathname.startsWith("/api/admin/promotions/") && pathname.endsWith("/toggle"))) &&
      (method === "POST" || method === "PATCH")
    ) {
      let body: Record<string, unknown> = {};
      try {
        body = (await request.json()) as Record<string, unknown>;
      } catch {
        // body could be empty for URL route
      }

      let codeOrId = String(body["code"] || body["id"] || "");
      if (!codeOrId && pathname.includes("/toggle")) {
        const parts = pathname.split("/");
        codeOrId = parts[parts.indexOf("toggle") - 1] || "";
      }

      const isActive = Boolean(body["is_active"] ?? body["isActive"] ?? true);
      const actorEmail = String(body["actor_email"] || body["actorEmail"] || "admin@verve.co.ke");
      const actorId = body["actor_id"] ? String(body["actor_id"]) : undefined;

      const clientIp =
        request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
        request.headers.get("x-real-ip") ||
        "127.0.0.1";

      const result = await AdminServerService.togglePromotion({
        codeOrId,
        isActive,
        actorEmail,
        actorId,
        clientIp,
      });

      return json(result, result.success ? 200 : 400);
    }

    // --------------------------------------------------------------------------
    // 20. POST /api/admin/promotions/delete (Delete Promo)
    // --------------------------------------------------------------------------
    if (
      (pathname === "/api/admin/promotions/delete" ||
        (pathname.startsWith("/api/admin/promotions/") && method === "DELETE")) &&
      (method === "POST" || method === "DELETE")
    ) {
      let codeOrId = "";
      if (method === "DELETE") {
        codeOrId = pathname.split("/").pop() || "";
      } else {
        const body = (await request.json().catch(() => ({}))) as Record<string, unknown>;
        codeOrId = String(body["code"] || body["id"] || "");
      }

      const actorEmail = "admin@verve.co.ke";
      const clientIp = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "127.0.0.1";

      const result = await AdminServerService.deletePromotion({
        codeOrId,
        actorEmail,
        clientIp,
      });

      return json(result, result.success ? 200 : 400);
    }

    // --------------------------------------------------------------------------
    // 21. POST /api/promotions/validate (Customer Checkout Promo Validation)
    // --------------------------------------------------------------------------
    if (pathname === "/api/promotions/validate" && method === "POST") {
      let body: Record<string, unknown>;
      try {
        body = (await request.json()) as Record<string, unknown>;
      } catch {
        return errorJson("Invalid JSON request body.", "INVALID_JSON", 400);
      }

      const code = String(body["code"] || "");
      const subtotalKes = Number(body["subtotal_kes"] || body["subtotalKes"] || 0);

      const result = AdminServerService.validatePromoCode(code, subtotalKes);
      return json(result, result.valid ? 200 : 400);
    }

    // --------------------------------------------------------------------------
    // 22. GET /api/admin/audit-logs (Audit Trail)
    // --------------------------------------------------------------------------
    if (pathname === "/api/admin/audit-logs" && method === "GET") {
      const logs = AdminServerService.getAuditLogs();
      return json({ success: true, count: logs.length, logs });
    }

    // --------------------------------------------------------------------------
    // 23. GET /api/admin/scanners (Scanner Fleet & Gate Stats)
    // --------------------------------------------------------------------------
    if (pathname === "/api/admin/scanners" && method === "GET") {
      const scanners = AdminServerService.getScanners();
      return json({ success: true, count: scanners.length, scanners });
    }

    // --------------------------------------------------------------------------
    // 24. POST /api/admin/refunds/process (Execute Order / Ticket Refund)
    // --------------------------------------------------------------------------
    if (pathname === "/api/admin/refunds/process" && method === "POST") {
      let rawBody: Record<string, unknown>;
      try {
        rawBody = (await request.json()) as Record<string, unknown>;
      } catch {
        return errorJson("Invalid JSON request body.", "INVALID_JSON", 400);
      }

      const body = sanitizeObject(rawBody);
      const parseResult = processRefundSchema.safeParse({
        orderId: body["orderId"] || body["order_id"],
        ticketNumber: body["ticketNumber"] || body["ticket_number"],
        amountKes: Number(body["amountKes"] || body["amount_kes"] || body["amount"] || 0),
        reason: body["reason"],
        refundType: body["refundType"] || body["refund_type"] || "full",
        actorEmail: body["actorEmail"] || body["actor_email"] || "admin@verve.co.ke",
        actorId: body["actorId"] || body["actor_id"],
      });

      if (!parseResult.success) {
        return errorJson(
          parseResult.error.errors[0]?.message || "Invalid refund payload",
          "VALIDATION_ERROR",
          400,
        );
      }

      const clientIp =
        request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
        request.headers.get("x-real-ip") ||
        "127.0.0.1";

      const refundResult = await RefundService.processRefund({
        ...parseResult.data,
        clientIp,
      });

      return json(refundResult, refundResult.success ? 200 : 400);
    }

    // --------------------------------------------------------------------------
    // 25. GET /api/admin/reconciliation (Financial Reconciliation Ledger & Metrics)
    // --------------------------------------------------------------------------
    if (pathname === "/api/admin/reconciliation" && method === "GET") {
      const reconciliationData = RefundService.getReconciliationData();
      return json({ success: true, ...reconciliationData });
    }

    // --------------------------------------------------------------------------
    // 26. POST /api/notifications/whatsapp (Dispatch Transactional WhatsApp Message)
    // --------------------------------------------------------------------------
    if (pathname === "/api/notifications/whatsapp" && method === "POST") {
      let rawBody: Record<string, unknown>;
      try {
        rawBody = (await request.json()) as Record<string, unknown>;
      } catch {
        return errorJson("Invalid JSON request body.", "INVALID_JSON", 400);
      }

      const body = sanitizeObject(rawBody);
      const parseResult = sendWhatsAppNotificationSchema.safeParse({
        phone: body["phone"] || body["recipientPhone"] || body["recipient_phone"],
        templateType: body["templateType"] || body["template"] || "booking_confirmation",
        customerName:
          body["customerName"] ||
          body["customer_name"] ||
          body["attendeeName"] ||
          body["attendee_name"] ||
          "Valued Guest",
        passTierAndQuantity:
          body["passTierAndQuantity"] ||
          body["pass_tier_quantity"] ||
          (body["tierName"] ? `${body["tierName"]} (x1)` : undefined),
        orderId: body["orderId"] || body["order_id"] || body["orderNumber"] || body["order_number"],
        ticketAccessUrl:
          body["ticketAccessUrl"] ||
          body["ticket_access_url"] ||
          body["directTicketUrl"] ||
          body["direct_ticket_url"],
        venueNameOrLocation:
          body["venueNameOrLocation"] || body["venue_name"] || "Top Cliff Lounge, Nakuru",
        gateOpeningTime: body["gateOpeningTime"] || body["gate_opening_time"] || "18:00 EAT",
        fastPassLink: body["fastPassLink"] || body["fast_pass_link"],
        refundAmountKes:
          body["refundAmountKes"] || body["refund_amount_kes"] || body["refund_amount"],
        paymentProviderRef:
          body["paymentProviderRef"] || body["payment_ref"] || body["payment_provider_ref"],
        reasonOrDetails: body["reasonOrDetails"] || body["reason"] || body["refund_reason"],
        attendeeName: body["attendeeName"] || body["customerName"],
        ticketCode: body["ticketCode"] || body["ticket_code"],
        tierName: body["tierName"] || body["tier_name"],
        orderNumber: body["orderNumber"] || body["order_number"],
        totalKes: body["totalKes"] ? Number(body["totalKes"]) : undefined,
        directTicketUrl: body["directTicketUrl"] || body["ticketAccessUrl"],
      });

      if (!parseResult.success) {
        return errorJson(
          parseResult.error.errors[0]?.message || "Invalid WhatsApp notification payload",
          "VALIDATION_ERROR",
          400,
        );
      }

      const data = parseResult.data;
      const dispatchResult = await WhatsAppNotificationService.sendNotification({
        recipientPhone: data.phone,
        template: data.templateType,
        params: {
          customerName: data.customerName || data.attendeeName || "Valued Guest",
          passTierAndQuantity:
            data.passTierAndQuantity ||
            (data.tierName ? `${data.tierName} (x1)` : "General Admission Pass (x1)"),
          orderId: data.orderId || data.orderNumber || "HR-2026-CONFIRMED",
          ticketAccessUrl:
            data.ticketAccessUrl ||
            data.directTicketUrl ||
            "https://hauntingsoftherift.co.ke/ticket/demo",
          venueNameOrLocation: data.venueNameOrLocation || "Top Cliff Lounge, Nakuru",
          gateOpeningTime: data.gateOpeningTime || "18:00 EAT",
          fastPassLink:
            data.fastPassLink ||
            data.ticketAccessUrl ||
            "https://hauntingsoftherift.co.ke/ticket/demo",
          refundAmountKes: data.refundAmountKes || "1,800",
          paymentProviderRef: data.paymentProviderRef || "REV-MPESA-DEFAULT",
          reasonOrDetails: data.reasonOrDetails || "Customer cancellation request",
        },
      });

      return json(dispatchResult, 200);
    }

    // --------------------------------------------------------------------------
    // 27. POST /api/notifications/email (Dispatch Transactional HTML Email)
    // --------------------------------------------------------------------------
    if (pathname === "/api/notifications/email" && method === "POST") {
      let rawBody: Record<string, unknown>;
      try {
        rawBody = (await request.json()) as Record<string, unknown>;
      } catch {
        return errorJson("Invalid JSON request body.", "INVALID_JSON", 400);
      }

      const body = sanitizeObject(rawBody);
      const parseResult = sendEmailNotificationSchema.safeParse(body);
      if (!parseResult.success) {
        return errorJson(
          parseResult.error.errors[0]?.message || "Invalid Email notification payload",
          "VALIDATION_ERROR",
          400,
        );
      }

      const {
        to,
        templateType,
        customer_name = "Valued Guest",
        ticket_tier = "General Admission Pass",
        quantity = 1,
        total_amount = "1,800",
        order_id = "HR-2026-CONFIRMED",
        event_date = "Saturday, 31 October 2026",
        ticket_url = "https://hauntingsoftherift.co.ke/ticket/demo",
        venue_name = "Top Cliff Lounge, Nakuru",
        gate_opening_time = "18:00 EAT",
        refund_amount = "1,800",
        payment_ref = "REV-MPESA-DEFAULT",
        refund_reason = "Customer cancellation request",
      } = parseResult.data;

      let emailResult;
      if (templateType === "booking_confirmation") {
        emailResult = await sendTicketConfirmationEmail({
          to,
          buyerName: customer_name,
          orderNumber: order_id,
          totalKes:
            typeof total_amount === "number"
              ? total_amount
              : Number(String(total_amount).replace(/,/g, "")) || 1800,
          ticketTier: ticket_tier,
          quantity: Number(quantity) || 1,
          ticketUrl: ticket_url,
        });
      } else if (templateType === "event_reminder_24h") {
        emailResult = await sendEventReminder24hEmail({
          to,
          customerName: customer_name,
          venueName: venue_name,
          gateOpeningTime: gate_opening_time,
          ticketTier: ticket_tier,
          ticketUrl: ticket_url,
        });
      } else if (templateType === "refund_notice") {
        emailResult = await sendRefundNoticeEmail({
          to,
          customerName: customer_name,
          refundAmount: refund_amount,
          paymentRef: payment_ref,
          refundReason: refund_reason,
          orderId: order_id,
        });
      }

      return json({ success: true, result: emailResult }, 200);
    }

    // --------------------------------------------------------------------------
    // 28. POST /api/notifications/reminder-24h (Batch 24h Reminder Dispatch)
    // --------------------------------------------------------------------------
    if (pathname === "/api/notifications/reminder-24h" && method === "POST") {
      const tickets = TicketsServerService.getAllTickets();
      const validTickets = tickets.filter((t) => t.status === "valid");

      const dispatched = [];
      for (const t of validTickets) {
        if (t.buyerPhone) {
          const res = await WhatsAppNotificationService.sendNotification({
            recipientPhone: t.buyerPhone,
            template: "event_reminder_24h",
            params: {
              customerName: t.attendeeName,
              venueNameOrLocation: t.venueDetails?.name || "Top Cliff Lounge, Nakuru",
              gateOpeningTime: "18:00 EAT",
              fastPassLink: `https://hauntingsoftherift.co.ke/ticket/${t.ticketNumber}`,
            },
          });
          dispatched.push({
            ticketNumber: t.ticketNumber,
            phone: t.buyerPhone,
            whatsapp: res.success,
          });
        }
        if (t.buyerEmail) {
          await sendEventReminder24hEmail({
            to: t.buyerEmail,
            customerName: t.attendeeName,
            venueName: t.venueDetails?.name || "Top Cliff Lounge, Nakuru",
            gateOpeningTime: "18:00 EAT",
            ticketTier: t.tierName,
            ticketUrl: `https://hauntingsoftherift.co.ke/ticket/${t.ticketNumber}`,
          });
        }
      }

      return json({
        success: true,
        message: `Dispatched 24h event reminders to ${validTickets.length} active ticket holder(s).`,
        count: validTickets.length,
        dispatched,
      });
    }

    // --------------------------------------------------------------------------
    // 29. GET /api/notifications/preview (HTML & Plaintext Preview Engine)
    // --------------------------------------------------------------------------
    if (pathname === "/api/notifications/preview" && method === "GET") {
      const template = (url.searchParams.get("template") || "booking_confirmation") as
        "booking_confirmation" | "event_reminder_24h" | "refund_notice";
      const format = url.searchParams.get("format") || "both"; // 'html' | 'plaintext' | 'both'

      let html = "";
      let plaintext = "";

      if (template === "booking_confirmation") {
        html = generateBookingConfirmationEmailHtml({
          customer_name: "Mwangi Karanja",
          ticket_tier: "VIP Rift Access Pass",
          quantity: 2,
          total_amount: "7,000",
          order_id: "HR-2026-9042",
          event_date: "Saturday, 31 October 2026",
          ticket_url: "https://hauntingsoftherift.co.ke/ticket/HR-1049-9941",
        });
        plaintext = `🎃 *HAUNTINGS OF THE RIFT — TICKET CONFIRMED* 🎃\n\nHey Mwangi Karanja! Your entry pass is secured. Get ready for an unforgettable night at the Rift.\n\n🎟️ *Pass Details:* VIP Rift Access Pass (x2)\n🧾 *Order ID:* HR-2026-9042\n\n👇 *Access Your Digital Pass & QR Code:*\nhttps://hauntingsoftherift.co.ke/ticket/HR-1049-9941\n\n⚠️ *Important Gate Rules:*\n• Bring a valid ID matching your registration details.\n• Keep your QR code saved offline or loaded before arrival at the gate.\n• Passes are single-entry only.\n\nNeed help? Reply directly to this message.`;
      } else if (template === "event_reminder_24h") {
        html = generateEventReminder24hEmailHtml({
          customer_name: "Mwangi Karanja",
          venue_name: "Top Cliff Lounge, Nakuru",
          gate_opening_time: "18:00 EAT",
          ticket_tier: "VIP Rift Access Pass",
          ticket_url: "https://hauntingsoftherift.co.ke/ticket/HR-1049-9941",
        });
        plaintext = `⏰ *TOMORROW AT THE RIFT* ⏰\n\nHey Mwangi Karanja, the gates open in 24 hours for Hauntings of the Rift!\n\n📍 *Venue:* Top Cliff Lounge, Nakuru\n🚪 *Gate Opens:* 18:00 EAT\n\n👇 *Have your QR code ready at the gate:*\nhttps://hauntingsoftherift.co.ke/ticket/HR-1049-9941\n\nDress code: Halloween costumes encouraged. Strict 21+ verification at entry.`;
      } else if (template === "refund_notice") {
        html = generateRefundNoticeEmailHtml({
          customer_name: "Mwangi Karanja",
          refund_amount: "3,500",
          payment_ref: "REV-MPESA-98842",
          refund_reason: "Customer cancellation request prior to cut-off",
          order_id: "HR-2026-9042",
        });
        plaintext = `🧾 *REFUND PROCESSED — HAUNTINGS OF THE RIFT* 🧾\n\nHi Mwangi Karanja,\n\nYour refund of *KES 3,500* has been successfully processed.\n\n*Reference:* REV-MPESA-98842\n*Details:* Customer cancellation request prior to cut-off\n\nNote: Associated passes for order HR-2026-9042 are now invalidated. Reach out to support@verve.co.ke for assistance.`;
      }

      if (format === "html") {
        return new Response(html, {
          status: 200,
          headers: { "Content-Type": "text/html; charset=utf-8" },
        });
      }

      return json({
        success: true,
        template,
        plaintext,
        html,
      });
    }

    // --------------------------------------------------------------------------
    // 404 For Unrecognized API routes
    // --------------------------------------------------------------------------
    return errorJson(`API route ${method} ${pathname} not found.`, "NOT_FOUND", 404);
  } catch (error) {
    console.error("Unhandled API Error:", error);
    return errorJson("An unexpected server error occurred.", "INTERNAL_SERVER_ERROR", 500);
  }
}
