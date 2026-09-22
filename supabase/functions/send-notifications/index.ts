import { serve } from "https://deno.land/std@0.177.0/http/server.ts";

// Interface Definitions
type EventType = "BOOKING_CONFIRMATION" | "EVENT_REMINDER_24H" | "REFUND_NOTICE";

interface NotificationPayload {
  type: EventType;
  recipient: {
    email: string;
    phone: string; // E.164 format, e.g., "+254712345678"
    name: string;
  };
  data: {
    ticketTier?: string;
    quantity?: number;
    totalAmount?: string;
    orderId?: string;
    eventDate?: string;
    ticketUrl?: string;
    venueName?: string;
    gateOpeningTime?: string;
    refundAmount?: string;
    paymentRef?: string;
    refundReason?: string;
  };
}

interface MetaParameter {
  type: "text";
  text: string;
}

interface MetaComponent {
  type: "body" | "header" | "button";
  parameters: MetaParameter[];
}

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// -----------------------------------------------------------------------------
// 1. WhatsApp Dispatcher (Meta Graph API)
// -----------------------------------------------------------------------------
async function sendWhatsApp(toPhone: string, templateName: string, components: MetaComponent[]) {
  const whatsappToken = Deno.env.get("WHATSAPP_ACCESS_TOKEN");
  const phoneId = Deno.env.get("WHATSAPP_PHONE_NUMBER_ID");

  if (!whatsappToken || !phoneId) {
    console.warn("[WhatsApp] Credentials missing. Skipping message send.");
    return;
  }

  // Format phone to international digits without '+' for Meta API
  const cleanPhone = toPhone.replace(/\+/g, "").trim();

  const response = await fetch(`https://graph.facebook.com/v19.0/${phoneId}/messages`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${whatsappToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      messaging_product: "whatsapp",
      to: cleanPhone,
      type: "template",
      template: {
        name: templateName,
        language: { code: "en" },
        components,
      },
    }),
  });

  const resData = (await response.json()) as {
    messages?: Array<{ id: string }>;
    error?: unknown;
  };
  if (!response.ok) {
    console.error("[WhatsApp] API Error:", resData);
  } else {
    console.log("[WhatsApp] Sent successfully:", resData.messages?.[0]?.id);
  }
}

// -----------------------------------------------------------------------------
// 2. HTML Email Dispatcher (Resend API)
// -----------------------------------------------------------------------------
async function sendEmail(to: string, subject: string, htmlContent: string) {
  const resendApiKey = Deno.env.get("RESEND_API_KEY");
  const fromEmail = Deno.env.get("EMAIL_FROM") || "tickets@verve.co.ke";

  if (!resendApiKey) {
    console.warn("[Resend] API Key missing. Skipping email send.");
    return;
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [to],
      subject,
      html: htmlContent,
    }),
  });

  const resData = (await response.json()) as { id?: string; error?: unknown };
  if (!response.ok) {
    console.error("[Resend] API Error:", resData);
  } else {
    console.log("[Resend] Sent successfully ID:", resData.id);
  }
}

