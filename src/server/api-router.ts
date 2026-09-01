import { OrderService } from "./order-service";
import { MpesaService, DarajaCallbackPayload } from "./mpesa-service";

export async function handleApiRequest(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const pathname = url.pathname;
  const method = request.method.toUpperCase();

  // Helper for JSON responses
  const json = (data: unknown, status = 200) => {
    return new Response(JSON.stringify(data), {
      status,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store, max-age=0",
      },
    });
  };

  // Helper for error responses
  const errorJson = (message: string, code = "ERROR", status = 400) => {
    return json({ success: false, code, message }, status);
  };

  try {
    // --------------------------------------------------------------------------
    // 1. Health check
    // --------------------------------------------------------------------------
    if (pathname === "/api/health") {
      return json({ status: "ok", time: new Date().toISOString() });
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
        ...(idempotencyKey ? { idempotencyKey } : {}),
        clientIp,
      });

      if (!result.success) {
        const code = (result as { code?: string }).code;
        let status = 400;
        if (code === "RATE_LIMITED") status = 429;
        if (code === "TICKET_NOT_FOUND" || code === "EVENT_NOT_FOUND") status = 404;
        if (code === "INSUFFICIENT_INVENTORY" || code === "IDEMPOTENCY_CONFLICT")
          status = 409;
        return json(result, status);
      }

      return json(result, 201);
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

      const order = OrderService.getOrder(orderId!, token);
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

      return json(statusResult);
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
