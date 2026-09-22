type RecoveryLink = { tier: string; url: string };

/**
 * Sends the ticket recovery email. Uses Resend when RESEND_API_KEY is
 * configured; otherwise the attempt is logged so the flow still completes
 * without leaking anything to the caller.
 */
export async function sendRecoveryEmail(input: {
  to: string;
  name: string;
  links: RecoveryLink[];
}): Promise<void> {
  const apiKey = process.env["RESEND_API_KEY"];
  const siteUrl = process.env["SITE_URL"] ?? "https://hauntings-of-the-rift.lovable.app";
  const from =
    process.env["RECOVERY_FROM_EMAIL"] ?? "Hauntings of the Rift <onboarding@resend.dev>";

  const list = input.links
    .map((link) => `<li><a href="${siteUrl}${link.url}">${link.tier} ticket</a></li>`)
    .join("");

  const html = `
    <p>Hi ${input.name},</p>
    <p>Here are your tickets for <strong>Hauntings of the Rift</strong>. Each link opens your digital ticket with its QR code.</p>
    <ul>${list}</ul>
    <p>These links are personal — please do not share them.</p>
  `;

  if (!apiKey) {
    console.info(
      `[recovery] Email not sent (no email provider configured). Would have sent ${input.links.length} ticket link(s) to ${input.to}.`,
    );
    return;
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [input.to],
        subject: "Your Hauntings of the Rift tickets",
        html,
      }),
    });
    if (!response.ok) {
      console.error("[recovery] Email provider rejected the request:", response.status);
    }
  } catch (error) {
    console.error("[recovery] Email provider unreachable:", error);
  }
}
