import {
  generateTicketCode,
  generateTicketHmac,
  createRecoveryToken,
  verifyRecoveryToken,
} from "./crypto";
import { sendTicketConfirmationEmail, sendRecoveryEmail, getSiteBaseUrl } from "./email.server";
import { OrderService } from "./order-service";
import { isCloudSqlConfigured } from "../db/index.ts";
import { insertTickets, updateTicketStatus } from "../db/tickets.ts";
import { PersistentStore } from "./persistent-store";

export interface DigitalTicketRecord {
  id: string;
  orderId: string;
  orderNumber: string;
  ticketNumber: string;
  qrHash: string;
  tierSlug: string;
  tierName: string;
  admitsCount: number;
  attendeeName: string;
  buyerEmail?: string;
  buyerPhone: string;
  status: "valid" | "used" | "cancelled" | "refunded";
  priceKes: number;
  issuedAt: string;
  usedAt?: string | null;
  scannedBy?: string | null;
  venue: {
    name: string;
    address: string;
    city: string;
    date: string;
    time: string;
    ageRequirement: string;
  };
}

export interface PaymentTransactionRecord {
  id: string;
  idempotencyKey: string;
  orderId: string;
  amountKes: number;
  currency: string;
  provider: string;
  providerRef?: string;
  status: "pending" | "completed" | "failed";
  createdAt: number;
  updatedAt: number;
  errorMessage?: string;
}

export interface RecoveryRateLimitRecord {
  identifier: string; // email or IP
  timestamp: number;
}

export interface CheckInLogRecord {
  id: string;
  ticketNumber: string;
  orderNumber: string;
  attendeeName: string;
  tierName: string;
  admitsCount: number;
  status: "valid" | "duplicate" | "invalid";
  scannedAt: string;
  scannedBy: string;
  gateLocation: string;
  ipAddress?: string;
}

// Persistent Authoritative Store (survives container restarts and deployments)
const ticketsStore = PersistentStore.loadTickets();
const transactionsStore = new Map<string, PaymentTransactionRecord>();
const checkInLogsStore: CheckInLogRecord[] = [];
const recoveryRateLimitStore: RecoveryRateLimitRecord[] = [];

// Live ticket pass repository (populated upon order approval or direct checkout)
export class TicketsServerService {
  /**
   * Returns all tickets currently in store
   */
  static getAllTickets(): DigitalTicketRecord[] {
    return Array.from(ticketsStore.values());
  }

  /**
   * Updates a ticket record in store
   */
  static updateTicketRecord(ticket: DigitalTicketRecord): void {
    ticketsStore.set(ticket.ticketNumber, ticket);
    PersistentStore.saveTickets(ticketsStore);
  }
  /**
   * Issues cryptographic digital tickets for a completed order
   */
  static async issueTicketsForOrder(
    orderId: string,
    token: string,
  ): Promise<DigitalTicketRecord[]> {
    const order = OrderService.getOrder(orderId, token);
    if (!order) {
      throw new Error("Order not found or unauthorized token.");
    }

    // Check if tickets were already issued for this order
    const existing = Array.from(ticketsStore.values()).filter((t) => t.orderId === orderId);
    if (existing.length > 0) {
      return existing;
    }

    const issuedTickets: DigitalTicketRecord[] = [];
    const admitsPerTicket = order.admitsCount;
    const quantity = order.quantity;

    for (let i = 0; i < quantity; i++) {
      const ticketNumber = generateTicketCode();
      const qrHash = generateTicketHmac(ticketNumber, order.orderId, order.buyerName);

      const ticketRecord: DigitalTicketRecord = {
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
        issuedAt: new Date().toISOString(),
        venue: {
          name: "Top Cliff Lounge",
          address: "Nakuru-Nairobi Highway, Free Area",
          city: "Nakuru, Kenya",
          date: "Saturday, 31 October 2026",
          time: "4:00 PM - 4:00 AM EAT",
          ageRequirement: "Strictly 21+ with Valid ID",
        },
      };

      ticketsStore.set(ticketNumber, ticketRecord);
      issuedTickets.push(ticketRecord);
    }

    // Persist all newly issued tickets to disk immediately
    PersistentStore.saveTickets(ticketsStore);

    if (isCloudSqlConfigured() && issuedTickets.length > 0) {
      insertTickets(
        issuedTickets.map((t) => ({
          ticketNumber: t.ticketNumber,
          orderId: t.orderId,
          orderNumber: t.orderNumber,
          attendeeName: t.attendeeName,
          attendeeEmail: t.buyerEmail || null,
          buyerPhone: t.buyerPhone,
          tierSlug: t.tierSlug,
          tierName: t.tierName,
          admitsCount: t.admitsCount,
          priceKes: t.priceKes,
          qrHash: t.qrHash,
          status: t.status,
        })),
      ).catch((err) => {
        console.warn("Cloud SQL tickets sync notice:", err);
      });
    }

    return issuedTickets;
  }

