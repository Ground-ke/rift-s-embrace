/**
 * Kenyan Phone Number Validation and Normalization
 * Supports:
 *  - 07XXXXXXXX (Safaricom, Airtel, Telkom)
 *  - 01XXXXXXXX (Safaricom 011X, Airtel 010X)
 *  - +2547XXXXXXXX / +2541XXXXXXXX
 *  - 2547XXXXXXXX / 2541XXXXXXXX
 */

export interface PhoneValidationResult {
  isValid: boolean;
  raw: string;
  normalized: string; // Canonical 254XXXXXXXXX format
  formatted: string; // User-friendly +254 7XX XXX XXX format
  operator?: "Safaricom" | "Airtel" | "Telkom" | "Other";
  error?: string;
}

export function validateAndNormalizeKenyanPhone(input: string): PhoneValidationResult {
  const raw = (input || "").trim();
  if (!raw) {
    return {
      isValid: false,
      raw,
      normalized: "",
      formatted: "",
      error: "Phone number is required.",
    };
  }

  // Remove spaces, dashes, parentheses, dots
  let cleaned = raw.replace(/[\s\-().]/g, "");

  // Handle leading '+'
  if (cleaned.startsWith("+")) {
    cleaned = cleaned.substring(1);
  }

  // Handle local prefix '0' -> replace with '254'
  if (cleaned.startsWith("0")) {
    cleaned = "254" + cleaned.substring(1);
  }

  // Handle 9-digit numbers without prefix (e.g. 712345678 or 112345678)
  if (cleaned.length === 9 && (cleaned.startsWith("7") || cleaned.startsWith("1"))) {
    cleaned = "254" + cleaned;
  }

  // Check if it matches Kenyan mobile number pattern: 254 followed by (7XX or 1XX) and 6 more digits (total 12 digits)
  const kenyanRegex = /^254([17]\d{8})$/;
  const match = cleaned.match(kenyanRegex);

  if (!match || cleaned.length !== 12) {
    return {
      isValid: false,
      raw,
      normalized: "",
      formatted: "",
      error: "Please enter a valid Kenyan phone number (e.g. 0712 345 678 or 0110 123 456).",
    };
  }

  const nationalNumber = match[1] ?? ""; // e.g. 712345678 or 110123456
  const prefix = nationalNumber.substring(0, 3); // 701, 712, 722, 110, etc.

  // Determine operator for helpful UX
  let operator: "Safaricom" | "Airtel" | "Telkom" | "Other" = "Other";
  const prefixNum = parseInt(prefix, 10);

  // Safaricom prefixes: 700-729, 740-743, 745-746, 748, 757-759, 768-769, 790-799, 110-115
  if (
    (prefixNum >= 700 && prefixNum <= 729) ||
    (prefixNum >= 740 && prefixNum <= 743) ||
    (prefixNum >= 745 && prefixNum <= 746) ||
    prefixNum === 748 ||
    (prefixNum >= 757 && prefixNum <= 759) ||
    (prefixNum >= 768 && prefixNum <= 769) ||
    (prefixNum >= 790 && prefixNum <= 799) ||
    (prefixNum >= 110 && prefixNum <= 115)
  ) {
    operator = "Safaricom";
  } else if (
    (prefixNum >= 730 && prefixNum <= 739) ||
    (prefixNum >= 750 && prefixNum <= 756) ||
    (prefixNum >= 780 && prefixNum <= 789) ||
    (prefixNum >= 100 && prefixNum <= 106)
  ) {
    operator = "Airtel";
  } else if (prefixNum >= 770 && prefixNum <= 779) {
    operator = "Telkom";
  }

  const formatted = `+254 ${nationalNumber.substring(0, 3)} ${nationalNumber.substring(3, 6)} ${nationalNumber.substring(6)}`;

  return {
    isValid: true,
    raw,
    normalized: cleaned, // e.g. 254712345678
    formatted,
    operator,
  };
}
