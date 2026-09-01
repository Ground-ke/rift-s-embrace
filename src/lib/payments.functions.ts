import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export const paymentInputSchema = z.object({
  idempotency_key: z.string().trim().min(8).max(120),
  amount: z.number().positive().max(10_000_000),
  payment_details: z.object({
    buyer_name: z.string().trim().min(2).max(100),
    buyer_email: z.string().trim().email().max(255),
    buyer_phone: z.string().trim().min(9).max(20),
    tier: z.string().trim().min(1).max(60),
    quantity: z.number().int().min(1).max(20),
    currency: z.string().trim().length(3).optional(),
    /** Deliberate failure switch used by the demo flow. */
    simulate_failure: z.boolean().optional(),
  }),
});

export type PaymentInput = z.infer<typeof paymentInputSchema>;

export type TransactionRecord = {
  id: string;
  idempotency_key: string;
  amount: number;
  currency: string;
  status: "pending" | "completed" | "failed";
  payment_provider_ref: string | null;
  tier: string | null;
  quantity: number;
  created_at: string;
};

export type IssuedTicket = {
  ticket_code: string;
  tier: string;
  holder_name: string;
  is_used: boolean;
};

export type VerifyPaymentResult =
  | {
      status: "success";
      code: 200;
      replayed: boolean;
      transaction: TransactionRecord;
      tickets: IssuedTicket[];
    }
  | { status: "processing"; code: 409; message: string }
  | { status: "error"; code: 402 | 400 | 500; message: string; transaction?: TransactionRecord };

function toRecord(row: Record<string, unknown>): TransactionRecord {
  return {
    id: String(row["id"]),
    idempotency_key: String(row["idempotency_key"]),
    amount: Number(row["amount"]),
    currency: String(row["currency"]),
    status: row["status"] as TransactionRecord["status"],
    payment_provider_ref: (row["payment_provider_ref"] as string | null) ?? null,
    tier: (row["tier"] as string | null) ?? null,
    quantity: Number(row["quantity"] ?? 1),
    created_at: String(row["created_at"]),
  };
}

export const verifyPayment = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => paymentInputSchema.parse(data))
  .handler(async ({ data }): Promise<VerifyPaymentResult> => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { issueTicketsForTransaction } = await import("./tickets.server");

    const details = data.payment_details;
    const currency = details.currency ?? "KES";

    // ---------------------------------------------------------------
    // 1. Idempotency gate
    // ---------------------------------------------------------------
    const { data: existing } = await supabaseAdmin
      .from("transactions")
      .select("*")
      .eq("idempotency_key", data.idempotency_key)
      .maybeSingle();

    if (existing) {
      const record = toRecord(existing as Record<string, unknown>);

      if (record.status === "completed") {
        const { data: ticketRows } = await supabaseAdmin
          .from("tickets")
          .select("ticket_code, tier, holder_name, is_used")
          .eq("order_id", record.id);
        return {
          status: "success",
          code: 200,
          replayed: true,
          transaction: record,
          tickets: (ticketRows ?? []) as IssuedTicket[],
        };
      }

      if (record.status === "pending") {
        return {
          status: "processing",
          code: 409,
          message: "This payment is already being processed. Please wait for it to complete.",
        };
      }

      // A previously failed attempt may be retried with the same key.
      await supabaseAdmin
        .from("transactions")
        .update({ status: "pending", failure_reason: null })
        .eq("id", record.id);
    }

    // ---------------------------------------------------------------
    // 2. Reserve the idempotency key with a pending row
    // ---------------------------------------------------------------
    let transactionId = existing ? String((existing as Record<string, unknown>)["id"]) : "";

    if (!existing) {
      const { data: inserted, error: insertError } = await supabaseAdmin
        .from("transactions")
        .insert({
          idempotency_key: data.idempotency_key,
          amount: data.amount,
          currency,
          status: "pending",
          buyer_name: details.buyer_name,
          buyer_email: details.buyer_email.toLowerCase(),
          buyer_phone: details.buyer_phone,
          tier: details.tier,
          quantity: details.quantity,
        })
        .select("*")
        .single();

      if (insertError || !inserted) {
        // Unique violation = a concurrent request won the race.
        if (insertError?.code === "23505") {
          return {
            status: "processing",
            code: 409,
            message: "This payment is already being processed. Please wait for it to complete.",
          };
        }
        return { status: "error", code: 500, message: "Could not start the payment." };
      }
      transactionId = String((inserted as Record<string, unknown>)["id"]);
    }

    // ---------------------------------------------------------------
    // 3. Call the payment provider (mocked until Daraja goes live)
    // ---------------------------------------------------------------
    try {
      const providerResult = await mockProviderCharge({
        amount: data.amount,
        currency,
        phone: details.buyer_phone,
        fail: details.simulate_failure === true,
      });

      if (!providerResult.ok) {
        const { data: failedRow } = await supabaseAdmin
          .from("transactions")
          .update({ status: "failed", failure_reason: providerResult.message })
          .eq("id", transactionId)
          .select("*")
          .single();

        return {
          status: "error",
          code: 402,
          message: providerResult.message,
          ...(failedRow ? { transaction: toRecord(failedRow as Record<string, unknown>) } : {}),
        };
      }

      const { data: completed } = await supabaseAdmin
        .from("transactions")
        .update({
          status: "completed",
          payment_provider_ref: providerResult.reference,
          failure_reason: null,
        })
        .eq("id", transactionId)
        .select("*")
        .single();

      const record = toRecord((completed ?? {}) as Record<string, unknown>);
      const tickets = await issueTicketsForTransaction({
        transactionId,
        quantity: details.quantity,
        tier: details.tier,
        holderName: details.buyer_name,
        holderEmail: details.buyer_email.toLowerCase(),
        holderPhone: details.buyer_phone,
      });

      return { status: "success", code: 200, replayed: false, transaction: record, tickets };
    } catch (error) {
      console.error("[verifyPayment] provider error", error);
      await supabaseAdmin
        .from("transactions")
        .update({ status: "failed", failure_reason: "Provider unreachable" })
        .eq("id", transactionId);
      return {
        status: "error",
        code: 500,
        message: "We could not reach the payment provider. Please retry.",
      };
    }
  });

async function mockProviderCharge(input: {
  amount: number;
  currency: string;
  phone: string;
  fail: boolean;
}): Promise<{ ok: true; reference: string } | { ok: false; message: string }> {
  await new Promise((resolve) => setTimeout(resolve, 900));
  if (input.fail) {
    return { ok: false, message: "The payment was declined by the provider. No money was taken." };
  }
  const ref = `MPX${Date.now().toString(36).toUpperCase()}${Math.floor(Math.random() * 9000 + 1000)}`;
  return { ok: true, reference: ref };
}