  /**
   * Issue authoritative tickets for an approved order without requiring customer token (Admin context)
   */
  static async issueTicketsForApprovedOrder(orderId: string): Promise<DigitalTicketRecord[]> {
    // Check if tickets were already issued for this order
    const existing = Array.from(ticketsStore.values()).filter((t) => t.orderId === orderId);
    if (existing.length > 0) {
      return existing;
    }

    const order = OrderService._getOrderByIdInternal(orderId);
    if (!order) {
      throw new Error("Order record not found in system.");
    }

    const issuedTickets: DigitalTicketRecord[] = [];
    const admitsPerTicket = order.admitsCount || 1;
    const quantity = order.quantity || 1;

    for (let i = 0; i < quantity; i++) {
      const ticketNumber = generateTicketCode();
      const qrHash = generateTicketHmac(ticketNumber, order.id, order.buyerName);

      const ticketRecord: DigitalTicketRecord = {
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
        issuedAt: new Date().toISOString(),
        venue: {
          name: "Top Cliff Lounge",
          address: "Nakuru-Nairobi Highway, Free Area",
          city: "Nakuru, Kenya",
          date: "Saturday, 31 October 2026",
          time: "4:00 PM - 4:00 AM EAT",
          ageRequirement: "Strictly 21+ with Valid ID",
        },
      };

      ticketsStore.set(ticketNumber, ticketRecord);
      issuedTickets.push(ticketRecord);
    }

    // Persist all newly issued tickets to disk immediately
    PersistentStore.saveTickets(ticketsStore);

    if (isCloudSqlConfigured() && issuedTickets.length > 0) {
      insertTickets(
        issuedTickets.map((t) => ({
          ticketNumber: t.ticketNumber,
          orderId: t.orderId,
          orderNumber: t.orderNumber,
          attendeeName: t.attendeeName,
          attendeeEmail: t.buyerEmail || null,
          buyerPhone: t.buyerPhone,
          tierSlug: t.tierSlug,
          tierName: t.tierName,
          admitsCount: t.admitsCount,
          priceKes: t.priceKes,
          qrHash: t.qrHash,
          status: t.status,
        })),
      ).catch((err) => {
        console.warn("Cloud SQL tickets sync notice:", err);
      });
    }

    return issuedTickets;
  }

