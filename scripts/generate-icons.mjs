/**
 * Generates raster icons from the mark. Google does not list SVG as a
 * supported favicon format, so PNG and ICO are shipped alongside the SVG.
 * Output is committed to public/, so this runs only when the mark changes.
 *
 *   node scripts/generate-icons.mjs
 */

import fs from 'node:fs';
import path from 'node:path';
import { Resvg } from '@resvg/resvg-js';
import { projectRoot } from '../src/lib/content-index.mjs';

const publicDir = path.join(projectRoot, 'public');
const brandDir = path.join(publicDir, 'brand');
fs.mkdirSync(brandDir, { recursive: true });

/** The mark on an obsidian tile. `pad` is the margin as a fraction of the tile. */
const tile = (pad) => {
  const size = 24 / (1 - pad * 2);
  const offset = (size - 24) / 2;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}">
  <rect width="${size}" height="${size}" fill="#0C0C0B"/>
  <g transform="translate(${offset} ${offset})">
    <line x1="0" y1="12" x2="24" y2="12" stroke="#8A8982" stroke-width="1.2" stroke-dasharray="2.5 2.5"/>
    <path d="M0 20 L6 18 L10 15 L14 9 L18 6 L24 4" stroke="#F5F4F1" stroke-width="1.8" fill="none" stroke-linejoin="round"/>
    <rect x="9" y="9" width="6" height="6" fill="#F5F4F1"/>
  </g>
</svg>`;
};

const render = (svg, width) => new Resvg(svg, { fitTo: { mode: 'width', value: width } }).render().asPng();

/** Single-image ICO container around a PNG. */
function ico(png, size) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(1, 4);

  const entry = Buffer.alloc(16);
  entry.writeUInt8(size >= 256 ? 0 : size, 0);
  entry.writeUInt8(size >= 256 ? 0 : size, 1);
  entry.writeUInt8(0, 2);
  entry.writeUInt8(0, 3);
  entry.writeUInt16LE(1, 4);
  entry.writeUInt16LE(32, 6);
  entry.writeUInt32LE(png.length, 8);
  entry.writeUInt32LE(22, 12);

  return Buffer.concat([header, entry, png]);
}

const outputs = [
  { file: path.join(brandDir, 'favicon-48.png'), svg: tile(0.12), width: 48 },
  { file: path.join(brandDir, 'favicon-96.png'), svg: tile(0.12), width: 96 },
  { file: path.join(brandDir, 'apple-touch-icon.png'), svg: tile(0.18), width: 180 },
  { file: path.join(brandDir, 'icon-192.png'), svg: tile(0.18), width: 192 },
  { file: path.join(brandDir, 'icon-512.png'), svg: tile(0.18), width: 512 },
  // Maskable icons keep the mark inside the central safe zone.
  { file: path.join(brandDir, 'icon-maskable-512.png'), svg: tile(0.26), width: 512 },
  // Logo referenced by Organization structured data.
  { file: path.join(brandDir, 'xyvionix-logo-512.png'), svg: tile(0.2), width: 512 },
];

for (const { file, svg, width } of outputs) {
  fs.writeFileSync(file, render(svg, width));
  console.log(`wrote ${path.relative(projectRoot, file)}`);
}

fs.writeFileSync(path.join(publicDir, 'favicon.ico'), ico(render(tile(0.12), 48), 48));
console.log('wrote public/favicon.ico');
