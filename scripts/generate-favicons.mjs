import fs from "fs";
import path from "path";
import sharp from "sharp";

/**
 * Clean, Transparent Vector SVG for Verve Spiral Hand Mark
 * NO black background, NO dark squircle.
 * 100% transparent background with high-contrast, radiant amber-gold paths.
 */
export const staticSvgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160" width="100%" height="100%">
  <defs>
    <linearGradient id="verve-favicon-gold" x1="16" y1="16" x2="144" y2="144" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stopColor="#FFB347" />
      <stop offset="45%" stopColor="#FFA63D" />
      <stop offset="80%" stopColor="#F99E3B" />
      <stop offset="100%" stopColor="#FF7A18" />
    </linearGradient>
    <filter id="verve-subtle-glow" x="-15%" y="-15%" width="130%" height="130%">
      <feDropShadow dx="0" dy="1" stdDeviation="1.5" floodColor="#FF7A18" floodOpacity="0.35" />
    </filter>
  </defs>

  <!-- Centered Verve Spiral Hand Mark (Completely Transparent Background) -->
  <g transform="translate(9.5, -1) scale(0.95)" filter="url(#verve-subtle-glow)">
    <!-- Ray 1 (Top radiant ray) -->
    <path
      d="M 58 64 C 54 52 45 38 34 26 C 30 22 24 23 26 29 C 32 42 42 58 48 70 C 51 74 56 70 58 64 Z"
      fill="url(#verve-favicon-gold)"
    />

    <!-- Ray 2 (Upper-middle radiant ray) -->
    <path
      d="M 46 76 C 34 66 22 55 9 46 C 5 43 1 48 4 52 C 15 63 28 77 38 86 C 42 89 47 84 46 76 Z"
      fill="url(#verve-favicon-gold)"
    />

    <!-- Ray 3 (Lower-middle radiant ray) -->
    <path
      d="M 40 92 C 26 87 14 83 2 80 C -2 79 -1 85 3 87 C 14 93 27 99 37 103 C 42 105 45 98 40 92 Z"
      fill="url(#verve-favicon-gold)"
    />

    <!-- Ray 4 (Bottom radiant ray) -->
    <path
      d="M 44 110 C 31 112 18 114 5 116 C 0 117 0 123 5 123 C 18 122 31 119 43 118 C 48 117 49 111 44 110 Z"
      fill="url(#verve-favicon-gold)"
    />

    <!-- Central Palm Spiral -->
    <path
      d="M 69 90 C 72 81 83 80 87 87 C 91 95 86 104 77 105 C 65 107 55 97 56 85 C 57 69 72 58 87 60 C 103 62 114 77 112 94 C 110 112 92 125 74 123 C 58 121 48 107 48 94 C 48 76 62 60 79 56 C 96 52 114 62 120 78 C 124 88 124 100 121 112 C 118 122 108 132 96 137 C 82 143 65 141 53 133 C 44 126 40 116 40 105"
      fill="none"
      stroke="url(#verve-favicon-gold)"
      stroke-width="12"
      stroke-linecap="round"
      stroke-linejoin="round"
    />

    <!-- Upward right swooping V-arm -->
    <path
      d="M 96 137 C 112 133 124 121 127 105 C 130 90 128 72 124 57 C 122 47 122 38 124 31 C 125 26 132 23 138 25 C 144 27 149 32 147 37 C 145 42 138 45 136 52 C 133 63 134 78 131 92 C 127 113 113 130 96 137 Z"
      fill="url(#verve-favicon-gold)"
    />
  </g>
