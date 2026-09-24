import { jsPDF } from "jspdf";
import QRCode from "qrcode";
import sharp from "sharp";
import fs from "fs";
import path from "path";

export interface TicketPdfOptions {
  ticketCode: string;
  customerName: string;
  tierName: string;
  admitsCount?: number;
  orderNumber?: string;
  totalKes?: number;
  qrHash?: string;
  eventDate?: string;
  issuedDate?: string;
  venueName?: string;
  venueCity?: string;
}

/**
 * Escapes XML/SVG special characters
 */
function escapeXml(unsafe: string): string {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case "&":
        return "&amp;";
      case "'":
        return "&apos;";
      case '"':
        return "&quot;";
      default:
        return c;
    }
  });
}

/**
 * Generates the authentic SVG matching the user's template
 */
export async function generateTicketPassSvg(options: TicketPdfOptions): Promise<string> {
  const {
    ticketCode,
    customerName,
    tierName,
    orderNumber = ticketCode,
    issuedDate = "31 Oct 2026",
    qrHash,
    admitsCount = 1,
  } = options;

  // Build authoritative QR payload
  const qrPayload = JSON.stringify({
    code: ticketCode,
    order: orderNumber,
    tier: tierName,
    holder: customerName,
    admits: admitsCount,
    hash: qrHash || "SECURE-VERIFIED",
    event: "HALLOWEEN_RIFT_2026",
  });

  const qrDataUrl = await QRCode.toDataURL(qrPayload, {
    width: 250,
    margin: 1,
    errorCorrectionLevel: "H",
    color: {
      dark: "#000000",
      light: "#ffffff",
    },
  });

  const safeCustomerName = escapeXml(customerName);
  const safeTierName = escapeXml(tierName);
  const safeTicketCode = escapeXml(ticketCode);
  const safeOrderNumber = escapeXml(orderNumber);
  const safeIssuedDate = escapeXml(issuedDate);

  return `
  <svg width="1000" height="1250" viewBox="0 0 1000 1250" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <!-- Subtle chalkboard distress filter -->
      <filter id="grunge" x="0%" y="0%" width="100%" height="100%">
        <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="4" result="noise" />
        <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.12 0" />
        <feComposite in2="SourceGraphic" in="gl" operator="in" />
      </filter>
    </defs>

    <!-- Base Charcoal Slate Texture Background -->
    <rect width="1000" height="1250" fill="#2B2C2E" />
    <rect width="1000" height="1250" fill="#323437" opacity="0.6" filter="url(#grunge)" />

    <!-- TOP-LEFT COBWEB -->
    <g stroke="#FFFFFF" stroke-opacity="0.65" stroke-width="1.5" fill="none">
      <line x1="0" y1="0" x2="340" y2="35" />
      <line x1="0" y1="0" x2="270" y2="115" />
      <line x1="0" y1="0" x2="180" y2="180" />
      <line x1="0" y1="0" x2="95" y2="250" />
      <line x1="0" y1="0" x2="0" y2="310" />
      <!-- Concentric Web Arcs -->
      <path d="M 0 65 Q 25 55 45 30 Q 75 18 110 0" />
      <path d="M 0 130 Q 55 110 95 55 Q 150 32 215 0" />
      <path d="M 0 195 Q 85 160 145 85 Q 215 55 315 0" />
      <path d="M 0 260 Q 115 210 200 115 Q 275 75 400 0" />
    </g>

    <!-- TOP-LEFT DANGLE SPIDER -->
    <line x1="88" y1="105" x2="88" y2="145" stroke="#FFFFFF" stroke-width="1.2" stroke-opacity="0.8" />
    <ellipse cx="88" cy="148" rx="6" ry="8" fill="#FFFFFF" />
    <circle cx="88" cy="141" r="4" fill="#FFFFFF" />
    <path d="M 84 144 C 68 138, 62 148, 68 158 M 92 144 C 108 138, 114 148, 108 158 M 84 150 C 70 148, 66 160, 72 168 M 92 150 C 106 148, 110 160, 104 168" fill="none" stroke="#FFFFFF" stroke-width="1.2" />

    <!-- TOP-RIGHT COBWEB -->
    <g stroke="#FFFFFF" stroke-opacity="0.65" stroke-width="1.5" fill="none">
      <line x1="1000" y1="0" x2="660" y2="35" />
      <line x1="1000" y1="0" x2="730" y2="115" />
      <line x1="1000" y1="0" x2="820" y2="180" />
      <line x1="1000" y1="0" x2="905" y2="250" />
      <line x1="1000" y1="0" x2="1000" y2="310" />
      <!-- Concentric Web Arcs -->
      <path d="M 1000 65 Q 975 55 955 30 Q 925 18 890 0" />
      <path d="M 1000 130 Q 945 110 905 55 Q 850 32 785 0" />
      <path d="M 1000 195 Q 915 160 855 85 Q 785 55 685 0" />
      <path d="M 1000 260 Q 885 210 800 115 Q 725 75 600 0" />
    </g>

    <!-- CENTER HANGING SPIDER ABOVE QR CODE -->
    <line x1="500" y1="0" x2="500" y2="78" stroke="#FFFFFF" stroke-width="1.5" stroke-opacity="0.85" />
    <g transform="translate(500, 84)">
      <ellipse cx="0" cy="0" rx="9" ry="12" fill="#FFFFFF" />
      <circle cx="0" cy="-12" r="6" fill="#FFFFFF" />
      <path d="M -6 -6 C -25 -20, -35 -5, -30 12 M 6 -6 C 25 -20, 35 -5, 30 12" fill="none" stroke="#FFFFFF" stroke-width="1.8" />
      <path d="M -8 0 C -32 -5, -42 12, -35 26 M 8 0 C 32 -5, 42 12, 35 26" fill="none" stroke="#FFFFFF" stroke-width="1.8" />
      <path d="M -8 6 C -30 18, -38 32, -28 44 M 8 6 C 30 18, 38 32, 28 44" fill="none" stroke="#FFFFFF" stroke-width="1.8" />
      <path d="M -6 10 C -22 25, -28 42, -18 52 M 6 10 C 22 25, 28 42, 18 52" fill="none" stroke="#FFFFFF" stroke-width="1.8" />
    </g>

    <!-- QR CODE CONTAINER BOX -->
    <!-- Template's signature rounded rectangular frame -->
    <rect x="375" y="98" width="250" height="250" rx="32" ry="32" fill="none" stroke="#FFFFFF" stroke-opacity="0.9" stroke-width="2.5" />
    <!-- High-contrast pure white inner card for 100% scan pass rate -->
    <rect x="385" y="108" width="230" height="230" rx="22" ry="22" fill="#FFFFFF" />
    <image href="${qrDataUrl}" x="395" y="118" width="210" height="210" />

    <!-- "scan at venue entry" Label -->
    <text x="500" y="375" text-anchor="middle" font-family="'Cinzel', 'Georgia', 'Times New Roman', serif" font-size="18" fill="#EDEAE3" letter-spacing="1.5">scan at venue entry</text>

    <!-- TITLE: HAUNTINGS OF THE RIFT -->
    <text x="500" y="460" text-anchor="middle" font-family="'Cinzel', 'Georgia', 'Times New Roman', serif" font-size="76" font-weight="bold" fill="#EDEAE3" letter-spacing="6">HAUNTINGS</text>
    <text x="500" y="545" text-anchor="middle" font-family="'Cinzel', 'Georgia', 'Times New Roman', serif" font-size="62" font-weight="bold" fill="#EDEAE3" letter-spacing="4">OF</text>
    <text x="500" y="635" text-anchor="middle" font-family="'Cinzel', 'Georgia', 'Times New Roman', serif" font-size="76" font-weight="bold" fill="#EDEAE3" letter-spacing="6">THE RIFT</text>

    <!-- TILTED MARTINI COCKTAIL GLASS (RIGHT) -->
    <g transform="translate(825, 480) rotate(16)">
      <polygon points="0,0 72,0 36,52" fill="none" stroke="#FFFFFF" stroke-opacity="0.85" stroke-width="2.2" />
      <line x1="8" y1="16" x2="64" y2="16" stroke="#FFFFFF" stroke-opacity="0.6" stroke-width="1.5" />
      <line x1="36" y1="52" x2="36" y2="108" stroke="#FFFFFF" stroke-opacity="0.85" stroke-width="2.2" />
      <line x1="12" y1="108" x2="60" y2="108" stroke="#FFFFFF" stroke-opacity="0.85" stroke-width="2.5" />
      <!-- Toothpick & Olive Garnish -->
      <line x1="-6" y1="-6" x2="46" y2="42" stroke="#FFFFFF" stroke-opacity="0.75" stroke-width="1.8" />
      <ellipse cx="21" cy="19" rx="6" ry="4" fill="none" stroke="#FFFFFF" stroke-opacity="0.85" stroke-width="1.8" />
    </g>

    <!-- DATE & TIME BAND WITH SPIDER ICON -->
    <line x1="120" y1="700" x2="350" y2="700" stroke="#FFFFFF" stroke-opacity="0.8" stroke-width="2" />
    <text x="235" y="740" text-anchor="middle" font-family="'Cinzel', 'Georgia', serif" font-size="36" font-weight="bold" fill="#FFFFFF" letter-spacing="3">OCT 31</text>
    <line x1="120" y1="755" x2="350" y2="755" stroke="#FFFFFF" stroke-opacity="0.8" stroke-width="2" />

    <!-- Center Spider Silhouette -->
    <g transform="translate(500, 725)">
      <ellipse cx="0" cy="0" rx="16" ry="22" fill="#FFFFFF" />
      <circle cx="0" cy="-22" r="9" fill="#FFFFFF" />
      <path d="M -10 -10 C -35 -30, -55 -15, -50 10 M 10 -10 C 35 -30, 55 -15, 50 10" fill="none" stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round" />
      <path d="M -14 -3 C -45 -10, -65 10, -58 35 M 14 -3 C 45 -10, 65 10, 58 35" fill="none" stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round" />
      <path d="M -14 6 C -50 20, -62 42, -50 62 M 14 6 C 50 20, 62 42, 50 62" fill="none" stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round" />
      <path d="M -10 14 C -40 38, -48 62, -35 78 M 10 14 C 40 38, 48 62, 35 78" fill="none" stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round" />
    </g>

    <line x1="650" y1="700" x2="880" y2="700" stroke="#FFFFFF" stroke-opacity="0.8" stroke-width="2" />
    <text x="765" y="740" text-anchor="middle" font-family="'Cinzel', 'Georgia', serif" font-size="36" font-weight="bold" fill="#FFFFFF" letter-spacing="3">4-10 PM</text>
    <line x1="650" y1="755" x2="880" y2="755" stroke="#FFFFFF" stroke-opacity="0.8" stroke-width="2" />

    <!-- VENUE: TOPCLIFF LODGE NAKURU -->
    <text x="500" y="825" text-anchor="middle" font-family="'Cinzel', 'Georgia', 'Times New Roman', serif" font-size="38" font-weight="bold" fill="#EDEAE3" letter-spacing="4">TOPCLIFF LODGE</text>
    <text x="500" y="870" text-anchor="middle" font-family="'Cinzel', 'Georgia', 'Times New Roman', serif" font-size="34" font-weight="bold" fill="#EDEAE3" letter-spacing="6">NAKURU</text>

    <!-- TICKET DETAILS GRID -->
    <text x="280" y="925" text-anchor="middle" font-family="'Cinzel', 'Georgia', serif" font-size="20" fill="#9CA3AF" letter-spacing="2">TICKET HOLDER</text>
    <text x="280" y="958" text-anchor="middle" font-family="'Georgia', serif" font-size="24" font-weight="bold" fill="#FFFFFF">${safeCustomerName}</text>

    <text x="720" y="925" text-anchor="middle" font-family="'Cinzel', 'Georgia', serif" font-size="20" fill="#9CA3AF" letter-spacing="2">TICKET TYPE</text>
    <text x="720" y="958" text-anchor="middle" font-family="'Georgia', serif" font-size="24" font-weight="bold" fill="#FFFFFF">${safeTierName}</text>

    <!-- RSVP CODE -->
    <text x="500" y="1025" text-anchor="middle" font-family="'Cinzel', 'Georgia', serif" font-size="20" fill="#9CA3AF" letter-spacing="2">RSVP CODE</text>
    <text x="500" y="1065" text-anchor="middle" font-family="'SF Mono', Menlo, Consolas, monospace" font-size="34" font-weight="bold" fill="#F59E0B" letter-spacing="4">${safeTicketCode}</text>

    <!-- BOTTOM-LEFT COBWEB -->
    <g stroke="#FFFFFF" stroke-opacity="0.6" stroke-width="1.5" fill="none">
      <line x1="0" y1="1250" x2="280" y2="1210" />
      <line x1="0" y1="1250" x2="220" y2="1130" />
      <line x1="0" y1="1250" x2="140" y2="1060" />
      <line x1="0" y1="1250" x2="0" y2="1000" />
      <path d="M 0 1190 Q 20 1200 40 1220 Q 60 1235 90 1250" />
      <path d="M 0 1130 Q 40 1150 80 1190 Q 120 1220 180 1250" />
      <path d="M 0 1070 Q 70 1100 130 1160 Q 180 1200 270 1250" />
    </g>

    <!-- BOTTOM-RIGHT COBWEB -->
    <g stroke="#FFFFFF" stroke-opacity="0.6" stroke-width="1.5" fill="none">
      <line x1="1000" y1="1250" x2="720" y2="1210" />
      <line x1="1000" y1="1250" x2="780" y2="1130" />
      <line x1="1000" y1="1250" x2="860" y2="1060" />
      <line x1="1000" y1="1250" x2="1000" y2="1000" />
      <path d="M 1000 1190 Q 980 1200 960 1220 Q 940 1235 910 1250" />
      <path d="M 1000 1130 Q 960 1150 920 1190 Q 880 1220 820 1250" />
      <path d="M 1000 1070 Q 930 1100 870 1160 Q 820 1200 730 1250" />
    </g>

    <!-- FOOTER BAR -->
    <text x="80" y="1200" font-family="-apple-system, sans-serif" font-size="15" fill="#9CA3AF">Order # <tspan fill="#EDEAE3">${safeOrderNumber}</tspan></text>
    <text x="280" y="1200" font-family="-apple-system, sans-serif" font-size="15" fill="#9CA3AF">Issued <tspan fill="#EDEAE3">${safeIssuedDate}</tspan></text>
    <text x="520" y="1200" font-family="-apple-system, sans-serif" font-size="15" fill="#9CA3AF">| Valid for single entry. Non-transferable</text>
  </svg>
  `;
}

