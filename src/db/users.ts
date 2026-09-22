import { eq } from "drizzle-orm";
import { getDb } from "./index.ts";
import { users } from "./schema.ts";

export async function getOrCreateUser(uid: string, email: string, displayName?: string) {
  try {
    const db = getDb();
    const result = await db
      .insert(users)
      .values({
        uid,
        email,
        displayName: displayName || null,
      })
      .onConflictDoUpdate({
        target: users.uid,
        set: {
          email,
          ...(displayName ? { displayName } : {}),
        },
      })
      .returning();

    return result[0];
  } catch (error) {
    console.error("Database user upsert failed:", error);
    throw new Error("Database user synchronization failed.", { cause: error });
  }
}

export async function getUsers() {
  try {
    const db = getDb();
    return await db.select().from(users);
  } catch (error) {
    console.error("Database getUsers query failed:", error);
    throw new Error("Database query failed. Please try again later.", { cause: error });
  }
}

export async function getUserByUid(uid: string) {
  try {
    const db = getDb();
    const results = await db.select().from(users).where(eq(users.uid, uid)).limit(1);
    return results[0] || null;
  } catch (error) {
    console.error("Database getUserByUid query failed:", error);
    throw new Error("Database query failed. Please try again later.", { cause: error });
  }
}
