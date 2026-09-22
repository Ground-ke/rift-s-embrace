import { relations } from "drizzle-orm";
import { boolean, integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

// 1. Users Table (Mapped to Firebase Auth UID)
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  uid: text("uid").notNull().unique(), // Firebase Auth UID
  email: text("email").notNull(),
  displayName: text("display_name"),
  role: text("role").default("customer"),
  createdAt: timestamp("created_at").defaultNow(),
});

// 2. Orders Table
export const orders = pgTable("orders", {
  id: text("id").primaryKey(), // orderId (e.g. ord_xxx or UUID)
  orderNumber: text("order_number").notNull(),
  customerName: text("customer_name").notNull(),
  customerEmail: text("customer_email").notNull(),
  customerPhone: text("customer_phone"),
  ticketTypeId: text("ticket_type_id"),
  ticketName: text("ticket_name"),
  admitsCount: integer("admits_count").default(1),
  quantity: integer("quantity").notNull(),
  totalKes: integer("total_kes").notNull(),
  status: text("status").notNull(), // pending, pending_approval, approved, completed, rejected, cancelled, refunded
  mpesaCode: text("mpesa_code"),
  mpesaMessage: text("mpesa_message"),
  paymentReference: text("payment_reference"),
  rejectionReason: text("rejection_reason"),
  approvedBy: text("approved_by"),
  approvedAt: timestamp("approved_at"),
  emailSent: boolean("email_sent").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// 3. Tickets Table
export const tickets = pgTable("tickets", {
  ticketNumber: text("ticket_number").primaryKey(), // alphanumeric ticket code
  orderId: text("order_id")
    .references(() => orders.id)
    .notNull(),
  orderNumber: text("order_number"),
  attendeeName: text("attendee_name").notNull(),
  attendeeEmail: text("attendee_email"),
  buyerPhone: text("buyer_phone"),
  tierSlug: text("tier_slug"),
  tierName: text("tier_name"),
  admitsCount: integer("admits_count").default(1),
  priceKes: integer("price_kes"),
  qrHash: text("qr_hash"),
  status: text("status").notNull().default("valid"), // valid, used, cancelled, refunded
  scannedAt: timestamp("scanned_at"),
  scannedBy: text("scanned_by"),
  createdAt: timestamp("created_at").defaultNow(),
});

// 4. Promotions Table
export const promotions = pgTable("promotions", {
  id: text("id").primaryKey(),
  code: text("code").notNull().unique(),
  name: text("name").notNull(),
  discountType: text("discount_type").notNull(), // percentage | fixed
  discountValue: integer("discount_value").notNull(),
  maxUses: integer("max_uses").notNull(),
  currentUses: integer("current_uses").default(0),
  expiresAt: timestamp("expires_at"),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

// 5. Audit Logs Table
export const auditLogs = pgTable("audit_logs", {
  id: text("id").primaryKey(),
  actorEmail: text("actor_email").notNull(),
  actorRole: text("actor_role").notNull(),
  action: text("action").notNull(),
  targetTable: text("target_table").notNull(),
  targetId: text("target_id").notNull(),
  metadata: text("metadata"),
  ipAddress: text("ip_address"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Relations
export const ordersRelations = relations(orders, ({ many }) => ({
  tickets: many(tickets),
}));

export const ticketsRelations = relations(tickets, ({ one }) => ({
  order: one(orders, {
    fields: [tickets.orderId],
    references: [orders.id],
  }),
}));
