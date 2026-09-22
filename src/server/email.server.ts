import { Resend } from "resend";
import {
  generateBookingConfirmationEmailHtml,
  generateEventReminder24hEmailHtml,
  generateRefundNoticeEmailHtml,
  type TicketEmailItem,
} from "@/lib/email-templates";

export {
  generateBookingConfirmationEmailHtml,
  generateEventReminder24hEmailHtml,
  generateRefundNoticeEmailHtml,
  type TicketEmailItem,
};

let resendClient: Resend | null = null;

function getResendClient(): Resend | null {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return null;
  if (!resendClient) {
    resendClient = new Resend(apiKey);
  }
  return resendClient;
}

// -----------------------------------------------------------------------------
// Dispatch Methods
// -----------------------------------------------------------------------------

/**
 * Sends official ticket confirmation email with digital ticket links
 */
export async function sendTicketConfirmationEmail({
  to,
  buyerName,
  orderNumber,
  totalKes,
  ticketTier,
  quantity,
  ticketUrl,
  tickets,
}: {
  to: string;
  buyerName: string;
  orderNumber: string;
  totalKes: number;
  ticketTier?: string;
  quantity?: number;
  ticketUrl?: string;
  tickets?: TicketEmailItem[];
}): Promise<{ success: boolean; id?: string; simulated?: boolean; error?: string }> {
  const fromEmail = process.env.EMAIL_FROM || "tickets@verve.co.ke";
  const client = getResendClient();

  const tier = ticketTier || (tickets && tickets[0]?.tierName) || "General Admission Pass";
  const qty = quantity || tickets?.length || 1;
  const primaryUrl =
    ticketUrl ||
    (tickets && tickets[0]?.ticketUrl) ||
    "https://hauntingsoftherift.co.ke/ticket/demo";

  const emailHtml = generateBookingConfirmationEmailHtml({
    customer_name: buyerName,
    ticket_tier: tier,
    quantity: qty,
    total_amount: totalKes.toLocaleString(),
    order_id: orderNumber,
    event_date: "Saturday, 31 October 2026",
    ticket_url: primaryUrl,
  });

  if (!client) {
    console.info(`[Email Service - Simulated] Ticket email generated for ${to}:`, {
      orderNumber,
      buyerName,
      totalKes,
    });
    return { success: true, simulated: true };
  }

  try {
    const { data, error } = await client.emails.send({
      from: fromEmail,
      to,
      subject: `Your Pass to Hauntings of the Rift (${orderNumber}) — Verve & Co.`,
      html: emailHtml,
    });

    if (error) {
      console.warn("[Resend Error] Could not send ticket confirmation:", error);
      return { success: false, error: error.message };
    }

    return { success: true, id: data?.id };
  } catch (err) {
    console.error("[Email Exception]", err);
    return { success: false, error: err instanceof Error ? err.message : String(err) };
  }
}

/**
 * Sends 24-Hour Event Reminder Email
 */
export async function sendEventReminder24hEmail({
  to,
  customerName,
  venueName = "Top Cliff Lounge, Nakuru",
  gateOpeningTime = "18:00 EAT",
  ticketTier = "General Admission Pass",
  ticketUrl = "https://hauntingsoftherift.co.ke",
}: {
  to: string;
  customerName: string;
  venueName?: string;
  gateOpeningTime?: string;
  ticketTier?: string;
  ticketUrl?: string;
}): Promise<{ success: boolean; id?: string; simulated?: boolean; error?: string }> {
  const fromEmail = process.env.EMAIL_FROM || "tickets@verve.co.ke";
  const client = getResendClient();

  const emailHtml = generateEventReminder24hEmailHtml({
    customer_name: customerName,
    venue_name: venueName,
    gate_opening_time: gateOpeningTime,
    ticket_tier: ticketTier,
    ticket_url: ticketUrl,
  });

  if (!client) {
    console.info(`[Email Service - Simulated] 24h Reminder email generated for ${to}:`, {
      customerName,
      venueName,
      gateOpeningTime,
    });
    return { success: true, simulated: true };
  }

  try {
    const { data, error } = await client.emails.send({
      from: fromEmail,
      to,
      subject: "24 Hours Until Hauntings of the Rift — Gate & Arrival Instructions",
      html: emailHtml,
    });

    if (error) {
      console.warn("[Resend Error] Could not send 24h reminder:", error);
      return { success: false, error: error.message };
    }

    return { success: true, id: data?.id };
  } catch (err) {
    console.error("[Email Exception]", err);
    return { success: false, error: err instanceof Error ? err.message : String(err) };
  }
}

/**
 * Sends Refund Confirmation Email
 */
