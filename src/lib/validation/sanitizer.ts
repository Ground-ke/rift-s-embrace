/**
 * Defensive Input Sanitization & Anti-Abuse
 * Strips script injections, malicious HTML tags, and SQL control escape characters.
 */

export function sanitizeString(input: string): string {
  if (!input) return "";

  return input
    .replace(/[<>]/g, "") // Strip HTML tag angle brackets
    .replace(/javascript:/gi, "") // Strip JS pseudo-protocol
    .replace(/on\w+\s*=/gi, "") // Strip event handler injections (onload=, onclick=)
    .replace(/--/g, "") // Strip SQL comment markers
    .replace(/;/g, "") // Strip SQL statement terminators
    .trim();
}

export function sanitizeObject<T extends Record<string, unknown>>(obj: T): T {
  const clean = { ...obj } as Record<string, unknown>;
  for (const [key, value] of Object.entries(clean)) {
    if (typeof value === "string") {
      clean[key] = sanitizeString(value);
    } else if (value && typeof value === "object" && !Array.isArray(value)) {
      clean[key] = sanitizeObject(value as Record<string, unknown>);
    }
  }
  return clean as T;
}
