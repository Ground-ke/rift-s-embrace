import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";
import QRCode from "qrcode";
import {
  generateBookingConfirmationEmailHtml,
  generateEventReminder24hEmailHtml,
  generateRefundNoticeEmailHtml,
  type TicketEmailItem,
} from "../lib/email-templates";
import { generateTicketPdfBuffer } from "./pdf-ticket";

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
 * Supports inline CID attachments (images, QR) and documents (PDF, ICS).
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
  attachments?: Array<{
    filename: string;
    content: string | Buffer;
    encoding?: string;
    contentType?: string;
    cid?: string;
  }>;
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
          encoding: att.encoding || (typeof att.content === "string" ? "base64" : undefined),
          contentType: att.contentType,
          cid: att.cid,
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
    `[Email Service - Simulated Gmail SMTP] Email to ${Array.isArray(to) ? to.join(", ") : to}: "${subject}" (Attachments: ${attachments?.map((a) => a.filename).join(", ") || "None"})`,
  );
  return { success: true, simulated: true };
}

// -----------------------------------------------------------------------------
// Calendar Utilities
// -----------------------------------------------------------------------------

/**
 * Generates an RFC 5545 compliant iCalendar (.ics) string for calendar apps
 */
export function generateEventIcs({
  ticketCode,
  customerName,
  ticketTier,
  venueName = "Top Cliff Lodge, Nakuru",
}: {
  ticketCode: string;
  customerName: string;
  ticketTier: string;
  venueName?: string;
}): string {
  const now = new Date().toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
  // Event: Sat 31 Oct 2026 16:00 EAT (13:00 UTC) to Sun 01 Nov 2026 04:00 EAT (01:00 UTC)
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Verve & Co.//Hauntings of the Rift//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:REQUEST",
    "BEGIN:VEVENT",
    `UID:hauntings-rift-${ticketCode}@verve.co.ke`,
    `DTSTAMP:${now}`,
    "DTSTART:20261031T130000Z",
    "DTEND:20261101T010000Z",
    "SUMMARY:Hauntings of the Rift: Halloween Experience by Verve & Co.",
    `DESCRIPTION:Official Ticket Pass for ${customerName}\\nRSVP Code: ${ticketCode}\\nTier: ${ticketTier}\\nVenue: ${venueName}\\nStrictly 18+ with Valid ID. Present your QR code at the entrance gate.`,
    "LOCATION:Top Cliff Lodge, Nakuru-Nairobi Highway, Nakuru, Kenya",
    "STATUS:CONFIRMED",
    "ORGANIZER;CN=Verve & Co.:mailto:verve.n.co.ke@gmail.com",
    "SEQUENCE:0",
    "PRIORITY:5",
    "BEGIN:VALARM",
    "TRIGGER:-PT24H",
    "ACTION:DISPLAY",
    "DESCRIPTION:Hauntings of the Rift begins in 24 hours at Top Cliff Lodge, Nakuru!",
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}

// -----------------------------------------------------------------------------
// Dispatch Methods
// -----------------------------------------------------------------------------

/**
 * Sends official ticket confirmation email matching the exact template:
 * - Full-width event artwork banner
 * - Dark subtitle header strip
 * - Personalized greeting & RSVP code
 * - Centered high-contrast QR code
 * - [ View Ticket PDF ] primary action button
 * - Add to calendar link
 * - Attached real Ticket-[CODE].pdf
 * - Attached Event-[CODE].ics
 * - Embedded inline CID QR code and banner
 */