export async function sendRefundNoticeEmail({
  to,
  customerName,
  refundAmount,
  paymentRef,
  refundReason,
  orderId,
}: {
  to: string;
  customerName: string;
  refundAmount: number | string;
  paymentRef: string;
  refundReason: string;
  orderId: string;
}): Promise<{ success: boolean; id?: string; simulated?: boolean; error?: string }> {
  const fromEmail = process.env.EMAIL_FROM || "tickets@verve.co.ke";
  const client = getResendClient();

  const formattedAmount =
    typeof refundAmount === "number" ? refundAmount.toLocaleString() : refundAmount;

  const emailHtml = generateRefundNoticeEmailHtml({
    customer_name: customerName,
    refund_amount: formattedAmount,
    payment_ref: paymentRef,
    refund_reason: refundReason,
    order_id: orderId,
  });

  if (!client) {
    console.info(`[Email Service - Simulated] Refund notice email generated for ${to}:`, {
      customerName,
      refundAmount: formattedAmount,
      paymentRef,
      orderId,
    });
    return { success: true, simulated: true };
  }

  try {
    const { data, error } = await client.emails.send({
      from: fromEmail,
      to,
      subject: `Refund Processed — Hauntings of the Rift (${orderId})`,
      html: emailHtml,
    });

    if (error) {
      console.warn("[Resend Error] Could not send refund email:", error);
      return { success: false, error: error.message };
    }

    return { success: true, id: data?.id };
  } catch (err) {
    console.error("[Email Exception]", err);
    return { success: false, error: err instanceof Error ? err.message : String(err) };
  }
}

/**
 * Sends recovery link email with cryptographic access token
 */
export async function sendRecoveryEmail({
  to,
  recoveryUrl,
  ticketsCount,
}: {
  to: string;
  recoveryUrl: string;
  ticketsCount: number;
}): Promise<{ success: boolean; id?: string; simulated?: boolean; error?: string }> {
  const fromEmail = process.env.EMAIL_FROM || "tickets@verve.co.ke";
  const client = getResendClient();

  const emailHtml = `
    <!DOCTYPE html>
    <html>
      <head><meta charset="utf-8" /></head>
      <body style="background:#09080D; font-family:sans-serif; color:#F5F2EB; margin:0; padding:24px;">
        <div style="max-width:560px; margin:0 auto; background:#0F0D15; border:1px solid #28212D; padding:28px; border-radius:8px;">
          <div style="text-align:center; border-bottom:1px solid #28212D; padding-bottom:16px; margin-bottom:20px;">
            <p style="color:#C9A84C; font-size:11px; text-transform:uppercase; letter-spacing:0.2em; margin:0 0 6px 0;">Verve & Co.</p>
            <h1 style="color:#F5F2EB; font-size:22px; margin:0;">TICKET RECOVERY PORTAL</h1>
          </div>

          <p style="font-size:14px; line-height:1.6; color:#D5CFDE;">
            We received a request to access and recover digital event passes for <strong>Hauntings of the Rift</strong> associated with <strong>${to}</strong>.
          </p>

          <p style="font-size:14px; line-height:1.6; color:#A09BA8;">
            We found <strong style="color:#F5F2EB;">${ticketsCount}</strong> ticket pass(es) linked to your records. Click the button below to view and download your passes. This secure link is valid for 1 hour.
          </p>

          <div style="text-align:center; margin:28px 0;">
            <a href="${recoveryUrl}" style="background:#8A1C2C; color:#FFFFFF; padding:12px 28px; text-decoration:none; font-weight:bold; font-size:15px; border-radius:4px; display:inline-block; letter-spacing:0.05em;">
              ACCESS MY DIGITAL TICKETS
            </a>
          </div>

          <p style="font-size:12px; color:#787182; line-height:1.4;">
            If you did not request this recovery link, you can safely disregard this email. Your tickets remain secure and accessible only through your verified link.
          </p>

          <div style="text-align:center; margin-top:28px; border-top:1px solid #28212D; padding-top:16px;">
            <p style="color:#6A6372; font-size:11px; margin:0;">
              Hauntings of the Rift • Verve &amp; Co. Security
            </p>
          </div>
        </div>
      </body>
    </html>
  `;

  if (!client) {
    console.info(`[Email Service - Simulated] Ticket Recovery Link for ${to}:`, {
      recoveryUrl,
      ticketsCount,
    });
    return { success: true, simulated: true };
  }

  try {
    const { data, error } = await client.emails.send({
      from: fromEmail,
      to,
      subject: "Access Your Event Tickets — Hauntings of the Rift",
      html: emailHtml,
    });

    if (error) {
      console.warn("[Resend Error] Could not send recovery email:", error);
      return { success: false, error: error.message };
    }

    return { success: true, id: data?.id };
  } catch (err) {
    console.error("[Email Exception]", err);
    return { success: false, error: err instanceof Error ? err.message : String(err) };
  }
}
