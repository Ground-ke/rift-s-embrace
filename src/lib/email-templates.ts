export interface TicketEmailItem {
  ticketNumber: string;
  tierName: string;
  attendeeName: string;
  admitsCount: number;
  ticketUrl: string;
}

// -----------------------------------------------------------------------------
// 1. Booking Confirmation Email Template
// -----------------------------------------------------------------------------
export function generateBookingConfirmationEmailHtml(params: {
  customer_name: string;
  ticket_tier: string;
  quantity: number | string;
  total_amount: number | string;
  order_id: string;
  event_date: string;
  ticket_url: string;
}): string {
  const { customer_name, ticket_tier, quantity, total_amount, order_id, event_date, ticket_url } =
    params;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Pass to Hauntings of the Rift</title>
</head>
<body style="margin: 0; padding: 0; background-color: #0d0d0d; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #f3f4f6;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #0d0d0d; padding: 40px 10px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" style="max-width: 560px; background-color: #171717; border: 1px solid #262626; border-radius: 12px; padding: 32px; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
          
          <!-- Header -->
          <tr>
            <td align="center" style="padding-bottom: 24px;">
              <h1 style="margin: 0; font-size: 24px; font-weight: 800; tracking: 0.05em; color: #f97316; text-transform: uppercase;">Hauntings of the Rift</h1>
              <p style="margin: 4px 0 0 0; font-size: 13px; color: #a1a1aa; text-transform: uppercase; letter-spacing: 0.1em;">Official Admission Pass</p>
            </td>
          </tr>

          <!-- Welcome Text -->
          <tr>
            <td style="padding-bottom: 24px; border-bottom: 1px solid #262626;">
              <p style="margin: 0 0 12px 0; font-size: 16px; color: #f4f4f5;">Hi <strong>${customer_name}</strong>,</p>
              <p style="margin: 0; font-size: 14px; line-height: 1.6; color: #a1a1aa;">Your booking has been verified. Below is your official ticket summary. Present your digital QR code at the gate check-in point for access.</p>
            </td>
          </tr>

          <!-- Pass Details Box -->
          <tr>
            <td style="padding: 24px 0;">
              <table role="presentation" width="100%" style="background-color: #0d0d0d; border-radius: 8px; border: 1px dashed #f97316; padding: 20px;">
                <tr>
                  <td style="padding-bottom: 12px;">
                    <span style="font-size: 11px; text-transform: uppercase; color: #71717a; font-weight: 600;">Pass Type</span><br>
                    <strong style="font-size: 16px; color: #ffffff;">${ticket_tier} (x${quantity})</strong>
                  </td>
                  <td align="right" style="padding-bottom: 12px;">
                    <span style="font-size: 11px; text-transform: uppercase; color: #71717a; font-weight: 600;">Total Paid</span><br>
                    <strong style="font-size: 16px; color: #22c55e;">KES ${total_amount}</strong>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span style="font-size: 11px; text-transform: uppercase; color: #71717a; font-weight: 600;">Order Ref</span><br>
                    <span style="font-size: 13px; font-family: monospace; color: #d4d4d8;">${order_id}</span>
                  </td>
                  <td align="right">
                    <span style="font-size: 11px; text-transform: uppercase; color: #71717a; font-weight: 600;">Event Date</span><br>
                    <span style="font-size: 13px; color: #d4d4d8;">${event_date}</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- CTA Button -->
          <tr>
            <td align="center" style="padding: 12px 0 28px 0;">
              <a href="${ticket_url}" style="background-color: #f97316; color: #000000; font-weight: 700; text-decoration: none; padding: 14px 28px; border-radius: 6px; display: inline-block; font-size: 14px; text-transform: uppercase; letter-spacing: 0.05em;">View Digital Pass & QR Code</a>
            </td>
          </tr>

          <!-- Venue & Gate Instructions -->
          <tr>
            <td style="padding-top: 20px; border-top: 1px solid #262626; font-size: 12px; color: #71717a; line-height: 1.5;">
              <strong style="color: #a1a1aa;">Venue Entry Guidelines:</strong>
              <ul style="margin: 8px 0 0 0; padding-left: 18px;">
                <li>Gates open strictly at 18:00 EAT. Early arrival is advised.</li>
                <li>Each QR code can only be scanned once by gate security.</li>
                <li>Keep your mobile phone brightness set to maximum during scanning.</li>
              </ul>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="padding-top: 32px; font-size: 11px; color: #52525b;">
              &copy; 2026 Hauntings of the Rift. Managed by Verve & Co. All rights reserved.
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
// 2. 24-Hour Event Reminder Email Template
// -----------------------------------------------------------------------------
export function generateEventReminder24hEmailHtml(params: {
  customer_name: string;
  venue_name: string;
  gate_opening_time: string;
  ticket_tier: string;
  ticket_url: string;
}): string {
  const { customer_name, venue_name, gate_opening_time, ticket_tier, ticket_url } = params;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>24 Hours Until Hauntings of the Rift</title>
</head>
<body style="margin: 0; padding: 0; background-color: #0d0d0d; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #f3f4f6;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #0d0d0d; padding: 40px 10px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" style="max-width: 560px; background-color: #171717; border: 1px solid #262626; border-radius: 12px; padding: 32px;">
          
          <!-- Alert Banner -->
          <tr>
            <td align="center" style="padding-bottom: 20px;">
              <span style="background-color: rgba(249, 115, 22, 0.15); border: 1px solid #f97316; color: #f97316; font-size: 11px; font-weight: 700; text-transform: uppercase; padding: 6px 14px; border-radius: 20px; letter-spacing: 0.1em;">24 Hours Remaining</span>
            </td>
          </tr>

          <tr>
            <td align="center" style="padding-bottom: 24px;">
              <h1 style="margin: 0; font-size: 22px; font-weight: 800; color: #ffffff;">Tomorrow is the Night</h1>
            </td>
          </tr>

          <tr>
            <td style="padding-bottom: 24px; font-size: 14px; line-height: 1.6; color: #a1a1aa;">
              Hi <strong>${customer_name}</strong>,<br><br>
              We are finalizing preparations for <strong>Hauntings of the Rift</strong>. Here is everything you need to know for a seamless arrival tomorrow.
            </td>
          </tr>

          <!-- Logistics Info Table -->
          <tr>
            <td style="padding-bottom: 24px;">
              <table role="presentation" width="100%" style="background-color: #0d0d0d; border: 1px solid #262626; border-radius: 8px; padding: 16px;">
                <tr>
                  <td style="padding: 8px 0; border-bottom: 1px solid #1f1f23;">
                    <span style="color: #71717a; font-size: 12px;">Venue:</span><br>
                    <strong style="color: #ffffff; font-size: 14px;">${venue_name}</strong>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; border-bottom: 1px solid #1f1f23;">
                    <span style="color: #71717a; font-size: 12px;">Gate Opening:</span><br>
                    <strong style="color: #ffffff; font-size: 14px;">${gate_opening_time}</strong>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0;">
                    <span style="color: #71717a; font-size: 12px;">Your Pass Type:</span><br>
                    <strong style="color: #f97316; font-size: 14px;">${ticket_tier}</strong>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Pass Access -->
          <tr>
            <td align="center" style="padding-bottom: 24px;">
              <a href="${ticket_url}" style="background-color: #f97316; color: #000000; font-weight: 700; text-decoration: none; padding: 14px 28px; border-radius: 6px; display: inline-block; font-size: 14px; text-transform: uppercase;">Pre-load Your QR Pass</a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="padding-top: 24px; border-top: 1px solid #262626; font-size: 11px; color: #52525b;">
              &copy; 2026 Hauntings of the Rift. Managed by Verve & Co.
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
// 3. Refund Notice Email Template
// -----------------------------------------------------------------------------
export function generateRefundNoticeEmailHtml(params: {
  customer_name: string;
  refund_amount: number | string;
  payment_ref: string;
  refund_reason: string;
  order_id: string;
}): string {
  const { customer_name, refund_amount, payment_ref, refund_reason, order_id } = params;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Refund Processed - Hauntings of the Rift</title>
</head>
<body style="margin: 0; padding: 0; background-color: #0d0d0d; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #f3f4f6;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #0d0d0d; padding: 40px 10px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" style="max-width: 560px; background-color: #171717; border: 1px solid #262626; border-radius: 12px; padding: 32px;">
          
          <!-- Status Icon / Header -->
          <tr>
            <td align="center" style="padding-bottom: 20px;">
              <span style="background-color: rgba(239, 68, 68, 0.15); border: 1px solid #ef4444; color: #ef4444; font-size: 11px; font-weight: 700; text-transform: uppercase; padding: 6px 14px; border-radius: 20px; letter-spacing: 0.1em;">Order Reversal</span>
            </td>
          </tr>

          <tr>
            <td align="center" style="padding-bottom: 24px;">
              <h1 style="margin: 0; font-size: 22px; font-weight: 800; color: #ffffff;">Refund Confirmation</h1>
            </td>
          </tr>

          <tr>
            <td style="padding-bottom: 24px; font-size: 14px; line-height: 1.6; color: #a1a1aa;">
              Hi <strong>${customer_name}</strong>,<br><br>
              This email confirms that a refund has been issued for your booking with <strong>Hauntings of the Rift</strong>.
            </td>
          </tr>

          <!-- Financial Breakdown Box -->
          <tr>
            <td style="padding-bottom: 24px;">
              <table role="presentation" width="100%" style="background-color: #0d0d0d; border: 1px solid #262626; border-radius: 8px; padding: 20px;">
                <tr>
                  <td style="padding-bottom: 12px;">
                    <span style="font-size: 11px; text-transform: uppercase; color: #71717a;">Amount Reversed</span><br>
                    <strong style="font-size: 18px; color: #ef4444;">KES ${refund_amount}</strong>
                  </td>
                  <td align="right" style="padding-bottom: 12px;">
                    <span style="font-size: 11px; text-transform: uppercase; color: #71717a;">Gateway Ref</span><br>
                    <span style="font-size: 13px; font-family: monospace; color: #d4d4d8;">${payment_ref}</span>
                  </td>
                </tr>
                <tr>
                  <td colspan="2" style="padding-top: 12px; border-top: 1px solid #1f1f23;">
                    <span style="font-size: 11px; text-transform: uppercase; color: #71717a;">Reason for Reversal</span><br>
                    <span style="font-size: 13px; color: #d4d4d8;">${refund_reason}</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Notice on Invalidation -->
          <tr>
            <td style="padding-bottom: 24px;">
              <div style="background-color: rgba(249, 115, 22, 0.08); border-left: 3px solid #f97316; padding: 12px 16px; border-radius: 0 6px 6px 0; font-size: 13px; color: #d4d4d8;">
                <strong>Note:</strong> Associated admission passes (Order ID: <span style="font-family: monospace;">${order_id}</span>) have been cryptographically revoked and will be rejected at gate scanners.
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="padding-top: 24px; border-top: 1px solid #262626; font-size: 11px; color: #52525b;">
              If you did not request this refund or believe this is an error, please contact Support at <a href="mailto:support@verve.co.ke" style="color: #f97316; text-decoration: none;">support@verve.co.ke</a>.
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
