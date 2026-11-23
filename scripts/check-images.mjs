// Reports any photo used more than once on the same page (counting files that show the same shot).
// Usage: node scripts/check-images.mjs [baseUrl]   (default http://localhost:4321)
// Logos (clients/, oem/, games/, brand-kit/, district-*, logo-*, proc-*) are not photos and are skipped.
import { groupOf } from './image-groups.mjs';

const base = process.argv[2] ?? 'http://localhost:4321';
const pages = ['/', '/About', '/Team', '/brand', '/Education', '/Community', '/Commercial', '/Technology', '/Procurement',
  '/Projects', '/Contact', '/Assessment', '/League',
  ...['Stafford', 'Alvin', 'Muskogee', 'Swampy', 'Longview', 'fortbend', 'navarro', 'pleasantgrove', 'samsat', 'uh', 'uhsl', 'ust'].map((s) => `/Project-${s}`)];
const isLogo = (p) => /assets\/(clients|oem|games|brand-kit|story)\/|assets\/(district-|logo-|proc-|favicon|apple-touch|og-)/.test(p) || /\.svg$/.test(p);

// Deliberate exceptions, by page and group (none at present).
const ALLOW = {};

let bad = 0;
for (const page of pages) {
  const res = await fetch(base + page);
  if (!res.ok) { console.log(`${page}: HTTP ${res.status}`); continue; }
  const html = await res.text();
  const srcs = [];
  // img src (skip srcset alternates of the same element), CSS url(), and Astro's optimised /_image?href=...
  for (const m of html.matchAll(/<img\b[^>]*?\ssrc="([^"]+)"/g)) srcs.push(m[1]);
  for (const m of html.matchAll(/url\((['"]?)([^)'"]+)\1\)/g)) srcs.push(m[2]);
  const norm = srcs.map((s) => {
    const h = /[?&]href=([^&]+)/.exec(s);
    if (h) { const d = decodeURIComponent(h[1]); const m = new RegExp('/(?:src|public)/assets/([^?]+)').exec(d); return m ? 'assets/' + m[1] : d; }
    return s;
  }).filter((s) => /\.(jpe?g|png|webp|avif)/i.test(s) && !isLogo(s));
  const seen = new Map();
  for (const s of norm) { const g = groupOf(s); seen.set(g, [...(seen.get(g) ?? []), s]); }
  const dups = [...seen.entries()].filter(([g, v]) => v.length > 1 && !(ALLOW[page] ?? []).includes(g));
  if (dups.length) { bad++; console.log(`${page}: REPEATED`); for (const [g, v] of dups) console.log(`   ${g}: ${[...new Set(v)].join(', ')} (x${v.length})`); }
  else console.log(`${page}: ok (${norm.length} photos)`);
}
process.exitCode = bad ? 1 : 0;
