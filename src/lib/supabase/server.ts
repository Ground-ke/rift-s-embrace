import { createClient } from "@supabase/supabase-js";
import type { Database } from "../database.types";

// Server-authoritative Supabase client (Uses service role secret, NEVER exposed to client)
const supabaseUrl = process.env["SUPABASE_URL"] || process.env["VITE_SUPABASE_URL"] || "";
const supabaseServiceKey = process.env["SUPABASE_SERVICE_ROLE_KEY"] || "";

export const supabaseServer =
  supabaseUrl && supabaseServiceKey
    ? createClient<Database>(supabaseUrl, supabaseServiceKey, {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      })
    : null;

export const isServerSupabaseConfigured = Boolean(supabaseUrl && supabaseServiceKey);
