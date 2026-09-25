import { jsPDF } from "jspdf";
import QRCode from "qrcode";
import sharp from "sharp";
import fs from "fs";
import path from "path";
import { createRequire } from "module";
import type { Font } from "opentype.js";

const require = createRequire(import.meta.url);
const opentype = require("opentype.js");

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

// Cached OpenType fonts to prevent disk re-reads on every ticket generation
let serifBoldFont: Font | null = null;
let serifRegularFont: Font | null = null;
let sansBoldFont: Font | null = null;
let monoBoldFont: Font | null = null;

function loadFontFromPaths(candidates: string[]): Font | null {
  for (const candidate of candidates) {
    const resolved = path.isAbsolute(candidate)
      ? candidate
      : path.resolve(process.cwd(), candidate);
    if (fs.existsSync(resolved)) {
      try {
        const buffer = fs.readFileSync(resolved);
        return opentype.parse(
          buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength),
        );
      } catch (err) {
        console.warn(`[TicketGenerator] Failed to parse font from ${resolved}:`, err);
      }
    }
  }
  return null;
}

function getSerifBold(): Font | null {
  if (!serifBoldFont) {
    serifBoldFont = loadFontFromPaths([
      "src/server/fonts/Serif-Bold.ttf",
      "/usr/share/fonts/truetype/liberation/LiberationSerif-Bold.ttf",
      "/usr/share/fonts/truetype/freefont/FreeSerifBold.ttf",
    ]);
  }
  return serifBoldFont;
}

function getSerifRegular(): Font | null {
  if (!serifRegularFont) {
    serifRegularFont = loadFontFromPaths([
      "src/server/fonts/Serif-Regular.ttf",
      "src/server/fonts/Serif-Bold.ttf",
      "/usr/share/fonts/truetype/liberation/LiberationSerif-Regular.ttf",
      "/usr/share/fonts/truetype/freefont/FreeSerif.ttf",
    ]);
  }
  return serifRegularFont;
}

function getSansBold(): Font | null {
  if (!sansBoldFont) {
    sansBoldFont = loadFontFromPaths([
      "src/server/fonts/Sans-Bold.ttf",
      "/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf",
      "/usr/share/fonts/truetype/freefont/FreeSansBold.ttf",
    ]);
  }
  return sansBoldFont;
}

