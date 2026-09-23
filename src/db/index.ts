import { drizzle } from "drizzle-orm/node-postgres";
import { Pool, type PoolConfig } from "pg";
import * as schema from "./schema.ts";

declare global {
  var _postgresPool: Pool | undefined;
}

export function isCloudSqlConfigured(): boolean {
  return Boolean(
    (process.env.SQL_HOST && process.env.SQL_USER && process.env.SQL_DB_NAME) ||
    process.env.DATABASE_URL ||
    process.env.POSTGRES_URL,
  );
}

// Function to create or retrieve the connection pool using the Object Method
export const createPool = (): Pool => {
  if (!isCloudSqlConfigured()) {
    throw new Error("Cloud SQL is not configured");
  }
  if (!global._postgresPool) {
    const config: PoolConfig = {
      max: process.env.VERCEL ? 5 : 10,
      connectionTimeoutMillis: 15000,
    };

    if (process.env.DATABASE_URL || process.env.POSTGRES_URL) {
      config.connectionString = process.env.DATABASE_URL || process.env.POSTGRES_URL;
      if (process.env.SQL_SSL !== "false") {
        config.ssl = { rejectUnauthorized: false };
      }
    } else {
      config.host = process.env.SQL_HOST;
      config.port = process.env.SQL_PORT ? Number(process.env.SQL_PORT) : 5432;
      config.user = process.env.SQL_USER;
      config.password = process.env.SQL_PASSWORD;
      config.database = process.env.SQL_DB_NAME;

      // Enable SSL if explicitly configured or running on Vercel connecting to a public IP
      if (
        process.env.SQL_SSL === "true" ||
        (process.env.VERCEL && process.env.SQL_HOST && !process.env.SQL_HOST.startsWith("/"))
      ) {
        config.ssl = { rejectUnauthorized: false };
      }
    }

    global._postgresPool = new Pool(config);

    // Prevent unhandled pool-level errors from crashing the application
    global._postgresPool.on("error", (err) => {
      console.error("Unexpected error on idle SQL pool client:", err);
    });
  }

  return global._postgresPool;
};

const createMockDb = (): ReturnType<typeof drizzle<typeof schema>> => {
  const noOp = {
    findMany: async () => [],
    findFirst: async () => null,
    findUnique: async () => null,
    create: async (d: { data?: unknown }) => d?.data ?? {},
    update: async (d: { data?: unknown }) => d?.data ?? {},
    delete: async () => ({}),
  };
  return new Proxy({} as unknown as ReturnType<typeof drizzle<typeof schema>>, {
    get: (_, prop) =>
      prop === "query"
        ? new Proxy({}, { get: () => noOp })
        : () => ({
            values: () => ({ returning: async () => [] }),
            set: () => ({ where: () => ({ returning: async () => [] }) }),
            where: () => ({ limit: async () => [] }),
            from: () => ({ where: () => ({ limit: async () => [] }) }),
          }),
  });
};

// Initialize pool lazily to avoid connection attempts if Cloud SQL is not configured
let dbInstance: ReturnType<typeof drizzle<typeof schema>> | null = null;

export const getDb = () => {
  if (!isCloudSqlConfigured()) {
    if (!dbInstance) {
      dbInstance = createMockDb();
    }
    return dbInstance;
  }
  if (!dbInstance) {
    try {
      const pool = createPool();
      dbInstance = drizzle(pool, { schema });
    } catch {
      console.warn("[AI Studio] Database not connected — using mock");
      dbInstance = createMockDb();
    }
  }
  return dbInstance;
};

export const db = getDb();
export { schema };
