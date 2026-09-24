import nodemailer from "nodemailer";
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

let smtpTransporter: nodemailer.Transporter | null = null;

/**
 * Configure Nodemailer SMTP Transporter
 * Uses Gmail SMTP with verve.n.co.ke@gmail.com and Google App Password.
 */
function getSmtpTransporter(): nodemailer.Transporter | null {
  const rawUser = process.env.SMTP_USER || process.env.GMAIL_USER || "verve.n.co.ke@gmail.com";
  const rawPass = process.env.SMTP_PASS || process.env.GMAIL_APP_PASSWORD;

  if (!rawPass) return null;

  const user = rawUser.trim();
  // Google App Passwords often have spaces (e.g., 'vcie zmdk vsmf npgp'). Strip spaces for SMTP auth.
  const pass = rawPass.replace(/\s+/g, "");

  if (!smtpTransporter) {
    const host = process.env.SMTP_HOST || "smtp.gmail.com";
    const port = Number(process.env.SMTP_PORT) || 465;
    const secure = process.env.SMTP_SECURE === "false" ? false : true;

    smtpTransporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: {
        user,
        pass,
      },
    });
  }
  return smtpTransporter;
}

/**
 * Standard Email Dispatcher
 * Exclusively routes through Gmail SMTP (Nodemailer) from verve.n.co.ke@gmail.com.
 * Safely simulates/logs in development if credentials have not been configured yet.
 */
async function dispatchEmail({
  to,
  subject,
  html,
  attachments,
}: {
  to: string | string[];
  subject: string;
  html: string;
  attachments?: Array<{ filename: string; content: string; contentType?: string }>;
}): Promise<{ success: boolean; id?: string; simulated?: boolean; error?: string }> {
  const defaultFrom =
    process.env.EMAIL_FROM ||
    (process.env.SMTP_USER
      ? `"Verve & Co." <${process.env.SMTP_USER}>`
      : '"Verve & Co." <verve.n.co.ke@gmail.com>');

  const smtp = getSmtpTransporter();
  if (smtp) {
    try {
      const info = await smtp.sendMail({
        from: defaultFrom,
        to,
        subject,
        html,
        attachments: attachments?.map((att) => ({
          filename: att.filename,
          content: att.content,
          encoding: "base64",
          contentType: att.contentType,
        })),
      });
      return { success: true, id: info.messageId };
    } catch (smtpErr) {
      console.error("[SMTP Error] Failed sending via Gmail SMTP:", smtpErr);
      return {
        success: false,
        error: smtpErr instanceof Error ? smtpErr.message : String(smtpErr),
      };
    }
  }

  // Simulation mode (logs safely in dev / test when SMTP credentials are not yet configured)
  console.info(
    `[Email Service - Simulated Gmail SMTP] Email to ${Array.isArray(to) ? to.join(", ") : to}: "${subject}"`,
  );
  return { success: true, simulated: true };
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
      <strong>Venue:</strong> Top Cliff Lodge, Nakuru<br/>
      <strong>Date:</strong> Saturday, 31 October 2026 · Gates Open 4:00 PM EAT<br/>
      <strong>Entry Policy:</strong> Strictly 18+ with Valid Government ID. Present this QR code at gate checkpoint.
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

  return dispatchEmail({
    to,
    subject: `Your Pass to Hauntings of the Rift (${orderNumber}) — Verve & Co.`,
    html: emailHtml,
    attachments: [
      {
        filename: `Pass-${orderNumber}.html`,
        content: Buffer.from(printableTicketPassHtml).toString("base64"),
        contentType: "text/html",
      },
    ],
  });
}

/**
 * Sends 24-Hour Event Reminder Email
 */
