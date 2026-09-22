import { eq } from "drizzle-orm";
import { getDb } from "./index.ts";
import { promotions, type promotions as promotionsTable } from "./schema.ts";

export type PromotionRecord = typeof promotionsTable.$inferSelect;
export type NewPromotion = typeof promotionsTable.$inferInsert;

export async function getPromotionByCode(code: string): Promise<PromotionRecord | null> {
  try {
    const db = getDb();
    const result = await db
      .select()
      .from(promotions)
      .where(eq(promotions.code, code.toUpperCase().trim()))
      .limit(1);
    return result[0] || null;
  } catch (error) {
    console.error("Database getPromotionByCode failed:", error);
    throw new Error("Failed to validate promo code.", { cause: error });
  }
}

export async function getAllPromotions(): Promise<PromotionRecord[]> {
  try {
    const db = getDb();
    return await db.select().from(promotions);
  } catch (error) {
    console.error("Database getAllPromotions failed:", error);
    throw new Error("Failed to fetch promotions.", { cause: error });
  }
}
