import { desc } from "drizzle-orm";
import { getDb } from "./index.ts";
import { auditLogs, type auditLogs as auditLogsTable } from "./schema.ts";

export type AuditLogRecord = typeof auditLogsTable.$inferSelect;
export type NewAuditLog = typeof auditLogsTable.$inferInsert;

export async function logAuditEvent(entry: NewAuditLog): Promise<AuditLogRecord> {
  try {
    const db = getDb();
    const result = await db.insert(auditLogs).values(entry).returning();
    return result[0];
  } catch (error) {
    console.error("Database logAuditEvent failed:", error);
    throw new Error("Failed to record audit log entry.", { cause: error });
  }
}

export async function getAuditLogs(limitCount = 100): Promise<AuditLogRecord[]> {
  try {
    const db = getDb();
    return await db.select().from(auditLogs).orderBy(desc(auditLogs.createdAt)).limit(limitCount);
  } catch (error) {
    console.error("Database getAuditLogs failed:", error);
    throw new Error("Failed to retrieve audit log history.", { cause: error });
  }
}