export async function sendTicketConfirmationEmail(params: {
  to: string;
  buyerName?: string;
  attendeeName?: string;
  customerName?: string;
  orderNumber?: string;
  ticketCode?: string;
  totalKes?: number;
  ticketTier?: string;
  tierName?: string;
  quantity?: number;
  admitsCount?: number;
  ticketUrl?: string;
  pdfUrl?: string;
  tickets?: TicketEmailItem[];
  venueName?: string;
  eventDate?: string;
  qrHash?: string;
}): Promise<{ success: boolean; id?: string; simulated?: boolean; error?: string }> {
  const name = params.buyerName || params.attendeeName || params.customerName || "Valued Attendee";
  const code =
    params.ticketCode ||
    params.orderNumber ||
    (params.tickets && params.tickets[0]?.ticketNumber) ||
    `HR-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}`;
  const tier =
    params.ticketTier ||
    params.tierName ||
    (params.tickets && params.tickets[0]?.tierName) ||
    "General Admission Pass";
  const qty = params.quantity || params.admitsCount || params.tickets?.length || 1;
  const total = params.totalKes ?? qty * 1000;
  const venue = params.venueName || "Top Cliff Lodge, Nakuru";
  const eventDate = params.eventDate || "Saturday, 31 October 2026";
  const siteUrl =
    process.env.SITE_URL ||
    "https://ais-dev-vsqv3iunzivbty4kcmufgu-668094516097.europe-west1.run.app";
  const primaryTicketUrl =
    params.ticketUrl ||
    (params.tickets && params.tickets[0]?.ticketUrl) ||
    `${siteUrl}/ticket/${code}`;
  const primaryPdfUrl = params.pdfUrl || `${siteUrl}/api/tickets/${code}/pdf`;

  // 1. Authoritatively Generate PDF Ticket Pass
  let pdfBuffer: Buffer;
  try {
    pdfBuffer = await generateTicketPdfBuffer({
      ticketCode: code,
      customerName: name,
      tierName: tier,
      admitsCount: qty,
      orderNumber: params.orderNumber || code,
      totalKes: total,
      qrHash: params.qrHash || (params.tickets && params.tickets[0]?.qrHash),
      eventDate,
      venueName: venue,
    });
  } catch (pdfErr) {
    console.warn("[PDF Gen] Fallback pass buffer used:", pdfErr);
    pdfBuffer = Buffer.from("%PDF-1.4 Fallback Ticket Pass");
  }

  // 2. Generate standard iCalendar (.ics) attachment
  const icsContent = generateEventIcs({
    ticketCode: code,
    customerName: name,
    ticketTier: tier,
    venueName: venue,
  });
  const icsBuffer = Buffer.from(icsContent, "utf-8");

  // 3. Generate high-resolution QR code PNG buffer for CID embedding
  const qrPayload = JSON.stringify({
    code,
    order: params.orderNumber || code,
    tier,
    holder: name,
    admits: qty,
    event: "HALLOWEEN_RIFT_2026",
  });
  let qrBuffer: Buffer;
  let qrDataUrl = "";
  try {
    qrBuffer = await QRCode.toBuffer(qrPayload, {
      width: 320,
      margin: 1,
      errorCorrectionLevel: "H",
    });
    qrDataUrl = `data:image/png;base64,${qrBuffer.toString("base64")}`;
  } catch (qrErr) {
    console.warn("[QR Gen Warning]:", qrErr);
    qrBuffer = Buffer.from("");
  }

  // 4. Read hero banner image for CID embedding
  let bannerBuffer: Buffer | null = null;
  try {
    const bannerPath = path.resolve(process.cwd(), "public/event-banner.jpg");
    if (fs.existsSync(bannerPath)) {
      bannerBuffer = fs.readFileSync(bannerPath);
    }
  } catch {
    bannerBuffer = null;
  }

  // 5. Generate Email HTML matching template
  const emailHtml = generateBookingConfirmationEmailHtml({
    customer_name: name,
    ticket_tier: tier,
    quantity: qty,
    total_amount: total.toLocaleString(),
    order_id: code,
    event_date: eventDate,
    ticket_url: primaryTicketUrl,
    pdf_url: primaryPdfUrl,
    banner_cid: bannerBuffer ? "event-banner" : undefined,
    banner_url: `${siteUrl}/event-banner.jpg`,
    qr_code_cid: qrBuffer.length > 0 ? "ticket-qr" : undefined,
    qr_data_url: qrDataUrl,
    venue_name: venue,
  });

  // 6. Assemble attachments
  const attachments: Array<{
    filename: string;
    content: Buffer;
    contentType?: string;
    cid?: string;
  }> = [
    {
      filename: `Ticket-${code}.pdf`,
      content: pdfBuffer,
      contentType: "application/pdf",
    },
    {
      filename: `Event-${code}.ics`,
      content: icsBuffer,
      contentType: "text/calendar; charset=utf-8; method=REQUEST",
    },
  ];

  if (bannerBuffer) {
    attachments.push({
      filename: "event-banner.jpg",
      content: bannerBuffer,
      contentType: "image/jpeg",
      cid: "event-banner",
    });
  }

  if (qrBuffer.length > 0) {
    attachments.push({
      filename: "ticket-qr.png",
      content: qrBuffer,
      contentType: "image/png",
      cid: "ticket-qr",
    });
  }

  return dispatchEmail({
    to: params.to,
    subject: `Your Ticket for Hauntings of the Rift: Halloween Experience by Verve & Co.`,
    html: emailHtml,
    attachments,
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
