import crypto from "crypto";

const TICKET_HMAC_SECRET =
  process.env.TICKET_HMAC_SECRET || "rift-ticket-hmac-secret-2026-verve-nakuru-secure";
const RECOVERY_LINK_SECRET =
  process.env.RECOVERY_LINK_SECRET || "rift-recovery-secret-2026-verve-nakuru-secure";

/**
 * Generates a cryptographically random ticket code (e.g., HR-8492-7104)
 */
export function generateTicketCode(): string {
  const chars = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ"; // Base32 without ambiguous chars (0,1,I,O)
  const bytes = crypto.randomBytes(8);
  let code = "HR-";
  for (let i = 0; i < 4; i++) {
    code += chars[bytes[i] % chars.length];
  }
  code += "-";
  for (let i = 4; i < 8; i++) {
    code += chars[bytes[i] % chars.length];
  }
  return code;
}

/**
 * Generates HMAC signature for ticket validation
 */
export function generateTicketHmac(
  ticketCode: string,
  orderId: string,
  attendeeName: string,
): string {
  const payload = `${ticketCode}:${orderId}:${attendeeName.trim().toLowerCase()}`;
  return crypto.createHmac("sha256", TICKET_HMAC_SECRET).update(payload).digest("hex");
}

/**
 * Verifies HMAC signature for a ticket
 */
export function verifyTicketHmac(
  ticketCode: string,
  orderId: string,
  attendeeName: string,
  hmac: string,
): boolean {
  const expected = generateTicketHmac(ticketCode, orderId, attendeeName);
  try {
    return crypto.timingSafeEqual(Buffer.from(hmac, "hex"), Buffer.from(expected, "hex"));
  } catch {
    return false;
  }
}

/**
 * Signs a recovery payload with expiration timestamp
 */
export function createRecoveryToken(email: string, expiresInMs = 3600000): string {
  const expiresAt = Date.now() + expiresInMs;
  const payload = Buffer.from(
    JSON.stringify({ email: email.trim().toLowerCase(), expiresAt }),
  ).toString("base64url");
  const signature = crypto
    .createHmac("sha256", RECOVERY_LINK_SECRET)
    .update(payload)
    .digest("base64url");
  return `${payload}.${signature}`;
}

/**
 * Verifies and decodes a recovery token
 */
export function verifyRecoveryToken(token: string): {
  valid: boolean;
  email?: string;
  expired?: boolean;
} {
  try {
    const parts = token.split(".");
    if (parts.length !== 2) return { valid: false };
    const [payloadBase64, signature] = parts;
    const expectedSig = crypto
      .createHmac("sha256", RECOVERY_LINK_SECRET)
      .update(payloadBase64)
      .digest("base64url");

    if (signature !== expectedSig) {
      return { valid: false };
    }

    const payloadJson = Buffer.from(payloadBase64, "base64url").toString("utf-8");
    const data = JSON.parse(payloadJson) as { email: string; expiresAt: number };

    if (!data.email || typeof data.expiresAt !== "number") {
      return { valid: false };
    }

    if (Date.now() > data.expiresAt) {
      return { valid: false, expired: true, email: data.email };
    }

    return { valid: true, email: data.email };
  } catch {
    return { valid: false };
  }
}