function getMonoBold(): Font | null {
  if (!monoBoldFont) {
    monoBoldFont = loadFontFromPaths([
      "src/server/fonts/Mono-Bold.ttf",
      "src/server/fonts/Sans-Bold.ttf",
      "/usr/share/fonts/truetype/liberation/LiberationMono-Bold.ttf",
      "/usr/share/fonts/truetype/freefont/FreeMonoBold.ttf",
    ]);
  }
  return monoBoldFont;
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
 * Renders text into pure SVG vector paths (<path d="..." />)
 * Completely eliminates tofu boxes (▯) in all container environments like Cloud Run,
 * because vector paths have ZERO dependence on system font installations!
 */
function renderTextVector(params: {
  font: Font | null;
  text: string;
  x: number;
  y: number;
  fontSize: number;
  fill?: string;
  textAnchor?: "left" | "middle" | "end";
  letterSpacing?: number;
  fallbackFontFamily?: string;
  fontWeight?: string;
}): string {
  const {
    font,
    text,
    fontSize,
    fill = "#EDEAE3",
    textAnchor = "left",
    letterSpacing = 0,
    fallbackFontFamily = "'Cinzel', 'Georgia', serif",
    fontWeight = "normal",
  } = params;

  if (!text) return "";

  // If opentype font is available, render as 100% immune vector paths
  if (font) {
    let totalWidth = 0;
    for (let i = 0; i < text.length; i++) {
      const glyph = font.charToGlyph(text[i]);
      const advance =
        (glyph.advanceWidth || 0) * (fontSize / font.unitsPerEm) +
        (i < text.length - 1 ? letterSpacing : 0);
      totalWidth += advance;
    }

    let startX = params.x;
    if (textAnchor === "middle") {
      startX = params.x - totalWidth / 2;
    } else if (textAnchor === "end") {
      startX = params.x - totalWidth;
    }

    let paths = "";
    let curX = startX;
    for (let i = 0; i < text.length; i++) {
      const glyph = font.charToGlyph(text[i]);
      const glyphPath = glyph.getPath(curX, params.y, fontSize);
      const svgPath = glyphPath.toSVG(2);
      if (svgPath && svgPath.includes(' d="M')) {
        paths += svgPath.replace("<path", `<path fill="${fill}"`) + "\n";
      }
      curX += (glyph.advanceWidth || 0) * (fontSize / font.unitsPerEm) + letterSpacing;
    }

    return paths;
  }

  // Graceful fallback to SVG <text> tag if font file is missing
  return `<text x="${params.x}" y="${params.y}" text-anchor="${textAnchor}" font-family="${fallbackFontFamily}" font-size="${fontSize}" font-weight="${fontWeight}" fill="${fill}" letter-spacing="${letterSpacing}">${escapeXml(text)}</text>`;
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

  const serifBold = getSerifBold();
  const serifRegular = getSerifRegular();
  const sansBold = getSansBold();
  const monoBold = getMonoBold();

  // Pre-render all typography into pure SVG vector paths
  const scanLabelVector = renderTextVector({
    font: serifRegular,
    text: "scan at venue entry",
    x: 500,
    y: 375,
    fontSize: 18,
    fill: "#EDEAE3",
    textAnchor: "middle",
    letterSpacing: 1.5,
  });

  const titleHauntingsVector = renderTextVector({
    font: serifBold,
    text: "HAUNTINGS",
    x: 500,
    y: 460,
    fontSize: 76,
    fill: "#EDEAE3",
    textAnchor: "middle",
    letterSpacing: 6,
    fontWeight: "bold",
  });

  const titleOfVector = renderTextVector({
    font: serifBold,
    text: "OF",
    x: 500,
    y: 545,
    fontSize: 62,
    fill: "#EDEAE3",
    textAnchor: "middle",
    letterSpacing: 4,
    fontWeight: "bold",
  });

  const titleTheRiftVector = renderTextVector({
    font: serifBold,
    text: "THE RIFT",
    x: 500,
    y: 635,
    fontSize: 76,
    fill: "#EDEAE3",
    textAnchor: "middle",
    letterSpacing: 6,
    fontWeight: "bold",
  });

  const oct31Vector = renderTextVector({
    font: serifBold,
    text: "OCT 31",
    x: 235,
    y: 740,
    fontSize: 36,
    fill: "#FFFFFF",
    textAnchor: "middle",
    letterSpacing: 3,
    fontWeight: "bold",
  });

  const timeVector = renderTextVector({
    font: serifBold,
    text: "4-10 PM",
    x: 765,
    y: 740,
    fontSize: 36,
    fill: "#FFFFFF",
    textAnchor: "middle",
    letterSpacing: 3,
    fontWeight: "bold",
  });

  const venueTitleVector = renderTextVector({
    font: serifBold,
    text: "TOPCLIFF LODGE",
    x: 500,
    y: 825,
    fontSize: 38,
    fill: "#EDEAE3",
    textAnchor: "middle",
    letterSpacing: 4,
    fontWeight: "bold",
  });

  const venueCityVector = renderTextVector({
    font: serifBold,
    text: "NAKURU",
    x: 500,
    y: 870,
    fontSize: 34,
    fill: "#EDEAE3",
    textAnchor: "middle",
    letterSpacing: 6,
    fontWeight: "bold",
  });

  const holderHeaderVector = renderTextVector({
    font: sansBold,
    text: "TICKET HOLDER",
    x: 280,
    y: 925,
    fontSize: 20,
    fill: "#9CA3AF",
    textAnchor: "middle",
    letterSpacing: 2,
  });

  const holderNameVector = renderTextVector({
    font: serifBold,
    text: (customerName || "Valued Attendee").toUpperCase(),
    x: 280,
    y: 958,
    fontSize: 24,
    fill: "#FFFFFF",
    textAnchor: "middle",
    fontWeight: "bold",
  });

  const typeHeaderVector = renderTextVector({
    font: sansBold,
    text: "TICKET TYPE",
    x: 720,
    y: 925,
    fontSize: 20,
    fill: "#9CA3AF",
    textAnchor: "middle",
    letterSpacing: 2,
  });

  const typeNameVector = renderTextVector({
    font: serifBold,
    text: (tierName || "General Admission Pass").toUpperCase(),
    x: 720,
    y: 958,
    fontSize: 24,
    fill: "#FFFFFF",
    textAnchor: "middle",
    fontWeight: "bold",
  });

  const rsvpHeaderVector = renderTextVector({
    font: sansBold,
    text: "RSVP CODE",
    x: 500,
    y: 1025,
    fontSize: 20,
    fill: "#9CA3AF",
    textAnchor: "middle",
    letterSpacing: 2,
  });

  const rsvpCodeVector = renderTextVector({
    font: monoBold,
    text: ticketCode,
    x: 500,
    y: 1065,
    fontSize: 34,
    fill: "#F59E0B",
    textAnchor: "middle",
    letterSpacing: 4,
    fontWeight: "bold",
  });

  const footerVector = renderTextVector({
    font: sansBold,
    text: `Order #${orderNumber}  •  Issued ${issuedDate}  •  Valid for single entry. Non-transferable`,
    x: 500,
    y: 1205,
    fontSize: 15,
    fill: "#9CA3AF",
    textAnchor: "middle",
    letterSpacing: 0.5,
  });

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

    <!-- "scan at venue entry" Label (Rendered as Vector Paths) -->
    ${scanLabelVector}

    <!-- TITLE: HAUNTINGS OF THE RIFT (Rendered as Vector Paths) -->
    ${titleHauntingsVector}
    ${titleOfVector}
    ${titleTheRiftVector}

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
    ${oct31Vector}
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
    ${timeVector}
    <line x1="650" y1="755" x2="880" y2="755" stroke="#FFFFFF" stroke-opacity="0.8" stroke-width="2" />

    <!-- VENUE: TOPCLIFF LODGE NAKURU -->
    ${venueTitleVector}
    ${venueCityVector}

    <!-- TICKET DETAILS GRID -->
    ${holderHeaderVector}
    ${holderNameVector}

    ${typeHeaderVector}
    ${typeNameVector}

    <!-- RSVP CODE -->
    ${rsvpHeaderVector}
    ${rsvpCodeVector}

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
    ${footerVector}
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