</svg>`;

/**
 * Dynamic Loading Animated SVG for Favicon
 * Continuously pulses and spins when the site is loading or processing forms/orders.
 */
export const loadingSvgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160" width="100%" height="100%">
  <defs>
    <linearGradient id="verve-load-gold" x1="16" y1="16" x2="144" y2="144" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stopColor="#FFE082" />
      <stop offset="50%" stopColor="#FFA63D" />
      <stop offset="100%" stopColor="#FF7A18" />
    </linearGradient>

    <!-- Animated pulsing ambient aura -->
    <radialGradient id="verve-aura" cx="80" cy="80" r="70" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stopColor="#FFA63D" stop-opacity="0.45">
        <animate attributeName="stop-opacity" values="0.25;0.65;0.25" dur="1.2s" repeatCount="indefinite" />
      </stop>
      <stop offset="60%" stopColor="#FF7A18" stop-opacity="0.15">
        <animate attributeName="stop-opacity" values="0.08;0.35;0.08" dur="1.2s" repeatCount="indefinite" />
      </stop>
      <stop offset="100%" stopColor="#FF6D1B" stop-opacity="0" />
    </radialGradient>
  </defs>

  <!-- Ambient Pulsing Halo -->
  <circle cx="80" cy="80" r="64" fill="url(#verve-aura)">
    <animate attributeName="r" values="52;72;52" dur="1.2s" repeatCount="indefinite" />
  </circle>

  <!-- Orbiting Radiant Particle Ring -->
  <circle cx="80" cy="80" r="70" fill="none" stroke="#FFA63D" stroke-width="2.5" stroke-dasharray="16 28" stroke-linecap="round" stroke-opacity="0.7">
    <animateTransform attributeName="transform" type="rotate" from="0 80 80" to="360 80 80" dur="2s" repeatCount="indefinite" />
  </circle>

  <!-- Rotating Verve Mark (Pivoting around true optical center) -->
  <g>
    <animateTransform
      attributeName="transform"
      type="rotate"
      from="0 80 80"
      to="360 80 80"
      dur="1.4s"
      repeatCount="indefinite"
    />
    <g transform="translate(9.5, -1) scale(0.95)">
      <!-- Ray 1 -->
      <path
        d="M 58 64 C 54 52 45 38 34 26 C 30 22 24 23 26 29 C 32 42 42 58 48 70 C 51 74 56 70 58 64 Z"
        fill="url(#verve-load-gold)"
      />
      <!-- Ray 2 -->
      <path
        d="M 46 76 C 34 66 22 55 9 46 C 5 43 1 48 4 52 C 15 63 28 77 38 86 C 42 89 47 84 46 76 Z"
        fill="url(#verve-load-gold)"
      />
      <!-- Ray 3 -->
      <path
        d="M 40 92 C 26 87 14 83 2 80 C -2 79 -1 85 3 87 C 14 93 27 99 37 103 C 42 105 45 98 40 92 Z"
        fill="url(#verve-load-gold)"
      />
      <!-- Ray 4 -->
      <path
        d="M 44 110 C 31 112 18 114 5 116 C 0 117 0 123 5 123 C 18 122 31 119 43 118 C 48 117 49 111 44 110 Z"
        fill="url(#verve-load-gold)"
      />
      <!-- Central Palm Spiral -->
      <path
        d="M 69 90 C 72 81 83 80 87 87 C 91 95 86 104 77 105 C 65 107 55 97 56 85 C 57 69 72 58 87 60 C 103 62 114 77 112 94 C 110 112 92 125 74 123 C 58 121 48 107 48 94 C 48 76 62 60 79 56 C 96 52 114 62 120 78 C 124 88 124 100 121 112 C 118 122 108 132 96 137 C 82 143 65 141 53 133 C 44 126 40 116 40 105"
        fill="none"
        stroke="url(#verve-load-gold)"
        stroke-width="12"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <!-- Upward right swooping V-arm -->
      <path
        d="M 96 137 C 112 133 124 121 127 105 C 130 90 128 72 124 57 C 122 47 122 38 124 31 C 125 26 132 23 138 25 C 144 27 149 32 147 37 C 145 42 138 45 136 52 C 133 63 134 78 131 92 C 127 113 113 130 96 137 Z"
        fill="url(#verve-load-gold)"
      />
    </g>
  </g>
</svg>`;

async function run() {
  const publicDir = path.resolve("./public");

  // 1. Write public/favicon.svg (Static transparent)
  fs.writeFileSync(path.join(publicDir, "favicon.svg"), staticSvgContent.trim());
  console.log("Wrote public/favicon.svg (Transparent Background)");

  // 2. Write public/favicon-loading.svg (Dynamic loading animation)
  fs.writeFileSync(path.join(publicDir, "favicon-loading.svg"), loadingSvgContent.trim());
  console.log("Wrote public/favicon-loading.svg (Dynamic Animated Favicon)");

  const svgBuffer = Buffer.from(staticSvgContent);

  // 3. Generate 32x32 transparent PNG
  const png32 = await sharp(svgBuffer).resize(32, 32).png().toBuffer();
  fs.writeFileSync(path.join(publicDir, "favicon-32x32.png"), png32);
  fs.writeFileSync(path.join(publicDir, "favicon.png"), png32);
  console.log("Wrote public/favicon-32x32.png and public/favicon.png");

  // 4. Generate 16x16 transparent PNG
  const png16 = await sharp(svgBuffer).resize(16, 16).png().toBuffer();
  fs.writeFileSync(path.join(publicDir, "favicon-16x16.png"), png16);
  console.log("Wrote public/favicon-16x16.png");

  // 5. Generate 180x180 Apple Touch Icon (Transparent PNG)
  const png180 = await sharp(svgBuffer).resize(180, 180).png().toBuffer();
  fs.writeFileSync(path.join(publicDir, "apple-touch-icon.png"), png180);
  console.log("Wrote public/apple-touch-icon.png");

  // 6. Generate favicon.ico (Multi-image ICO containing both 16x16 and 32x32 transparent PNGs)
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type 1 (ICO)
  header.writeUInt16LE(2, 4); // 2 images (16x16 and 32x32)

  const offset1 = 6 + 16 * 2; // header (6) + 2 entries (32) = 38
  const offset2 = offset1 + png16.length;

  // Entry 1: 16x16
  const entry1 = Buffer.alloc(16);
  entry1.writeUInt8(16, 0); // width
  entry1.writeUInt8(16, 1); // height
  entry1.writeUInt8(0, 2); // colors
  entry1.writeUInt8(0, 3); // reserved
  entry1.writeUInt16LE(1, 4); // color planes
  entry1.writeUInt16LE(32, 6); // bpp
  entry1.writeUInt32LE(png16.length, 8); // size
  entry1.writeUInt32LE(offset1, 12); // offset

  // Entry 2: 32x32
  const entry2 = Buffer.alloc(16);
  entry2.writeUInt8(32, 0); // width
  entry2.writeUInt8(32, 1); // height
  entry2.writeUInt8(0, 2); // colors
  entry2.writeUInt8(0, 3); // reserved
  entry2.writeUInt16LE(1, 4); // color planes
  entry2.writeUInt16LE(32, 6); // bpp
  entry2.writeUInt32LE(png32.length, 8); // size
  entry2.writeUInt32LE(offset2, 12); // offset

  const icoBuffer = Buffer.concat([header, entry1, entry2, png16, png32]);
  fs.writeFileSync(path.join(publicDir, "favicon.ico"), icoBuffer);
  console.log("Wrote public/favicon.ico (Multi-size transparent)");
}

run().catch((err) => {
  console.error("Failed to generate favicons:", err);
  process.exit(1);
});
