import { supabaseServer, isServerSupabaseConfigured } from "../lib/supabase/server";
import { TicketsServerService, type DigitalTicketRecord } from "./tickets.server";
import { sendTicketConfirmationEmail } from "./email.server";

export interface PromotionRecord {
  id: string;
  code: string;
  name: string;
  discountType: "percentage" | "fixed";
  discountValue: number;
  maxUses: number;
  currentUses: number;
  expiresAt: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AuditLogEntry {
  id: string;
  actorId: string;
  actorEmail: string;
  actorRole: "admin" | "scanner" | "system";
  action: string;
  targetTable: string;
  targetId: string;
  metadata: Record<string, unknown>;
  ipAddress: string;
  createdAt: string;
}

export interface ScannerDeviceRecord {
  id: string;
  name: string;
  operatorName: string;
  gateLocation: string;
  status: "active" | "standby" | "offline";
  scansCount: number;
  lastScanAt: string | null;
}

// In-Memory Synchronized Stores
const promotionsStore = new Map<string, PromotionRecord>();
const auditLogsStore: AuditLogEntry[] = [];
const scannersStore = new Map<string, ScannerDeviceRecord>();

// Seed Promotion Codes with pristine usage counts
const defaultPromos: PromotionRecord[] = [
  {
    id: "promo-001",
    code: "RIFTVIP20",
    name: "VIP Halloween 20% Discount",
    discountType: "percentage",
    discountValue: 20,
    maxUses: 100,
    currentUses: 0,
    expiresAt: new Date(Date.now() + 30 * 86400000).toISOString(),
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "promo-002",
    code: "EARLYGHOST",
    name: "Early Bird Fixed KES 500 Off",
    discountType: "fixed",
    discountValue: 500,
    maxUses: 50,
    currentUses: 0,
    expiresAt: new Date(Date.now() + 14 * 86400000).toISOString(),
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "promo-003",
    code: "COVEN50",
    name: "Rift Coven Group 50% Flash Sale",
    discountType: "percentage",
    discountValue: 50,
    maxUses: 20,
    currentUses: 0,
    expiresAt: new Date(Date.now() + 7 * 86400000).toISOString(),
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "promo-004",
    code: "SPOOKY10",
    name: "Community 10% Off Pass",
    discountType: "percentage",
    discountValue: 10,
    maxUses: 200,
    currentUses: 0,
    expiresAt: new Date(Date.now() + 45 * 86400000).toISOString(),
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

defaultPromos.forEach((p) => promotionsStore.set(p.code.toUpperCase(), p));

// Scanner Fleet Terminals (pristine scan counts synced with gate activity)
const defaultScanners: ScannerDeviceRecord[] = [
  {
    id: "scan-001",
    name: "Gate Alpha Primary",
    operatorName: "Gate Security Staff",
    gateLocation: "Main Top Cliff Entrance (Highway Gate)",
    status: "active",
    scansCount: 0,
    lastScanAt: null,
  },
  {
    id: "scan-002",
    name: "VIP Portal Handheld",
    operatorName: "VIP Security Team",
    gateLocation: "Hellfire VIP Red Carpet Chute",
    status: "active",
    scansCount: 0,
    lastScanAt: null,
  },
  {
    id: "scan-003",
    name: "Gate Beta Backup",
    operatorName: "West Perimeter Team",
    gateLocation: "West Amphitheater Service Entry",
    status: "standby",
    scansCount: 0,
    lastScanAt: null,
  },
];
defaultScanners.forEach((s) => scannersStore.set(s.id, s));

// Seed initial audit log entries
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
  createdAt: new Date(Date.now() - 3600000).toISOString(),
});

export class AdminServerService {
  /**
   * Record an authoritative audit log entry
   */
  static async recordAuditLog(entry: {
    actorId?: string;
    actorEmail?: string;
    actorRole?: "admin" | "scanner" | "system";
    action: string;
    targetTable: string;
    targetId: string;
    metadata?: Record<string, unknown>;
    ipAddress?: string;
  }): Promise<AuditLogEntry> {
    const log: AuditLogEntry = {
      id: `aud-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      actorId: entry.actorId || "admin-system",
      actorEmail: entry.actorEmail || "admin@verve.co.ke",
      actorRole: entry.actorRole || "admin",
      action: entry.action,
      targetTable: entry.targetTable,
      targetId: entry.targetId,
      metadata: entry.metadata || {},
      ipAddress: entry.ipAddress || "127.0.0.1",
      createdAt: new Date().toISOString(),
    };

    auditLogsStore.unshift(log);

    // Keep memory store bounded
    if (auditLogsStore.length > 500) {
      auditLogsStore.length = 500;
    }

    // Persist to Supabase if available
    if (isServerSupabaseConfigured && supabaseServer) {
      try {
        await supabaseServer.from("audit_logs").insert({
          actor_id: log.actorId,
          action: log.action,
          target_table: log.targetTable,
          target_id: log.targetId,
          metadata: log.metadata,
          ip_address: log.ipAddress,
        });
      } catch (err) {
        console.warn("Could not persist audit log to Supabase:", err);
      }
    }

    return log;
  }

  /**
   * Get all Audit Logs
   */
  static getAuditLogs(limit = 100): AuditLogEntry[] {
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

    const totalRevenueKes = tickets
      .filter((t) => t.status !== "cancelled")
      .reduce((sum, t) => sum + (t.priceKes || 0), 0);

    const totalCapacity = 800;
    const remainingCapacity = Math.max(0, totalCapacity - totalSold);
    const checkinRate = totalSold > 0 ? Math.round((totalUsed / totalSold) * 100) : 0;

    return {
      totalSold,
      totalUsed,
      totalCancelled,
      totalValid,
      totalRevenueKes,
      totalCapacity,
      remainingCapacity,
      checkinRate,
      activePromosCount: promos.filter((p) => p.isActive).length,
      activeScannersCount: scanners.filter((s) => s.status === "active").length,
      recentTickets: tickets.slice(0, 5),
      recentAuditLogs: auditLogsStore.slice(0, 8),
      hourlySalesTrend: this.getHourlySalesTrend(),
    };
  }

  /**
   * Get Hourly Sales Trend derived from actual issued tickets
   */
  static getHourlySalesTrend(): Array<{ hour: string; sales: number; count: number }> {
    const tickets = TicketsServerService.getAllTickets().filter((t) => t.status !== "cancelled");
    if (tickets.length === 0) {
      return [];
    }

    const hourMap = new Map<string, { sales: number; count: number }>();
    for (const t of tickets) {
      const date = new Date(t.issuedAt);
      const hourKey = `${String(date.getHours()).padStart(2, "0")}:00`;
      const current = hourMap.get(hourKey) || { sales: 0, count: 0 };
      current.sales += t.priceKes || 0;
      current.count += 1;
      hourMap.set(hourKey, current);
    }

    const sortedHours = Array.from(hourMap.keys()).sort();
    return sortedHours.map((hour) => ({
      hour,
      sales: hourMap.get(hour)!.sales,
      count: hourMap.get(hour)!.count,
    }));
  }

  /**
   * List all Tickets with optional search & status filter
   */
  static getTickets(filters?: {
    search?: string;
    status?: string;
    tier?: string;
  }): DigitalTicketRecord[] {
    let tickets = TicketsServerService.getAllTickets();

    if (filters?.status && filters.status !== "all") {
      tickets = tickets.filter((t) => t.status === filters.status);
    }

    if (filters?.tier && filters.tier !== "all") {
      tickets = tickets.filter((t) => t.tierSlug === filters.tier);
    }

    if (filters?.search) {
      const q = filters.search.trim().toLowerCase();
      tickets = tickets.filter(
        (t) =>
          t.ticketNumber.toLowerCase().includes(q) ||
          t.attendeeName.toLowerCase().includes(q) ||
          (t.buyerEmail && t.buyerEmail.toLowerCase().includes(q)) ||
          t.buyerPhone.toLowerCase().includes(q) ||
          t.orderNumber.toLowerCase().includes(q),
      );
    }

    // Sort newest issued first
    return tickets.sort((a, b) => new Date(b.issuedAt).getTime() - new Date(a.issuedAt).getTime());
  }

  /**
   * Revoke / Invalidate a ticket
   */
  static async revokeTicket(params: {
    code: string;
    reason: string;
    actorEmail: string;
    actorId?: string;
    clientIp?: string;
  }): Promise<{ success: boolean; message: string; ticket?: DigitalTicketRecord }> {
    const { code, reason, actorEmail, actorId, clientIp } = params;
    const ticket = TicketsServerService.getTicketByCode(code);

    if (!ticket) {
      return { success: false, message: "Ticket pass not found." };
    }

    if (ticket.status === "cancelled") {
      return { success: false, message: "Ticket is already cancelled/revoked." };
    }

    const previousStatus = ticket.status;
    ticket.status = "cancelled";
    TicketsServerService.updateTicketRecord(ticket);

    // Audit log
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
        reason: reason || "Manual organizer revocation",
      },
      ipAddress: clientIp,
    });

    return {
      success: true,
      message: `Pass ${ticket.ticketNumber} has been invalidated.`,
      ticket,
    };
  }

  /**
   * Resend Ticket Confirmation Email
   */
  static async resendTicketEmail(params: {
    code: string;
    actorEmail: string;
    actorId?: string;
    clientIp?: string;
  }): Promise<{ success: boolean; message: string }> {
    const { code, actorEmail, actorId, clientIp } = params;
    const ticket = TicketsServerService.getTicketByCode(code);

    if (!ticket) {
      return { success: false, message: "Ticket pass not found." };
    }

    if (!ticket.buyerEmail) {
      return { success: false, message: "Ticket does not have a recipient email address." };
    }

    // Trigger dispatch via Resend service
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
      qrHash: ticket.qrHash,
    });

    // Record audit log
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
        emailDeliveryStatus: emailResult.success ? "sent" : "delivery_logged",
      },
      ipAddress: clientIp,
    });

    return {
      success: true,
      message: `Admission ticket email re-dispatched to ${ticket.buyerEmail}.`,
    };
  }

  /**
   * Get all Promotions
   */
  static getPromotions(): PromotionRecord[] {
    return Array.from(promotionsStore.values()).sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
  }

  /**
   * Create New Promotion Code
   */
  static async createPromotion(params: {
    code: string;
    name?: string;
    discountType: "percentage" | "fixed";
    discountValue: number;
    maxUses: number;
    expiresAt?: string | null;
    isActive?: boolean;
    actorEmail: string;
    actorId?: string;
    clientIp?: string;
  }): Promise<{ success: boolean; message: string; promo?: PromotionRecord }> {
    const code = params.code.trim().toUpperCase();

    if (!code) {
      return { success: false, message: "Promotion code cannot be blank." };
    }

    if (promotionsStore.has(code)) {
      return { success: false, message: `Promo code '${code}' already exists.` };
    }

    if (params.discountValue <= 0) {
      return { success: false, message: "Discount value must be greater than zero." };
    }

    if (params.discountType === "percentage" && params.discountValue > 100) {
      return { success: false, message: "Percentage discount cannot exceed 100%." };
    }

    const newPromo: PromotionRecord = {
      id: `promo-${Date.now()}`,
      code,
      name: params.name || `${code} Promotional Offer`,
      discountType: params.discountType,
      discountValue: Number(params.discountValue),
      maxUses: Number(params.maxUses) || 100,
      currentUses: 0,
      expiresAt: params.expiresAt || null,
      isActive: params.isActive !== false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    promotionsStore.set(code, newPromo);

    // Audit log
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
        maxUses: newPromo.maxUses,
      },
      ipAddress: params.clientIp,
    });

    return {
      success: true,
      message: `Promo code ${newPromo.code} created successfully.`,
      promo: newPromo,
    };
  }

  /**
   * Toggle Promotion Active / Inactive
   */
  static async togglePromotion(params: {
    codeOrId: string;
    isActive: boolean;
    actorEmail: string;
    actorId?: string;
    clientIp?: string;
  }): Promise<{ success: boolean; message: string; promo?: PromotionRecord }> {
    const { codeOrId, isActive, actorEmail, actorId, clientIp } = params;

    let target: PromotionRecord | undefined;
    for (const p of promotionsStore.values()) {
      if (p.id === codeOrId || p.code.toUpperCase() === codeOrId.toUpperCase()) {
        target = p;
        break;
      }
    }

    if (!target) {
      return { success: false, message: "Promotion code not found." };
    }

    target.isActive = isActive;
    target.updatedAt = new Date().toISOString();
    promotionsStore.set(target.code.toUpperCase(), target);

    // Audit log
    await this.recordAuditLog({
      actorId: actorId || "admin-user",
      actorEmail,
      actorRole: "admin",
      action: isActive ? "promotion.activated" : "promotion.deactivated",
      targetTable: "promotions",
      targetId: target.code,
      metadata: { code: target.code, isActive },
      ipAddress: clientIp,
    });

    return {
      success: true,
      message: `Promo code ${target.code} is now ${isActive ? "ACTIVE" : "PAUSED"}.`,
      promo: target,
    };
  }

  /**
   * Delete / Remove Promotion Code
   */
  static async deletePromotion(params: {
    codeOrId: string;
    actorEmail: string;
    actorId?: string;
    clientIp?: string;
  }): Promise<{ success: boolean; message: string }> {
    const { codeOrId, actorEmail, actorId, clientIp } = params;

    let target: PromotionRecord | undefined;
    for (const p of promotionsStore.values()) {
      if (p.id === codeOrId || p.code.toUpperCase() === codeOrId.toUpperCase()) {
        target = p;
        break;
      }
    }

    if (!target) {
      return { success: false, message: "Promotion code not found." };
    }

    promotionsStore.delete(target.code.toUpperCase());

    await this.recordAuditLog({
      actorId: actorId || "admin-user",
      actorEmail,
      actorRole: "admin",
      action: "promotion.deleted",
      targetTable: "promotions",
      targetId: target.code,
      metadata: { code: target.code },
      ipAddress: clientIp,
    });

    return {
      success: true,
      message: `Promo code ${target.code} was removed.`,
    };
  }

  /**
   * Validate Promo Code for customer checkout
   */
  static validatePromoCode(
    code: string,
    subtotalKes: number,
  ): {
    valid: boolean;
    message?: string;
    discountKes?: number;
    promo?: {
      code: string;
      discountType: string;
      discountValue: number;
    };
  } {
    const normalized = code.trim().toUpperCase();
    const promo = promotionsStore.get(normalized);

    if (!promo) {
      return { valid: false, message: "Invalid promotional discount code." };
    }

    if (!promo.isActive) {
      return { valid: false, message: "This promotional code is currently inactive." };
    }

    if (promo.expiresAt && new Date(promo.expiresAt).getTime() < Date.now()) {
      return { valid: false, message: "This promotional code has expired." };
    }

    if (promo.currentUses >= promo.maxUses) {
      return {
        valid: false,
        message: "This promotional code has reached its maximum usage limit.",
      };
    }

    let discountKes = 0;
    if (promo.discountType === "percentage") {
      discountKes = Math.round((subtotalKes * promo.discountValue) / 100);
    } else {
      discountKes = Math.min(subtotalKes, promo.discountValue);
    }

    return {
      valid: true,
      discountKes,
      promo: {
        code: promo.code,
        discountType: promo.discountType,
        discountValue: promo.discountValue,
      },
    };
  }

  /**
   * Get Scanner Devices & Staff
   */
  static getScanners(): ScannerDeviceRecord[] {
    return Array.from(scannersStore.values());
  }
}
