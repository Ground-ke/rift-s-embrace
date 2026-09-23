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
 * Generates an offline, self-contained printable digital ticket pass HTML
 */
function generatePrintableTicketPassHtml({
  buyerName,
  orderNumber,
  totalKes,
  ticketTier,
  quantity,
  primaryUrl,
  tickets,
}: {
  buyerName: string;
  orderNumber: string;
  totalKes: number;
  ticketTier: string;
  quantity: number;
  primaryUrl: string;
  tickets?: TicketEmailItem[];
}): string {
  const primaryCode = (tickets && tickets[0]?.ticketNumber) || orderNumber;
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(
    JSON.stringify({
      order: orderNumber,
      code: primaryCode,
      tier: ticketTier,
      event: "HALLOWEEN_RIFT_2026",
    }),
  )}`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Admission Pass — ${orderNumber} — Verve &amp; Co.</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #0c070b; color: #f5f3ef; margin: 0; padding: 24px; }
    .ticket-card { max-width: 520px; margin: 0 auto; background: #180f16; border: 2px solid #f59e0b; border-radius: 16px; padding: 28px; box-shadow: 0 20px 40px rgba(0,0,0,0.8); }
    .header { text-align: center; border-bottom: 1px dashed #4b2a3d; padding-bottom: 20px; }
    .logo { color: #f59e0b; font-size: 24px; font-weight: 800; letter-spacing: 2px; text-transform: uppercase; }
    .event-title { font-size: 18px; color: #fdf2f8; margin-top: 6px; font-weight: 600; }
    .qr-container { text-align: center; margin: 24px 0; }
    .qr-box { background: #ffffff; padding: 14px; border-radius: 12px; display: inline-block; box-shadow: 0 4px 12px rgba(0,0,0,0.4); }
    .details { margin: 20px 0; font-size: 14px; line-height: 1.6; }
    .details-row { display: flex; justify-content: space-between; margin-bottom: 8px; border-bottom: 1px solid #281822; padding-bottom: 4px; }
    .label { color: #9ca3af; text-transform: uppercase; font-size: 11px; letter-spacing: 1px; }
    .value { font-weight: 600; color: #f3f4f6; }
    .venue { font-size: 12px; color: #d1d5db; background: #241420; padding: 12px; border-radius: 8px; margin-top: 16px; border-left: 3px solid #f59e0b; }
    .btn { display: block; text-align: center; background: #f59e0b; color: #0c070b; text-decoration: none; font-weight: 700; padding: 12px; border-radius: 8px; margin-top: 20px; text-transform: uppercase; font-size: 13px; letter-spacing: 1px; }
  </style>
</head>
<body>
  <div class="ticket-card">
    <div class="header">
      <div class="logo">Verve &amp; Co.</div>
      <div class="event-title">Hauntings of the Rift — Official Admission Pass</div>
    </div>
    <div class="qr-container">
      <div class="qr-box">
        <img src="${qrUrl}" alt="Gate Entry QR Code" width="220" height="220" style="display: block;" />
      </div>
      <div style="font-family: monospace; font-size: 12px; color: #f59e0b; margin-top: 8px;">${primaryCode}</div>
    </div>
    <div class="details">
      <div class="details-row"><span class="label">Guest Name</span><span class="value">${buyerName}</span></div>
      <div class="details-row"><span class="label">Order Ref</span><span class="value" style="font-family: monospace;">${orderNumber}</span></div>
      <div class="details-row"><span class="label">Pass Selection</span><span class="value">${ticketTier} (x${quantity})</span></div>
      <div class="details-row"><span class="label">Total Paid</span><span class="value" style="color: #10b981;">KES ${totalKes.toLocaleString()} (vervenexus)</span></div>
      ${tickets && tickets[0] ? `<div class="details-row"><span class="label">Ticket Pass Code</span><span class="value" style="font-family: monospace;">${tickets[0].ticketNumber}</span></div>` : ""}
    </div>
    <div class="venue">
      <strong>Venue:</strong> Top Cliff Lounge, Nakuru-Nairobi Highway<br/>
      <strong>Date:</strong> Saturday, 31 October 2026 · Gates Open 4:00 PM EAT<br/>
      <strong>Entry Policy:</strong> Strictly 21+ with Valid Government ID. Present this QR code at gate checkpoint.
    </div>
    <a href="${primaryUrl}" class="btn" target="_blank">Open Online Pass &amp; Details</a>
  </div>
</body>
</html>`;
}

/**
 * Sends official ticket confirmation email with digital ticket links and attached printable pass
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
    "https://verve-hauntings.vercel.app/ticket/demo";

  const emailHtml = generateBookingConfirmationEmailHtml({
    customer_name: buyerName,
    ticket_tier: tier,
    quantity: qty,
    total_amount: totalKes.toLocaleString(),
    order_id: orderNumber,
    event_date: "Saturday, 31 October 2026",
    ticket_url: primaryUrl,
  });

  const printableTicketPassHtml = generatePrintableTicketPassHtml({
    buyerName,
    orderNumber,
    totalKes,
    ticketTier: tier,
    quantity: qty,
    primaryUrl,
    tickets,
  });

  if (!client) {
    console.info(`[Email Service - Simulated] Ticket email generated for ${to}:`, {
      orderNumber,
      buyerName,
      totalKes,
      hasAttachment: true,
    });
    return { success: true, simulated: true };
  }

  try {
    const { data, error } = await client.emails.send({
      from: fromEmail,
      to,
      subject: `Your Pass to Hauntings of the Rift (${orderNumber}) — Verve & Co.`,
      html: emailHtml,
      attachments: [
        {
          filename: `Pass-${orderNumber}.html`,
          content: Buffer.from(printableTicketPassHtml).toString("base64"),
        },
      ],
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