// -----------------------------------------------------------------------------
// 3. HTML Template Generators
// -----------------------------------------------------------------------------
function getBookingEmailHtml(p: NotificationPayload): string {
  return `
  <!DOCTYPE html>
  <html>
  <body style="margin: 0; padding: 0; background-color: #0d0d0d; font-family: sans-serif; color: #f3f4f6;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #0d0d0d; padding: 40px 10px;">
      <tr>
        <td align="center">
          <table width="100%" style="max-width: 560px; background-color: #171717; border: 1px solid #262626; border-radius: 12px; padding: 32px;">
            <tr>
              <td align="center" style="padding-bottom: 24px;">
                <h1 style="margin: 0; font-size: 24px; color: #f97316; text-transform: uppercase;">Hauntings of the Rift</h1>
                <p style="margin: 4px 0 0 0; font-size: 13px; color: #a1a1aa; text-transform: uppercase;">Official Admission Pass</p>
              </td>
            </tr>
            <tr>
              <td style="padding-bottom: 24px; border-bottom: 1px solid #262626;">
                <p style="margin: 0 0 12px 0; font-size: 16px;">Hi <strong>${p.recipient.name}</strong>,</p>
                <p style="margin: 0; font-size: 14px; color: #a1a1aa;">Your booking has been verified. Present your digital QR code at the gate check-in point for access.</p>
              </td>
            </tr>
            <tr>
              <td style="padding: 24px 0;">
                <table width="100%" style="background-color: #0d0d0d; border-radius: 8px; border: 1px dashed #f97316; padding: 20px;">
                  <tr>
                    <td style="padding-bottom: 12px;">
                      <span style="font-size: 11px; text-transform: uppercase; color: #71717a;">Pass Type</span><br>
                      <strong style="font-size: 16px; color: #ffffff;">${p.data.ticketTier} (x${p.data.quantity})</strong>
                    </td>
                    <td align="right" style="padding-bottom: 12px;">
                      <span style="font-size: 11px; text-transform: uppercase; color: #71717a;">Total Paid</span><br>
                      <strong style="font-size: 16px; color: #22c55e;">KES ${p.data.totalAmount}</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span style="font-size: 11px; text-transform: uppercase; color: #71717a;">Order Ref</span><br>
                      <span style="font-size: 13px; font-family: monospace; color: #d4d4d8;">${p.data.orderId}</span>
                    </td>
                    <td align="right">
                      <span style="font-size: 11px; text-transform: uppercase; color: #71717a;">Event Date</span><br>
                      <span style="font-size: 13px; color: #d4d4d8;">${p.data.eventDate}</span>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td align="center" style="padding: 12px 0 28px 0;">
                <a href="${p.data.ticketUrl}" style="background-color: #f97316; color: #000000; font-weight: 700; text-decoration: none; padding: 14px 28px; border-radius: 6px; display: inline-block; font-size: 14px; text-transform: uppercase;">View Digital Pass & QR Code</a>
              </td>
            </tr>
            <tr>
              <td style="padding-top: 20px; border-top: 1px solid #262626; font-size: 12px; color: #71717a; line-height: 1.5;">
                <strong style="color: #a1a1aa;">Venue Entry Guidelines:</strong>
                <ul style="margin: 8px 0 0 0; padding-left: 18px;">
                  <li>Gates open strictly at 18:00 EAT.</li>
                  <li>Passes are single-entry only.</li>
                </ul>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>`;
}

function getRefundEmailHtml(p: NotificationPayload): string {
  return `
  <!DOCTYPE html>
  <html>
  <body style="margin: 0; padding: 0; background-color: #0d0d0d; font-family: sans-serif; color: #f3f4f6;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #0d0d0d; padding: 40px 10px;">
      <tr>
        <td align="center">
          <table width="100%" style="max-width: 560px; background-color: #171717; border: 1px solid #262626; border-radius: 12px; padding: 32px;">
            <tr>
              <td align="center" style="padding-bottom: 20px;">
                <span style="background-color: rgba(239, 68, 68, 0.15); border: 1px solid #ef4444; color: #ef4444; font-size: 11px; font-weight: 700; text-transform: uppercase; padding: 6px 14px; border-radius: 20px;">Order Reversal</span>
              </td>
            </tr>
            <tr>
              <td align="center" style="padding-bottom: 24px;">
                <h1 style="margin: 0; font-size: 22px; color: #ffffff;">Refund Confirmation</h1>
              </td>
            </tr>
            <tr>
              <td style="padding-bottom: 24px; font-size: 14px; color: #a1a1aa;">
                Hi <strong>${p.recipient.name}</strong>,<br><br>
                A refund has been processed for your booking with <strong>Hauntings of the Rift</strong>.
              </td>
            </tr>
            <tr>
              <td style="padding-bottom: 24px;">
                <table width="100%" style="background-color: #0d0d0d; border: 1px solid #262626; border-radius: 8px; padding: 20px;">
                  <tr>
                    <td style="padding-bottom: 12px;">
                      <span style="font-size: 11px; text-transform: uppercase; color: #71717a;">Amount Reversed</span><br>
                      <strong style="font-size: 18px; color: #ef4444;">KES ${p.data.refundAmount}</strong>
                    </td>
                    <td align="right" style="padding-bottom: 12px;">
                      <span style="font-size: 11px; text-transform: uppercase; color: #71717a;">Gateway Ref</span><br>
                      <span style="font-size: 13px; font-family: monospace; color: #d4d4d8;">${p.data.paymentRef}</span>
                    </td>
                  </tr>
                  <tr>
                    <td colspan="2" style="padding-top: 12px; border-top: 1px solid #1f1f23;">
                      <span style="font-size: 11px; text-transform: uppercase; color: #71717a;">Reason</span><br>
                      <span style="font-size: 13px; color: #d4d4d8;">${p.data.refundReason}</span>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>`;
}

