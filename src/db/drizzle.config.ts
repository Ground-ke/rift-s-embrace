import { defineConfig } from "drizzle-kit";
import * as dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

const databaseUrl = process.env.DATABASE_URL || process.env.POSTGRES_URL;
const sqlHost = process.env.SQL_HOST;
const sqlDbName = process.env.SQL_DB_NAME;
const user = process.env.SQL_ADMIN_USER || process.env.SQL_USER;
const password = process.env.SQL_ADMIN_PASSWORD || process.env.SQL_PASSWORD;

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  schemaFilter: ["public"],
  dbCredentials: databaseUrl
    ? {
        url: databaseUrl,
      }
    : {
        host: sqlHost || "localhost",
        port: process.env.SQL_PORT ? Number(process.env.SQL_PORT) : 5432,
        user: user || "postgres",
        password: password || "",
        database: sqlDbName || "postgres",
        ssl:
          process.env.SQL_SSL === "true" || (sqlHost && !sqlHost.startsWith("/"))
            ? { rejectUnauthorized: false }
            : false,
      },
  verbose: true,
});
