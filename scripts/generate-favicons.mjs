import fs from "fs";
import path from "path";
import sharp from "sharp";

const svgContent = `<svg viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="badgeBg" x1="10" y1="10" x2="118" y2="118" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stopColor="#4A0E17" />
      <stop offset="60%" stopColor="#24050D" />
      <stop offset="100%" stopColor="#120206" />
    </linearGradient>
    <linearGradient id="goldGrad" x1="16" y1="16" x2="112" y2="112" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stopColor="#FFF2A3" />
      <stop offset="30%" stopColor="#FFC843" />
      <stop offset="100%" stopColor="#E68200" />
    </linearGradient>
  </defs>

  <!-- High-contrast Badge (Oxblood Burgundy with Luminous Gold Outer Ring) -->
  <rect x="4" y="4" width="120" height="120" rx="26" fill="url(#badgeBg)" stroke="#FFA834" stroke-width="7" />

  <!-- Verve Radiant Sun-Spiral Icon (Thickened Strokes for Micro-Scales) -->
  <g transform="translate(6, 6) scale(0.72)">
    <!-- Ray 1 -->
    <path
      d="M 58 64 C 54 52 45 38 34 26 C 30 22 24 23 26 29 C 32 42 42 58 48 70 C 51 74 56 70 58 64 Z"
      fill="url(#goldGrad)"
    />

    <!-- Ray 2 -->
    <path
      d="M 46 76 C 34 66 22 55 9 46 C 5 43 1 48 4 52 C 15 63 28 77 38 86 C 42 89 47 84 46 76 Z"
      fill="url(#goldGrad)"
    />

    <!-- Ray 3 -->
    <path
      d="M 40 92 C 26 87 14 83 2 80 C -2 79 -1 85 3 87 C 14 93 27 99 37 103 C 42 105 45 98 40 92 Z"
      fill="url(#goldGrad)"
    />

    <!-- Ray 4 -->
    <path
      d="M 44 110 C 31 112 18 114 5 116 C 0 117 0 123 5 123 C 18 122 31 119 43 118 C 48 117 49 111 44 110 Z"
      fill="url(#goldGrad)"
    />

    <!-- Heavy-gauge Central Palm Spiral -->
    <path
      d="M 69 90 C 72 81 83 80 87 87 C 91 95 86 104 77 105 C 65 107 55 97 56 85 C 57 69 72 58 87 60 C 103 62 114 77 112 94 C 110 112 92 125 74 123 C 58 121 48 107 48 94 C 48 76 62 60 79 56 C 96 52 114 62 120 78 C 124 88 124 100 121 112 C 118 122 108 132 96 137 C 82 143 65 141 53 133 C 44 126 40 116 40 105"
      fill="none"
      stroke="url(#goldGrad)"
      stroke-width="13"
      stroke-linecap="round"
      stroke-linejoin="round"
    />

    <!-- Upward right swooping V-arm -->
    <path
      d="M 96 137 C 112 133 124 121 127 105 C 130 90 128 72 124 57 C 122 47 122 38 124 31 C 125 26 132 23 138 25 C 144 27 149 32 147 37 C 145 42 138 45 136 52 C 133 63 134 78 131 92 C 127 113 113 130 96 137 Z"
      fill="url(#goldGrad)"
    />
  </g>
</svg>`;

async function run() {
  const publicDir = path.resolve("./public");
  fs.writeFileSync(path.join(publicDir, "favicon.svg"), svgContent);
  console.log("Wrote public/favicon.svg");

  const svgBuffer = Buffer.from(svgContent);

  // Generate 32x32 PNG
  const png32 = await sharp(svgBuffer).resize(32, 32).png().toBuffer();
  fs.writeFileSync(path.join(publicDir, "favicon-32x32.png"), png32);
  fs.writeFileSync(path.join(publicDir, "favicon.png"), png32);

  // Generate 180x180 Apple Touch Icon
  const png180 = await sharp(svgBuffer).resize(180, 180).png().toBuffer();
  fs.writeFileSync(path.join(publicDir, "apple-touch-icon.png"), png180);

  // Generate favicon.ico (ICO format wrapping PNG buffer)
  // Standard ICO header: 0, 0, 1, 0, 1, 0 (reserved, type 1 for ICO, 1 image)
  // Directory entry: width, height, colors (0), reserved (0), planes (1), bpp (32), size (4 bytes), offset (4 bytes: 6 + 16 = 22)
  const icoHeader = Buffer.alloc(22);
  icoHeader.writeUInt16LE(0, 0); // reserved
  icoHeader.writeUInt16LE(1, 2); // ICO type
  icoHeader.writeUInt16LE(1, 4); // 1 image count

  icoHeader.writeUInt8(32, 6); // width
  icoHeader.writeUInt8(32, 7); // height
  icoHeader.writeUInt8(0, 8); // color palette count
  icoHeader.writeUInt8(0, 9); // reserved
  icoHeader.writeUInt16LE(1, 10); // color planes
  icoHeader.writeUInt16LE(32, 12); // bpp
  icoHeader.writeUInt32LE(png32.length, 14); // image data size
  icoHeader.writeUInt32LE(22, 18); // offset to image data

  const icoBuffer = Buffer.concat([icoHeader, png32]);
  fs.writeFileSync(path.join(publicDir, "favicon.ico"), icoBuffer);
  console.log("Wrote public/favicon.ico, favicon.png, apple-touch-icon.png");
}

run().catch(console.error);
