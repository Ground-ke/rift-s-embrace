import { createClient } from "@supabase/supabase-js";
import type { Database } from "../database.types";

// Browser-safe Supabase client (Uses anon public key, respects Row Level Security)
const supabaseUrl = import.meta.env["VITE_SUPABASE_URL"] || "";
const supabaseAnonKey = import.meta.env["VITE_SUPABASE_ANON_KEY"] || "";

export const supabaseClient =
  supabaseUrl && supabaseAnonKey ? createClient<Database>(supabaseUrl, supabaseAnonKey) : null;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);