/**
 * Generates high-res JPEG ticket pass image matching the template
 */
export async function generateTicketPassImageBuffer(options: TicketPdfOptions): Promise<Buffer> {
  const svg = await generateTicketPassSvg(options);
  const svgBuffer = Buffer.from(svg);

  // If a chalkboard texture is available in public/ticket-pass-bg.jpg, composite over it
  const bgPath = path.resolve(process.cwd(), "public/ticket-pass-bg.jpg");
  if (fs.existsSync(bgPath)) {
    try {
      const resizedBg = await sharp(bgPath)
        .resize(1000, 1250, { fit: "cover" })
        .modulate({ brightness: 0.45, saturation: 0.15 })
        .toBuffer();

      return await sharp(resizedBg)
        .composite([{ input: svgBuffer }])
        .jpeg({ quality: 92 })
        .toBuffer();
    } catch {
      // Fallback directly to SVG rendering
    }
  }

  return await sharp(svgBuffer).jpeg({ quality: 92 }).toBuffer();
}

/**
 * Generates an authoritative, high-resolution printable PDF event pass matching the user's template
 */
export async function generateTicketPdfBuffer(options: TicketPdfOptions): Promise<Buffer> {
  // 1. Generate high-resolution pass image
  const passImageBuffer = await generateTicketPassImageBuffer(options);

  // 2. Wrap seamlessly into standard A5 / Print PDF format
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a5",
  });

  // A5 dimensions: 148mm width x 210mm height (seamless borderless bleed)
  doc.addImage(passImageBuffer, "JPEG", 0, 0, 148, 210);

  return Buffer.from(doc.output("arraybuffer"));
}