// -----------------------------------------------------------------------------
// 4. Main Edge Function Entrypoint
// -----------------------------------------------------------------------------
serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: CORS_HEADERS });
  }

  try {
    const payload = (await req.json()) as NotificationPayload;
    const { type, recipient, data } = payload;

    if (!recipient?.email || !recipient?.phone) {
      return new Response(JSON.stringify({ error: "Missing recipient details" }), {
        status: 400,
        headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
      });
    }

    switch (type) {
      case "BOOKING_CONFIRMATION": {
        // Dispatch WhatsApp Template: booking_confirmation
        await sendWhatsApp(recipient.phone, "booking_confirmation", [
          {
            type: "body",
            parameters: [
              { type: "text", text: recipient.name },
              { type: "text", text: `${data.ticketTier} (x${data.quantity})` },
              { type: "text", text: data.orderId ?? "" },
              { type: "text", text: data.ticketUrl ?? "" },
            ],
          },
        ]);

        // Dispatch HTML Email
        await sendEmail(
          recipient.email,
          "Ticket Confirmed — Hauntings of the Rift",
          getBookingEmailHtml(payload),
        );
        break;
      }

      case "EVENT_REMINDER_24H": {
        // Dispatch WhatsApp Template: event_reminder_24h
        await sendWhatsApp(recipient.phone, "event_reminder_24h", [
          {
            type: "body",
            parameters: [
              { type: "text", text: recipient.name },
              { type: "text", text: data.venueName ?? "Rift Valley Grounds" },
              { type: "text", text: data.gateOpeningTime ?? "18:00 EAT" },
              { type: "text", text: data.ticketUrl ?? "" },
            ],
          },
        ]);
        break;
      }

      case "REFUND_NOTICE": {
        // Dispatch WhatsApp Template: refund_notice
        await sendWhatsApp(recipient.phone, "refund_notice", [
          {
            type: "body",
            parameters: [
              { type: "text", text: recipient.name },
              { type: "text", text: data.refundAmount ?? "0.00" },
              { type: "text", text: data.paymentRef ?? "N/A" },
              { type: "text", text: data.refundReason ?? "Customer Request" },
            ],
          },
        ]);

        // Dispatch HTML Email
        await sendEmail(
          recipient.email,
          "Refund Confirmation — Hauntings of the Rift",
          getRefundEmailHtml(payload),
        );
        break;
      }

      default:
        return new Response(JSON.stringify({ error: "Unhandled event type" }), {
          status: 400,
          headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
        });
    }

    return new Response(JSON.stringify({ success: true, message: `Dispatched ${type}` }), {
      status: 200,
      headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
    });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Internal Server Error";
    console.error("[Notification Engine Error]:", err);
    return new Response(JSON.stringify({ error: errorMsg }), {
      status: 500,
      headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
    });
  }
});
