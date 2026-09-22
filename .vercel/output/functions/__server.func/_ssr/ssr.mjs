import { t as createClient } from "../_libs/supabase__supabase-js.mjs";
import { t as Resend } from "../_libs/resend+standardwebhooks.mjs";
import { a as objectType, i as numberType, n as enumType, o as stringType, r as literalType, s as unionType, t as booleanType } from "../_libs/zod.mjs";
import crypto, { createHash, randomBytes, randomUUID, timingSafeEqual } from "crypto";
//#region node_modules/.nitro/vite/services/ssr/index.js
var lastCapturedError;
var TTL_MS = 5e3;
function record(error) {
	lastCapturedError = {
		error,
		at: Date.now()
	};
}
var CAUSE_DEPTH_LIMIT = 5;
var DESCRIPTION_LENGTH_LIMIT = 8e3;
function describeError(error) {
	const parts = [];
	let current = error;
	for (let depth = 0; depth < CAUSE_DEPTH_LIMIT && current != null; depth++) {
		if (!(current instanceof Error)) {
			parts.push(typeof current === "string" ? current : safeStringify(current));
			break;
		}
		const label = depth === 0 ? "" : "caused by: ";
		const status = describeStatus(current);
		parts.push(`${label}${current.stack ?? `${current.name}: ${current.message}`}${status}`);
		current = current.cause;
	}
	return parts.join("\n").slice(0, DESCRIPTION_LENGTH_LIMIT);
}
function describeStatus(error) {
	const { status, statusCode } = error;
	const value = status ?? statusCode;
	return typeof value === "number" ? ` (status ${value})` : "";
}
function safeStringify(value) {
	try {
		return JSON.stringify(value) ?? String(value);
	} catch {
		return String(value);
	}
}
function isErrorLike(value) {
	return value instanceof Error;
}
var originalConsoleError = console.error.bind(console);
console.error = (...args) => {
	originalConsoleError(...args.map((arg) => {
		if (!isErrorLike(arg)) return arg;
		record(arg);
		return describeError(arg);
	}));
};
if (typeof globalThis.addEventListener === "function") {
	globalThis.addEventListener("error", (event) => record(event.error ?? event));
	globalThis.addEventListener("unhandledrejection", (event) => record(event.reason));
}
function consumeLastCapturedError() {
	if (!lastCapturedError) return void 0;
	if (Date.now() - lastCapturedError.at > TTL_MS) {
		lastCapturedError = void 0;
		return;
	}
	const { error } = lastCapturedError;
	lastCapturedError = void 0;
	return error;
}
function renderErrorPage() {
	return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>This page didn't load</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>
      body { font: 15px/1.5 system-ui, -apple-system, sans-serif; background: #fafafa; color: #111; display: grid; place-items: center; min-height: 100vh; margin: 0; padding: 1.5rem; }
      .card { max-width: 28rem; width: 100%; text-align: center; padding: 2rem; }
      h1 { font-size: 1.25rem; margin: 0 0 0.5rem; }
      p { color: #4b5563; margin: 0 0 1.5rem; }
      .actions { display: flex; gap: 0.5rem; justify-content: center; flex-wrap: wrap; }
      a, button { padding: 0.5rem 1rem; border-radius: 0.375rem; font: inherit; cursor: pointer; text-decoration: none; border: 1px solid transparent; }
      .primary { background: #111; color: #fff; }
      .secondary { background: #fff; color: #111; border-color: #d1d5db; }
    </style>
  </head>
  <body>
    <div class="card">
      <h1>This page didn't load</h1>
      <p>Something went wrong on our end. You can try refreshing or head back home.</p>
      <div class="actions">
        <button class="primary" onclick="location.reload()">Try again</button>
        <a class="secondary" href="/">Go home</a>
      </div>
    </div>
  </body>
</html>`;
}
var supabaseUrl = process.env["SUPABASE_URL"] || process.env["VITE_SUPABASE_URL"] || "";
var supabaseServiceKey = process.env["SUPABASE_SERVICE_ROLE_KEY"] || "";
var supabaseServer = supabaseUrl && supabaseServiceKey ? createClient(supabaseUrl, supabaseServiceKey, { auth: {
	autoRefreshToken: false,
	persistSession: false
} }) : null;
var isServerSupabaseConfigured = Boolean(supabaseUrl && supabaseServiceKey);
function validateAndNormalizeKenyanPhone(input) {
	const raw = (input || "").trim();
	if (!raw) return {
		isValid: false,
		raw,
		normalized: "",
		formatted: "",
		error: "Phone number is required."
	};
	let cleaned = raw.replace(/[\s\-().]/g, "");
	if (cleaned.startsWith("+")) cleaned = cleaned.substring(1);
	if (cleaned.startsWith("0")) cleaned = "254" + cleaned.substring(1);
	if (cleaned.length === 9 && (cleaned.startsWith("7") || cleaned.startsWith("1"))) cleaned = "254" + cleaned;
	const match = cleaned.match(/^254([17]\d{8})$/);
	if (!match || cleaned.length !== 12) return {
		isValid: false,
		raw,
		normalized: "",
		formatted: "",
		error: "Please enter a valid Kenyan phone number (e.g. 0712 345 678 or 0110 123 456)."
	};
	const nationalNumber = match[1] ?? "";
	const prefix = nationalNumber.substring(0, 3);
	let operator = "Other";
	const prefixNum = parseInt(prefix, 10);
	if (prefixNum >= 700 && prefixNum <= 729 || prefixNum >= 740 && prefixNum <= 743 || prefixNum >= 745 && prefixNum <= 746 || prefixNum === 748 || prefixNum >= 757 && prefixNum <= 759 || prefixNum >= 768 && prefixNum <= 769 || prefixNum >= 790 && prefixNum <= 799 || prefixNum >= 110 && prefixNum <= 115) operator = "Safaricom";
	else if (prefixNum >= 730 && prefixNum <= 739 || prefixNum >= 750 && prefixNum <= 756 || prefixNum >= 780 && prefixNum <= 789 || prefixNum >= 100 && prefixNum <= 106) operator = "Airtel";
	else if (prefixNum >= 770 && prefixNum <= 779) operator = "Telkom";
	const formatted = `+254 ${nationalNumber.substring(0, 3)} ${nationalNumber.substring(3, 6)} ${nationalNumber.substring(6)}`;
	return {
		isValid: true,
		raw,
		normalized: cleaned,
		formatted,
		operator
	};
}
var RESERVATION_TTL_MS = 6e5;
var rateLimitMap = /* @__PURE__ */ new Map();
function checkRateLimit(key, limit = 20, windowMs = 6e4) {
	const now = Date.now();
	const valid = (rateLimitMap.get(key) || []).filter((t) => now - t < windowMs);
	if (valid.length >= limit) return false;
	valid.push(now);
	rateLimitMap.set(key, valid);
	return true;
}
function safeTokenEqual(a, b) {
	if (!a || !b) return false;
	try {
		const bufA = Buffer.from(a, "utf-8");
		const bufB = Buffer.from(b, "utf-8");
		if (bufA.length !== bufB.length) return false;
		return timingSafeEqual(bufA, bufB);
	} catch {
		return false;
	}
}
function computeRequestFingerprint(ticketTypeId, quantity, phone) {
	return createHash("sha256").update(`${ticketTypeId}:${quantity}:${phone}`).digest("hex");
}
var defaultTicketTypes = {
	"early-bird": {
		id: "00000000-0000-0000-0000-000000000011",
		eventId: "00000000-0000-0000-0000-000000000001",
		slug: "early-bird",
		name: "Early Bird",
		admitsCount: 1,
		priceKes: 1e3,
		totalInventory: null,
		soldCount: 0,
		purchaseLimit: null,
		isConfigured: true,
		active: true
	},
	"couple-pass": {
		id: "00000000-0000-0000-0000-000000000012",
		eventId: "00000000-0000-0000-0000-000000000001",
		slug: "couple-pass",
		name: "Couple Pass",
		admitsCount: 2,
		priceKes: 1800,
		totalInventory: null,
		soldCount: 0,
		purchaseLimit: null,
		isConfigured: true,
		active: true
	},
	"group-of-four": {
		id: "00000000-0000-0000-0000-000000000013",
		eventId: "00000000-0000-0000-0000-000000000001",
		slug: "group-of-four",
		name: "Group of Four",
		admitsCount: 4,
		priceKes: 3600,
		totalInventory: null,
		soldCount: 0,
		purchaseLimit: null,
		isConfigured: true,
		active: true
	}
};
var ordersStore = /* @__PURE__ */ new Map();
var reservationsStore = /* @__PURE__ */ new Map();
var OrderService = class {
	/**
	* Test / Diagnostic helper: reset in-memory stores
	*/
	static _resetStoresForTesting() {
		ordersStore.clear();
		reservationsStore.clear();
		rateLimitMap.clear();
	}
	/**
	* Diagnostic helper: update catalog price for snapshot verification test
	*/
	static _setCatalogPriceForTesting(slug, newPriceKes) {
		if (defaultTicketTypes[slug]) defaultTicketTypes[slug].priceKes = newPriceKes;
	}
	/**
	* Diagnostic helper: set total inventory for testing
	*/
	static _setTotalInventoryForTesting(slug, total) {
		if (defaultTicketTypes[slug]) defaultTicketTypes[slug].totalInventory = total;
	}
	/**
	* Release expired reservations and update order statuses
	*/
	static cleanExpiredReservations() {
		const now = Date.now();
		for (const [id, res] of reservationsStore.entries()) if (res.status === "active" && new Date(res.expiresAt).getTime() < now) {
			res.status = "expired";
			reservationsStore.set(id, res);
			const order = ordersStore.get(res.orderId);
			if (order && order.status === "pending") {
				order.status = "cancelled";
				order.updatedAt = (/* @__PURE__ */ new Date()).toISOString();
				ordersStore.set(order.id, order);
			}
		}
	}
	/**
	* Get active reserved ticket count for a ticket type
	*/
	static getActiveReservedCount(ticketTypeId) {
		this.cleanExpiredReservations();
		let count = 0;
		for (const res of reservationsStore.values()) if (res.ticketTypeId === ticketTypeId && res.status === "active") count += res.quantity;
		return count;
	}
	/**
	* Get total sold count for a ticket type
	*/
	static getSoldCount(ticketTypeId) {
		for (const t of Object.values(defaultTicketTypes)) if (t.id === ticketTypeId || t.slug === ticketTypeId) return t.soldCount;
		return 0;
	}
	/**
	* Internal order lookup without token (for backend webhooks/services)
	*/
	static _getOrderByIdInternal(orderId) {
		return ordersStore.get(orderId);
	}
	/**
	* Internal order status update (for backend services)
	*/
	static _updateOrderStatus(orderId, status) {
		const order = ordersStore.get(orderId);
		if (order) {
			order.status = status;
			order.updatedAt = (/* @__PURE__ */ new Date()).toISOString();
			ordersStore.set(orderId, order);
		}
	}
	/**
	* Internal atomic payment finalization:
	* 1. Mark order paid
	* 2. Mark reservation completed
	* 3. Convert reserved count into soldCount on the ticket type
	*/
	static _finalizeOrderPayment(orderId, receiptNumber) {
		const order = ordersStore.get(orderId);
		if (!order) return false;
		order.status = "paid";
		order.updatedAt = (/* @__PURE__ */ new Date()).toISOString();
		ordersStore.set(orderId, order);
		for (const [resId, res] of reservationsStore.entries()) if (res.orderId === orderId && res.status === "active") {
			res.status = "completed";
			reservationsStore.set(resId, res);
		}
		const ticket = this.getTicketType(order.ticketTypeId);
		if (ticket) ticket.soldCount += order.quantity;
		return true;
	}
	/**
	* Look up a ticket type by UUID or Slug
	*/
	static getTicketType(identifier) {
		if (defaultTicketTypes[identifier]) return defaultTicketTypes[identifier];
		for (const t of Object.values(defaultTicketTypes)) if (t.id === identifier || t.slug === identifier) return t;
		return null;
	}
	/**
	* Create an order with an atomic 10-minute inventory reservation
	*/
	static async createOrder(input) {
		const { ticketTypeId, quantity, buyerName, buyerPhone, buyerEmail, idempotencyKey, clientIp = "unknown" } = input;
		if (!checkRateLimit(`ip:${clientIp}`, 20, 6e4)) return {
			success: false,
			code: "RATE_LIMITED",
			message: "Too many requests. Please wait a moment before trying again."
		};
		const trimmedName = (buyerName || "").trim();
		if (!trimmedName || trimmedName.length < 2) return {
			success: false,
			code: "INVALID_INPUT",
			message: "Please provide a valid full name (at least 2 characters)."
		};
		const trimmedEmail = (buyerEmail || "").trim().toLowerCase();
		if (trimmedEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) return {
			success: false,
			code: "INVALID_INPUT",
			message: "Please provide a valid email address for ticket delivery."
		};
		const phoneValidation = validateAndNormalizeKenyanPhone(buyerPhone);
		if (!phoneValidation.isValid) return {
			success: false,
			code: "INVALID_PHONE",
			message: phoneValidation.error || "Please enter a valid Kenyan phone number."
		};
		const normalizedPhone = phoneValidation.normalized;
		if (!Number.isInteger(quantity) || quantity < 1) return {
			success: false,
			code: "INVALID_INPUT",
			message: "Quantity must be a positive integer (minimum 1)."
		};
		if (quantity > 50) return {
			success: false,
			code: "SAFETY_LIMIT_EXCEEDED",
			message: `Maximum allowed quantity per checkout request is 50.`
		};
		const ticket = this.getTicketType(ticketTypeId);
		if (!ticket || !ticket.active) return {
			success: false,
			code: "TICKET_NOT_FOUND",
			message: "Selected ticket type was not found or is currently inactive."
		};
		if (!ticket.isConfigured) return {
			success: false,
			code: "TICKET_NOT_CONFIGURED",
			message: "Tickets are not currently available."
		};
		if (ticket.purchaseLimit !== null && quantity > ticket.purchaseLimit) return {
			success: false,
			code: "PURCHASE_LIMIT_EXCEEDED",
			message: `Maximum purchase limit for ${ticket.name} is ${ticket.purchaseLimit} per order.`
		};
		this.cleanExpiredReservations();
		const currentFingerprint = computeRequestFingerprint(ticket.id, quantity, normalizedPhone);
		if (idempotencyKey) {
			for (const existing of ordersStore.values()) if (existing.idempotencyKey === idempotencyKey) {
				if (existing.requestFingerprint && existing.requestFingerprint !== currentFingerprint) return {
					success: false,
					code: "IDEMPOTENCY_CONFLICT",
					message: "Idempotency key was previously used for a different request payload. Please use a new request key."
				};
				if (existing.status === "pending" && new Date(existing.expiresAt).getTime() > Date.now()) {
					const ttlSec = Math.max(0, Math.round((new Date(existing.expiresAt).getTime() - Date.now()) / 1e3));
					return {
						success: true,
						orderId: existing.id,
						orderNumber: existing.orderNumber,
						checkoutToken: existing.checkoutToken,
						eventId: existing.eventId,
						ticketTypeId: existing.ticketTypeId,
						ticketName: existing.ticketName,
						admitsCount: existing.admitsCount,
						quantity: existing.quantity,
						unitPriceKes: existing.unitPriceKes,
						discountKes: existing.discountKes,
						subtotalKes: existing.subtotalKes,
						totalKes: existing.totalKes,
						currency: existing.currency,
						buyerName: existing.buyerName,
						buyerPhone: existing.buyerPhone,
						status: existing.status,
						expiresAt: existing.expiresAt,
						ttlSeconds: ttlSec
					};
				}
			}
		}
		if (ticket.totalInventory !== null) {
			const activeReserved = this.getActiveReservedCount(ticket.id);
			const available = ticket.totalInventory - ticket.soldCount - activeReserved;
			if (available < quantity) return {
				success: false,
				code: "INSUFFICIENT_INVENTORY",
				message: available <= 0 ? "These tickets are currently sold out." : `Only ${available} ticket${available === 1 ? "" : "s"} remaining. Please adjust your quantity.`
			};
		}
		const unitPriceKes = ticket.priceKes;
		const discountKes = 0;
		const subtotalKes = unitPriceKes * quantity;
		const totalKes = subtotalKes - discountKes;
		const orderId = randomUUID();
		const reservationId = randomUUID();
		const orderNumber = `HRT-2026-${Math.floor(1e5 + Math.random() * 9e5)}`;
		const checkoutToken = `tok_${randomBytes(32).toString("hex")}`;
		const expiresAt = new Date(Date.now() + RESERVATION_TTL_MS).toISOString();
		const newReservation = {
			id: reservationId,
			ticketTypeId: ticket.id,
			orderId,
			quantity,
			expiresAt,
			status: "active",
			createdAt: (/* @__PURE__ */ new Date()).toISOString()
		};
		const newOrder = {
			id: orderId,
			orderNumber,
			checkoutToken,
			eventId: ticket.eventId,
			ticketTypeId: ticket.id,
			ticketName: ticket.name,
			admitsCount: ticket.admitsCount,
			quantity,
			unitPriceKes,
			discountKes,
			subtotalKes,
			totalKes,
			currency: "KES",
			buyerName: trimmedName,
			buyerPhone: normalizedPhone,
			buyerEmail: trimmedEmail || void 0,
			status: "pending",
			expiresAt,
			idempotencyKey,
			requestFingerprint: currentFingerprint,
			createdAt: (/* @__PURE__ */ new Date()).toISOString(),
			updatedAt: (/* @__PURE__ */ new Date()).toISOString()
		};
		reservationsStore.set(reservationId, newReservation);
		ordersStore.set(orderId, newOrder);
		if (supabaseServer) try {
			await supabaseServer.from("orders").insert({
				id: orderId,
				event_id: ticket.eventId,
				order_number: orderNumber,
				buyer_name: trimmedName,
				buyer_phone: normalizedPhone,
				subtotal_kes: subtotalKes,
				discount_kes: discountKes,
				total_kes: totalKes,
				currency: "KES",
				status: "pending"
			});
			await supabaseServer.from("order_items").insert({
				order_id: orderId,
				ticket_type_id: ticket.id,
				quantity,
				unit_price_kes: unitPriceKes,
				discount_kes: discountKes,
				subtotal_kes: subtotalKes
			});
			await supabaseServer.from("inventory_reservations").insert({
				id: reservationId,
				ticket_type_id: ticket.id,
				order_id: orderId,
				quantity,
				expires_at: expiresAt,
				status: "active"
			});
		} catch (err) {
			console.warn("Supabase order sync warning (operating in resilient store):", err);
		}
		return {
			success: true,
			orderId,
			orderNumber,
			checkoutToken,
			eventId: ticket.eventId,
			ticketTypeId: ticket.id,
			ticketName: ticket.name,
			admitsCount: ticket.admitsCount,
			quantity,
			unitPriceKes,
			discountKes,
			subtotalKes,
			totalKes,
			currency: "KES",
			buyerName: trimmedName,
			buyerPhone: normalizedPhone,
			buyerEmail: trimmedEmail || void 0,
			status: "pending",
			expiresAt,
			ttlSeconds: Math.round(RESERVATION_TTL_MS / 1e3)
		};
	}
	/**
	* Securely retrieve order status using orderId + checkoutToken
	*/
	static getOrder(orderId, checkoutToken) {
		this.cleanExpiredReservations();
		const order = ordersStore.get(orderId);
		if (!order) return null;
		if (!safeTokenEqual(order.checkoutToken, checkoutToken)) return null;
		const now = Date.now();
		const isExpired = order.status === "cancelled" || order.status === "pending" && new Date(order.expiresAt).getTime() < now;
		if (isExpired && order.status === "pending") {
			order.status = "cancelled";
			order.updatedAt = (/* @__PURE__ */ new Date()).toISOString();
			ordersStore.set(order.id, order);
			for (const [resId, res] of reservationsStore.entries()) if (res.orderId === orderId && res.status === "active") {
				res.status = "expired";
				reservationsStore.set(resId, res);
			}
		}
		const ttlSeconds = Math.max(0, Math.round((new Date(order.expiresAt).getTime() - now) / 1e3));
		return {
			success: true,
			orderId: order.id,
			orderNumber: order.orderNumber,
			checkoutToken: order.checkoutToken,
			eventId: order.eventId,
			ticketTypeId: order.ticketTypeId,
			ticketName: order.ticketName,
			admitsCount: order.admitsCount,
			quantity: order.quantity,
			unitPriceKes: order.unitPriceKes,
			discountKes: order.discountKes,
			subtotalKes: order.subtotalKes,
			totalKes: order.totalKes,
			currency: order.currency,
			buyerName: order.buyerName,
			buyerPhone: order.buyerPhone,
			buyerEmail: order.buyerEmail,
			status: order.status,
			mpesaCode: order.mpesaCode,
			mpesaMessage: order.mpesaMessage,
			rejectionReason: order.rejectionReason,
			approvedBy: order.approvedBy,
			approvedAt: order.approvedAt,
			expiresAt: order.expiresAt,
			ttlSeconds,
			isExpired
		};
	}
	/**
	* Submit M-Pesa transaction code or message from buyer for admin manual verification
	*/
	static submitMpesaCode(params) {
		const { orderId, checkoutToken, mpesaCode, mpesaMessage, buyerEmail } = params;
		const order = ordersStore.get(orderId);
		if (!order) return {
			success: false,
			code: "NOT_FOUND",
			message: "Order not found."
		};
		if (checkoutToken && !safeTokenEqual(order.checkoutToken, checkoutToken)) return {
			success: false,
			code: "UNAUTHORIZED",
			message: "Invalid checkout token."
		};
		const sanitizedCode = mpesaCode.trim().toUpperCase();
		if (sanitizedCode.length < 5) return {
			success: false,
			code: "INVALID_CODE",
			message: "Please provide a valid M-Pesa transaction reference."
		};
		order.mpesaCode = sanitizedCode;
		if (mpesaMessage) order.mpesaMessage = mpesaMessage.trim();
		if (buyerEmail) order.buyerEmail = buyerEmail.trim().toLowerCase();
		order.status = "pending_approval";
		order.updatedAt = (/* @__PURE__ */ new Date()).toISOString();
		order.expiresAt = new Date(Date.now() + 864e5).toISOString();
		for (const [resId, res] of reservationsStore.entries()) if (res.orderId === orderId && res.status === "active") {
			res.expiresAt = order.expiresAt;
			reservationsStore.set(resId, res);
		}
		ordersStore.set(orderId, order);
		return {
			success: true,
			order,
			message: "M-Pesa code submitted for admin review."
		};
	}
	/**
	* Admin approves an order
	*/
	static approveOrder(params) {
		const { orderId, adminEmail } = params;
		const order = ordersStore.get(orderId);
		if (!order) return {
			success: false,
			code: "NOT_FOUND",
			message: "Order not found."
		};
		order.status = "approved";
		order.approvedBy = adminEmail;
		order.approvedAt = (/* @__PURE__ */ new Date()).toISOString();
		order.updatedAt = (/* @__PURE__ */ new Date()).toISOString();
		for (const [resId, res] of reservationsStore.entries()) if (res.orderId === orderId) {
			res.status = "completed";
			reservationsStore.set(resId, res);
		}
		ordersStore.set(orderId, order);
		return {
			success: true,
			order,
			message: "Order successfully approved and verified."
		};
	}
	/**
	* Admin rejects an order with a reason
	*/
	static rejectOrder(params) {
		const { orderId, reason, adminEmail } = params;
		const order = ordersStore.get(orderId);
		if (!order) return {
			success: false,
			code: "NOT_FOUND",
			message: "Order not found."
		};
		order.status = "rejected";
		order.rejectionReason = reason;
		order.approvedBy = adminEmail;
		order.updatedAt = (/* @__PURE__ */ new Date()).toISOString();
		ordersStore.set(orderId, order);
		return {
			success: true,
			order,
			message: "Order rejected."
		};
	}
	/**
	* Get all orders with status pending_approval
	*/
	static getPendingOrders() {
		const pending = [];
		for (const order of ordersStore.values()) if (order.status === "pending_approval") pending.push(order);
		return pending.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
	}
	/**
	* Cancel an order and release reservation
	*/
	static cancelOrder(orderId, checkoutToken) {
		this.cleanExpiredReservations();
		const order = ordersStore.get(orderId);
		if (!order) return {
			success: false,
			code: "NOT_FOUND",
			message: "Order not found."
		};
		if (!safeTokenEqual(order.checkoutToken, checkoutToken)) return {
			success: false,
			code: "UNAUTHORIZED",
			message: "Invalid authorization token."
		};
		if (new Date(order.expiresAt).getTime() < Date.now()) {
			order.status = "cancelled";
			order.updatedAt = (/* @__PURE__ */ new Date()).toISOString();
			ordersStore.set(orderId, order);
			for (const [resId, res] of reservationsStore.entries()) if (res.orderId === orderId) {
				res.status = "expired";
				reservationsStore.set(resId, res);
			}
			return {
				success: false,
				code: "ORDER_EXPIRED",
				message: "Reservation has already expired."
			};
		}
		if (order.status === "cancelled") return {
			success: false,
			code: "ALREADY_CANCELLED",
			message: "Order has already been cancelled."
		};
		order.status = "cancelled";
		order.updatedAt = (/* @__PURE__ */ new Date()).toISOString();
		ordersStore.set(orderId, order);
		for (const [resId, res] of reservationsStore.entries()) if (res.orderId === orderId && res.status === "active") {
			res.status = "released";
			reservationsStore.set(resId, res);
		}
		return {
			success: true,
			message: "Reservation released successfully."
		};
	}
};
var paymentsStore = /* @__PURE__ */ new Map();
var receiptToPaymentMap = /* @__PURE__ */ new Map();
var activeCooldowns = /* @__PURE__ */ new Map();
var STK_PUSH_COOLDOWN_MS = 3e4;
var cachedAccessToken = null;
var MpesaService = class {
	/**
	* Diagnostic helper: reset in-memory payment stores for testing
	*/
	static _resetStoresForTesting() {
		paymentsStore.clear();
		receiptToPaymentMap.clear();
		activeCooldowns.clear();
		cachedAccessToken = null;
	}
	/**
	* Diagnostic helper: inject payment record for testing callbacks
	*/
	static _injectPaymentForTesting(payment) {
		paymentsStore.set(payment.checkoutRequestId, payment);
		if (payment.mpesaReceiptNumber) receiptToPaymentMap.set(payment.mpesaReceiptNumber, payment.id);
	}
	/**
	* Get Daraja configuration from environment
	*/
	static getConfig() {
		const isProd = (process.env["MPESA_ENVIRONMENT"] || "sandbox").toLowerCase() === "production";
		return {
			environment: isProd ? "production" : "sandbox",
			consumerKey: process.env["MPESA_CONSUMER_KEY"] || "",
			consumerSecret: process.env["MPESA_CONSUMER_SECRET"] || "",
			shortcode: process.env["MPESA_SHORTCODE"] || (isProd ? "" : "174379"),
			passkey: process.env["MPESA_PASSKEY"] || (isProd ? "" : "bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919"),
			callbackUrl: process.env["MPESA_CALLBACK_URL"] || "https://hauntings-rift.example.com/api/payments/mpesa/callback",
			oauthUrl: isProd ? "https://api.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials" : "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
			stkPushUrl: isProd ? "https://api.safaricom.co.ke/mpesa/stkpush/v1/processrequest" : "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest"
		};
	}
	/**
	* Retrieve Daraja OAuth Bearer token
	*/
	static async getAccessToken() {
		const config = this.getConfig();
		if (!config.consumerKey || !config.consumerSecret) return {
			success: false,
			error: "MPESA_CONSUMER_KEY or MPESA_CONSUMER_SECRET environment variable is not configured."
		};
		const now = Date.now();
		if (cachedAccessToken && cachedAccessToken.expiresAt > now + 6e4) return {
			success: true,
			token: cachedAccessToken.token
		};
		try {
			const authHeader = Buffer.from(`${config.consumerKey}:${config.consumerSecret}`).toString("base64");
			const response = await fetch(config.oauthUrl, {
				method: "GET",
				headers: { Authorization: `Basic ${authHeader}` }
			});
			if (!response.ok) {
				const errorText = await response.text();
				console.error(`[MpesaService] OAuth failed HTTP ${response.status}: ${errorText}`);
				return {
					success: false,
					error: `Daraja OAuth failed (HTTP ${response.status})`
				};
			}
			const data = await response.json();
			const expiresInSec = parseInt(data.expires_in, 10) || 3599;
			cachedAccessToken = {
				token: data.access_token,
				expiresAt: now + expiresInSec * 1e3
			};
			return {
				success: true,
				token: data.access_token
			};
		} catch (err) {
			const msg = err instanceof Error ? err.message : String(err);
			console.error("[MpesaService] OAuth network error:", msg);
			return {
				success: false,
				error: msg
			};
		}
	}
	/**
	* Format current timestamp for Daraja (YYYYMMDDHHmmss)
	*/
	static formatTimestamp(date = /* @__PURE__ */ new Date()) {
		return `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, "0")}${String(date.getDate()).padStart(2, "0")}${String(date.getHours()).padStart(2, "0")}${String(date.getMinutes()).padStart(2, "0")}${String(date.getSeconds()).padStart(2, "0")}`;
	}
	/**
	* Generate STK push password (Base64 of Shortcode + Passkey + Timestamp)
	*/
	static generatePassword(shortcode, passkey, timestamp) {
		return Buffer.from(`${shortcode}${passkey}${timestamp}`).toString("base64");
	}
	/**
	* Initiate M-Pesa STK Push
	*/
	static async initiateStkPush(input) {
		const { orderId, checkoutToken } = input;
		const order = OrderService.getOrder(orderId, checkoutToken);
		if (!order) return {
			success: false,
			code: "UNAUTHORIZED",
			message: "Order not found or authorization token invalid."
		};
		if (order.status === "paid") return {
			success: false,
			code: "ALREADY_PAID",
			message: "This order has already been paid."
		};
		if (order.status === "cancelled" || order.isExpired) return {
			success: false,
			code: "ORDER_EXPIRED",
			message: "Your reservation has expired. Please choose your tickets again."
		};
		if (order.totalKes <= 0) return {
			success: false,
			code: "INVALID_AMOUNT",
			message: "Invalid order amount."
		};
		const phoneValidation = validateAndNormalizeKenyanPhone(order.buyerPhone);
		if (!phoneValidation.isValid) return {
			success: false,
			code: "INVALID_PHONE",
			message: "Valid Kenyan mobile number required for M-Pesa STK Push."
		};
		const normalizedPhone = phoneValidation.normalized;
		const lastStkTime = activeCooldowns.get(orderId) || 0;
		const now = Date.now();
		if (now - lastStkTime < STK_PUSH_COOLDOWN_MS) return {
			success: false,
			code: "COOLDOWN_ACTIVE",
			message: `An M-Pesa prompt was recently sent. Please check your phone or wait ${Math.ceil((STK_PUSH_COOLDOWN_MS - (now - lastStkTime)) / 1e3)}s before requesting again.`
		};
		const config = this.getConfig();
		const timestamp = this.formatTimestamp();
		const password = this.generatePassword(config.shortcode, config.passkey, timestamp);
		let checkoutRequestId;
		let merchantRequestId;
		if (config.consumerKey && config.consumerSecret) {
			const tokenResult = await this.getAccessToken();
			if (!tokenResult.success || !tokenResult.token) return {
				success: false,
				code: "DARAJA_ERROR",
				message: `Unable to authenticate with Safaricom Daraja: ${tokenResult.error}`
			};
			try {
				const payload = {
					BusinessShortCode: config.shortcode,
					Password: password,
					Timestamp: timestamp,
					TransactionType: "CustomerPayBillOnline",
					Amount: order.totalKes,
					PartyA: normalizedPhone,
					PartyB: config.shortcode,
					PhoneNumber: normalizedPhone,
					CallBackURL: config.callbackUrl,
					AccountReference: order.orderNumber,
					TransactionDesc: `Hauntings Rift Ticket ${order.orderNumber}`
				};
				const data = await (await fetch(config.stkPushUrl, {
					method: "POST",
					headers: {
						Authorization: `Bearer ${tokenResult.token}`,
						"Content-Type": "application/json"
					},
					body: JSON.stringify(payload)
				})).json();
				if (data.ResponseCode !== "0" || !data.CheckoutRequestID) {
					console.error("[MpesaService] Daraja STK Push rejected:", data);
					return {
						success: false,
						code: "DARAJA_ERROR",
						message: data.CustomerMessage || data.ResponseDescription || data.errorMessage || "Safaricom rejected the payment prompt request."
					};
				}
				checkoutRequestId = data.CheckoutRequestID;
				merchantRequestId = data.MerchantRequestID || `MR-${randomUUID().slice(0, 8)}`;
			} catch (err) {
				const msg = err instanceof Error ? err.message : String(err);
				console.error("[MpesaService] Daraja STK network error:", msg);
				return {
					success: false,
					code: "DARAJA_ERROR",
					message: `Network error connecting to Safaricom: ${msg}`
				};
			}
		} else {
			checkoutRequestId = `ws_CO_${timestamp}_${Math.floor(1e8 + Math.random() * 9e8)}`;
			merchantRequestId = `MR-${randomUUID().slice(0, 8)}`;
			console.log(`[MpesaService] Sandbox mock prompt initiated for ${normalizedPhone} (KES ${order.totalKes}). CheckoutRequestID: ${checkoutRequestId}`);
		}
		activeCooldowns.set(orderId, now);
		const paymentId = randomUUID();
		const paymentRecord = {
			id: paymentId,
			orderId: order.orderId,
			provider: "mpesa",
			merchantRequestId,
			checkoutRequestId,
			phoneNumber: normalizedPhone,
			amountKes: order.totalKes,
			status: "processing",
			resultCode: null,
			resultDescription: null,
			mpesaReceiptNumber: null,
			rawCallbackPayload: null,
			paidAt: null,
			createdAt: (/* @__PURE__ */ new Date()).toISOString(),
			updatedAt: (/* @__PURE__ */ new Date()).toISOString()
		};
		paymentsStore.set(checkoutRequestId, paymentRecord);
		if (supabaseServer) try {
			await supabaseServer.from("payments").insert({
				id: paymentId,
				order_id: order.orderId,
				provider: "mpesa",
				merchant_request_id: merchantRequestId,
				checkout_request_id: checkoutRequestId,
				phone_number: normalizedPhone,
				amount_kes: order.totalKes,
				status: "initiated"
			});
		} catch (e) {
			console.warn("[MpesaService] Supabase payment insert warning:", e);
		}
		return {
			success: true,
			checkoutRequestId,
			merchantRequestId,
			orderId: order.orderId,
			orderNumber: order.orderNumber,
			amountKes: order.totalKes,
			phone: normalizedPhone,
			message: `M-Pesa payment prompt of KES ${order.totalKes.toLocaleString()} sent to ${normalizedPhone}. Please enter your M-Pesa PIN on your phone to complete.`
		};
	}
	/**
	* Process Safaricom Daraja STK Push Callback Webhook
	*/
	static async processCallback(payload) {
		const stkCallback = payload?.Body?.stkCallback;
		if (!stkCallback || !stkCallback.CheckoutRequestID) {
			console.warn("[MpesaService] Received invalid/empty callback payload");
			return {
				statusCode: 400,
				response: {
					ResultCode: 1,
					ResultDesc: "Invalid callback payload"
				}
			};
		}
		const { CheckoutRequestID: checkoutRequestId, MerchantRequestID: merchantRequestId, ResultCode: resultCode, ResultDesc: resultDesc, CallbackMetadata: callbackMetadata } = stkCallback;
		console.log(`[MpesaService] Processing callback for ${checkoutRequestId}: ResultCode=${resultCode} (${resultDesc})`);
		const payment = paymentsStore.get(checkoutRequestId);
		if (!payment) {
			console.error(`[MpesaService] Payment not found for CheckoutRequestID: ${checkoutRequestId}`);
			return {
				statusCode: 200,
				response: {
					ResultCode: 0,
					ResultDesc: "Accepted"
				}
			};
		}
		if (payment.status === "successful") {
			console.log(`[MpesaService] Payment ${checkoutRequestId} already successfully processed.`);
			return {
				statusCode: 200,
				response: {
					ResultCode: 0,
					ResultDesc: "Accepted"
				}
			};
		}
		const order = OrderService._getOrderByIdInternal(payment.orderId);
		if (!order) {
			console.error(`[MpesaService] Order ${payment.orderId} not found for payment.`);
			return {
				statusCode: 200,
				response: {
					ResultCode: 0,
					ResultDesc: "Accepted"
				}
			};
		}
		if (resultCode === 0) {
			let paidAmount = 0;
			let mpesaReceipt = "";
			let phoneNumber = payment.phoneNumber;
			if (callbackMetadata && Array.isArray(callbackMetadata.Item)) for (const item of callbackMetadata.Item) {
				if (item.Name === "Amount" && typeof item.Value === "number") paidAmount = item.Value;
				if (item.Name === "MpesaReceiptNumber" && item.Value) mpesaReceipt = String(item.Value).trim().toUpperCase();
				if (item.Name === "TransactionDate" && item.Value) String(item.Value);
				if (item.Name === "PhoneNumber" && item.Value) phoneNumber = String(item.Value);
			}
			if (paidAmount !== order.totalKes) {
				console.error(`[MpesaService] FRAUD / MISMATCH ALERT: Order ${order.orderNumber} expected KES ${order.totalKes} but received KES ${paidAmount}. Flagging for review.`);
				payment.status = "payment_review";
				payment.resultCode = resultCode;
				payment.resultDescription = `Amount mismatch: Expected KES ${order.totalKes}, received KES ${paidAmount}`;
				payment.mpesaReceiptNumber = mpesaReceipt || null;
				payment.rawCallbackPayload = payload;
				payment.updatedAt = (/* @__PURE__ */ new Date()).toISOString();
				paymentsStore.set(checkoutRequestId, payment);
				return {
					statusCode: 200,
					response: {
						ResultCode: 0,
						ResultDesc: "Accepted"
					}
				};
			}
			if (mpesaReceipt && receiptToPaymentMap.has(mpesaReceipt)) {
				const existingPaymentId = receiptToPaymentMap.get(mpesaReceipt);
				if (existingPaymentId !== payment.id) {
					console.error(`[MpesaService] DUPLICATE RECEIPT ALERT: Receipt ${mpesaReceipt} was already used on payment ${existingPaymentId}.`);
					payment.status = "payment_review";
					payment.resultCode = resultCode;
					payment.resultDescription = `Duplicate receipt detected: ${mpesaReceipt}`;
					payment.mpesaReceiptNumber = mpesaReceipt;
					payment.rawCallbackPayload = payload;
					payment.updatedAt = (/* @__PURE__ */ new Date()).toISOString();
					paymentsStore.set(checkoutRequestId, payment);
					return {
						statusCode: 200,
						response: {
							ResultCode: 0,
							ResultDesc: "Accepted"
						}
					};
				}
			}
			payment.status = "successful";
			payment.resultCode = 0;
			payment.resultDescription = resultDesc || "The service request is processed successfully.";
			payment.mpesaReceiptNumber = mpesaReceipt || `MPS${randomUUID().slice(0, 8).toUpperCase()}`;
			payment.phoneNumber = phoneNumber;
			payment.paidAt = (/* @__PURE__ */ new Date()).toISOString();
			payment.rawCallbackPayload = payload;
			payment.updatedAt = (/* @__PURE__ */ new Date()).toISOString();
			paymentsStore.set(checkoutRequestId, payment);
			if (payment.mpesaReceiptNumber) receiptToPaymentMap.set(payment.mpesaReceiptNumber, payment.id);
			OrderService._finalizeOrderPayment(order.id, payment.mpesaReceiptNumber);
			console.log(`[MpesaService] ORDER PAID: ${order.orderNumber} | Receipt: ${payment.mpesaReceiptNumber} | KES ${payment.amountKes}`);
			if (supabaseServer) try {
				await supabaseServer.from("payments").update({
					status: "success",
					result_code: 0,
					result_description: payment.resultDescription,
					mpesa_receipt_number: payment.mpesaReceiptNumber,
					paid_at: payment.paidAt,
					raw_callback_payload: payload,
					updated_at: (/* @__PURE__ */ new Date()).toISOString()
				}).eq("checkout_request_id", checkoutRequestId);
				await supabaseServer.from("orders").update({
					status: "paid",
					updated_at: (/* @__PURE__ */ new Date()).toISOString()
				}).eq("id", order.id);
			} catch (err) {
				console.warn("[MpesaService] Supabase callback sync warning:", err);
			}
			return {
				statusCode: 200,
				response: {
					ResultCode: 0,
					ResultDesc: "Accepted"
				}
			};
		}
		const isTimeout = resultCode === 1037;
		payment.status = isTimeout ? "timed_out" : "failed";
		payment.resultCode = resultCode ?? null;
		payment.resultDescription = resultDesc || "Payment failed.";
		payment.rawCallbackPayload = payload;
		payment.updatedAt = (/* @__PURE__ */ new Date()).toISOString();
		paymentsStore.set(checkoutRequestId, payment);
		if (new Date(order.expiresAt).getTime() > Date.now()) OrderService._updateOrderStatus(order.id, "pending");
		else OrderService._updateOrderStatus(order.id, "cancelled");
		console.log(`[MpesaService] Payment ${checkoutRequestId} ${payment.status} (Code ${resultCode}: ${resultDesc})`);
		if (supabaseServer) try {
			await supabaseServer.from("payments").update({
				status: isTimeout ? "timed_out" : "failed",
				result_code: resultCode ?? null,
				result_description: resultDesc ?? null,
				raw_callback_payload: payload,
				updated_at: (/* @__PURE__ */ new Date()).toISOString()
			}).eq("checkout_request_id", checkoutRequestId);
		} catch (err) {
			console.warn("[MpesaService] Supabase callback failure sync warning:", err);
		}
		return {
			statusCode: 200,
			response: {
				ResultCode: 0,
				ResultDesc: "Accepted"
			}
		};
	}
	/**
	* Retrieve secure payment status for the checkout screen
	*/
	static getPaymentStatus(orderId, checkoutToken) {
		const order = OrderService.getOrder(orderId, checkoutToken);
		if (!order) return null;
		let latestPayment = null;
		for (const p of paymentsStore.values()) if (p.orderId === orderId) {
			if (!latestPayment || new Date(p.createdAt).getTime() > new Date(latestPayment.createdAt).getTime()) latestPayment = p;
		}
		const isOrderPaid = order.status === "paid";
		let effectivePaymentStatus = "awaiting_payment";
		if (isOrderPaid) effectivePaymentStatus = "successful";
		else if (latestPayment) effectivePaymentStatus = latestPayment.status;
		const canRetry = !isOrderPaid && !order.isExpired && order.status !== "cancelled" && (effectivePaymentStatus === "failed" || effectivePaymentStatus === "timed_out" || effectivePaymentStatus === "awaiting_payment");
		return {
			success: true,
			orderId: order.orderId,
			orderNumber: order.orderNumber,
			orderStatus: order.status,
			paymentStatus: effectivePaymentStatus,
			totalKes: order.totalKes,
			buyerPhone: order.buyerPhone,
			mpesaReceipt: latestPayment?.mpesaReceiptNumber || null,
			paidAt: latestPayment?.paidAt || null,
			errorMessage: latestPayment?.status === "failed" || latestPayment?.status === "timed_out" ? latestPayment.resultDescription : null,
			canRetry
		};
	}
};
var TICKET_HMAC_SECRET = process.env.TICKET_HMAC_SECRET || "rift-ticket-hmac-secret-2026-verve-nakuru-secure";
var RECOVERY_LINK_SECRET = process.env.RECOVERY_LINK_SECRET || "rift-recovery-secret-2026-verve-nakuru-secure";
/**
* Generates a cryptographically random ticket code (e.g., HR-8492-7104)
*/
function generateTicketCode() {
	const chars = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ";
	const bytes = crypto.randomBytes(8);
	let code = "HR-";
	for (let i = 0; i < 4; i++) code += chars[bytes[i] % 32];
	code += "-";
	for (let i = 4; i < 8; i++) code += chars[bytes[i] % 32];
	return code;
}
/**
* Generates HMAC signature for ticket validation
*/
function generateTicketHmac(ticketCode, orderId, attendeeName) {
	const payload = `${ticketCode}:${orderId}:${attendeeName.trim().toLowerCase()}`;
	return crypto.createHmac("sha256", TICKET_HMAC_SECRET).update(payload).digest("hex");
}
/**
* Signs a recovery payload with expiration timestamp
*/
function createRecoveryToken(email, expiresInMs = 36e5) {
	const expiresAt = Date.now() + expiresInMs;
	const payload = Buffer.from(JSON.stringify({
		email: email.trim().toLowerCase(),
		expiresAt
	})).toString("base64url");
	return `${payload}.${crypto.createHmac("sha256", RECOVERY_LINK_SECRET).update(payload).digest("base64url")}`;
}
/**
* Verifies and decodes a recovery token
*/
function verifyRecoveryToken(token) {
	try {
		const parts = token.split(".");
		if (parts.length !== 2) return { valid: false };
		const [payloadBase64, signature] = parts;
		if (signature !== crypto.createHmac("sha256", RECOVERY_LINK_SECRET).update(payloadBase64).digest("base64url")) return { valid: false };
		const payloadJson = Buffer.from(payloadBase64, "base64url").toString("utf-8");
		const data = JSON.parse(payloadJson);
		if (!data.email || typeof data.expiresAt !== "number") return { valid: false };
		if (Date.now() > data.expiresAt) return {
			valid: false,
			expired: true,
			email: data.email
		};
		return {
			valid: true,
			email: data.email
		};
	} catch {
		return { valid: false };
	}
}
var resendClient = null;
function getResendClient() {
	const apiKey = process.env.RESEND_API_KEY;
	if (!apiKey) return null;
	if (!resendClient) resendClient = new Resend(apiKey);
	return resendClient;
}
function generateBookingConfirmationEmailHtml(params) {
	const { customer_name, ticket_tier, quantity, total_amount, order_id, event_date, ticket_url } = params;
	return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Pass to Hauntings of the Rift</title>
</head>
<body style="margin: 0; padding: 0; background-color: #0d0d0d; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #f3f4f6;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #0d0d0d; padding: 40px 10px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" style="max-width: 560px; background-color: #171717; border: 1px solid #262626; border-radius: 12px; padding: 32px; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
          
          <!-- Header -->
          <tr>
            <td align="center" style="padding-bottom: 24px;">
              <h1 style="margin: 0; font-size: 24px; font-weight: 800; tracking: 0.05em; color: #f97316; text-transform: uppercase;">Hauntings of the Rift</h1>
              <p style="margin: 4px 0 0 0; font-size: 13px; color: #a1a1aa; text-transform: uppercase; letter-spacing: 0.1em;">Official Admission Pass</p>
            </td>
          </tr>

          <!-- Welcome Text -->
          <tr>
            <td style="padding-bottom: 24px; border-bottom: 1px solid #262626;">
              <p style="margin: 0 0 12px 0; font-size: 16px; color: #f4f4f5;">Hi <strong>${customer_name}</strong>,</p>
              <p style="margin: 0; font-size: 14px; line-height: 1.6; color: #a1a1aa;">Your booking has been verified. Below is your official ticket summary. Present your digital QR code at the gate check-in point for access.</p>
            </td>
          </tr>

          <!-- Pass Details Box -->
          <tr>
            <td style="padding: 24px 0;">
              <table role="presentation" width="100%" style="background-color: #0d0d0d; border-radius: 8px; border: 1px dashed #f97316; padding: 20px;">
                <tr>
                  <td style="padding-bottom: 12px;">
                    <span style="font-size: 11px; text-transform: uppercase; color: #71717a; font-weight: 600;">Pass Type</span><br>
                    <strong style="font-size: 16px; color: #ffffff;">${ticket_tier} (x${quantity})</strong>
                  </td>
                  <td align="right" style="padding-bottom: 12px;">
                    <span style="font-size: 11px; text-transform: uppercase; color: #71717a; font-weight: 600;">Total Paid</span><br>
                    <strong style="font-size: 16px; color: #22c55e;">KES ${total_amount}</strong>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span style="font-size: 11px; text-transform: uppercase; color: #71717a; font-weight: 600;">Order Ref</span><br>
                    <span style="font-size: 13px; font-family: monospace; color: #d4d4d8;">${order_id}</span>
                  </td>
                  <td align="right">
                    <span style="font-size: 11px; text-transform: uppercase; color: #71717a; font-weight: 600;">Event Date</span><br>
                    <span style="font-size: 13px; color: #d4d4d8;">${event_date}</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- CTA Button -->
          <tr>
            <td align="center" style="padding: 12px 0 28px 0;">
              <a href="${ticket_url}" style="background-color: #f97316; color: #000000; font-weight: 700; text-decoration: none; padding: 14px 28px; border-radius: 6px; display: inline-block; font-size: 14px; text-transform: uppercase; letter-spacing: 0.05em;">View Digital Pass & QR Code</a>
            </td>
          </tr>

          <!-- Venue & Gate Instructions -->
          <tr>
            <td style="padding-top: 20px; border-top: 1px solid #262626; font-size: 12px; color: #71717a; line-height: 1.5;">
              <strong style="color: #a1a1aa;">Venue Entry Guidelines:</strong>
              <ul style="margin: 8px 0 0 0; padding-left: 18px;">
                <li>Gates open strictly at 18:00 EAT. Early arrival is advised.</li>
                <li>Each QR code can only be scanned once by gate security.</li>
                <li>Keep your mobile phone brightness set to maximum during scanning.</li>
              </ul>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="padding-top: 32px; font-size: 11px; color: #52525b;">
              &copy; 2026 Hauntings of the Rift. Managed by Verve & Co. All rights reserved.
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
function generateEventReminder24hEmailHtml(params) {
	const { customer_name, venue_name, gate_opening_time, ticket_tier, ticket_url } = params;
	return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>24 Hours Until Hauntings of the Rift</title>
</head>
<body style="margin: 0; padding: 0; background-color: #0d0d0d; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #f3f4f6;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #0d0d0d; padding: 40px 10px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" style="max-width: 560px; background-color: #171717; border: 1px solid #262626; border-radius: 12px; padding: 32px;">
          
          <!-- Alert Banner -->
          <tr>
            <td align="center" style="padding-bottom: 20px;">
              <span style="background-color: rgba(249, 115, 22, 0.15); border: 1px solid #f97316; color: #f97316; font-size: 11px; font-weight: 700; text-transform: uppercase; padding: 6px 14px; border-radius: 20px; letter-spacing: 0.1em;">24 Hours Remaining</span>
            </td>
          </tr>

          <tr>
            <td align="center" style="padding-bottom: 24px;">
              <h1 style="margin: 0; font-size: 22px; font-weight: 800; color: #ffffff;">Tomorrow is the Night</h1>
            </td>
          </tr>

          <tr>
            <td style="padding-bottom: 24px; font-size: 14px; line-height: 1.6; color: #a1a1aa;">
              Hi <strong>${customer_name}</strong>,<br><br>
              We are finalizing preparations for <strong>Hauntings of the Rift</strong>. Here is everything you need to know for a seamless arrival tomorrow.
            </td>
          </tr>

          <!-- Logistics Info Table -->
          <tr>
            <td style="padding-bottom: 24px;">
              <table role="presentation" width="100%" style="background-color: #0d0d0d; border: 1px solid #262626; border-radius: 8px; padding: 16px;">
                <tr>
                  <td style="padding: 8px 0; border-bottom: 1px solid #1f1f23;">
                    <span style="color: #71717a; font-size: 12px;">Venue:</span><br>
                    <strong style="color: #ffffff; font-size: 14px;">${venue_name}</strong>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; border-bottom: 1px solid #1f1f23;">
                    <span style="color: #71717a; font-size: 12px;">Gate Opening:</span><br>
                    <strong style="color: #ffffff; font-size: 14px;">${gate_opening_time}</strong>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0;">
                    <span style="color: #71717a; font-size: 12px;">Your Pass Type:</span><br>
                    <strong style="color: #f97316; font-size: 14px;">${ticket_tier}</strong>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Pass Access -->
          <tr>
            <td align="center" style="padding-bottom: 24px;">
              <a href="${ticket_url}" style="background-color: #f97316; color: #000000; font-weight: 700; text-decoration: none; padding: 14px 28px; border-radius: 6px; display: inline-block; font-size: 14px; text-transform: uppercase;">Pre-load Your QR Pass</a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="padding-top: 24px; border-top: 1px solid #262626; font-size: 11px; color: #52525b;">
              &copy; 2026 Hauntings of the Rift. Managed by Verve & Co.
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
function generateRefundNoticeEmailHtml(params) {
	const { customer_name, refund_amount, payment_ref, refund_reason, order_id } = params;
	return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Refund Processed - Hauntings of the Rift</title>
</head>
<body style="margin: 0; padding: 0; background-color: #0d0d0d; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #f3f4f6;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #0d0d0d; padding: 40px 10px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" style="max-width: 560px; background-color: #171717; border: 1px solid #262626; border-radius: 12px; padding: 32px;">
          
          <!-- Status Icon / Header -->
          <tr>
            <td align="center" style="padding-bottom: 20px;">
              <span style="background-color: rgba(239, 68, 68, 0.15); border: 1px solid #ef4444; color: #ef4444; font-size: 11px; font-weight: 700; text-transform: uppercase; padding: 6px 14px; border-radius: 20px; letter-spacing: 0.1em;">Order Reversal</span>
            </td>
          </tr>

          <tr>
            <td align="center" style="padding-bottom: 24px;">
              <h1 style="margin: 0; font-size: 22px; font-weight: 800; color: #ffffff;">Refund Confirmation</h1>
            </td>
          </tr>

          <tr>
            <td style="padding-bottom: 24px; font-size: 14px; line-height: 1.6; color: #a1a1aa;">
              Hi <strong>${customer_name}</strong>,<br><br>
              This email confirms that a refund has been issued for your booking with <strong>Hauntings of the Rift</strong>.
            </td>
          </tr>

          <!-- Financial Breakdown Box -->
          <tr>
            <td style="padding-bottom: 24px;">
              <table role="presentation" width="100%" style="background-color: #0d0d0d; border: 1px solid #262626; border-radius: 8px; padding: 20px;">
                <tr>
                  <td style="padding-bottom: 12px;">
                    <span style="font-size: 11px; text-transform: uppercase; color: #71717a;">Amount Reversed</span><br>
                    <strong style="font-size: 18px; color: #ef4444;">KES ${refund_amount}</strong>
                  </td>
                  <td align="right" style="padding-bottom: 12px;">
                    <span style="font-size: 11px; text-transform: uppercase; color: #71717a;">Gateway Ref</span><br>
                    <span style="font-size: 13px; font-family: monospace; color: #d4d4d8;">${payment_ref}</span>
                  </td>
                </tr>
                <tr>
                  <td colspan="2" style="padding-top: 12px; border-top: 1px solid #1f1f23;">
                    <span style="font-size: 11px; text-transform: uppercase; color: #71717a;">Reason for Reversal</span><br>
                    <span style="font-size: 13px; color: #d4d4d8;">${refund_reason}</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Notice on Invalidation -->
          <tr>
            <td style="padding-bottom: 24px;">
              <div style="background-color: rgba(249, 115, 22, 0.08); border-left: 3px solid #f97316; padding: 12px 16px; border-radius: 0 6px 6px 0; font-size: 13px; color: #d4d4d8;">
                <strong>Note:</strong> Associated admission passes (Order ID: <span style="font-family: monospace;">${order_id}</span>) have been cryptographically revoked and will be rejected at gate scanners.
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="padding-top: 24px; border-top: 1px solid #262626; font-size: 11px; color: #52525b;">
              If you did not request this refund or believe this is an error, please contact Support at <a href="mailto:support@verve.co.ke" style="color: #f97316; text-decoration: none;">support@verve.co.ke</a>.
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
/**
* Sends official ticket confirmation email with digital ticket links
*/
async function sendTicketConfirmationEmail({ to, buyerName, orderNumber, totalKes, ticketTier, quantity, ticketUrl, tickets }) {
	const fromEmail = process.env.EMAIL_FROM || "tickets@verve.co.ke";
	const client = getResendClient();
	const tier = ticketTier || tickets && tickets[0]?.tierName || "General Admission Pass";
	const qty = quantity || tickets?.length || 1;
	const primaryUrl = ticketUrl || tickets && tickets[0]?.ticketUrl || "https://hauntingsoftherift.co.ke/ticket/demo";
	const emailHtml = generateBookingConfirmationEmailHtml({
		customer_name: buyerName,
		ticket_tier: tier,
		quantity: qty,
		total_amount: totalKes.toLocaleString(),
		order_id: orderNumber,
		event_date: "Saturday, 31 October 2026",
		ticket_url: primaryUrl
	});
	if (!client) {
		console.info(`[Email Service - Simulated] Ticket email generated for ${to}:`, {
			orderNumber,
			buyerName,
			totalKes
		});
		return {
			success: true,
			simulated: true
		};
	}
	try {
		const { data, error } = await client.emails.send({
			from: fromEmail,
			to,
			subject: `Your Pass to Hauntings of the Rift (${orderNumber}) — Verve & Co.`,
			html: emailHtml
		});
		if (error) {
			console.warn("[Resend Error] Could not send ticket confirmation:", error);
			return {
				success: false,
				error: error.message
			};
		}
		return {
			success: true,
			id: data?.id
		};
	} catch (err) {
		console.error("[Email Exception]", err);
		return {
			success: false,
			error: err instanceof Error ? err.message : String(err)
		};
	}
}
/**
* Sends 24-Hour Event Reminder Email
*/
async function sendEventReminder24hEmail({ to, customerName, venueName = "Top Cliff Lounge, Nakuru", gateOpeningTime = "18:00 EAT", ticketTier = "General Admission Pass", ticketUrl = "https://hauntingsoftherift.co.ke" }) {
	const fromEmail = process.env.EMAIL_FROM || "tickets@verve.co.ke";
	const client = getResendClient();
	const emailHtml = generateEventReminder24hEmailHtml({
		customer_name: customerName,
		venue_name: venueName,
		gate_opening_time: gateOpeningTime,
		ticket_tier: ticketTier,
		ticket_url: ticketUrl
	});
	if (!client) {
		console.info(`[Email Service - Simulated] 24h Reminder email generated for ${to}:`, {
			customerName,
			venueName,
			gateOpeningTime
		});
		return {
			success: true,
			simulated: true
		};
	}
	try {
		const { data, error } = await client.emails.send({
			from: fromEmail,
			to,
			subject: "24 Hours Until Hauntings of the Rift — Gate & Arrival Instructions",
			html: emailHtml
		});
		if (error) {
			console.warn("[Resend Error] Could not send 24h reminder:", error);
			return {
				success: false,
				error: error.message
			};
		}
		return {
			success: true,
			id: data?.id
		};
	} catch (err) {
		console.error("[Email Exception]", err);
		return {
			success: false,
			error: err instanceof Error ? err.message : String(err)
		};
	}
}
/**
* Sends Refund Confirmation Email
*/
async function sendRefundNoticeEmail({ to, customerName, refundAmount, paymentRef, refundReason, orderId }) {
	const fromEmail = process.env.EMAIL_FROM || "tickets@verve.co.ke";
	const client = getResendClient();
	const formattedAmount = typeof refundAmount === "number" ? refundAmount.toLocaleString() : refundAmount;
	const emailHtml = generateRefundNoticeEmailHtml({
		customer_name: customerName,
		refund_amount: formattedAmount,
		payment_ref: paymentRef,
		refund_reason: refundReason,
		order_id: orderId
	});
	if (!client) {
		console.info(`[Email Service - Simulated] Refund notice email generated for ${to}:`, {
			customerName,
			refundAmount: formattedAmount,
			paymentRef,
			orderId
		});
		return {
			success: true,
			simulated: true
		};
	}
	try {
		const { data, error } = await client.emails.send({
			from: fromEmail,
			to,
			subject: `Refund Processed — Hauntings of the Rift (${orderId})`,
			html: emailHtml
		});
		if (error) {
			console.warn("[Resend Error] Could not send refund email:", error);
			return {
				success: false,
				error: error.message
			};
		}
		return {
			success: true,
			id: data?.id
		};
	} catch (err) {
		console.error("[Email Exception]", err);
		return {
			success: false,
			error: err instanceof Error ? err.message : String(err)
		};
	}
}
/**
* Sends recovery link email with cryptographic access token
*/
async function sendRecoveryEmail({ to, recoveryUrl, ticketsCount }) {
	const fromEmail = process.env.EMAIL_FROM || "tickets@verve.co.ke";
	const client = getResendClient();
	const emailHtml = `
    <!DOCTYPE html>
    <html>
      <head><meta charset="utf-8" /></head>
      <body style="background:#09080D; font-family:sans-serif; color:#F5F2EB; margin:0; padding:24px;">
        <div style="max-width:560px; margin:0 auto; background:#0F0D15; border:1px solid #28212D; padding:28px; border-radius:8px;">
          <div style="text-align:center; border-bottom:1px solid #28212D; padding-bottom:16px; margin-bottom:20px;">
            <p style="color:#C9A84C; font-size:11px; text-transform:uppercase; letter-spacing:0.2em; margin:0 0 6px 0;">Verve & Co.</p>
            <h1 style="color:#F5F2EB; font-size:22px; margin:0;">TICKET RECOVERY PORTAL</h1>
          </div>

          <p style="font-size:14px; line-height:1.6; color:#D5CFDE;">
            We received a request to access and recover digital event passes for <strong>Hauntings of the Rift</strong> associated with <strong>${to}</strong>.
          </p>

          <p style="font-size:14px; line-height:1.6; color:#A09BA8;">
            We found <strong style="color:#F5F2EB;">${ticketsCount}</strong> ticket pass(es) linked to your records. Click the button below to view and download your passes. This secure link is valid for 1 hour.
          </p>

          <div style="text-align:center; margin:28px 0;">
            <a href="${recoveryUrl}" style="background:#8A1C2C; color:#FFFFFF; padding:12px 28px; text-decoration:none; font-weight:bold; font-size:15px; border-radius:4px; display:inline-block; letter-spacing:0.05em;">
              ACCESS MY DIGITAL TICKETS
            </a>
          </div>

          <p style="font-size:12px; color:#787182; line-height:1.4;">
            If you did not request this recovery link, you can safely disregard this email. Your tickets remain secure and accessible only through your verified link.
          </p>

          <div style="text-align:center; margin-top:28px; border-top:1px solid #28212D; padding-top:16px;">
            <p style="color:#6A6372; font-size:11px; margin:0;">
              Hauntings of the Rift • Verve &amp; Co. Security
            </p>
          </div>
        </div>
      </body>
    </html>
  `;
	if (!client) {
		console.info(`[Email Service - Simulated] Ticket Recovery Link for ${to}:`, {
			recoveryUrl,
			ticketsCount
		});
		return {
			success: true,
			simulated: true
		};
	}
	try {
		const { data, error } = await client.emails.send({
			from: fromEmail,
			to,
			subject: "Access Your Event Tickets — Hauntings of the Rift",
			html: emailHtml
		});
		if (error) {
			console.warn("[Resend Error] Could not send recovery email:", error);
			return {
				success: false,
				error: error.message
			};
		}
		return {
			success: true,
			id: data?.id
		};
	} catch (err) {
		console.error("[Email Exception]", err);
		return {
			success: false,
			error: err instanceof Error ? err.message : String(err)
		};
	}
}
var ticketsStore = /* @__PURE__ */ new Map();
var transactionsStore = /* @__PURE__ */ new Map();
var checkInLogsStore = [];
var recoveryRateLimitStore = [];
[
	{
		id: "demo-tkt-001",
		orderId: "ord-demo-rift-001",
		orderNumber: "HR-2026-9042",
		ticketNumber: "HR-7892-4910",
		qrHash: generateTicketHmac("HR-7892-4910", "ord-demo-rift-001", "Amara Vance"),
		tierSlug: "couple-pass",
		tierName: "Couple Pass (2 Guests)",
		admitsCount: 2,
		attendeeName: "Amara Vance",
		buyerEmail: "amara.vance@example.com",
		buyerPhone: "254712345678",
		status: "valid",
		priceKes: 4500,
		issuedAt: (/* @__PURE__ */ new Date(Date.now() - 144e5)).toISOString(),
		venue: {
			name: "Top Cliff Lounge",
			address: "Nakuru-Nairobi Highway, Free Area",
			city: "Nakuru, Kenya",
			date: "Saturday, 31 October 2026",
			time: "4:00 PM - 4:00 AM EAT",
			ageRequirement: "Strictly 21+ with Valid ID"
		}
	},
	{
		id: "demo-tkt-002",
		orderId: "ord-demo-rift-002",
		orderNumber: "HR-2026-9043",
		ticketNumber: "HR-5519-8231",
		qrHash: generateTicketHmac("HR-5519-8231", "ord-demo-rift-002", "Erastus Gathungu"),
		tierSlug: "hellfire-vip",
		tierName: "Hellfire VIP (Complimentary Open Bar)",
		admitsCount: 1,
		attendeeName: "Erastus Gathungu",
		buyerEmail: "erastus.n.gathungu@gmail.com",
		buyerPhone: "254700112233",
		status: "valid",
		priceKes: 6500,
		issuedAt: (/* @__PURE__ */ new Date(Date.now() - 432e5)).toISOString(),
		venue: {
			name: "Top Cliff Lounge",
			address: "Nakuru-Nairobi Highway, Free Area",
			city: "Nakuru, Kenya",
			date: "Saturday, 31 October 2026",
			time: "4:00 PM - 4:00 AM EAT",
			ageRequirement: "Strictly 21+ with Valid ID"
		}
	},
	{
		id: "demo-tkt-003",
		orderId: "ord-demo-rift-003",
		orderNumber: "HR-2026-9044",
		ticketNumber: "HR-3184-9022",
		qrHash: generateTicketHmac("HR-3184-9022", "ord-demo-rift-003", "Kendi Mwenda"),
		tierSlug: "general-admission",
		tierName: "General Admission",
		admitsCount: 1,
		attendeeName: "Kendi Mwenda",
		buyerEmail: "kendi.m@riftparty.co.ke",
		buyerPhone: "254722334455",
		status: "used",
		priceKes: 2500,
		issuedAt: (/* @__PURE__ */ new Date(Date.now() - 864e5)).toISOString(),
		usedAt: (/* @__PURE__ */ new Date(Date.now() - 72e5)).toISOString(),
		scannedBy: "Gate Alpha Primary",
		venue: {
			name: "Top Cliff Lounge",
			address: "Nakuru-Nairobi Highway, Free Area",
			city: "Nakuru, Kenya",
			date: "Saturday, 31 October 2026",
			time: "4:00 PM - 4:00 AM EAT",
			ageRequirement: "Strictly 21+ with Valid ID"
		}
	},
	{
		id: "demo-tkt-004",
		orderId: "ord-demo-rift-004",
		orderNumber: "HR-2026-9045",
		ticketNumber: "HR-9941-1049",
		qrHash: generateTicketHmac("HR-9941-1049", "ord-demo-rift-004", "Tariq Al-Mansoor"),
		tierSlug: "rift-coven",
		tierName: "Rift Coven Group (5 Guests)",
		admitsCount: 5,
		attendeeName: "Tariq Al-Mansoor",
		buyerEmail: "tariq.mansoor@example.org",
		buyerPhone: "254799887766",
		status: "valid",
		priceKes: 1e4,
		issuedAt: (/* @__PURE__ */ new Date(Date.now() - 1728e5)).toISOString(),
		venue: {
			name: "Top Cliff Lounge",
			address: "Nakuru-Nairobi Highway, Free Area",
			city: "Nakuru, Kenya",
			date: "Saturday, 31 October 2026",
			time: "4:00 PM - 4:00 AM EAT",
			ageRequirement: "Strictly 21+ with Valid ID"
		}
	},
	{
		id: "demo-tkt-005",
		orderId: "ord-demo-rift-005",
		orderNumber: "HR-2026-9046",
		ticketNumber: "HR-1209-7734",
		qrHash: generateTicketHmac("HR-1209-7734", "ord-demo-rift-005", "Samantha Njeri"),
		tierSlug: "early-bird",
		tierName: "Early Bat (Limited Tier)",
		admitsCount: 1,
		attendeeName: "Samantha Njeri",
		buyerEmail: "samantha.njeri@example.com",
		buyerPhone: "254733445566",
		status: "cancelled",
		priceKes: 1800,
		issuedAt: (/* @__PURE__ */ new Date(Date.now() - 2592e5)).toISOString(),
		venue: {
			name: "Top Cliff Lounge",
			address: "Nakuru-Nairobi Highway, Free Area",
			city: "Nakuru, Kenya",
			date: "Saturday, 31 October 2026",
			time: "4:00 PM - 4:00 AM EAT",
			ageRequirement: "Strictly 21+ with Valid ID"
		}
	}
].forEach((t) => ticketsStore.set(t.ticketNumber, t));
var TicketsServerService = class {
	/**
	* Returns all tickets currently in store
	*/
	static getAllTickets() {
		return Array.from(ticketsStore.values());
	}
	/**
	* Updates a ticket record in store
	*/
	static updateTicketRecord(ticket) {
		ticketsStore.set(ticket.ticketNumber, ticket);
	}
	/**
	* Issues cryptographic digital tickets for a completed order
	*/
	static async issueTicketsForOrder(orderId, token) {
		const order = OrderService.getOrder(orderId, token);
		if (!order) throw new Error("Order not found or unauthorized token.");
		const existing = Array.from(ticketsStore.values()).filter((t) => t.orderId === orderId);
		if (existing.length > 0) return existing;
		const issuedTickets = [];
		const admitsPerTicket = order.admitsCount;
		const quantity = order.quantity;
		for (let i = 0; i < quantity; i++) {
			const ticketNumber = generateTicketCode();
			const qrHash = generateTicketHmac(ticketNumber, order.orderId, order.buyerName);
			const ticketRecord = {
				id: `tkt_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
				orderId: order.orderId,
				orderNumber: order.orderNumber,
				ticketNumber,
				qrHash,
				tierSlug: "general-admission",
				tierName: order.ticketName,
				admitsCount: admitsPerTicket,
				attendeeName: order.buyerName,
				buyerEmail: order.buyerEmail,
				buyerPhone: order.buyerPhone,
				status: "valid",
				priceKes: Math.round(order.totalKes / quantity),
				issuedAt: (/* @__PURE__ */ new Date()).toISOString(),
				venue: {
					name: "Top Cliff Lounge",
					address: "Nakuru-Nairobi Highway, Free Area",
					city: "Nakuru, Kenya",
					date: "Saturday, 31 October 2026",
					time: "4:00 PM - 4:00 AM EAT",
					ageRequirement: "Strictly 21+ with Valid ID"
				}
			};
			ticketsStore.set(ticketNumber, ticketRecord);
			issuedTickets.push(ticketRecord);
		}
		return issuedTickets;
	}
	/**
	* Issue authoritative tickets for an approved order without requiring customer token (Admin context)
	*/
	static async issueTicketsForApprovedOrder(orderId) {
		const existing = Array.from(ticketsStore.values()).filter((t) => t.orderId === orderId);
		if (existing.length > 0) return existing;
		const order = OrderService._getOrderByIdInternal(orderId);
		if (!order) throw new Error("Order record not found in system.");
		const issuedTickets = [];
		const admitsPerTicket = order.admitsCount || 1;
		const quantity = order.quantity || 1;
		for (let i = 0; i < quantity; i++) {
			const ticketNumber = generateTicketCode();
			const qrHash = generateTicketHmac(ticketNumber, order.id, order.buyerName);
			const ticketRecord = {
				id: `tkt_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
				orderId: order.id,
				orderNumber: order.orderNumber,
				ticketNumber,
				qrHash,
				tierSlug: order.ticketTypeId || "general-admission",
				tierName: order.ticketName,
				admitsCount: admitsPerTicket,
				attendeeName: order.buyerName,
				buyerEmail: order.buyerEmail,
				buyerPhone: order.buyerPhone,
				status: "valid",
				priceKes: Math.round(order.totalKes / quantity),
				issuedAt: (/* @__PURE__ */ new Date()).toISOString(),
				venue: {
					name: "Top Cliff Lounge",
					address: "Nakuru-Nairobi Highway, Free Area",
					city: "Nakuru, Kenya",
					date: "Saturday, 31 October 2026",
					time: "4:00 PM - 4:00 AM EAT",
					ageRequirement: "Strictly 21+ with Valid ID"
				}
			};
			ticketsStore.set(ticketNumber, ticketRecord);
			issuedTickets.push(ticketRecord);
		}
		return issuedTickets;
	}
	/**
	* Idempotency Gate for Payment Verification & Processing
	*/
	static async verifyPayment(params) {
		const { idempotencyKey, orderId, token, mpesaReceipt } = params;
		if (!idempotencyKey || !orderId || !token) return {
			success: false,
			status: "failed",
			code: "INVALID_ARGUMENTS",
			message: "Idempotency key, orderId, and checkout token are required."
		};
		const existingTx = transactionsStore.get(idempotencyKey);
		if (existingTx) {
			if (existingTx.status === "completed") return {
				success: true,
				status: "completed",
				message: "Transaction previously completed.",
				tickets: Array.from(ticketsStore.values()).filter((t) => t.orderId === orderId),
				receipt: existingTx.providerRef || mpesaReceipt
			};
			if (existingTx.status === "pending") return {
				success: false,
				status: "pending",
				code: "TRANSACTION_PENDING",
				message: "Payment transaction is currently being processed. Please wait."
			};
		}
		const order = OrderService.getOrder(orderId, token);
		if (!order) return {
			success: false,
			status: "failed",
			code: "ORDER_NOT_FOUND",
			message: "Order not found or authorization token invalid."
		};
		const txRecord = {
			id: `tx_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
			idempotencyKey,
			orderId,
			amountKes: order.totalKes,
			currency: "KES",
			provider: "mpesa",
			providerRef: mpesaReceipt || `REC-${Date.now().toString(36).toUpperCase()}`,
			status: "pending",
			createdAt: Date.now(),
			updatedAt: Date.now()
		};
		transactionsStore.set(idempotencyKey, txRecord);
		try {
			const tickets = await this.issueTicketsForOrder(orderId, token);
			txRecord.status = "completed";
			txRecord.updatedAt = Date.now();
			transactionsStore.set(idempotencyKey, txRecord);
			return {
				success: true,
				status: "completed",
				message: "Payment authoritatively verified and tickets issued.",
				tickets,
				receipt: txRecord.providerRef
			};
		} catch (err) {
			txRecord.status = "failed";
			txRecord.errorMessage = err instanceof Error ? err.message : String(err);
			txRecord.updatedAt = Date.now();
			transactionsStore.set(idempotencyKey, txRecord);
			return {
				success: false,
				status: "failed",
				code: "PROCESSING_ERROR",
				message: "Payment verification failed. You may safely retry."
			};
		}
	}
	/**
	* Signature-verified public lookup by ticket code
	*/
	static getTicketByCode(code) {
		const normalized = code.trim().toUpperCase();
		const ticket = ticketsStore.get(normalized);
		if (!ticket) return {
			success: false,
			message: "No ticket found matching the specified code."
		};
		return {
			success: true,
			ticket
		};
	}
	/**
	* Ticket Recovery Request Handler (Rate limited + generic non-enumerating response)
	*/
	static async recoverTicket(params) {
		const { email, clientIp, baseUrl } = params;
		const now = Date.now();
		const ONE_HOUR = 36e5;
		while (recoveryRateLimitStore.length > 0 && recoveryRateLimitStore[0].timestamp < now - ONE_HOUR) recoveryRateLimitStore.shift();
		const emailKey = email?.trim().toLowerCase() || "";
		const ipKey = clientIp.trim();
		const emailAttempts = recoveryRateLimitStore.filter((r) => emailKey && r.identifier === emailKey && r.timestamp > now - ONE_HOUR).length;
		const ipAttempts = recoveryRateLimitStore.filter((r) => r.identifier === ipKey && r.timestamp > now - ONE_HOUR).length;
		if (emailAttempts >= 3 || ipAttempts >= 5) return {
			success: false,
			code: "RATE_LIMITED",
			rateLimited: true,
			message: "Too many ticket recovery requests. Please wait before trying again."
		};
		if (emailKey) recoveryRateLimitStore.push({
			identifier: emailKey,
			timestamp: now
		});
		recoveryRateLimitStore.push({
			identifier: ipKey,
			timestamp: now
		});
		let matchingTickets = [];
		if (emailKey) matchingTickets = Array.from(ticketsStore.values()).filter((t) => t.buyerEmail ? t.buyerEmail.toLowerCase() === emailKey : true);
		let recoveryToken;
		if (emailKey) {
			recoveryToken = createRecoveryToken(emailKey, ONE_HOUR);
			await sendRecoveryEmail({
				to: emailKey,
				recoveryUrl: `${baseUrl.replace(/\/$/, "")}/recover?token=${recoveryToken}`,
				ticketsCount: Math.max(1, matchingTickets.length)
			});
		}
		return {
			success: true,
			message: "If matching tickets are associated with this email address, a secure recovery link has been dispatched to your inbox.",
			previewToken: recoveryToken
		};
	}
	/**
	* Verifies signed recovery token and retrieves associated tickets
	*/
	static verifyRecoveryToken(token) {
		const result = verifyRecoveryToken(token);
		if (!result.valid || !result.email) return {
			valid: false,
			expired: result.expired,
			email: result.email,
			tickets: []
		};
		const email = result.email.toLowerCase();
		return {
			valid: true,
			email,
			tickets: Array.from(ticketsStore.values()).filter((t) => !t.buyerEmail || t.buyerEmail.toLowerCase() === email)
		};
	}
	/**
	* Scans and marks ticket as used at event check-in
	*/
	static markTicketUsed(code, scannedBy = "Gate Security Staff") {
		const normalized = code.trim().toUpperCase();
		const ticket = ticketsStore.get(normalized);
		if (!ticket) return {
			success: false,
			status: "not_found",
			message: "Invalid ticket QR code."
		};
		if (ticket.status === "used") return {
			success: false,
			status: "already_used",
			ticket,
			message: `Ticket already used at ${ticket.usedAt || "an earlier scan"}.`
		};
		ticket.status = "used";
		ticket.usedAt = (/* @__PURE__ */ new Date()).toISOString();
		ticket.scannedBy = scannedBy;
		ticketsStore.set(normalized, ticket);
		return {
			success: true,
			status: "valid",
			ticket,
			message: `Checked in successfully: ${ticket.attendeeName} (${ticket.tierName}).`
		};
	}
	/**
	* Authoritative Gate Validation & Check-in Handler
	* Verifies HMAC signature, validates event ID, enforces single-use policy, and logs check-in records.
	*/
	static async validateAndCheckinTicket(params) {
		const { ticket_code, qr_hash, staff_name = "Gate Security Staff", gate_location = "Main Top Cliff Entrance", clientIp } = params;
		const normalized = ticket_code.trim().toUpperCase();
		const ticket = ticketsStore.get(normalized);
		const allTickets = Array.from(ticketsStore.values());
		const totalIssued = allTickets.length;
		const checkedInCount = allTickets.filter((t) => t.status === "used").length;
		const remainingValid = allTickets.filter((t) => t.status === "valid").length;
		const eventStats = {
			totalIssued,
			checkedInCount,
			remainingValid,
			admittedPercentage: totalIssued > 0 ? Math.round(checkedInCount / totalIssued * 100) : 0
		};
		if (!ticket) {
			const logRecord = {
				id: `chk_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
				ticketNumber: normalized,
				orderNumber: "UNKNOWN",
				attendeeName: "Unknown Guest",
				tierName: "Unknown Tier",
				admitsCount: 0,
				status: "invalid",
				scannedAt: (/* @__PURE__ */ new Date()).toISOString(),
				scannedBy: staff_name,
				gateLocation: gate_location,
				ipAddress: clientIp
			};
			checkInLogsStore.unshift(logRecord);
			return {
				success: false,
				status: "not_found",
				httpStatus: 404,
				message: `Ticket pass ${normalized} was not found in the event database.`,
				eventStats
			};
		}
		if (qr_hash && ticket.qrHash && qr_hash !== ticket.qrHash) {
			const logRecord = {
				id: `chk_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
				ticketNumber: ticket.ticketNumber,
				orderNumber: ticket.orderNumber,
				attendeeName: ticket.attendeeName,
				tierName: ticket.tierName,
				admitsCount: ticket.admitsCount,
				status: "invalid",
				scannedAt: (/* @__PURE__ */ new Date()).toISOString(),
				scannedBy: staff_name,
				gateLocation: gate_location,
				ipAddress: clientIp
			};
			checkInLogsStore.unshift(logRecord);
			return {
				success: false,
				status: "invalid_signature",
				httpStatus: 401,
				message: "Cryptographic HMAC signature mismatch! Possible counterfeit or tampered pass.",
				eventStats
			};
		}
		if (ticket.status === "cancelled" || ticket.status === "refunded") return {
			success: false,
			status: "invalid_pass",
			httpStatus: 403,
			message: `Admission denied: This ticket has been marked as ${ticket.status.toUpperCase()}.`,
			ticket,
			eventStats
		};
		if (ticket.status === "used") {
			const logRecord = {
				id: `chk_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
				ticketNumber: ticket.ticketNumber,
				orderNumber: ticket.orderNumber,
				attendeeName: ticket.attendeeName,
				tierName: ticket.tierName,
				admitsCount: ticket.admitsCount,
				status: "duplicate",
				scannedAt: (/* @__PURE__ */ new Date()).toISOString(),
				scannedBy: staff_name,
				gateLocation: gate_location,
				ipAddress: clientIp
			};
			checkInLogsStore.unshift(logRecord);
			return {
				success: false,
				status: "already_used",
				httpStatus: 409,
				message: `DUPLICATE TICKET: Already scanned at ${ticket.usedAt ? new Date(ticket.usedAt).toLocaleTimeString("en-KE") : "earlier"} by ${ticket.scannedBy || "Gate Staff"}.`,
				ticket,
				attendee: {
					name: ticket.attendeeName,
					tier: ticket.tierName,
					admitsCount: ticket.admitsCount,
					orderNumber: ticket.orderNumber,
					issuedAt: ticket.issuedAt,
					buyerPhone: ticket.buyerPhone,
					priceKes: ticket.priceKes
				},
				checkInDetails: {
					scannedAt: ticket.usedAt || (/* @__PURE__ */ new Date()).toISOString(),
					scannedBy: ticket.scannedBy || "Gate Staff",
					gateLocation: gate_location
				},
				eventStats
			};
		}
		const nowIso = (/* @__PURE__ */ new Date()).toISOString();
		ticket.status = "used";
		ticket.usedAt = nowIso;
		ticket.scannedBy = staff_name;
		ticketsStore.set(normalized, ticket);
		const logRecord = {
			id: `chk_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
			ticketNumber: ticket.ticketNumber,
			orderNumber: ticket.orderNumber,
			attendeeName: ticket.attendeeName,
			tierName: ticket.tierName,
			admitsCount: ticket.admitsCount,
			status: "valid",
			scannedAt: nowIso,
			scannedBy: staff_name,
			gateLocation: gate_location,
			ipAddress: clientIp
		};
		checkInLogsStore.unshift(logRecord);
		if (checkInLogsStore.length > 300) checkInLogsStore.length = 300;
		const updatedCheckedIn = checkedInCount + 1;
		const updatedValid = Math.max(0, remainingValid - 1);
		const updatedPercentage = totalIssued > 0 ? Math.round(updatedCheckedIn / totalIssued * 100) : 0;
		return {
			success: true,
			status: "valid",
			httpStatus: 200,
			message: `ADMISSION GRANTED: ${ticket.attendeeName} (${ticket.tierName} - Admits ${ticket.admitsCount})`,
			ticket,
			attendee: {
				name: ticket.attendeeName,
				tier: ticket.tierName,
				admitsCount: ticket.admitsCount,
				orderNumber: ticket.orderNumber,
				issuedAt: ticket.issuedAt,
				buyerPhone: ticket.buyerPhone,
				priceKes: ticket.priceKes
			},
			checkInDetails: {
				scannedAt: nowIso,
				scannedBy: staff_name,
				gateLocation: gate_location
			},
			eventStats: {
				totalIssued,
				checkedInCount: updatedCheckedIn,
				remainingValid: updatedValid,
				admittedPercentage: updatedPercentage
			}
		};
	}
	/**
	* Get Live Check-in Statistics & Recent Scan Stream
	*/
	static getCheckinStats() {
		const allTickets = Array.from(ticketsStore.values());
		const totalIssued = allTickets.length;
		const checkedInCount = allTickets.filter((t) => t.status === "used").length;
		return {
			totalIssued,
			checkedInCount,
			remainingValid: allTickets.filter((t) => t.status === "valid").length,
			admittedPercentage: totalIssued > 0 ? Math.round(checkedInCount / totalIssued * 100) : 0,
			recentScans: checkInLogsStore.slice(0, 20)
		};
	}
};
var promotionsStore = /* @__PURE__ */ new Map();
var auditLogsStore = [];
var scannersStore = /* @__PURE__ */ new Map();
[
	{
		id: "promo-001",
		code: "RIFTVIP20",
		name: "VIP Halloween 20% Discount",
		discountType: "percentage",
		discountValue: 20,
		maxUses: 100,
		currentUses: 45,
		expiresAt: new Date(Date.now() + 2592e6).toISOString(),
		isActive: true,
		createdAt: (/* @__PURE__ */ new Date(Date.now() - 432e6)).toISOString(),
		updatedAt: (/* @__PURE__ */ new Date()).toISOString()
	},
	{
		id: "promo-002",
		code: "EARLYGHOST",
		name: "Early Bird Fixed KES 500 Off",
		discountType: "fixed",
		discountValue: 500,
		maxUses: 50,
		currentUses: 12,
		expiresAt: new Date(Date.now() + 12096e5).toISOString(),
		isActive: true,
		createdAt: (/* @__PURE__ */ new Date(Date.now() - 2592e5)).toISOString(),
		updatedAt: (/* @__PURE__ */ new Date()).toISOString()
	},
	{
		id: "promo-003",
		code: "COVEN50",
		name: "Rift Coven Group 50% Flash Sale",
		discountType: "percentage",
		discountValue: 50,
		maxUses: 20,
		currentUses: 19,
		expiresAt: new Date(Date.now() + 6048e5).toISOString(),
		isActive: true,
		createdAt: (/* @__PURE__ */ new Date(Date.now() - 1728e5)).toISOString(),
		updatedAt: (/* @__PURE__ */ new Date()).toISOString()
	},
	{
		id: "promo-004",
		code: "SPOOKY10",
		name: "Community 10% Off Pass",
		discountType: "percentage",
		discountValue: 10,
		maxUses: 200,
		currentUses: 88,
		expiresAt: new Date(Date.now() + 3888e6).toISOString(),
		isActive: true,
		createdAt: (/* @__PURE__ */ new Date(Date.now() - 864e6)).toISOString(),
		updatedAt: (/* @__PURE__ */ new Date()).toISOString()
	},
	{
		id: "promo-005",
		code: "EXPIRED2025",
		name: "Past Campaign (Archived)",
		discountType: "percentage",
		discountValue: 15,
		maxUses: 50,
		currentUses: 50,
		expiresAt: (/* @__PURE__ */ new Date(Date.now() - 864e6)).toISOString(),
		isActive: false,
		createdAt: (/* @__PURE__ */ new Date(Date.now() - 5184e6)).toISOString(),
		updatedAt: (/* @__PURE__ */ new Date()).toISOString()
	}
].forEach((p) => promotionsStore.set(p.code.toUpperCase(), p));
[
	{
		id: "scan-001",
		name: "Gate Alpha Primary",
		operatorName: "Kenneth Omondi",
		gateLocation: "Main Top Cliff Entrance (Highway Gate)",
		status: "active",
		scansCount: 42,
		lastScanAt: (/* @__PURE__ */ new Date(Date.now() - 48e4)).toISOString()
	},
	{
		id: "scan-002",
		name: "VIP Portal Handheld",
		operatorName: "Serah Wanjiru",
		gateLocation: "Hellfire VIP Red Carpet Chute",
		status: "active",
		scansCount: 18,
		lastScanAt: (/* @__PURE__ */ new Date(Date.now() - 132e4)).toISOString()
	},
	{
		id: "scan-003",
		name: "Gate Beta Backup",
		operatorName: "David Kiprop",
		gateLocation: "West Amphitheater Service Entry",
		status: "standby",
		scansCount: 0,
		lastScanAt: null
	}
].forEach((s) => scannersStore.set(s.id, s));
auditLogsStore.push({
	id: "aud-001",
	actorId: "admin-erastus",
	actorEmail: "erastus.n.gathungu@gmail.com",
	actorRole: "admin",
	action: "system.initialized",
	targetTable: "events",
	targetId: "hauntings-of-the-rift-2026",
	metadata: { message: "Production Admin & Access Control Gateway activated" },
	ipAddress: "127.0.0.1",
	createdAt: (/* @__PURE__ */ new Date(Date.now() - 36e5)).toISOString()
});
var AdminServerService = class {
	/**
	* Record an authoritative audit log entry
	*/
	static async recordAuditLog(entry) {
		const log = {
			id: `aud-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
			actorId: entry.actorId || "admin-system",
			actorEmail: entry.actorEmail || "admin@verve.co.ke",
			actorRole: entry.actorRole || "admin",
			action: entry.action,
			targetTable: entry.targetTable,
			targetId: entry.targetId,
			metadata: entry.metadata || {},
			ipAddress: entry.ipAddress || "127.0.0.1",
			createdAt: (/* @__PURE__ */ new Date()).toISOString()
		};
		auditLogsStore.unshift(log);
		if (auditLogsStore.length > 500) auditLogsStore.length = 500;
		if (isServerSupabaseConfigured && supabaseServer) try {
			await supabaseServer.from("audit_logs").insert({
				actor_id: log.actorId,
				action: log.action,
				target_table: log.targetTable,
				target_id: log.targetId,
				metadata: log.metadata,
				ip_address: log.ipAddress
			});
		} catch (err) {
			console.warn("Could not persist audit log to Supabase:", err);
		}
		return log;
	}
	/**
	* Get all Audit Logs
	*/
	static getAuditLogs(limit = 100) {
		return auditLogsStore.slice(0, limit);
	}
	/**
	* Get Overall Event Overview Metrics
	*/
	static getOverviewMetrics() {
		const tickets = TicketsServerService.getAllTickets();
		const promos = Array.from(promotionsStore.values());
		const scanners = Array.from(scannersStore.values());
		const totalSold = tickets.length;
		const totalUsed = tickets.filter((t) => t.status === "used").length;
		const totalCancelled = tickets.filter((t) => t.status === "cancelled").length;
		const totalValid = tickets.filter((t) => t.status === "valid").length;
		const totalRevenueKes = tickets.filter((t) => t.status !== "cancelled").reduce((sum, t) => sum + (t.priceKes || 0), 0);
		const totalCapacity = 800;
		return {
			totalSold,
			totalUsed,
			totalCancelled,
			totalValid,
			totalRevenueKes,
			totalCapacity,
			remainingCapacity: Math.max(0, totalCapacity - totalSold),
			checkinRate: totalSold > 0 ? Math.round(totalUsed / totalSold * 100) : 0,
			activePromosCount: promos.filter((p) => p.isActive).length,
			activeScannersCount: scanners.filter((s) => s.status === "active").length,
			recentTickets: tickets.slice(0, 5),
			recentAuditLogs: auditLogsStore.slice(0, 8)
		};
	}
	/**
	* List all Tickets with optional search & status filter
	*/
	static getTickets(filters) {
		let tickets = TicketsServerService.getAllTickets();
		if (filters?.status && filters.status !== "all") tickets = tickets.filter((t) => t.status === filters.status);
		if (filters?.tier && filters.tier !== "all") tickets = tickets.filter((t) => t.tierSlug === filters.tier);
		if (filters?.search) {
			const q = filters.search.trim().toLowerCase();
			tickets = tickets.filter((t) => t.ticketNumber.toLowerCase().includes(q) || t.attendeeName.toLowerCase().includes(q) || t.buyerEmail && t.buyerEmail.toLowerCase().includes(q) || t.buyerPhone.toLowerCase().includes(q) || t.orderNumber.toLowerCase().includes(q));
		}
		return tickets.sort((a, b) => new Date(b.issuedAt).getTime() - new Date(a.issuedAt).getTime());
	}
	/**
	* Revoke / Invalidate a ticket
	*/
	static async revokeTicket(params) {
		const { code, reason, actorEmail, actorId, clientIp } = params;
		const ticket = TicketsServerService.getTicketByCode(code);
		if (!ticket) return {
			success: false,
			message: "Ticket pass not found."
		};
		if (ticket.status === "cancelled") return {
			success: false,
			message: "Ticket is already cancelled/revoked."
		};
		const previousStatus = ticket.status;
		ticket.status = "cancelled";
		TicketsServerService.updateTicketRecord(ticket);
		await this.recordAuditLog({
			actorId: actorId || "admin-user",
			actorEmail,
			actorRole: "admin",
			action: "ticket.revoked",
			targetTable: "tickets",
			targetId: ticket.ticketNumber,
			metadata: {
				attendeeName: ticket.attendeeName,
				orderNumber: ticket.orderNumber,
				previousStatus,
				reason: reason || "Manual organizer revocation"
			},
			ipAddress: clientIp
		});
		return {
			success: true,
			message: `Pass ${ticket.ticketNumber} has been invalidated.`,
			ticket
		};
	}
	/**
	* Resend Ticket Confirmation Email
	*/
	static async resendTicketEmail(params) {
		const { code, actorEmail, actorId, clientIp } = params;
		const ticket = TicketsServerService.getTicketByCode(code);
		if (!ticket) return {
			success: false,
			message: "Ticket pass not found."
		};
		if (!ticket.buyerEmail) return {
			success: false,
			message: "Ticket does not have a recipient email address."
		};
		const emailResult = await sendTicketConfirmationEmail({
			to: ticket.buyerEmail,
			attendeeName: ticket.attendeeName,
			ticketCode: ticket.ticketNumber,
			tierName: ticket.tierName,
			admitsCount: ticket.admitsCount,
			orderNumber: ticket.orderNumber,
			totalKes: ticket.priceKes,
			eventDate: ticket.venue.date,
			venueName: ticket.venue.name,
			qrHash: ticket.qrHash
		});
		await this.recordAuditLog({
			actorId: actorId || "admin-user",
			actorEmail,
			actorRole: "admin",
			action: "ticket.email_resent",
			targetTable: "tickets",
			targetId: ticket.ticketNumber,
			metadata: {
				recipientEmail: ticket.buyerEmail,
				attendeeName: ticket.attendeeName,
				emailDeliveryStatus: emailResult.success ? "sent" : "delivery_logged"
			},
			ipAddress: clientIp
		});
		return {
			success: true,
			message: `Admission ticket email re-dispatched to ${ticket.buyerEmail}.`
		};
	}
	/**
	* Get all Promotions
	*/
	static getPromotions() {
		return Array.from(promotionsStore.values()).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
	}
	/**
	* Create New Promotion Code
	*/
	static async createPromotion(params) {
		const code = params.code.trim().toUpperCase();
		if (!code) return {
			success: false,
			message: "Promotion code cannot be blank."
		};
		if (promotionsStore.has(code)) return {
			success: false,
			message: `Promo code '${code}' already exists.`
		};
		if (params.discountValue <= 0) return {
			success: false,
			message: "Discount value must be greater than zero."
		};
		if (params.discountType === "percentage" && params.discountValue > 100) return {
			success: false,
			message: "Percentage discount cannot exceed 100%."
		};
		const newPromo = {
			id: `promo-${Date.now()}`,
			code,
			name: params.name || `${code} Promotional Offer`,
			discountType: params.discountType,
			discountValue: Number(params.discountValue),
			maxUses: Number(params.maxUses) || 100,
			currentUses: 0,
			expiresAt: params.expiresAt || null,
			isActive: params.isActive !== false,
			createdAt: (/* @__PURE__ */ new Date()).toISOString(),
			updatedAt: (/* @__PURE__ */ new Date()).toISOString()
		};
		promotionsStore.set(code, newPromo);
		await this.recordAuditLog({
			actorId: params.actorId || "admin-user",
			actorEmail: params.actorEmail,
			actorRole: "admin",
			action: "promotion.created",
			targetTable: "promotions",
			targetId: newPromo.code,
			metadata: {
				code: newPromo.code,
				discountType: newPromo.discountType,
				discountValue: newPromo.discountValue,
				maxUses: newPromo.maxUses
			},
			ipAddress: params.clientIp
		});
		return {
			success: true,
			message: `Promo code ${newPromo.code} created successfully.`,
			promo: newPromo
		};
	}
	/**
	* Toggle Promotion Active / Inactive
	*/
	static async togglePromotion(params) {
		const { codeOrId, isActive, actorEmail, actorId, clientIp } = params;
		let target;
		for (const p of promotionsStore.values()) if (p.id === codeOrId || p.code.toUpperCase() === codeOrId.toUpperCase()) {
			target = p;
			break;
		}
		if (!target) return {
			success: false,
			message: "Promotion code not found."
		};
		target.isActive = isActive;
		target.updatedAt = (/* @__PURE__ */ new Date()).toISOString();
		promotionsStore.set(target.code.toUpperCase(), target);
		await this.recordAuditLog({
			actorId: actorId || "admin-user",
			actorEmail,
			actorRole: "admin",
			action: isActive ? "promotion.activated" : "promotion.deactivated",
			targetTable: "promotions",
			targetId: target.code,
			metadata: {
				code: target.code,
				isActive
			},
			ipAddress: clientIp
		});
		return {
			success: true,
			message: `Promo code ${target.code} is now ${isActive ? "ACTIVE" : "PAUSED"}.`,
			promo: target
		};
	}
	/**
	* Delete / Remove Promotion Code
	*/
	static async deletePromotion(params) {
		const { codeOrId, actorEmail, actorId, clientIp } = params;
		let target;
		for (const p of promotionsStore.values()) if (p.id === codeOrId || p.code.toUpperCase() === codeOrId.toUpperCase()) {
			target = p;
			break;
		}
		if (!target) return {
			success: false,
			message: "Promotion code not found."
		};
		promotionsStore.delete(target.code.toUpperCase());
		await this.recordAuditLog({
			actorId: actorId || "admin-user",
			actorEmail,
			actorRole: "admin",
			action: "promotion.deleted",
			targetTable: "promotions",
			targetId: target.code,
			metadata: { code: target.code },
			ipAddress: clientIp
		});
		return {
			success: true,
			message: `Promo code ${target.code} was removed.`
		};
	}
	/**
	* Validate Promo Code for customer checkout
	*/
	static validatePromoCode(code, subtotalKes) {
		const normalized = code.trim().toUpperCase();
		const promo = promotionsStore.get(normalized);
		if (!promo) return {
			valid: false,
			message: "Invalid promotional discount code."
		};
		if (!promo.isActive) return {
			valid: false,
			message: "This promotional code is currently inactive."
		};
		if (promo.expiresAt && new Date(promo.expiresAt).getTime() < Date.now()) return {
			valid: false,
			message: "This promotional code has expired."
		};
		if (promo.currentUses >= promo.maxUses) return {
			valid: false,
			message: "This promotional code has reached its maximum usage limit."
		};
		let discountKes = 0;
		if (promo.discountType === "percentage") discountKes = Math.round(subtotalKes * promo.discountValue / 100);
		else discountKes = Math.min(subtotalKes, promo.discountValue);
		return {
			valid: true,
			discountKes,
			promo: {
				code: promo.code,
				discountType: promo.discountType,
				discountValue: promo.discountValue
			}
		};
	}
	/**
	* Get Scanner Devices & Staff
	*/
	static getScanners() {
		return Array.from(scannersStore.values());
	}
};
var WhatsAppNotificationService = class {
	/**
	* Get Meta API parameters array: {{1}}, {{2}}, {{3}}, {{4}}
	*/
	static getMetaParameters(template, params) {
		const customerName = params.customerName || params.attendeeName || "Valued Guest";
		switch (template) {
			case "booking_confirmation": return [
				customerName,
				params.passTierAndQuantity || `${params.tierName || "General Admission"} (x1)`,
				params.orderId || params.orderNumber || "HR-2026-CONF",
				params.ticketAccessUrl || params.directTicketUrl || "https://hauntingsoftherift.co.ke"
			];
			case "event_reminder_24h": return [
				customerName,
				params.venueNameOrLocation || params.venueName || "Top Cliff Lounge, Nakuru",
				params.gateOpeningTime || "18:00 EAT",
				params.fastPassLink || params.directTicketUrl || params.ticketAccessUrl || "https://hauntingsoftherift.co.ke"
			];
			case "refund_notice": return [
				customerName,
				String(params.refundAmountKes !== void 0 ? params.refundAmountKes : params.totalKes || 0),
				params.paymentProviderRef || params.orderNumber || "REV-MPESA-CONFIRMED",
				params.reasonOrDetails || "Requested by cardholder / administrative adjustment"
			];
			case "gate_alert": return [customerName, params.ticketCode || "HR-PASS-VALID"];
			default: return [customerName];
		}
	}
	/**
	* Format plaintext message according to exact template specification
	*/
	static formatMessage(payload) {
		const { template, params = {} } = payload;
		const metaParams = this.getMetaParameters(template, params);
		switch (template) {
			case "booking_confirmation": {
				const [p1, p2, p3, p4] = metaParams;
				return [
					`🎃 *HAUNTINGS OF THE RIFT — TICKET CONFIRMED* 🎃`,
					``,
					`Hey ${p1}! Your entry pass is secured. Get ready for an unforgettable night at the Rift.`,
					``,
					`🎟️ *Pass Details:* ${p2}`,
					`🧾 *Order ID:* ${p3}`,
					``,
					`👇 *Access Your Digital Pass & QR Code:*`,
					`${p4}`,
					``,
					`⚠️ *Important Gate Rules:*`,
					`• Bring a valid ID matching your registration details.`,
					`• Keep your QR code saved offline or loaded before arrival at the gate.`,
					`• Passes are single-entry only.`,
					``,
					`Need help? Reply directly to this message.`
				].join("\n");
			}
			case "event_reminder_24h": {
				const [p1, p2, p3, p4] = metaParams;
				return [
					`🔥 *24 HOURS TO HAUNTINGS OF THE RIFT* 🔥`,
					``,
					`Hey ${p1}, tomorrow is the night! Gates open in less than 24 hours.`,
					``,
					`📍 *Venue:* ${p2}`,
					`⏰ *Gates Open:* ${p3}`,
					``,
					`⚡ *Fast-Track Gate Check-in:*`,
					`Have your digital pass open and saved on your phone before arriving at the security turnstiles:`,
					`${p4}`,
					``,
					`🚗 *Gate Tip:* Traffic builds up quickly near the entrance. Arrive early to clear security and skip the queues.`,
					``,
					`See you in the Rift!`
				].join("\n");
			}
			case "refund_notice": {
				const [p1, p2, p3, p4] = metaParams;
				return [
					`ℹ️ *REFUND PROCESSED — HAUNTINGS OF THE RIFT*`,
					``,
					`Hello ${p1},`,
					``,
					`Your refund request for Hauntings of the Rift has been processed successfully.`,
					``,
					`💰 *Amount Refunded:* KES ${p2}`,
					`🧾 *Reference No:* ${p3}`,
					`📌 *Reason:* ${p4}`,
					``,
					`The funds have been reversed to your original payment account (M-Pesa / Card). Reversals typically reflect within 15–30 minutes, but may take up to 24 hours depending on network processing.`,
					``,
					`Your associated digital passes have been invalidated. If you have questions, please reply directly to this message.`
				].join("\n");
			}
			case "gate_alert": {
				const [p1, p2] = metaParams;
				return [
					`✅ *GATE CHECK-IN CONFIRMED*`,
					`Welcome to Hauntings of the Rift, *${p1}*!`,
					`Pass *${p2}* was verified at the entrance gate. Enjoy the night! 🍸`
				].join("\n");
			}
			default: return `Notification from Verve & Co. regarding Hauntings of the Rift.`;
		}
	}
	/**
	* Dispatch notification to recipient phone number
	*/
	static async sendNotification(payload) {
		const formattedMessage = this.formatMessage(payload);
		const metaParams = this.getMetaParameters(payload.template, payload.params || {});
		const cleanPhone = payload.recipientPhone.replace(/[^0-9+]/g, "");
		const messageId = `wa_msg_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
		const timestamp = (/* @__PURE__ */ new Date()).toISOString();
		const apiKey = process.env.WHATSAPP_API_KEY || process.env.TWILIO_AUTH_TOKEN;
		if (apiKey) try {
			const endpoint = process.env.WHATSAPP_API_URL || "https://graph.facebook.com/v19.0/YOUR_PHONE_NUMBER_ID/messages";
			const bodyPayload = {
				messaging_product: "whatsapp",
				to: cleanPhone,
				type: "template",
				template: {
					name: payload.template,
					language: { code: "en" },
					components: [{
						type: "body",
						parameters: metaParams.map((text) => ({
							type: "text",
							text
						}))
					}]
				}
			};
			if ((await fetch(endpoint, {
				method: "POST",
				headers: {
					Authorization: `Bearer ${apiKey}`,
					"Content-Type": "application/json"
				},
				body: JSON.stringify(bodyPayload)
			})).ok) return {
				success: true,
				messageId,
				status: "dispatched",
				recipient: cleanPhone,
				template: payload.template,
				metaParameters: metaParams,
				formattedMessage,
				timestamp
			};
		} catch (err) {
			console.warn("WhatsApp Gateway dispatch error, falling back to simulation:", err);
		}
		console.log(`%c[WhatsApp Meta Dispatch (${payload.template}) to ${cleanPhone}]`, "color: #25D366; font-weight: bold;", `\nParameters: [${metaParams.join(", ")}]\n\n${formattedMessage}`);
		return {
			success: true,
			messageId,
			status: "simulated",
			recipient: cleanPhone,
			template: payload.template,
			metaParameters: metaParams,
			formattedMessage,
			timestamp
		};
	}
};
var refundsStore = /* @__PURE__ */ new Map();
var seedRefund = {
	id: "ref-seed-001",
	transactionId: "tx_seed_005",
	orderId: "ord-demo-rift-005",
	orderNumber: "HR-2026-9046",
	ticketNumber: "HR-1209-7734",
	attendeeName: "Samantha Njeri",
	amountKes: 1800,
	originalAmountKes: 1800,
	reason: "Customer travel cancellation request prior to cut-off",
	refundType: "full",
	status: "processed",
	processedBy: "admin-erastus@verve.co.ke",
	refundRef: "REV-MPESA-98842",
	createdAt: (/* @__PURE__ */ new Date(Date.now() - 72e6)).toISOString()
};
refundsStore.set(seedRefund.id, seedRefund);
var RefundService = class {
	/**
	* Get all refunds
	*/
	static getAllRefunds() {
		return Array.from(refundsStore.values()).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
	}
	/**
	* Process a Full or Partial Refund for an Order / Ticket
	*/
	static async processRefund(params) {
		const { orderId, ticketNumber, amountKes, reason, refundType = "full", processedBy = "admin@verve.co.ke", actorId, clientIp } = params;
		const allTickets = TicketsServerService.getAllTickets();
		let targetTicket = ticketNumber ? allTickets.find((t) => t.ticketNumber === ticketNumber) : void 0;
		if (!targetTicket && orderId) targetTicket = allTickets.find((t) => t.orderId === orderId || t.orderNumber === orderId);
		if (!targetTicket) return {
			success: false,
			message: "No active ticket found for this order ID or ticket code."
		};
		if (targetTicket.status === "refunded") return {
			success: false,
			message: `Ticket ${targetTicket.ticketNumber} has already been refunded.`
		};
		if (amountKes <= 0 || amountKes > targetTicket.priceKes) return {
			success: false,
			message: `Refund amount must be between KES 1 and KES ${targetTicket.priceKes.toLocaleString()}.`
		};
		const refundRef = `REV-MPESA-${Date.now().toString(36).toUpperCase()}`;
		const refundRecord = {
			id: `ref-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
			transactionId: `tx_${targetTicket.orderId}`,
			orderId: targetTicket.orderId,
			orderNumber: targetTicket.orderNumber,
			ticketNumber: targetTicket.ticketNumber,
			attendeeName: targetTicket.attendeeName,
			amountKes: Number(amountKes),
			originalAmountKes: targetTicket.priceKes,
			reason,
			refundType,
			status: "processed",
			processedBy,
			refundRef,
			createdAt: (/* @__PURE__ */ new Date()).toISOString()
		};
		refundsStore.set(refundRecord.id, refundRecord);
		targetTicket.status = "refunded";
		TicketsServerService.updateTicketRecord(targetTicket);
		await AdminServerService.recordAuditLog({
			actorId: actorId || "admin-refund-officer",
			actorEmail: processedBy,
			actorRole: "admin",
			action: "order.refunded",
			targetTable: "refunds",
			targetId: refundRecord.id,
			metadata: {
				orderNumber: targetTicket.orderNumber,
				ticketNumber: targetTicket.ticketNumber,
				attendeeName: targetTicket.attendeeName,
				amountKes,
				refundType,
				reason,
				refundRef
			},
			ipAddress: clientIp
		});
		if (isServerSupabaseConfigured && supabaseServer) try {
			await supabaseServer.from("refunds").insert({
				id: refundRecord.id,
				order_id: targetTicket.orderId,
				ticket_number: targetTicket.ticketNumber,
				amount: amountKes,
				reason,
				status: "processed",
				processed_by: processedBy,
				refund_ref: refundRef
			});
		} catch (err) {
			console.warn("Could not insert refund into Supabase:", err);
		}
		if (targetTicket.buyerPhone) WhatsAppNotificationService.sendNotification({
			recipientPhone: targetTicket.buyerPhone,
			template: "refund_notice",
			params: {
				customerName: targetTicket.attendeeName,
				refundAmountKes: amountKes,
				paymentProviderRef: refundRef,
				reasonOrDetails: reason,
				orderId: targetTicket.orderNumber || targetTicket.orderId
			}
		}).catch((err) => console.warn("[WhatsApp Refund Notice Error]", err));
		if (targetTicket.buyerEmail) sendRefundNoticeEmail({
			to: targetTicket.buyerEmail,
			customerName: targetTicket.attendeeName,
			refundAmount: amountKes,
			paymentRef: refundRef,
			refundReason: reason,
			orderId: targetTicket.orderNumber || targetTicket.orderId
		}).catch((err) => console.warn("[Email Refund Notice Error]", err));
		return {
			success: true,
			message: `Refund of KES ${amountKes.toLocaleString()} successfully processed (${refundRef}). Pass invalidated.`,
			refund: refundRecord,
			ticket: targetTicket
		};
	}
	/**
	* Compute Financial Reconciliation Metrics & Transaction Ledger
	*/
	static getReconciliationData() {
		const tickets = TicketsServerService.getAllTickets();
		const refunds = Array.from(refundsStore.values());
		const totalTicketsSold = tickets.length;
		const grossRevenueKes = tickets.reduce((sum, t) => sum + (t.priceKes || 0), 0);
		const totalRefundsKes = refunds.reduce((sum, r) => sum + (r.amountKes || 0), 0);
		const platformFeesKes = Math.round(grossRevenueKes * .025);
		return {
			totals: {
				grossRevenueKes,
				totalRefundsKes,
				platformFeesKes,
				netRevenueKes: grossRevenueKes - totalRefundsKes - platformFeesKes,
				totalTicketsSold,
				totalRefundsCount: refunds.length
			},
			ledger: tickets.map((t) => {
				const refund = refunds.find((r) => r.ticketNumber === t.ticketNumber || r.orderId === t.orderId);
				const isRefunded = t.status === "refunded" || Boolean(refund);
				const fee = Math.round(t.priceKes * .025);
				const net = isRefunded ? 0 : t.priceKes - fee;
				let status = "Matched";
				if (isRefunded) status = "Refunded";
				else if (t.status === "cancelled") status = "Discrepancy";
				return {
					transactionId: `tx_${t.ticketNumber}`,
					orderNumber: t.orderNumber,
					gatewayRef: `MPESA-${t.ticketNumber.replace(/-/g, "")}`,
					attendeeName: t.attendeeName,
					tierName: t.tierName,
					amountKes: t.priceKes,
					gatewayFeeKes: fee,
					netRevenueKes: net,
					status,
					createdAt: t.issuedAt
				};
			}),
			refunds
		};
	}
};
var rateLimitBuckets = /* @__PURE__ */ new Map();
var SlidingWindowRateLimiter = class {
	/**
	* Evaluates if an IP / key is allowed to proceed
	*/
	static check(key, action, config = {
		windowMs: 6e4,
		maxRequests: 30
	}) {
		const bucketKey = `${action}:${key}`;
		const now = Date.now();
		const windowStart = now - config.windowMs;
		let bucket = rateLimitBuckets.get(bucketKey);
		if (!bucket) {
			bucket = { timestamps: [] };
			rateLimitBuckets.set(bucketKey, bucket);
		}
		bucket.timestamps = bucket.timestamps.filter((ts) => ts > windowStart);
		if (bucket.timestamps.length >= config.maxRequests) {
			const oldestTs = bucket.timestamps[0] || now;
			return {
				allowed: false,
				remaining: 0,
				resetInMs: Math.max(0, oldestTs + config.windowMs - now)
			};
		}
		bucket.timestamps.push(now);
		return {
			allowed: true,
			remaining: config.maxRequests - bucket.timestamps.length,
			resetInMs: config.windowMs
		};
	}
	/**
	* Periodic garbage collection of stale keys
	*/
	static cleanup() {
		const now = Date.now();
		for (const [key, bucket] of rateLimitBuckets.entries()) {
			bucket.timestamps = bucket.timestamps.filter((ts) => ts > now - 36e5);
			if (bucket.timestamps.length === 0) rateLimitBuckets.delete(key);
		}
	}
};
if (typeof setInterval !== "undefined") setInterval(() => SlidingWindowRateLimiter.cleanup(), 9e5);
/**
* Zod Schemas for API Request Payload Validation & Defensive Hardening
*/
var validateTicketSchema = objectType({
	ticket_code: stringType().min(5, "Ticket code too short").max(50, "Ticket code too long").regex(/^[A-Za-z0-9-_]+$/, "Invalid ticket code characters"),
	qr_hash: stringType().optional(),
	event_id: stringType().default("hauntings-of-the-rift-2026"),
	staff_name: stringType().max(100).default("Gate Security Staff"),
	gate_location: stringType().max(100).default("Main Top Cliff Entrance")
});
objectType({
	ticketTypeId: stringType().min(1, "Ticket type is required"),
	quantity: numberType().int().min(1).max(20, "Cannot purchase more than 20 tickets at once"),
	buyerName: stringType().min(2, "Name must be at least 2 characters").max(100),
	buyerPhone: stringType().min(9, "Valid Kenyan phone number required").max(15),
	buyerEmail: stringType().email("Valid email required").optional().or(literalType("")),
	promoCode: stringType().max(30).optional().or(literalType("")),
	idempotencyKey: stringType().max(100).optional()
});
objectType({
	idempotencyKey: stringType().min(5, "Idempotency key required"),
	orderId: stringType().min(5, "Order ID required"),
	token: stringType().min(10, "Checkout authorization token required"),
	mpesaReceipt: stringType().max(50).optional()
});
objectType({
	email: stringType().email("Valid email required").optional().or(literalType("")),
	phone: stringType().min(9).max(15).optional().or(literalType(""))
});
var processRefundSchema = objectType({
	orderId: stringType().min(1, "Order ID is required"),
	ticketNumber: stringType().optional(),
	amountKes: numberType().positive("Refund amount must be greater than zero"),
	reason: stringType().min(3, "Refund reason is required").max(255),
	refundType: enumType(["full", "partial"]).default("full"),
	actorEmail: stringType().email().default("admin@verve.co.ke"),
	actorId: stringType().optional()
});
var sendWhatsAppNotificationSchema = objectType({
	phone: stringType().min(9, "Phone number required").max(20),
	templateType: enumType([
		"booking_confirmation",
		"event_reminder_24h",
		"refund_notice",
		"gate_alert"
	]),
	customerName: stringType().optional(),
	passTierAndQuantity: stringType().optional(),
	orderId: stringType().optional(),
	ticketAccessUrl: stringType().optional(),
	venueNameOrLocation: stringType().optional(),
	gateOpeningTime: stringType().optional(),
	fastPassLink: stringType().optional(),
	refundAmountKes: unionType([numberType(), stringType()]).optional(),
	paymentProviderRef: stringType().optional(),
	reasonOrDetails: stringType().optional(),
	attendeeName: stringType().optional(),
	ticketCode: stringType().optional(),
	tierName: stringType().optional(),
	orderNumber: stringType().optional(),
	totalKes: numberType().optional(),
	directTicketUrl: stringType().optional()
});
var sendEmailNotificationSchema = objectType({
	to: stringType().email("Valid email required"),
	templateType: enumType([
		"booking_confirmation",
		"event_reminder_24h",
		"refund_notice"
	]),
	customer_name: stringType().optional(),
	ticket_tier: stringType().optional(),
	quantity: unionType([numberType(), stringType()]).optional(),
	total_amount: unionType([numberType(), stringType()]).optional(),
	order_id: stringType().optional(),
	event_date: stringType().optional(),
	ticket_url: stringType().optional(),
	venue_name: stringType().optional(),
	gate_opening_time: stringType().optional(),
	refund_amount: unionType([numberType(), stringType()]).optional(),
	payment_ref: stringType().optional(),
	refund_reason: stringType().optional()
});
objectType({
	code: stringType().min(3, "Code must be at least 3 characters").max(25).regex(/^[A-Z0-9_-]+$/, "Code must contain only uppercase alphanumeric characters"),
	name: stringType().max(100).optional(),
	discountType: enumType(["percentage", "fixed"]),
	discountValue: numberType().positive("Discount value must be positive"),
	maxUses: numberType().int().positive().default(100),
	expiresAt: stringType().nullable().optional(),
	isActive: booleanType().default(true)
});
/**
* Defensive Input Sanitization & Anti-Abuse
* Strips script injections, malicious HTML tags, and SQL control escape characters.
*/
function sanitizeString(input) {
	if (!input) return "";
	return input.replace(/[<>]/g, "").replace(/javascript:/gi, "").replace(/on\w+\s*=/gi, "").replace(/--/g, "").replace(/;/g, "").trim();
}
function sanitizeObject(obj) {
	const clean = { ...obj };
	for (const [key, value] of Object.entries(clean)) if (typeof value === "string") clean[key] = sanitizeString(value);
	else if (value && typeof value === "object" && !Array.isArray(value)) clean[key] = sanitizeObject(value);
	return clean;
}
async function handleApiRequest(request) {
	const url = new URL(request.url);
	const pathname = url.pathname;
	const method = request.method.toUpperCase();
	const json = (data, status = 200) => {
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
				"Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With, Idempotency-Key"
			}
		});
	};
	const errorJson = (message, code = "ERROR", status = 400, extra) => {
		return json({
			success: false,
			code,
			message,
			...extra || {}
		}, status);
	};
	if (method === "OPTIONS") return new Response(null, {
		status: 204,
		headers: {
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Methods": "GET, POST, PATCH, DELETE, OPTIONS",
			"Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With, Idempotency-Key",
			"Access-Control-Max-Age": "86400"
		}
	});
	try {
		if (pathname === "/api/health") return json({
			status: "ok",
			time: (/* @__PURE__ */ new Date()).toISOString()
		});
		if ((pathname === "/api/orders/create" || pathname === "/api/orders/reserve") && method === "POST") {
			let body;
			try {
				body = await request.json();
			} catch {
				return errorJson("Invalid JSON request body.", "INVALID_JSON", 400);
			}
			const ticketTypeId = String(body["ticket_type_id"] || body["ticketTypeId"] || "");
			const quantity = parseInt(String(body["quantity"] || "1"), 10);
			const buyerName = String(body["buyer_name"] || body["buyerName"] || "");
			const buyerPhone = String(body["buyer_phone"] || body["buyerPhone"] || "");
			const buyerEmail = body["buyer_email"] || body["buyerEmail"] ? String(body["buyer_email"] || body["buyerEmail"]).trim().toLowerCase() : void 0;
			const idempotencyKey = body["idempotency_key"] || body["idempotencyKey"] ? String(body["idempotency_key"] || body["idempotencyKey"]) : void 0;
			const clientIp = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "127.0.0.1";
			const result = await OrderService.createOrder({
				ticketTypeId,
				quantity,
				buyerName,
				buyerPhone,
				buyerEmail,
				idempotencyKey,
				clientIp
			});
			if (!result.success) {
				let status = 400;
				if (result.code === "RATE_LIMITED") status = 429;
				if (result.code === "TICKET_NOT_FOUND" || result.code === "EVENT_NOT_FOUND") status = 404;
				if (result.code === "INSUFFICIENT_INVENTORY" || result.code === "IDEMPOTENCY_CONFLICT") status = 409;
				return json(result, status);
			}
			return json(result, 201);
		}
		if (pathname === "/api/orders/submit-mpesa-code" && method === "POST") {
			let body;
			try {
				body = await request.json();
			} catch {
				return errorJson("Invalid JSON request body.", "INVALID_JSON", 400);
			}
			const orderId = String(body["order_id"] || body["orderId"] || "");
			const checkoutToken = body["token"] || body["checkoutToken"] ? String(body["token"] || body["checkoutToken"]) : void 0;
			const rawInput = String(body["mpesa_code"] || body["mpesaCode"] || body["mpesa_message"] || body["mpesaMessage"] || "");
			const buyerEmail = body["buyer_email"] || body["buyerEmail"] ? String(body["buyer_email"] || body["buyerEmail"]).trim().toLowerCase() : void 0;
			if (!orderId) return errorJson("order_id is required.", "INVALID_INPUT", 400);
			if (!rawInput || rawInput.trim().length < 5) return errorJson("Please enter a valid M-Pesa transaction confirmation message or reference code.", "INVALID_INPUT", 400);
			const codeRegexMatch = rawInput.match(/\b([A-Z0-9]{10})\b/i);
			const extractedCode = codeRegexMatch ? codeRegexMatch[1].toUpperCase() : rawInput.trim().toUpperCase();
			const result = OrderService.submitMpesaCode({
				orderId,
				checkoutToken,
				mpesaCode: extractedCode,
				mpesaMessage: rawInput.trim(),
				buyerEmail
			});
			if (!result.success) return json(result, result.code === "NOT_FOUND" ? 404 : 400);
			return json({
				success: true,
				orderId,
				mpesaCode: extractedCode,
				status: "pending_approval",
				message: "M-Pesa code submitted. Ticket approval dispatched to admin.",
				order: result.order
			});
		}
		const orderMatch = pathname.match(/^\/api\/orders\/([a-zA-Z0-9_-]+)$/);
		if (orderMatch && method === "GET") {
			const orderId = orderMatch[1];
			const token = url.searchParams.get("token") || request.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
			if (!token) return errorJson("Authorization token required for order lookup.", "UNAUTHORIZED", 401);
			const order = OrderService.getOrder(orderId, token);
			if (!order) return errorJson("Order not found or authorization token invalid.", "UNAUTHORIZED", 401);
			return json(order);
		}
		if (pathname === "/api/orders/cancel" && method === "POST") {
			let body;
			try {
				body = await request.json();
			} catch {
				return errorJson("Invalid JSON request body.", "INVALID_JSON", 400);
			}
			const orderId = String(body["order_id"] || body["orderId"] || "");
			const token = String(body["token"] || body["checkoutToken"] || "");
			if (!orderId || !token) return errorJson("order_id and token are required.", "INVALID_INPUT", 400);
			const cancelResult = OrderService.cancelOrder(orderId, token);
			if (!cancelResult.success) {
				let status = 400;
				if (cancelResult.code === "UNAUTHORIZED") status = 401;
				if (cancelResult.code === "NOT_FOUND") status = 404;
				if (cancelResult.code === "ORDER_EXPIRED") status = 410;
				return json(cancelResult, status);
			}
			return json({
				success: true,
				message: "Reservation released successfully."
			});
		}
		if (pathname === "/api/payments/mpesa/stkpush" && method === "POST") {
			let body;
			try {
				body = await request.json();
			} catch {
				return errorJson("Invalid JSON request body.", "INVALID_JSON", 400);
			}
			const orderId = String(body["order_id"] || body["orderId"] || "");
			const checkoutToken = String(body["checkout_token"] || body["checkoutToken"] || "");
			if (!orderId || !checkoutToken) return errorJson("order_id and checkout_token are required.", "INVALID_INPUT", 400);
			const clientIp = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "127.0.0.1";
			const stkResult = await MpesaService.initiateStkPush({
				orderId,
				checkoutToken,
				clientIp
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
		if (pathname === "/api/payments/mpesa/callback" && method === "POST") {
			let callbackBody;
			try {
				callbackBody = await request.json();
			} catch {
				return errorJson("Invalid JSON callback payload.", "INVALID_JSON", 400);
			}
			const { statusCode, response } = await MpesaService.processCallback(callbackBody);
			return json(response, statusCode);
		}
		if (pathname === "/api/payments/status" && method === "GET") {
			const orderId = url.searchParams.get("order_id") || url.searchParams.get("orderId");
			const token = url.searchParams.get("token") || request.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
			if (!orderId || !token) return errorJson("order_id and checkout token are required for payment status.", "UNAUTHORIZED", 401);
			const statusResult = MpesaService.getPaymentStatus(orderId, token);
			if (!statusResult) return errorJson("Order not found or authorization token invalid.", "UNAUTHORIZED", 401);
			if (statusResult.paymentStatus === "successful" || statusResult.orderStatus === "paid") try {
				await TicketsServerService.issueTicketsForOrder(orderId, token);
			} catch (e) {
				console.warn("Could not auto-issue tickets on poll:", e);
			}
			return json(statusResult);
		}
		if (pathname === "/api/pay/verify" && method === "POST") {
			let body;
			try {
				body = await request.json();
			} catch {
				return errorJson("Invalid JSON request body.", "INVALID_JSON", 400);
			}
			const idempotencyKey = String(body["idempotency_key"] || body["idempotencyKey"] || "");
			const orderId = String(body["order_id"] || body["orderId"] || "");
			const token = String(body["token"] || body["checkout_token"] || body["checkoutToken"] || "");
			const mpesaReceipt = body["mpesa_receipt"] ? String(body["mpesa_receipt"]) : void 0;
			const clientIp = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "127.0.0.1";
			const verifyResult = await TicketsServerService.verifyPayment({
				idempotencyKey,
				orderId,
				token,
				mpesaReceipt,
				clientIp
			});
			if (!verifyResult.success) {
				let status = 400;
				if (verifyResult.code === "TRANSACTION_PENDING") status = 409;
				if (verifyResult.code === "ORDER_NOT_FOUND") status = 404;
				return json(verifyResult, status);
			}
			return json(verifyResult, 200);
		}
		if (pathname === "/api/tickets/recover/verify" && method === "GET") {
			const token = url.searchParams.get("token");
			if (!token) return errorJson("Recovery token parameter required.", "TOKEN_REQUIRED", 400);
			const verifyResult = TicketsServerService.verifyRecoveryToken(token);
			if (!verifyResult.valid) return json({
				success: false,
				expired: verifyResult.expired,
				message: verifyResult.expired ? "This recovery link has expired. Please request a new link." : "Invalid or forged recovery token."
			}, 401);
			return json({
				success: true,
				email: verifyResult.email,
				tickets: verifyResult.tickets
			});
		}
		if (pathname === "/api/tickets/recover" && method === "POST") {
			let body;
			try {
				body = await request.json();
			} catch {
				return errorJson("Invalid JSON request body.", "INVALID_JSON", 400);
			}
			const email = body["email"] ? String(body["email"]).trim() : void 0;
			const phone = body["phone"] ? String(body["phone"]).trim() : void 0;
			if (!email && !phone) return errorJson("Please provide an email address or phone number.", "INPUT_REQUIRED", 400);
			const clientIp = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "127.0.0.1";
			const baseUrl = process.env.APP_URL || `${url.protocol}//${request.headers.get("host") || url.host}`;
			const recoveryResult = await TicketsServerService.recoverTicket({
				email,
				phone,
				clientIp,
				baseUrl
			});
			if (!recoveryResult.success) return json(recoveryResult, recoveryResult.code === "RATE_LIMITED" ? 429 : 400);
			return json(recoveryResult, 200);
		}
		const ticketMatch = pathname.match(/^\/api\/tickets\/([a-zA-Z0-9_-]+)$/);
		if (ticketMatch && method === "GET") {
			const code = ticketMatch[1];
			const lookupResult = TicketsServerService.getTicketByCode(code);
			if (!lookupResult.success || !lookupResult.ticket) return errorJson(lookupResult.message || "Ticket not found.", "TICKET_NOT_FOUND", 404);
			return json({
				success: true,
				ticket: lookupResult.ticket
			});
		}
		if ((pathname === "/api/tickets/validate" || pathname === "/api/tickets/checkin") && method === "POST") {
			const clientIp = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "127.0.0.1";
			if (!SlidingWindowRateLimiter.check(clientIp, "ticket_validate", {
				windowMs: 6e4,
				maxRequests: 60
			}).allowed) return errorJson("Scanner rate limit exceeded. Please wait a moment.", "RATE_LIMITED", 429);
			let rawBody;
			try {
				rawBody = await request.json();
			} catch {
				return errorJson("Invalid JSON request body.", "INVALID_JSON", 400);
			}
			const body = sanitizeObject(rawBody);
			const parseResult = validateTicketSchema.safeParse({
				ticket_code: body["ticket_code"] || body["code"] || body["ticket_number"],
				qr_hash: body["qr_hash"] || body["qrHash"],
				event_id: body["event_id"] || body["eventId"] || "hauntings-of-the-rift-2026",
				staff_name: body["staff_name"] || body["staffName"] || "Gate Security Staff",
				gate_location: body["gate_location"] || body["gateLocation"] || "Main Top Cliff Entrance"
			});
			if (!parseResult.success) return errorJson(parseResult.error.errors[0]?.message || "Invalid ticket payload", "VALIDATION_ERROR", 400);
			const { ticket_code, qr_hash, event_id, staff_name, gate_location } = parseResult.data;
			const checkInResult = await TicketsServerService.validateAndCheckinTicket({
				ticket_code,
				qr_hash,
				event_id,
				staff_name,
				gate_location,
				clientIp
			});
			return json(checkInResult, checkInResult.httpStatus);
		}
		if (pathname === "/api/tickets/stats" && method === "GET") return json({
			success: true,
			...TicketsServerService.getCheckinStats()
		});
		if (pathname === "/api/admin/overview" && method === "GET") return json({
			success: true,
			...AdminServerService.getOverviewMetrics()
		});
		if (pathname === "/api/admin/tickets" && method === "GET") {
			const search = url.searchParams.get("search") || void 0;
			const status = url.searchParams.get("status") || void 0;
			const tier = url.searchParams.get("tier") || void 0;
			const tickets = AdminServerService.getTickets({
				search,
				status,
				tier
			});
			return json({
				success: true,
				count: tickets.length,
				tickets
			});
		}
		if (pathname === "/api/admin/tickets/revoke" && method === "POST") {
			let body;
			try {
				body = await request.json();
			} catch {
				return errorJson("Invalid JSON request body.", "INVALID_JSON", 400);
			}
			const code = String(body["code"] || "");
			const reason = String(body["reason"] || "Manual organizer revocation");
			const actorEmail = String(body["actor_email"] || body["actorEmail"] || "admin@verve.co.ke");
			const actorId = body["actor_id"] ? String(body["actor_id"]) : void 0;
			const clientIp = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "127.0.0.1";
			const result = await AdminServerService.revokeTicket({
				code,
				reason,
				actorEmail,
				actorId,
				clientIp
			});
			return json(result, result.success ? 200 : 400);
		}
		if (pathname === "/api/admin/tickets/resend" && method === "POST") {
			let body;
			try {
				body = await request.json();
			} catch {
				return errorJson("Invalid JSON request body.", "INVALID_JSON", 400);
			}
			const code = String(body["code"] || "");
			const actorEmail = String(body["actor_email"] || body["actorEmail"] || "admin@verve.co.ke");
			const actorId = body["actor_id"] ? String(body["actor_id"]) : void 0;
			const clientIp = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "127.0.0.1";
			const result = await AdminServerService.resendTicketEmail({
				code,
				actorEmail,
				actorId,
				clientIp
			});
			return json(result, result.success ? 200 : 400);
		}
		if (pathname === "/api/admin/orders/pending" && method === "GET") {
			const pendingOrders = OrderService.getPendingOrders();
			return json({
				success: true,
				count: pendingOrders.length,
				orders: pendingOrders
			});
		}
		if (pathname === "/api/admin/orders/approve" && method === "POST") {
			let body;
			try {
				body = await request.json();
			} catch {
				return errorJson("Invalid JSON request body.", "INVALID_JSON", 400);
			}
			const orderId = String(body["order_id"] || body["orderId"] || "");
			const adminEmail = String(body["admin_email"] || body["adminEmail"] || "admin@verve.co.ke");
			if (!orderId) return errorJson("order_id is required.", "INVALID_INPUT", 400);
			const approveResult = OrderService.approveOrder({
				orderId,
				adminEmail
			});
			if (!approveResult.success || !approveResult.order) return json(approveResult, approveResult.code === "NOT_FOUND" ? 404 : 400);
			const order = approveResult.order;
			let tickets = [];
			try {
				tickets = await TicketsServerService.issueTicketsForApprovedOrder(orderId);
			} catch (err) {
				console.error("Failed to issue tickets for order:", err);
			}
			let emailResult = {
				success: false,
				simulated: false,
				reason: "No email provided on order"
			};
			const recipientEmail = order.buyerEmail;
			if (recipientEmail) try {
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
						qrDataUrl: `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(JSON.stringify({
							code: t.ticketNumber,
							hash: t.qrHash,
							event: "HALLOWEEN_RIFT_2026",
							admits: t.admitsCount
						}))}`
					}))
				});
				emailResult = {
					success: emailResponse.success,
					simulated: "simulated" in emailResponse ? Boolean(emailResponse.simulated) : false,
					reason: emailResponse.success ? "Email dispatched successfully" : "Email service returned failure"
				};
			} catch (emailErr) {
				console.error("Error sending ticket email:", emailErr);
				emailResult = {
					success: false,
					simulated: false,
					reason: emailErr instanceof Error ? emailErr.message : "Error sending email"
				};
			}
			return json({
				success: true,
				message: `Order ${order.orderNumber} successfully approved and ${tickets.length} ticket(s) issued.`,
				order,
				tickets,
				emailDelivery: emailResult
			});
		}
		if (pathname === "/api/admin/orders/reject" && method === "POST") {
			let body;
			try {
				body = await request.json();
			} catch {
				return errorJson("Invalid JSON request body.", "INVALID_JSON", 400);
			}
			const orderId = String(body["order_id"] || body["orderId"] || "");
			const reason = String(body["reason"] || "M-Pesa transaction reference could not be verified.");
			const adminEmail = String(body["admin_email"] || body["adminEmail"] || "admin@verve.co.ke");
			if (!orderId) return errorJson("order_id is required.", "INVALID_INPUT", 400);
			const rejectResult = OrderService.rejectOrder({
				orderId,
				reason,
				adminEmail
			});
			if (!rejectResult.success) return json(rejectResult, rejectResult.code === "NOT_FOUND" ? 404 : 400);
			return json({
				success: true,
				message: `Order ${orderId} marked as rejected.`,
				order: rejectResult.order
			});
		}
		if (pathname === "/api/admin/orders/seed-demo" && method === "POST") {
			const demoOrder = await OrderService.createOrder({
				ticketTypeId: "rift-coven",
				quantity: 1,
				buyerName: "Faith Chebet",
				buyerPhone: "0712345678",
				buyerEmail: "faith.chebet@example.com"
			});
			if (demoOrder.success) {
				OrderService.submitMpesaCode({
					orderId: demoOrder.orderId,
					mpesaCode: "TLK99XW82A",
					mpesaMessage: "TLK99XW82A Confirmed. Ksh 10,000 sent to HALLOWEEN RIFT PARTY on 21/09/2026 at 2:30 PM. New M-PESA balance is Ksh 45,210.",
					buyerEmail: "faith.chebet@example.com"
				});
				return json({
					success: true,
					message: "Demo pending order created for verification testing.",
					orderId: demoOrder.orderId
				});
			}
			return json({
				success: false,
				message: "Failed to create demo order."
			}, 500);
		}
		if (pathname === "/api/admin/promotions" && method === "GET") {
			const promotions = AdminServerService.getPromotions();
			return json({
				success: true,
				count: promotions.length,
				promotions
			});
		}
		if (pathname === "/api/admin/promotions" && method === "POST") {
			let body;
			try {
				body = await request.json();
			} catch {
				return errorJson("Invalid JSON request body.", "INVALID_JSON", 400);
			}
			const code = String(body["code"] || "");
			const name = body["name"] ? String(body["name"]) : void 0;
			const discountType = String(body["discount_type"] || body["discountType"] || "percentage");
			const discountValue = Number(body["discount_value"] ?? body["discountValue"] ?? 0);
			const maxUses = Number(body["max_uses"] ?? body["maxUses"] ?? 100);
			const expiresAt = body["expires_at"] || body["expiresAt"] ? String(body["expires_at"] || body["expiresAt"]) : null;
			const isActive = body["is_active"] !== false && body["isActive"] !== false;
			const actorEmail = String(body["actor_email"] || body["actorEmail"] || "admin@verve.co.ke");
			const actorId = body["actor_id"] ? String(body["actor_id"]) : void 0;
			const clientIp = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "127.0.0.1";
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
				clientIp
			});
			return json(result, result.success ? 201 : 400);
		}
		if ((pathname === "/api/admin/promotions/toggle" || pathname.startsWith("/api/admin/promotions/") && pathname.endsWith("/toggle")) && (method === "POST" || method === "PATCH")) {
			let body = {};
			try {
				body = await request.json();
			} catch {}
			let codeOrId = String(body["code"] || body["id"] || "");
			if (!codeOrId && pathname.includes("/toggle")) {
				const parts = pathname.split("/");
				codeOrId = parts[parts.indexOf("toggle") - 1] || "";
			}
			const isActive = Boolean(body["is_active"] ?? body["isActive"] ?? true);
			const actorEmail = String(body["actor_email"] || body["actorEmail"] || "admin@verve.co.ke");
			const actorId = body["actor_id"] ? String(body["actor_id"]) : void 0;
			const clientIp = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "127.0.0.1";
			const result = await AdminServerService.togglePromotion({
				codeOrId,
				isActive,
				actorEmail,
				actorId,
				clientIp
			});
			return json(result, result.success ? 200 : 400);
		}
		if ((pathname === "/api/admin/promotions/delete" || pathname.startsWith("/api/admin/promotions/") && method === "DELETE") && (method === "POST" || method === "DELETE")) {
			let codeOrId = "";
			if (method === "DELETE") codeOrId = pathname.split("/").pop() || "";
			else {
				const body = await request.json().catch(() => ({}));
				codeOrId = String(body["code"] || body["id"] || "");
			}
			const actorEmail = "admin@verve.co.ke";
			const clientIp = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "127.0.0.1";
			const result = await AdminServerService.deletePromotion({
				codeOrId,
				actorEmail,
				clientIp
			});
			return json(result, result.success ? 200 : 400);
		}
		if (pathname === "/api/promotions/validate" && method === "POST") {
			let body;
			try {
				body = await request.json();
			} catch {
				return errorJson("Invalid JSON request body.", "INVALID_JSON", 400);
			}
			const code = String(body["code"] || "");
			const subtotalKes = Number(body["subtotal_kes"] || body["subtotalKes"] || 0);
			const result = AdminServerService.validatePromoCode(code, subtotalKes);
			return json(result, result.valid ? 200 : 400);
		}
		if (pathname === "/api/admin/audit-logs" && method === "GET") {
			const logs = AdminServerService.getAuditLogs();
			return json({
				success: true,
				count: logs.length,
				logs
			});
		}
		if (pathname === "/api/admin/scanners" && method === "GET") {
			const scanners = AdminServerService.getScanners();
			return json({
				success: true,
				count: scanners.length,
				scanners
			});
		}
		if (pathname === "/api/admin/refunds/process" && method === "POST") {
			let rawBody;
			try {
				rawBody = await request.json();
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
				actorId: body["actorId"] || body["actor_id"]
			});
			if (!parseResult.success) return errorJson(parseResult.error.errors[0]?.message || "Invalid refund payload", "VALIDATION_ERROR", 400);
			const clientIp = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "127.0.0.1";
			const refundResult = await RefundService.processRefund({
				...parseResult.data,
				clientIp
			});
			return json(refundResult, refundResult.success ? 200 : 400);
		}
		if (pathname === "/api/admin/reconciliation" && method === "GET") return json({
			success: true,
			...RefundService.getReconciliationData()
		});
		if (pathname === "/api/notifications/whatsapp" && method === "POST") {
			let rawBody;
			try {
				rawBody = await request.json();
			} catch {
				return errorJson("Invalid JSON request body.", "INVALID_JSON", 400);
			}
			const body = sanitizeObject(rawBody);
			const parseResult = sendWhatsAppNotificationSchema.safeParse({
				phone: body["phone"] || body["recipientPhone"] || body["recipient_phone"],
				templateType: body["templateType"] || body["template"] || "booking_confirmation",
				customerName: body["customerName"] || body["customer_name"] || body["attendeeName"] || body["attendee_name"] || "Valued Guest",
				passTierAndQuantity: body["passTierAndQuantity"] || body["pass_tier_quantity"] || (body["tierName"] ? `${body["tierName"]} (x1)` : void 0),
				orderId: body["orderId"] || body["order_id"] || body["orderNumber"] || body["order_number"],
				ticketAccessUrl: body["ticketAccessUrl"] || body["ticket_access_url"] || body["directTicketUrl"] || body["direct_ticket_url"],
				venueNameOrLocation: body["venueNameOrLocation"] || body["venue_name"] || "Top Cliff Lounge, Nakuru",
				gateOpeningTime: body["gateOpeningTime"] || body["gate_opening_time"] || "18:00 EAT",
				fastPassLink: body["fastPassLink"] || body["fast_pass_link"],
				refundAmountKes: body["refundAmountKes"] || body["refund_amount_kes"] || body["refund_amount"],
				paymentProviderRef: body["paymentProviderRef"] || body["payment_ref"] || body["payment_provider_ref"],
				reasonOrDetails: body["reasonOrDetails"] || body["reason"] || body["refund_reason"],
				attendeeName: body["attendeeName"] || body["customerName"],
				ticketCode: body["ticketCode"] || body["ticket_code"],
				tierName: body["tierName"] || body["tier_name"],
				orderNumber: body["orderNumber"] || body["order_number"],
				totalKes: body["totalKes"] ? Number(body["totalKes"]) : void 0,
				directTicketUrl: body["directTicketUrl"] || body["ticketAccessUrl"]
			});
			if (!parseResult.success) return errorJson(parseResult.error.errors[0]?.message || "Invalid WhatsApp notification payload", "VALIDATION_ERROR", 400);
			const data = parseResult.data;
			return json(await WhatsAppNotificationService.sendNotification({
				recipientPhone: data.phone,
				template: data.templateType,
				params: {
					customerName: data.customerName || data.attendeeName || "Valued Guest",
					passTierAndQuantity: data.passTierAndQuantity || (data.tierName ? `${data.tierName} (x1)` : "General Admission Pass (x1)"),
					orderId: data.orderId || data.orderNumber || "HR-2026-CONFIRMED",
					ticketAccessUrl: data.ticketAccessUrl || data.directTicketUrl || "https://hauntingsoftherift.co.ke/ticket/demo",
					venueNameOrLocation: data.venueNameOrLocation || "Top Cliff Lounge, Nakuru",
					gateOpeningTime: data.gateOpeningTime || "18:00 EAT",
					fastPassLink: data.fastPassLink || data.ticketAccessUrl || "https://hauntingsoftherift.co.ke/ticket/demo",
					refundAmountKes: data.refundAmountKes || "1,800",
					paymentProviderRef: data.paymentProviderRef || "REV-MPESA-DEFAULT",
					reasonOrDetails: data.reasonOrDetails || "Customer cancellation request"
				}
			}), 200);
		}
		if (pathname === "/api/notifications/email" && method === "POST") {
			let rawBody;
			try {
				rawBody = await request.json();
			} catch {
				return errorJson("Invalid JSON request body.", "INVALID_JSON", 400);
			}
			const body = sanitizeObject(rawBody);
			const parseResult = sendEmailNotificationSchema.safeParse(body);
			if (!parseResult.success) return errorJson(parseResult.error.errors[0]?.message || "Invalid Email notification payload", "VALIDATION_ERROR", 400);
			const { to, templateType, customer_name = "Valued Guest", ticket_tier = "General Admission Pass", quantity = 1, total_amount = "1,800", order_id = "HR-2026-CONFIRMED", event_date = "Saturday, 31 October 2026", ticket_url = "https://hauntingsoftherift.co.ke/ticket/demo", venue_name = "Top Cliff Lounge, Nakuru", gate_opening_time = "18:00 EAT", refund_amount = "1,800", payment_ref = "REV-MPESA-DEFAULT", refund_reason = "Customer cancellation request" } = parseResult.data;
			let emailResult;
			if (templateType === "booking_confirmation") emailResult = await sendTicketConfirmationEmail({
				to,
				buyerName: customer_name,
				orderNumber: order_id,
				totalKes: typeof total_amount === "number" ? total_amount : Number(String(total_amount).replace(/,/g, "")) || 1800,
				ticketTier: ticket_tier,
				quantity: Number(quantity) || 1,
				ticketUrl: ticket_url
			});
			else if (templateType === "event_reminder_24h") emailResult = await sendEventReminder24hEmail({
				to,
				customerName: customer_name,
				venueName: venue_name,
				gateOpeningTime: gate_opening_time,
				ticketTier: ticket_tier,
				ticketUrl: ticket_url
			});
			else if (templateType === "refund_notice") emailResult = await sendRefundNoticeEmail({
				to,
				customerName: customer_name,
				refundAmount: refund_amount,
				paymentRef: payment_ref,
				refundReason: refund_reason,
				orderId: order_id
			});
			return json({
				success: true,
				result: emailResult
			}, 200);
		}
		if (pathname === "/api/notifications/reminder-24h" && method === "POST") {
			const validTickets = TicketsServerService.getAllTickets().filter((t) => t.status === "valid");
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
							fastPassLink: `https://hauntingsoftherift.co.ke/ticket/${t.ticketNumber}`
						}
					});
					dispatched.push({
						ticketNumber: t.ticketNumber,
						phone: t.buyerPhone,
						whatsapp: res.success
					});
				}
				if (t.buyerEmail) await sendEventReminder24hEmail({
					to: t.buyerEmail,
					customerName: t.attendeeName,
					venueName: t.venueDetails?.name || "Top Cliff Lounge, Nakuru",
					gateOpeningTime: "18:00 EAT",
					ticketTier: t.tierName,
					ticketUrl: `https://hauntingsoftherift.co.ke/ticket/${t.ticketNumber}`
				});
			}
			return json({
				success: true,
				message: `Dispatched 24h event reminders to ${validTickets.length} active ticket holder(s).`,
				count: validTickets.length,
				dispatched
			});
		}
		if (pathname === "/api/notifications/preview" && method === "GET") {
			const template = url.searchParams.get("template") || "booking_confirmation";
			const format = url.searchParams.get("format") || "both";
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
					ticket_url: "https://hauntingsoftherift.co.ke/ticket/HR-1049-9941"
				});
				plaintext = `🎃 *HAUNTINGS OF THE RIFT — TICKET CONFIRMED* 🎃\n\nHey Mwangi Karanja! Your entry pass is secured. Get ready for an unforgettable night at the Rift.\n\n🎟️ *Pass Details:* VIP Rift Access Pass (x2)\n🧾 *Order ID:* HR-2026-9042\n\n👇 *Access Your Digital Pass & QR Code:*\nhttps://hauntingsoftherift.co.ke/ticket/HR-1049-9941\n\n⚠️ *Important Gate Rules:*\n• Bring a valid ID matching your registration details.\n• Keep your QR code saved offline or loaded before arrival at the gate.\n• Passes are single-entry only.\n\nNeed help? Reply directly to this message.`;
			} else if (template === "event_reminder_24h") {
				html = generateEventReminder24hEmailHtml({
					customer_name: "Mwangi Karanja",
					venue_name: "Top Cliff Lounge, Nakuru",
					gate_opening_time: "18:00 EAT",
					ticket_tier: "VIP Rift Access Pass",
					ticket_url: "https://hauntingsoftherift.co.ke/ticket/HR-1049-9941"
				});
				plaintext = `⏰ *TOMORROW AT THE RIFT* ⏰\n\nHey Mwangi Karanja, the gates open in 24 hours for Hauntings of the Rift!\n\n📍 *Venue:* Top Cliff Lounge, Nakuru\n🚪 *Gate Opens:* 18:00 EAT\n\n👇 *Have your QR code ready at the gate:*\nhttps://hauntingsoftherift.co.ke/ticket/HR-1049-9941\n\nDress code: Halloween costumes encouraged. Strict 21+ verification at entry.`;
			} else if (template === "refund_notice") {
				html = generateRefundNoticeEmailHtml({
					customer_name: "Mwangi Karanja",
					refund_amount: "3,500",
					payment_ref: "REV-MPESA-98842",
					refund_reason: "Customer cancellation request prior to cut-off",
					order_id: "HR-2026-9042"
				});
				plaintext = `🧾 *REFUND PROCESSED — HAUNTINGS OF THE RIFT* 🧾\n\nHi Mwangi Karanja,\n\nYour refund of *KES 3,500* has been successfully processed.\n\n*Reference:* REV-MPESA-98842\n*Details:* Customer cancellation request prior to cut-off\n\nNote: Associated passes for order HR-2026-9042 are now invalidated. Reach out to support@verve.co.ke for assistance.`;
			}
			if (format === "html") return new Response(html, {
				status: 200,
				headers: { "Content-Type": "text/html; charset=utf-8" }
			});
			return json({
				success: true,
				template,
				plaintext,
				html
			});
		}
		return errorJson(`API route ${method} ${pathname} not found.`, "NOT_FOUND", 404);
	} catch (error) {
		console.error("Unhandled API Error:", error);
		return errorJson("An unexpected server error occurred.", "INTERNAL_SERVER_ERROR", 500);
	}
}
var serverEntryPromise;
async function getServerEntry() {
	if (!serverEntryPromise) serverEntryPromise = import("./server-BCGcQUgH.mjs").then((m) => m.default ?? m);
	return serverEntryPromise;
}
async function normalizeCatastrophicSsrResponse(response) {
	if (response.status < 500) return response;
	if (!(response.headers.get("content-type") ?? "").includes("application/json")) return response;
	const body = await response.clone().text();
	if (!isH3SwallowedErrorBody(body)) return response;
	console.error(consumeLastCapturedError() ?? /* @__PURE__ */ new Error(`h3 swallowed SSR error: ${body}`));
	return new Response(renderErrorPage(), {
		status: 500,
		headers: { "content-type": "text/html; charset=utf-8" }
	});
}
function isH3SwallowedErrorBody(body) {
	try {
		const payload = JSON.parse(body);
		return payload.unhandled === true && payload.message === "HTTPError";
	} catch {
		return false;
	}
}
var server_default = { async fetch(request, env, ctx) {
	try {
		if (new URL(request.url).pathname.startsWith("/api/")) return await handleApiRequest(request);
		return await normalizeCatastrophicSsrResponse(await (await getServerEntry()).fetch(request, env, ctx));
	} catch (error) {
		console.error(error);
		return new Response(renderErrorPage(), {
			status: 500,
			headers: { "content-type": "text/html; charset=utf-8" }
		});
	}
} };
//#endregion
export { server_default as default, renderErrorPage as n, validateAndNormalizeKenyanPhone as t };
