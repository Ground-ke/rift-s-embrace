import { eq, desc } from "drizzle-orm";
import { getDb } from "./index.ts";
import { orders, type orders as ordersTable } from "./schema.ts";

export type OrderRecord = typeof ordersTable.$inferSelect;
export type NewOrder = typeof ordersTable.$inferInsert;

export async function insertOrder(orderData: NewOrder): Promise<OrderRecord> {
  try {
    const db = getDb();
    const result = await db.insert(orders).values(orderData).returning();
    return result[0];
  } catch (error) {
    console.error("Database insertOrder failed:", error);
    throw new Error("Failed to save order to database.", { cause: error });
  }
}

export async function getOrderById(orderId: string): Promise<OrderRecord | null> {
  try {
    const db = getDb();
    const result = await db.select().from(orders).where(eq(orders.id, orderId)).limit(1);
    return result[0] || null;
  } catch (error) {
    console.error("Database getOrderById failed:", error);
    throw new Error("Failed to retrieve order from database.", { cause: error });
  }
}

export async function updateOrderStatus(
  orderId: string,
  updates: Partial<OrderRecord>,
): Promise<OrderRecord | null> {
  try {
    const db = getDb();
    const result = await db
      .update(orders)
      .set({
        ...updates,
        updatedAt: new Date(),
      })
      .where(eq(orders.id, orderId))
      .returning();
    return result[0] || null;
  } catch (error) {
    console.error("Database updateOrderStatus failed:", error);
    throw new Error("Failed to update order status.", { cause: error });
  }
}

export async function getAllOrders(limitCount = 100): Promise<OrderRecord[]> {
  try {
    const db = getDb();
    return await db.select().from(orders).orderBy(desc(orders.createdAt)).limit(limitCount);
  } catch (error) {
    console.error("Database getAllOrders failed:", error);
    throw new Error("Failed to fetch orders list.", { cause: error });
  }
}