export async function sendEventReminder24hEmail({
  to,
  customerName,
  venueName = "Top Cliff Lodge, Nakuru",
  gateOpeningTime = "16:00 EAT",
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
  const emailHtml = generateEventReminder24hEmailHtml({
    customer_name: customerName,
    venue_name: venueName,
    gate_opening_time: gateOpeningTime,
    ticket_tier: ticketTier,
    ticket_url: ticketUrl,
  });

  return dispatchEmail({
    to,
    subject: "24 Hours Until Hauntings of the Rift — Gate & Arrival Instructions",
    html: emailHtml,
  });
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
  const formattedAmount =
    typeof refundAmount === "number" ? refundAmount.toLocaleString() : refundAmount;

  const emailHtml = generateRefundNoticeEmailHtml({
    customer_name: customerName,
    refund_amount: formattedAmount,
    payment_ref: paymentRef,
    refund_reason: refundReason,
    order_id: orderId,
  });

  return dispatchEmail({
    to,
    subject: `Refund Processed — Hauntings of the Rift (${orderId})`,
    html: emailHtml,
  });
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

  return dispatchEmail({
    to,
    subject: "Access Your Event Tickets — Hauntings of the Rift",
    html: emailHtml,
  });
}

/**
 * Sends a custom email broadcast to a buyer or list of attendees
 */
export async function sendBroadcastEmail({
  to,
  subject,
  headline,
  message,
  ctaText,
  ctaUrl,
}: {
  to: string | string[];
  subject: string;
  headline: string;
  message: string;
  ctaText?: string;
  ctaUrl?: string;
}): Promise<{ success: boolean; id?: string; simulated?: boolean; error?: string }> {
  const formattedMessage = message
    .split("\n\n")
    .map(
      (p) =>
        `<p style="font-size:15px; line-height:1.7; color:#D5CFDE; margin:0 0 16px 0;">${p.replace(/\n/g, "<br/>")}</p>`,
    )
    .join("");

  const emailHtml = `
    <!DOCTYPE html>
    <html>
      <head><meta charset="utf-8" /></head>
      <body style="background:#09080D; font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color:#F5F2EB; margin:0; padding:24px;">
        <div style="max-width:580px; margin:0 auto; background:#120E17; border:1px solid #332338; padding:32px; border-radius:12px; box-shadow:0 12px 36px rgba(0,0,0,0.6);">
          <div style="text-align:center; border-bottom:1px dashed #3D2644; padding-bottom:20px; margin-bottom:24px;">
            <p style="color:#F59E0B; font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:0.25em; margin:0 0 8px 0;">Official Event Broadcast</p>
            <h1 style="color:#F5F2EB; font-size:24px; font-weight:700; letter-spacing:-0.02em; margin:0 0 4px 0;">${headline}</h1>
            <p style="color:#9CA3AF; font-size:12px; margin:0;">Hauntings of the Rift • Verve &amp; Co.</p>
          </div>

          <div style="padding:4px 0;">
            ${formattedMessage}
          </div>

          ${
            ctaText && ctaUrl
              ? `
          <div style="text-align:center; margin:32px 0 24px 0;">
            <a href="${ctaUrl}" style="background:#991B1B; color:#FFFFFF; padding:14px 32px; text-decoration:none; font-weight:700; font-size:14px; border-radius:6px; display:inline-block; letter-spacing:0.06em; text-transform:uppercase;">
              ${ctaText}
            </a>
          </div>
          `
              : ""
          }

          <div style="margin-top:32px; border-top:1px solid #281D2E; padding-top:20px; text-align:center;">
            <p style="color:#71677A; font-size:11px; line-height:1.5; margin:0 0 6px 0;">
              You received this notice because you purchased a pass or subscribed to updates for Hauntings of the Rift.
            </p>
            <p style="color:#574E60; font-size:11px; margin:0;">
              Top Cliff Lodge, Nakuru • 31 October 2026 • 18+ Strictly
            </p>
          </div>
        </div>
      </body>
    </html>
  `;

  return dispatchEmail({
    to,
    subject,
    html: emailHtml,
  });
}
