// Re-encodes oversized photos in public/assets in place (these are copies; originals live in tanches.gg-site/assets).
// JPEG: max 2400px wide, mozjpeg q80. PNG/WebP photos: max 2400px wide, same format.
// Usage: node scripts/optimize-images.mjs
import sharp from 'sharp';
import { readdir, stat, writeFile, readFile } from 'node:fs/promises';
import { join, extname } from 'node:path';

import { fileURLToPath } from 'node:url';
const ROOT = fileURLToPath(new URL('../public/assets/', import.meta.url));
const SKIP = /[\\/](brand-kit|clients|oem|games|shop|story)[\\/]/;
const MAX_W = 2400;
let saved = 0;

async function walk(dir) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) { await walk(p); continue; }
    const ext = extname(p).toLowerCase();
    if (!['.jpg', '.jpeg', '.png', '.webp'].includes(ext) || SKIP.test(p)) continue;
    const { size } = await stat(p);
    if (size < 450_000) continue;
    const input = await readFile(p);
    const img = sharp(input, { failOn: 'none' }).rotate();
    const meta = await img.metadata();
    let pipe = meta.width > MAX_W ? img.resize({ width: MAX_W }) : img;
    if (ext === '.png') pipe = pipe.png({ compressionLevel: 9, palette: false });
    else if (ext === '.webp') pipe = pipe.webp({ quality: 80 });
    else pipe = pipe.jpeg({ quality: 80, mozjpeg: true });
    const out = await pipe.toBuffer();
    if (out.length < size * 0.9) {
      await writeFile(p, out);
      saved += size - out.length;
      console.log(`${p.slice(ROOT.length)}  ${(size / 1e6).toFixed(1)}MB -> ${(out.length / 1e6).toFixed(1)}MB`);
    }
  }
}
await walk(ROOT);
console.log(`saved ${(saved / 1e6).toFixed(1)} MB`);
