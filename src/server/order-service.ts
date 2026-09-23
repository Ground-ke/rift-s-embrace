import { createHash, randomBytes, randomUUID, timingSafeEqual } from "crypto";
import { supabaseServer } from "../lib/supabase/server";
import { isCloudSqlConfigured } from "../db/index.ts";
import { insertOrder, updateOrderStatus } from "../db/orders.ts";
import { validateAndNormalizeKenyanPhone } from "../lib/validation/phone";
import type { Database, OrderStatus, ReservationStatus } from "../lib/database.types";

// Reservation Time-To-Live in milliseconds (10 minutes)
export const RESERVATION_TTL_MS = 10 * 60 * 1000;

// Technical request safety ceiling: protects against integer overflow / spam attacks
// This is NOT an organizer business rule and is strictly distinguished from ticket.purchaseLimit
export const MAX_REQUEST_QUANTITY_CEILING = 50;

export interface CreateOrderInput {
  eventId?: string;
  ticketTypeId: string;
  quantity: number;
  buyerName: string;
  buyerPhone: string;
  buyerEmail?: string;
  idempotencyKey?: string;
  clientIp?: string;
}

export interface ClientOrderResponse {
  success: boolean;
  orderId: string;
  orderNumber: string;
  checkoutToken: string;
  eventId: string;
  ticketTypeId: string;
  ticketName: string;
  admitsCount: number;
  quantity: number;
  unitPriceKes: number;
  discountKes: number;
  subtotalKes: number;
  totalKes: number;
  currency: string;
  buyerName: string;
  buyerPhone: string;
  buyerEmail?: string;
  status: OrderStatus;
  mpesaCode?: string;
  mpesaMessage?: string;
  rejectionReason?: string;
  approvedBy?: string;
  approvedAt?: string;
  expiresAt: string;
  ttlSeconds: number;
}

export interface OrderErrorResponse {
  success: false;
  code:
    | "INVALID_INPUT"
    | "INVALID_PHONE"
    | "EVENT_NOT_FOUND"
    | "SALES_PAUSED"
    | "TICKET_NOT_FOUND"
    | "TICKET_NOT_CONFIGURED"
    | "PURCHASE_LIMIT_EXCEEDED"
    | "SAFETY_LIMIT_EXCEEDED"
    | "INSUFFICIENT_INVENTORY"
    | "IDEMPOTENCY_CONFLICT"
    | "ORDER_EXPIRED"
    | "UNAUTHORIZED"
    | "RATE_LIMITED"
    | "SERVER_ERROR";
  message: string;
}

// In-Memory Transactional Store (Syncs with Supabase if configured, ensures zero-downtime consistency)
export interface StoredOrder {
  id: string;
  orderNumber: string;
  checkoutToken: string;
  eventId: string;
  ticketTypeId: string;
  ticketName: string;
  admitsCount: number;
  quantity: number;
  unitPriceKes: number;
  discountKes: number;
  subtotalKes: number;
  totalKes: number;
  currency: string;
  buyerName: string;
  buyerPhone: string;
  buyerEmail?: string;
  status: OrderStatus;
  mpesaCode?: string;
  mpesaMessage?: string;
  rejectionReason?: string;
  approvedBy?: string;
  approvedAt?: string;
  expiresAt: string;
  idempotencyKey?: string;
  requestFingerprint?: string;
  createdAt: string;
  updatedAt: string;
}

export interface StoredReservation {
  id: string;
  ticketTypeId: string;
  orderId: string;
  quantity: number;
  expiresAt: string;
  status: ReservationStatus;
  createdAt: string;
}

export interface TicketTypeConfig {
  id: string;
  eventId: string;
  slug: string;
  name: string;
  admitsCount: number;
  priceKes: number;
  totalInventory: number | null; // NULL by default unless explicitly configured
  soldCount: number;
  purchaseLimit: number | null; // NULL = NO business limit by default
  isConfigured: boolean;
  active: boolean;
}

