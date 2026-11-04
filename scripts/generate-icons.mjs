import sharp from "sharp";
import { mkdir } from "node:fs/promises";

await mkdir("public/icons", { recursive: true });

const svg = `
<svg xmlns="http://www.w3.org/2000/svg"
     width="512" height="512" viewBox="0 0 512 512">
  <defs>
    <linearGradient id="blue" x1="0" y1="0" x2="1" y2="1">
      <stop stop-color="#79BBFF"/>
      <stop offset="1" stop-color="#2563EB"/>
    </linearGradient>
  </defs>

  <rect width="512" height="512" rx="112"
        fill="url(#blue)"/>

  <rect x="147" y="105" width="218" height="302" rx="28"
        fill="#FFFFFF" opacity=".96"/>

  <path d="M285 105V172Q285 188 301 188H365"
        fill="#BCD9FF"/>

  <path d="M185 248H324M185 282H324M185 316H285"
        stroke="#4785E9" stroke-width="15"
        stroke-linecap="round"/>

  <circle cx="362" cy="364" r="72"
          fill="#FFFFFF"/>

  <path d="M362 329V396M329 363H395"
        stroke="#2563EB" stroke-width="17"
        stroke-linecap="round"/>
</svg>`;

for (const size of [192, 512]) {
  await sharp(Buffer.from(svg))
    .resize(size, size)
    .png()
    .toFile(`public/icons/icon-${size}.png`);
}

await sharp(Buffer.from(svg))
  .resize(180, 180)
  .png()
  .toFile("public/icons/apple-touch-icon.png");

console.log("Ícones criados com sucesso!");
