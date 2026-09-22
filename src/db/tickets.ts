import { eq, desc } from "drizzle-orm";
import { getDb } from "./index.ts";
import { tickets, type tickets as ticketsTable } from "./schema.ts";

export type TicketRecord = typeof ticketsTable.$inferSelect;
export type NewTicket = typeof ticketsTable.$inferInsert;

export async function insertTickets(ticketsData: NewTicket[]): Promise<TicketRecord[]> {
  if (ticketsData.length === 0) return [];
  try {
    const db = getDb();
    return await db.insert(tickets).values(ticketsData).returning();
  } catch (error) {
    console.error("Database insertTickets failed:", error);
    throw new Error("Failed to save tickets to database.", { cause: error });
  }
}

export async function getTicketByNumber(ticketNumber: string): Promise<TicketRecord | null> {
  try {
    const db = getDb();
    const result = await db
      .select()
      .from(tickets)
      .where(eq(tickets.ticketNumber, ticketNumber))
      .limit(1);
    return result[0] || null;
  } catch (error) {
    console.error("Database getTicketByNumber failed:", error);
    throw new Error("Failed to retrieve ticket from database.", { cause: error });
  }
}

export async function getTicketsByOrderId(orderId: string): Promise<TicketRecord[]> {
  try {
    const db = getDb();
    return await db.select().from(tickets).where(eq(tickets.orderId, orderId));
  } catch (error) {
    console.error("Database getTicketsByOrderId failed:", error);
    throw new Error("Failed to retrieve order tickets.", { cause: error });
  }
}

export async function updateTicketStatus(
  ticketNumber: string,
  status: string,
  scannedBy?: string,
): Promise<TicketRecord | null> {
  try {
    const db = getDb();
    const result = await db
      .update(tickets)
      .set({
        status,
        scannedBy: scannedBy || null,
        scannedAt: status === "used" ? new Date() : null,
      })
      .where(eq(tickets.ticketNumber, ticketNumber))
      .returning();
    return result[0] || null;
  } catch (error) {
    console.error("Database updateTicketStatus failed:", error);
    throw new Error("Failed to update ticket status.", { cause: error });
  }
}

export async function getAllTickets(limitCount = 200): Promise<TicketRecord[]> {
  try {
    const db = getDb();
    return await db.select().from(tickets).orderBy(desc(tickets.createdAt)).limit(limitCount);
  } catch (error) {
    console.error("Database getAllTickets failed:", error);
    throw new Error("Failed to fetch tickets list.", { cause: error });
  }
}