// Rate Limiter Bucket (Sliding window per IP)
const rateLimitMap = new Map<string, number[]>();

function checkRateLimit(key: string, limit = 20, windowMs = 60000): boolean {
  const now = Date.now();
  const timestamps = rateLimitMap.get(key) || [];
  const valid = timestamps.filter((t) => now - t < windowMs);
  if (valid.length >= limit) {
    return false;
  }
  valid.push(now);
  rateLimitMap.set(key, valid);
  return true;
}

// Helper: Safely compare cryptographic tokens in constant time
function safeTokenEqual(a: string, b: string): boolean {
  if (!a || !b) return false;
  try {
    const bufA = Buffer.from(a, "utf-8");
    const bufB = Buffer.from(b, "utf-8");
    if (bufA.length !== bufB.length) {
      return false;
    }
    return timingSafeEqual(bufA, bufB);
  } catch {
    return false;
  }
}

// Helper: Compute SHA-256 fingerprint of order creation request parameters
function computeRequestFingerprint(ticketTypeId: string, quantity: number, phone: string): string {
  return createHash("sha256").update(`${ticketTypeId}:${quantity}:${phone}`).digest("hex");
}

// Default verified ticket catalog (NO INVENTED PURCHASE LIMITS: purchaseLimit is null by default)
const defaultTicketTypes: Record<string, TicketTypeConfig> = {
  "early-bird": {
    id: "00000000-0000-0000-0000-000000000011",
    eventId: "00000000-0000-0000-0000-000000000001",
    slug: "early-bird",
    name: "Early Bird",
    admitsCount: 1,
    priceKes: 1000,
    totalInventory: null, // Configured by organizer / database
    soldCount: 0,
    purchaseLimit: null, // Configurable business limit (null = unlimited by default)
    isConfigured: true,
    active: true,
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
    active: true,
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
    active: true,
  },
};

// Global order & reservation repository
const ordersStore = new Map<string, StoredOrder>();
const reservationsStore = new Map<string, StoredReservation>();

export class OrderService {
  /**
   * Test / Diagnostic helper: reset in-memory stores
   */
  static _resetStoresForTesting(): void {
    ordersStore.clear();
    reservationsStore.clear();
    rateLimitMap.clear();
  }

  /**
   * Diagnostic helper: update catalog price for snapshot verification test
   */
  static _setCatalogPriceForTesting(slug: string, newPriceKes: number): void {
    if (defaultTicketTypes[slug]) {
      defaultTicketTypes[slug].priceKes = newPriceKes;
    }
  }

  /**
   * Diagnostic helper: set total inventory for testing
   */
  static _setTotalInventoryForTesting(slug: string, total: number | null): void {
    if (defaultTicketTypes[slug]) {
      defaultTicketTypes[slug].totalInventory = total;
    }
  }

  /**
   * Get all ticket tier configurations
   */
  static getTicketTypes(): TicketTypeConfig[] {
    return Object.values(defaultTicketTypes);
  }

  /**
   * Authoritatively update ticket tier pricing and configuration
   */
  static updateTicketType(
    slug: string,
    updates: {
      name?: string;
      priceKes?: number;
      admitsCount?: number;
      totalInventory?: number | null;
      active?: boolean;
    },
  ): { success: boolean; tier?: TicketTypeConfig; message?: string } {
    const tier = defaultTicketTypes[slug];
    if (!tier) {
      return { success: false, message: `Ticket tier '${slug}' was not found.` };
    }

    if (updates.name !== undefined && updates.name.trim()) {
      tier.name = updates.name.trim();
    }
    if (updates.priceKes !== undefined) {
      tier.priceKes = Math.max(0, Math.round(Number(updates.priceKes)));
    }
    if (updates.admitsCount !== undefined) {
      tier.admitsCount = Math.max(1, Math.round(Number(updates.admitsCount)));
    }
    if (updates.totalInventory !== undefined) {
      tier.totalInventory =
        updates.totalInventory === null
          ? null
          : Math.max(0, Math.round(Number(updates.totalInventory)));
    }
    if (updates.active !== undefined) {
      tier.active = Boolean(updates.active);
    }

    return { success: true, tier };
  }