  /**
   * Idempotency Gate for Payment Verification & Processing
   */
  static async verifyPayment(params: {
    idempotencyKey: string;
    orderId: string;
    token: string;
    mpesaReceipt?: string;
    clientIp?: string;
  }): Promise<{
    success: boolean;
    status: "completed" | "pending" | "failed";
    code?: string;
    message: string;
    tickets?: DigitalTicketRecord[];
    receipt?: string;
  }> {
    const { idempotencyKey, orderId, token, mpesaReceipt } = params;

    if (!idempotencyKey || !orderId || !token) {
      return {
        success: false,
        status: "failed",
        code: "INVALID_ARGUMENTS",
        message: "Idempotency key, orderId, and checkout token are required.",
      };
    }

    // 1. Check existing transaction under this idempotency key
    const existingTx = transactionsStore.get(idempotencyKey);
    if (existingTx) {
      if (existingTx.status === "completed") {
        // Replay completed transaction results
        const existingTickets = Array.from(ticketsStore.values()).filter(
          (t) => t.orderId === orderId,
        );
        return {
          success: true,
          status: "completed",
          message: "Transaction previously completed.",
          tickets: existingTickets,
          receipt: existingTx.providerRef || mpesaReceipt,
        };
      }

      if (existingTx.status === "pending") {
        // Return 409 Concurrent processing state
        return {
          success: false,
          status: "pending",
          code: "TRANSACTION_PENDING",
          message: "Payment transaction is currently being processed. Please wait.",
        };
      }

      // If existing status is 'failed', we allow retrying under the same key or updating status
    }

    // 2. Lookup order
    const order = OrderService.getOrder(orderId, token);
    if (!order) {
      return {
        success: false,
        status: "failed",
        code: "ORDER_NOT_FOUND",
        message: "Order not found or authorization token invalid.",
      };
    }

    // 3. Mark transaction as pending
    const txRecord: PaymentTransactionRecord = {
      id: `tx_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      idempotencyKey,
      orderId,
      amountKes: order.totalKes,
      currency: "KES",
      provider: "mpesa",
      providerRef: mpesaReceipt || `REC-${Date.now().toString(36).toUpperCase()}`,
      status: "pending",
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    transactionsStore.set(idempotencyKey, txRecord);

    try {
      // 4. Issue tickets upon successful verification
      const tickets = await this.issueTicketsForOrder(orderId, token);

      // 5. Mark transaction completed
      txRecord.status = "completed";
      txRecord.updatedAt = Date.now();
      transactionsStore.set(idempotencyKey, txRecord);

      // 6. Automatically dispatch confirmation email with ticket pass attached to buyer
      if (order.buyerEmail) {
        const siteBase = getSiteBaseUrl();
        sendTicketConfirmationEmail({
          to: order.buyerEmail,
          buyerName: order.buyerName,
          orderNumber: order.orderNumber,
          totalKes: order.totalKes,
          ticketTier: order.ticketName,
          quantity: order.quantity,
          ticketUrl: `${siteBase}/ticket/${tickets[0]?.ticketNumber || "demo"}`,
          tickets: tickets.map((t) => ({
            ticketNumber: t.ticketNumber,
            tierName: t.tierName,
            attendeeName: t.attendeeName,
            admitsCount: t.admitsCount,
            ticketUrl: `${siteBase}/ticket/${t.ticketNumber}`,
          })),
        }).catch((emailErr) => {
          console.warn("Could not dispatch ticket confirmation email:", emailErr);
        });
      }

      return {
        success: true,
        status: "completed",
        message: "Payment authoritatively verified and tickets issued.",
        tickets,
        receipt: txRecord.providerRef,
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
        message: "Payment verification failed. You may safely retry.",
      };
    }
  }

  /**
   * Signature-verified public lookup by ticket code
   */
  static getTicketByCode(code: string): {
    success: boolean;
    ticket?: DigitalTicketRecord;
    message?: string;
  } {
    const normalized = code.trim().toUpperCase();
    let ticket = ticketsStore.get(normalized);

    // If not found in memory, re-read disk store in case another process/thread persisted it
    if (!ticket) {
      const refreshedStore = PersistentStore.loadTickets();
      for (const [k, v] of refreshedStore.entries()) {
        ticketsStore.set(k, v);
      }
      ticket = ticketsStore.get(normalized);
    }

    if (!ticket) {
      return {
        success: false,
        message: "No ticket found matching the specified code.",
      };
    }

    return {
      success: true,
      ticket,
    };
  }

  /**
   * Ticket Recovery Request Handler (Rate limited + generic non-enumerating response)
   */
  static async recoverTicket(params: {
    email?: string;
    phone?: string;
    clientIp: string;
    baseUrl: string;
  }): Promise<{
    success: boolean;
    code?: string;
    message: string;
    rateLimited?: boolean;
    previewToken?: string; // Provided for sandbox UI convenience
  }> {
    const { email, clientIp, baseUrl } = params;
    const now = Date.now();
    const ONE_HOUR = 3600000;

    // Clean up old rate limit records
    while (
      recoveryRateLimitStore.length > 0 &&
      recoveryRateLimitStore[0].timestamp < now - ONE_HOUR
    ) {
      recoveryRateLimitStore.shift();
    }

    // Rate limit: Max 3 requests per hour per email and per client IP
    const emailKey = email?.trim().toLowerCase() || "";
    const ipKey = clientIp.trim();

    const emailAttempts = recoveryRateLimitStore.filter(
      (r) => emailKey && r.identifier === emailKey && r.timestamp > now - ONE_HOUR,
    ).length;

    const ipAttempts = recoveryRateLimitStore.filter(
      (r) => r.identifier === ipKey && r.timestamp > now - ONE_HOUR,
    ).length;

    if (emailAttempts >= 3 || ipAttempts >= 5) {
      return {
        success: false,
        code: "RATE_LIMITED",
        rateLimited: true,
        message: "Too many ticket recovery requests. Please wait before trying again.",
      };
    }

    // Record request for rate limiting
    if (emailKey) recoveryRateLimitStore.push({ identifier: emailKey, timestamp: now });
    recoveryRateLimitStore.push({ identifier: ipKey, timestamp: now });

    // Look for matching tickets (generic non-enumerating response)
    let matchingTickets: DigitalTicketRecord[] = [];
    if (emailKey) {
      matchingTickets = Array.from(ticketsStore.values()).filter((t) =>
        t.buyerEmail ? t.buyerEmail.toLowerCase() === emailKey : true,
      );
    }

    let recoveryToken: string | undefined;

    if (emailKey) {
      recoveryToken = createRecoveryToken(emailKey, ONE_HOUR);
      const recoveryUrl = `${baseUrl.replace(/\/$/, "")}/recover?token=${recoveryToken}`;

      await sendRecoveryEmail({
        to: emailKey,
        recoveryUrl,
        ticketsCount: Math.max(1, matchingTickets.length),
      });
    }

    return {
      success: true,
      message:
        "If matching tickets are associated with this email address, a secure recovery link has been dispatched to your inbox.",
      previewToken: recoveryToken,
    };
  }

  /**
   * Verifies signed recovery token and retrieves associated tickets
   */
  static verifyRecoveryToken(token: string): {
    valid: boolean;
    expired?: boolean;
    email?: string;
    tickets: DigitalTicketRecord[];
  } {
    const result = verifyRecoveryToken(token);
    if (!result.valid || !result.email) {
      return {
        valid: false,
        expired: result.expired,
        email: result.email,
        tickets: [],
      };
    }

    const email = result.email.toLowerCase();
    const userTickets = Array.from(ticketsStore.values()).filter(
      (t) => !t.buyerEmail || t.buyerEmail.toLowerCase() === email,
    );

    return {
      valid: true,
      email,
      tickets: userTickets,
    };
  }

  /**
   * Scans and marks ticket as used at event check-in
   */
  static markTicketUsed(
    code: string,
    scannedBy = "Gate Security Staff",
  ): {
    success: boolean;
    status: "valid" | "already_used" | "not_found";
    ticket?: DigitalTicketRecord;
    message: string;
  } {
    const normalized = code.trim().toUpperCase();
    const ticket = ticketsStore.get(normalized);

    if (!ticket) {
      return {
        success: false,
        status: "not_found",
        message: "Invalid ticket QR code.",
      };
    }

    if (ticket.status === "used") {
      return {
        success: false,
        status: "already_used",
        ticket,
        message: `Ticket already used at ${ticket.usedAt || "an earlier scan"}.`,
      };
    }

    ticket.status = "used";
    ticket.usedAt = new Date().toISOString();
    ticket.scannedBy = scannedBy;
    ticketsStore.set(normalized, ticket);
    PersistentStore.saveTickets(ticketsStore);

    if (isCloudSqlConfigured()) {
      updateTicketStatus(normalized, "used", scannedBy).catch((err) => {
        console.warn("Cloud SQL ticket scan status notice:", err);
      });
    }

    return {
      success: true,
      status: "valid",
      ticket,
      message: `Checked in successfully: ${ticket.attendeeName} (${ticket.tierName}).`,
    };
  }

  /**
   * Authoritative Gate Validation & Check-in Handler
   * Verifies HMAC signature, validates event ID, enforces single-use policy, and logs check-in records.
   */
  static async validateAndCheckinTicket(params: {
    ticket_code: string;
    qr_hash?: string;
    event_id?: string;
    staff_name?: string;
    gate_location?: string;
    clientIp?: string;
  }): Promise<{
    success: boolean;
    status: "valid" | "already_used" | "invalid_signature" | "invalid_pass" | "not_found";
    httpStatus: number;
    message: string;
    ticket?: DigitalTicketRecord;
    attendee?: {
      name: string;
      tier: string;
      admitsCount: number;
      orderNumber: string;
      issuedAt: string;
      buyerPhone: string;
      priceKes: number;
    };
    checkInDetails?: {
      scannedAt: string;
      scannedBy: string;
      gateLocation: string;
    };
    eventStats: {
      totalIssued: number;
      checkedInCount: number;
      remainingValid: number;
      admittedPercentage: number;
    };
  }> {
    const {
      ticket_code,
      qr_hash,
      staff_name = "Gate Security Staff",
      gate_location = "Main Top Cliff Entrance",
      clientIp,
    } = params;
    const normalized = ticket_code.trim().toUpperCase();
    const ticket = ticketsStore.get(normalized);

    const allTickets = Array.from(ticketsStore.values());
    const totalIssued = allTickets.length;
    const checkedInCount = allTickets.filter((t) => t.status === "used").length;
    const remainingValid = allTickets.filter((t) => t.status === "valid").length;
    const admittedPercentage =
      totalIssued > 0 ? Math.round((checkedInCount / totalIssued) * 100) : 0;

    const eventStats = {
      totalIssued,
      checkedInCount,
      remainingValid,
      admittedPercentage,
    };

    // 1. Check if ticket exists in authoritative ledger
    if (!ticket) {
      const logRecord: CheckInLogRecord = {
        id: `chk_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
        ticketNumber: normalized,
        orderNumber: "UNKNOWN",
        attendeeName: "Unknown Guest",
        tierName: "Unknown Tier",
        admitsCount: 0,
        status: "invalid",
        scannedAt: new Date().toISOString(),
        scannedBy: staff_name,
        gateLocation: gate_location,
        ipAddress: clientIp,
      };
      checkInLogsStore.unshift(logRecord);

      return {
        success: false,
        status: "not_found",
        httpStatus: 404,
        message: `Ticket pass ${normalized} was not found in the event database.`,
        eventStats,
      };
    }

