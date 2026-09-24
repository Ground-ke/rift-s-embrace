import nodemailer from "nodemailer";

type RecoveryLink = { tier: string; url: string };

/**
 * Sends the ticket recovery email using Gmail SMTP (Nodemailer).
 */
export async function sendRecoveryEmail(input: {
  to: string;
  name: string;
  links: RecoveryLink[];
}): Promise<void> {
  const rawUser = process.env.SMTP_USER || process.env.GMAIL_USER || "verve.n.co.ke@gmail.com";
  const rawPass = process.env.SMTP_PASS || process.env.GMAIL_APP_PASSWORD;
  const siteUrl = process.env["SITE_URL"] ?? "https://hauntings-of-the-rift.lovable.app";
  const user = rawUser.trim();
  const from = process.env.EMAIL_FROM || `"Verve & Co." <${user}>`;

  const list = input.links
    .map((link) => `<li><a href="${siteUrl}${link.url}">${link.tier} ticket</a></li>`)
    .join("");

  const html = `
    <p>Hi ${input.name},</p>
    <p>Here are your tickets for <strong>Hauntings of the Rift</strong>. Each link opens your digital ticket with its QR code.</p>
    <ul>${list}</ul>
    <p>These links are personal — please do not share them.</p>
  `;

  if (!rawPass) {
    console.info(
      `[recovery] Email simulated (no SMTP_PASS/GMAIL_APP_PASSWORD configured). Would have sent ${input.links.length} ticket link(s) to ${input.to}.`,
    );
    return;
  }

  const pass = rawPass.replace(/\s+/g, "");

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: Number(process.env.SMTP_PORT) || 465,
      secure: process.env.SMTP_SECURE === "false" ? false : true,
      auth: { user, pass },
    });

    await transporter.sendMail({
      from,
      to: input.to,
      subject: "Your Hauntings of the Rift tickets",
      html,
    });
  } catch (error) {
    console.error("[recovery] SMTP provider unreachable:", error);
  }
}