  /**
   * Authoritatively create a new ticket tier
   */
  static createTicketType(config: {
    slug: string;
    name: string;
    priceKes: number;
    admitsCount?: number;
    totalInventory?: number | null;
  }): { success: boolean; tier?: TicketTypeConfig; message?: string } {
    const normalizedSlug = config.slug
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9_-]/g, "-");

    if (!normalizedSlug) {
      return { success: false, message: "A valid tier slug is required." };
    }

    if (defaultTicketTypes[normalizedSlug]) {
      return { success: false, message: `Ticket tier '${normalizedSlug}' already exists.` };
    }

    const newTier: TicketTypeConfig = {
      id: `00000000-0000-0000-0000-${Date.now().toString(16).padStart(12, "0").slice(-12)}`,
      eventId: "00000000-0000-0000-0000-000000000001",
      slug: normalizedSlug,
      name: config.name.trim() || normalizedSlug,
      priceKes: Math.max(0, Math.round(Number(config.priceKes))),
      admitsCount: Math.max(1, Math.round(Number(config.admitsCount) || 1)),
      totalInventory: config.totalInventory !== undefined ? config.totalInventory : null,
      soldCount: 0,
      purchaseLimit: null,
      isConfigured: true,
      active: true,
    };

    defaultTicketTypes[normalizedSlug] = newTier;
    return { success: true, tier: newTier };
  }

  /**
   * Release expired reservations and update order statuses
   */
  static cleanExpiredReservations(): void {
    const now = Date.now();
    for (const [id, res] of reservationsStore.entries()) {
      if (res.status === "active" && new Date(res.expiresAt).getTime() < now) {
        res.status = "expired";
        reservationsStore.set(id, res);

        // Cancel associated pending order
        const order = ordersStore.get(res.orderId);
        if (order && order.status === "pending") {
          order.status = "cancelled";
          order.updatedAt = new Date().toISOString();
          ordersStore.set(order.id, order);
        }
      }
    }
  }

  /**
   * Get active reserved ticket count for a ticket type
   */
  static getActiveReservedCount(ticketTypeId: string): number {
    this.cleanExpiredReservations();
    let count = 0;
    for (const res of reservationsStore.values()) {
      if (res.ticketTypeId === ticketTypeId && res.status === "active") {
        count += res.quantity;
      }
    }
    return count;
  }

  /**
   * Get total sold count for a ticket type
   */
  static getSoldCount(ticketTypeId: string): number {
    for (const t of Object.values(defaultTicketTypes)) {
      if (t.id === ticketTypeId || t.slug === ticketTypeId) {
        return t.soldCount;
      }
    }
    return 0;
  }

  /**
   * Internal order lookup without token (for backend webhooks/services)
   */
  static _getOrderByIdInternal(orderId: string): StoredOrder | undefined {
    return ordersStore.get(orderId);
  }

  /**
   * Internal order status update (for backend services)
   */
  static _updateOrderStatus(orderId: string, status: OrderStatus): void {
    const order = ordersStore.get(orderId);
    if (order) {
      order.status = status;
      order.updatedAt = new Date().toISOString();
      ordersStore.set(orderId, order);

      if (isCloudSqlConfigured()) {
        updateOrderStatus(orderId, { status }).catch((err) => {
          console.warn("Cloud SQL order status sync notice:", err);
        });
      }
    }
  }

  /**
   * Internal atomic payment finalization:
   * 1. Mark order paid
   * 2. Mark reservation completed
   * 3. Convert reserved count into soldCount on the ticket type
   */
  static _finalizeOrderPayment(orderId: string, receiptNumber: string): boolean {
    const order = ordersStore.get(orderId);
    if (!order) return false;

    // Transition order to paid
    order.status = "paid";
    order.paymentReference = receiptNumber;
    order.updatedAt = new Date().toISOString();
    ordersStore.set(orderId, order);

    if (isCloudSqlConfigured()) {
      updateOrderStatus(orderId, {
        status: "paid",
        paymentReference: receiptNumber,
      }).catch((err) => {
        console.warn("Cloud SQL finalize payment notice:", err);
      });
    }

    // Transition reservation to completed
    for (const [resId, res] of reservationsStore.entries()) {
      if (res.orderId === orderId && res.status === "active") {
        res.status = "completed";
        reservationsStore.set(resId, res);
      }
    }

    // Atomically increment soldCount on the ticket type
    const ticket = this.getTicketType(order.ticketTypeId);
    if (ticket) {
      ticket.soldCount += order.quantity;
    }

    return true;
  }

  /**
   * Look up a ticket type by UUID or Slug
   */
  static getTicketType(identifier: string): TicketTypeConfig | null {
    // 1. Check by slug
    if (defaultTicketTypes[identifier]) {
      return defaultTicketTypes[identifier];
    }
    // 2. Check by ID
    for (const t of Object.values(defaultTicketTypes)) {
      if (t.id === identifier || t.slug === identifier) {
        return t;
      }
    }
    return null;
  }

  /**
   * Create an order with an atomic 10-minute inventory reservation
   */
  static async createOrder(
    input: CreateOrderInput,
  ): Promise<ClientOrderResponse | OrderErrorResponse> {
    const {
      ticketTypeId,
      quantity,
      buyerName,
      buyerPhone,
      buyerEmail,
      idempotencyKey,
      clientIp = "unknown",
    } = input;

    // 1. Rate Limiting Check (Server-authoritative sliding window)
    if (!checkRateLimit(`ip:${clientIp}`, 20, 60000)) {
      return {
        success: false,
        code: "RATE_LIMITED",
        message: "Too many requests. Please wait a moment before trying again.",
      };
    }

    // 2. Validate Buyer Name
    const trimmedName = (buyerName || "").trim();
    if (!trimmedName || trimmedName.length < 2) {
      return {
        success: false,
        code: "INVALID_INPUT",
        message: "Please provide a valid full name (at least 2 characters).",
      };
    }

    // 2b. Validate Buyer Email if provided
    const trimmedEmail = (buyerEmail || "").trim().toLowerCase();
    if (trimmedEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      return {
        success: false,
        code: "INVALID_INPUT",
        message: "Please provide a valid email address for ticket delivery.",
      };
    }

    // 3. Validate and Normalize Phone Number
    const phoneValidation = validateAndNormalizeKenyanPhone(buyerPhone);
    if (!phoneValidation.isValid) {
      return {
        success: false,
        code: "INVALID_PHONE",
        message: phoneValidation.error || "Please enter a valid Kenyan phone number.",
      };
    }
    const normalizedPhone = phoneValidation.normalized;

    // 4. Validate Quantity & Enforce Technical Request Safety Ceiling
    if (!Number.isInteger(quantity) || quantity < 1) {
      return {
        success: false,
        code: "INVALID_INPUT",
        message: "Quantity must be a positive integer (minimum 1).",
      };
    }

    if (quantity > MAX_REQUEST_QUANTITY_CEILING) {
      return {
        success: false,
        code: "SAFETY_LIMIT_EXCEEDED",
        message: `Maximum allowed quantity per checkout request is ${MAX_REQUEST_QUANTITY_CEILING}.`,
      };
    }

    // 5. Look up Ticket Type
    const ticket = this.getTicketType(ticketTypeId);
    if (!ticket || !ticket.active) {
      return {
        success: false,
        code: "TICKET_NOT_FOUND",
        message: "Selected ticket type was not found or is currently inactive.",
      };
    }

    // 6. Check Configuration Status
    if (!ticket.isConfigured) {
      return {
        success: false,
        code: "TICKET_NOT_CONFIGURED",
        message: "Tickets are not currently available.",
      };
    }

    // 7. Check Configurable Business Purchase Limit (if defined by organizer)
    if (ticket.purchaseLimit !== null && quantity > ticket.purchaseLimit) {
      return {
        success: false,
        code: "PURCHASE_LIMIT_EXCEEDED",
        message: `Maximum purchase limit for ${ticket.name} is ${ticket.purchaseLimit} per order.`,
      };
    }

    // 8. Idempotency Check (Prevent duplicate orders; detect idempotency conflicts)
    this.cleanExpiredReservations();
    const currentFingerprint = computeRequestFingerprint(ticket.id, quantity, normalizedPhone);

    if (idempotencyKey) {
      for (const existing of ordersStore.values()) {
        if (existing.idempotencyKey === idempotencyKey) {
          // If the key was used for a DIFFERENT request payload, reject as idempotency conflict
          if (existing.requestFingerprint && existing.requestFingerprint !== currentFingerprint) {
            return {
              success: false,
              code: "IDEMPOTENCY_CONFLICT",
              message:
                "Idempotency key was previously used for a different request payload. Please use a new request key.",
            };
          }

          // If the existing order is still active and valid, return it safely
          if (
            existing.status === "pending" &&
            new Date(existing.expiresAt).getTime() > Date.now()
          ) {
            const ttlSec = Math.max(
              0,
              Math.round((new Date(existing.expiresAt).getTime() - Date.now()) / 1000),
            );
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
              ttlSeconds: ttlSec,
            };
          }
        }
      }
    }

    // 9. Atomic Inventory Calculation
    if (ticket.totalInventory !== null) {
      const activeReserved = this.getActiveReservedCount(ticket.id);
      const available = ticket.totalInventory - ticket.soldCount - activeReserved;

      if (available < quantity) {
        return {
          success: false,
          code: "INSUFFICIENT_INVENTORY",
          message:
            available <= 0
              ? "These tickets are currently sold out."
              : `Only ${available} ticket${available === 1 ? "" : "s"} remaining. Please adjust your quantity.`,
        };
      }
    }

    // 10. Server-Authoritative Price Calculation
    // Base unit price stored on server (Never client-supplied)
    const unitPriceKes = ticket.priceKes;
    const discountKes = 0; // Configurable when promotion active
    const subtotalKes = unitPriceKes * quantity;
    const totalKes = subtotalKes - discountKes;

    // 11. Create Secure Reservation & Order
    const orderId = randomUUID();
    const reservationId = randomUUID();
    const randomSuffix = Math.floor(100000 + Math.random() * 900000);
    const orderNumber = `HRT-2026-${randomSuffix}`;

    // Generate high-entropy 256-bit cryptographic checkout session token
    const checkoutToken = `tok_${randomBytes(32).toString("hex")}`;
    const expiresAt = new Date(Date.now() + RESERVATION_TTL_MS).toISOString();

    const newReservation: StoredReservation = {
      id: reservationId,
      ticketTypeId: ticket.id,
      orderId,
      quantity,
      expiresAt,
      status: "active",
      createdAt: new Date().toISOString(),
    };

    const newOrder: StoredOrder = {
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
      buyerEmail: trimmedEmail || undefined,
      status: "pending",
      expiresAt,
      idempotencyKey,
      requestFingerprint: currentFingerprint,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Save atomically in local authoritative store
    reservationsStore.set(reservationId, newReservation);
    ordersStore.set(orderId, newOrder);

    // Sync to Cloud SQL relational database if configured
    if (isCloudSqlConfigured()) {
      try {
        await insertOrder({
          id: orderId,
          orderNumber,
          customerName: trimmedName,
          customerEmail: trimmedEmail || "",
          customerPhone: normalizedPhone,
          ticketTypeId: ticket.id,
          ticketName: ticket.name,
          admitsCount: ticket.admitsCount,
          quantity,
          totalKes,
          status: "pending",
        });
      } catch (sqlErr) {
        console.warn("Cloud SQL order sync notice:", sqlErr);
      }
    }

    // Sync to Supabase server database if available
    if (supabaseServer) {
      try {
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
          status: "pending",
        });

        await supabaseServer.from("order_items").insert({
          order_id: orderId,
          ticket_type_id: ticket.id,
          quantity,
          unit_price_kes: unitPriceKes,
          discount_kes: discountKes,
          subtotal_kes: subtotalKes,
        });

        await supabaseServer.from("inventory_reservations").insert({
          id: reservationId,
          ticket_type_id: ticket.id,
          order_id: orderId,
          quantity,
          expires_at: expiresAt,
          status: "active",
        });
      } catch (err) {
        console.warn("Supabase order sync warning (operating in resilient store):", err);
      }
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
      buyerEmail: trimmedEmail || undefined,
      status: "pending",
      expiresAt,
      ttlSeconds: Math.round(RESERVATION_TTL_MS / 1000),
    };
  }

  /**
   * Securely retrieve order status using orderId + checkoutToken
   */
  static getOrder(
    orderId: string,
    checkoutToken: string,
  ): (ClientOrderResponse & { isExpired: boolean }) | null {
    this.cleanExpiredReservations();

    const order = ordersStore.get(orderId);
    if (!order) {
      return null;
    }

    // Timing-safe cryptographic token verification
    if (!safeTokenEqual(order.checkoutToken, checkoutToken)) {
      return null;
    }

    // Server-authoritative expiration check based strictly on server timestamp
    const now = Date.now();
    const isExpired =
      order.status === "cancelled" ||
      (order.status === "pending" && new Date(order.expiresAt).getTime() < now);

    if (isExpired && order.status === "pending") {
      order.status = "cancelled";
      order.updatedAt = new Date().toISOString();
      ordersStore.set(order.id, order);

      // Release any active reservation
      for (const [resId, res] of reservationsStore.entries()) {
        if (res.orderId === orderId && res.status === "active") {
          res.status = "expired";
          reservationsStore.set(resId, res);
        }
      }
    }

    const ttlSeconds = Math.max(0, Math.round((new Date(order.expiresAt).getTime() - now) / 1000));

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
      isExpired,
    };
  }

  /**
   * Submit M-Pesa transaction code or message from buyer for admin manual verification
   */
  static submitMpesaCode(params: {
    orderId: string;
    checkoutToken?: string;
    mpesaCode: string;
    mpesaMessage?: string;
    buyerEmail?: string;
  }): { success: boolean; order?: StoredOrder; message: string; code?: string } {
    const { orderId, checkoutToken, mpesaCode, mpesaMessage, buyerEmail } = params;
    const order = ordersStore.get(orderId);
    if (!order) {
      return { success: false, code: "NOT_FOUND", message: "Order not found." };
    }

    if (checkoutToken && !safeTokenEqual(order.checkoutToken, checkoutToken)) {
      return { success: false, code: "UNAUTHORIZED", message: "Invalid checkout token." };
    }

    const sanitizedCode = mpesaCode.trim().toUpperCase();
    if (sanitizedCode.length < 5) {
      return {
        success: false,
        code: "INVALID_CODE",
        message: "Please provide a valid M-Pesa transaction reference.",
      };
    }

    order.mpesaCode = sanitizedCode;
    if (mpesaMessage) order.mpesaMessage = mpesaMessage.trim();
    if (buyerEmail) order.buyerEmail = buyerEmail.trim().toLowerCase();
    order.status = "pending_approval";
    order.updatedAt = new Date().toISOString();

    // Keep the reservation alive while under admin verification (extend 24 hours)
    order.expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();
    for (const [resId, res] of reservationsStore.entries()) {
      if (res.orderId === orderId && res.status === "active") {
        res.expiresAt = order.expiresAt;
        reservationsStore.set(resId, res);
      }
    }

    ordersStore.set(orderId, order);
    return { success: true, order, message: "M-Pesa code submitted for admin review." };
  }

  /**
   * Admin approves an order
   */
  static approveOrder(params: { orderId: string; adminEmail: string }): {
    success: boolean;
    order?: StoredOrder;
    message: string;
    code?: string;
  } {
    const { orderId, adminEmail } = params;
    const order = ordersStore.get(orderId);
    if (!order) {
      return { success: false, code: "NOT_FOUND", message: "Order not found." };
    }

    order.status = "approved";
    order.approvedBy = adminEmail;
    order.approvedAt = new Date().toISOString();
    order.updatedAt = new Date().toISOString();

    // Mark reservations as completed
    for (const [resId, res] of reservationsStore.entries()) {
      if (res.orderId === orderId) {
        res.status = "completed";
        reservationsStore.set(resId, res);
      }
    }

    ordersStore.set(orderId, order);
    return { success: true, order, message: "Order successfully approved and verified." };
  }

  /**
   * Admin rejects an order with a reason
   */
  static rejectOrder(params: { orderId: string; reason: string; adminEmail: string }): {
    success: boolean;
    order?: StoredOrder;
    message: string;
    code?: string;
  } {
    const { orderId, reason, adminEmail } = params;
    const order = ordersStore.get(orderId);
    if (!order) {
      return { success: false, code: "NOT_FOUND", message: "Order not found." };
    }

    order.status = "rejected";
    order.rejectionReason = reason;
    order.approvedBy = adminEmail;
    order.updatedAt = new Date().toISOString();
    ordersStore.set(orderId, order);
    return { success: true, order, message: "Order rejected." };
  }

  /**
   * Get all orders with status pending_approval
   */
  static getPendingOrders(): StoredOrder[] {
    const pending: StoredOrder[] = [];
    for (const order of ordersStore.values()) {
      if (order.status === "pending_approval") {
        pending.push(order);
      }
    }
    return pending.sort(
      (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
    );
  }

  /**
   * Cancel an order and release reservation
   */
  static cancelOrder(
    orderId: string,
    checkoutToken: string,
  ): { success: boolean; code?: string; message: string } {
    this.cleanExpiredReservations();

    const order = ordersStore.get(orderId);
    if (!order) {
      return { success: false, code: "NOT_FOUND", message: "Order not found." };
    }

    // Verify token with timing-safe comparison
    if (!safeTokenEqual(order.checkoutToken, checkoutToken)) {
      return { success: false, code: "UNAUTHORIZED", message: "Invalid authorization token." };
    }

    // Check if expired
    if (new Date(order.expiresAt).getTime() < Date.now()) {
      order.status = "cancelled";
      order.updatedAt = new Date().toISOString();
      ordersStore.set(orderId, order);

      for (const [resId, res] of reservationsStore.entries()) {
        if (res.orderId === orderId) {
          res.status = "expired";
          reservationsStore.set(resId, res);
        }
      }

      return {
        success: false,
        code: "ORDER_EXPIRED",
        message: "Reservation has already expired.",
      };
    }

    // Check if already cancelled
    if (order.status === "cancelled") {
      return {
        success: false,
        code: "ALREADY_CANCELLED",
        message: "Order has already been cancelled.",
      };
    }

    order.status = "cancelled";
    order.updatedAt = new Date().toISOString();
    ordersStore.set(orderId, order);

    for (const [resId, res] of reservationsStore.entries()) {
      if (res.orderId === orderId && res.status === "active") {
        res.status = "released";
        reservationsStore.set(resId, res);
      }
    }

    return { success: true, message: "Reservation released successfully." };
  }
}