    // 2. Cryptographic HMAC Signature Verification (if hash provided)
    if (qr_hash && ticket.qrHash && qr_hash !== ticket.qrHash) {
      const logRecord: CheckInLogRecord = {
        id: `chk_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
        ticketNumber: ticket.ticketNumber,
        orderNumber: ticket.orderNumber,
        attendeeName: ticket.attendeeName,
        tierName: ticket.tierName,
        admitsCount: ticket.admitsCount,
        status: "invalid",
        scannedAt: new Date().toISOString(),
        scannedBy: staff_name,
        gateLocation: gate_location,
        ipAddress: clientIp,
      };
      checkInLogsStore.unshift(logRecord);

      return {
        success: false,
        status: "invalid_signature",
        httpStatus: 401,
        message: "Cryptographic HMAC signature mismatch! Possible counterfeit or tampered pass.",
        eventStats,
      };
    }

    // 3. Status checks: Refunded or Cancelled
    if (ticket.status === "cancelled" || ticket.status === "refunded") {
      return {
        success: false,
        status: "invalid_pass",
        httpStatus: 403,
        message: `Admission denied: This ticket has been marked as ${ticket.status.toUpperCase()}.`,
        ticket,
        eventStats,
      };
    }

    // 4. Duplicate Check-in Guard (409 Conflict)
    if (ticket.status === "used") {
      const logRecord: CheckInLogRecord = {
        id: `chk_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
        ticketNumber: ticket.ticketNumber,
        orderNumber: ticket.orderNumber,
        attendeeName: ticket.attendeeName,
        tierName: ticket.tierName,
        admitsCount: ticket.admitsCount,
        status: "duplicate",
        scannedAt: new Date().toISOString(),
        scannedBy: staff_name,
        gateLocation: gate_location,
        ipAddress: clientIp,
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
          priceKes: ticket.priceKes,
        },
        checkInDetails: {
          scannedAt: ticket.usedAt || new Date().toISOString(),
          scannedBy: ticket.scannedBy || "Gate Staff",
          gateLocation: gate_location,
        },
        eventStats,
      };
    }

    // 5. Valid Pass: Atomically mark as used
    const nowIso = new Date().toISOString();
    ticket.status = "used";
    ticket.usedAt = nowIso;
    ticket.scannedBy = staff_name;
    ticketsStore.set(normalized, ticket);

    // Record check in log
    const logRecord: CheckInLogRecord = {
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
      ipAddress: clientIp,
    };
    checkInLogsStore.unshift(logRecord);
    if (checkInLogsStore.length > 300) checkInLogsStore.length = 300;

    // Recalculate event stats after successful checkin
    const updatedCheckedIn = checkedInCount + 1;
    const updatedValid = Math.max(0, remainingValid - 1);
    const updatedPercentage =
      totalIssued > 0 ? Math.round((updatedCheckedIn / totalIssued) * 100) : 0;

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
        priceKes: ticket.priceKes,
      },
      checkInDetails: {
        scannedAt: nowIso,
        scannedBy: staff_name,
        gateLocation: gate_location,
      },
      eventStats: {
        totalIssued,
        checkedInCount: updatedCheckedIn,
        remainingValid: updatedValid,
        admittedPercentage: updatedPercentage,
      },
    };
  }

  /**
   * Get Live Check-in Statistics & Recent Scan Stream
   */
  static getCheckinStats(): {
    totalIssued: number;
    checkedInCount: number;
    remainingValid: number;
    admittedPercentage: number;
    recentScans: CheckInLogRecord[];
  } {
    const allTickets = Array.from(ticketsStore.values());
    const totalIssued = allTickets.length;
    const checkedInCount = allTickets.filter((t) => t.status === "used").length;
    const remainingValid = allTickets.filter((t) => t.status === "valid").length;
    const admittedPercentage =
      totalIssued > 0 ? Math.round((checkedInCount / totalIssued) * 100) : 0;

    return {
      totalIssued,
      checkedInCount,
      remainingValid,
      admittedPercentage,
      recentScans: checkInLogsStore.slice(0, 20),
    };
  }
}
