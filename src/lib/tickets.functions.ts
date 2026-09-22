import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export type PublicTicket = {
  ticket_code: string;
  qr_hash: string;
  event_name: string;
  event_date: string | null;
  venue: string | null;
  tier: string;
  holder_name: string;
  is_used: boolean;
  used_at: string | null;
};

export type TicketLookupResult =
  { status: "ok"; ticket: PublicTicket } | { status: "invalid"; message: string };

/**
 * Public ticket lookup. The signature in the QR payload is what proves the
 * request is legitimate, so an unsigned or tampered code is rejected outright.
 */
export const getTicketByCode = createServerFn({ method: "GET" })
  .inputValidator((data: unknown) =>
    z
      .object({
        code: z.string().trim().min(8).max(120),
        sig: z.string().trim().min(16).max(200),
      })
      .parse(data),
  )
  .handler(async ({ data }): Promise<TicketLookupResult> => {
    const { verifyTicketSignature } = await import("./tickets.server");
    if (!verifyTicketSignature(data.code, data.sig)) {
      return { status: "invalid", message: "This ticket link is not valid." };
    }

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: row } = await supabaseAdmin
      .from("tickets")
      .select(
        "ticket_code, qr_hash, event_name, event_date, venue, tier, holder_name, is_used, used_at",
      )
      .eq("ticket_code", data.code)
      .maybeSingle();

    if (!row) return { status: "invalid", message: "This ticket link is not valid." };
    return { status: "ok", ticket: row as PublicTicket };
  });
