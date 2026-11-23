// Two-page Facility Readiness Report, ported from the source buildPdf() (jsPDF). jsPDF is loaded lazily, only on the
// results step. Type follows v3: Archivo replaces the source's Sora stand-in; JetBrains Mono is unchanged.
import type { Report, Tier } from './engine';

export interface PdfCtx { name: string; org: string; ref: string; pathLabel: string; report: Report; tier: Tier }
interface Assets { fonts: Record<string, string>; plate: { d: string; r: number } | null }

let cached: Assets | null = null;
let libP: Promise<any> | null = null;
export const loadJsPdf = () => (libP ??= import('jspdf').then((m) => m.jsPDF || (m as any).default?.jsPDF));

export async function pdfAssets(): Promise<Assets> {
  if (cached) return cached;
  const base = 'https://cdn.jsdelivr.net/fontsource/fonts/';
  const files: Record<string, string> = {
    s4: 'archivo@latest/latin-400-normal.ttf', s6: 'archivo@latest/latin-600-normal.ttf', s7: 'archivo@latest/latin-700-normal.ttf',
    m5: 'jetbrains-mono@latest/latin-500-normal.ttf', m6: 'jetbrains-mono@latest/latin-600-normal.ttf',
  };
  const b64 = async (u: string) => {
    const r = await fetch(u); if (!r.ok) throw new Error(u);
    const buf = new Uint8Array(await r.arrayBuffer()); let s = '';
    for (let i = 0; i < buf.length; i += 0x8000) s += String.fromCharCode.apply(null, buf.subarray(i, i + 0x8000) as any);
    return btoa(s);
  };
  const fonts: Record<string, string> = {};
  try { await Promise.all(Object.entries(files).map(async ([k, u]) => { fonts[k] = await b64(base + u); })); } catch (e) { console.warn('PDF fonts failed', e); }
  let plate: Assets['plate'] = null;
  try {
    const img = new Image();
    await Promise.race([
      new Promise((ok, no) => { img.onload = ok; img.onerror = no; img.src = '/assets/logo-mark.png'; }),
      new Promise((_, no) => setTimeout(() => no(new Error('mark timeout')), 3000)),
    ]);
    const H = 240, mh = H / 1.28, mw = (mh * img.naturalWidth) / img.naturalHeight, Wd = mw + 2 * 0.14 * mh;
    const c = document.createElement('canvas'); c.width = Math.round(Wd); c.height = H;
    const x = c.getContext('2d')!; x.fillStyle = '#0B0B0F'; x.beginPath(); (x as any).roundRect(0, 0, c.width, c.height, 0.26 * mh); x.fill();
    x.drawImage(img, (c.width - mw) / 2, (c.height - mh) / 2, mw, mh);
    plate = { d: c.toDataURL('image/png'), r: c.width / c.height };
  } catch (e) { console.warn('PDF mark failed', e); }
  const pa = { fonts, plate };
  if (Object.keys(fonts).length === 5 && plate) cached = pa;
  return pa;
}

export const pdfFileName = (name: string, org: string) => (org.trim() || name.trim() || 'TANCHESGG').replace(/[^\w]+/g, '_') + '_Readiness_Report.pdf';

export async function buildPdf(C: PdfCtx, A: Assets, asBlob: boolean): Promise<Blob | void> {
  const jsPDF = await loadJsPdf();
  const R = C.report, tier = [C.tier.name, C.tier.desc];
  const doc: any = new jsPDF({ unit: 'pt', format: 'letter', compress: true });
  const F = A.fonts, ok = Object.keys(F).length === 5;
  if (ok) ([['s4', 'Archivo', 'normal'], ['s7', 'Archivo', 'bold'], ['s6', 'ArchivoSemi', 'normal'], ['m5', 'JBM', 'normal'], ['m6', 'JBM', 'bold']] as const)
    .forEach(([k, fam, st]) => { doc.addFileToVFS(k + '.ttf', F[k]); doc.addFont(k + '.ttf', fam, st); });
  const FONT: Record<string, [string, string]> = {
    sans: ok ? ['Archivo', 'normal'] : ['helvetica', 'normal'], bold: ok ? ['Archivo', 'bold'] : ['helvetica', 'bold'], semi: ok ? ['ArchivoSemi', 'normal'] : ['helvetica', 'bold'],
    mono: ok ? ['JBM', 'normal'] : ['courier', 'normal'], monoB: ok ? ['JBM', 'bold'] : ['courier', 'bold'],
  };
  const W = 612, H = 792, M = 45, CW = W - 2 * M;
  const hex = (h: string) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16)) as [number, number, number];
  let cs = 0;
  const font = (f: string, size: number, color: string, em = 0) => { doc.setFont(...FONT[f]); doc.setFontSize(size); doc.setTextColor(...hex(color)); cs = em * size; doc.setCharSpace(cs); };
  const tw = (s: string) => doc.getTextWidth(s) + cs * Math.max(0, s.length - 1);
  const txt = (s: string, x: number, y: number, align?: 'right') => { const w = tw(s); doc.text(s, align === 'right' ? x - w : x, y); return w; };
  const para = (lines: string[], x: number, y: number, lh: number) => { lines.forEach((l, i) => doc.text(l, x, y + i * lh)); return lines.length * lh; };
  const STOPS = ['#F53F1D', '#E23869', '#DA358B', '#C92FD1'].map(hex);
  const grad = (x: number, y: number, w: number, h: number, n = 80) => {
    for (let i = 0; i < n; i++) {
      const tt = (i / (n - 1)) * 3, k = Math.min(2, Math.floor(tt)), f = tt - k;
      doc.setFillColor(...STOPS[k].map((v, j) => Math.round(v + (STOPS[k + 1][j] - v) * f)));
      doc.rect(x + (i * w) / n, y, w / n + 0.4, h, 'F');
    }
  };
  const clipRound = (x: number, y: number, w: number, h: number, r: number, draw: () => void) => { doc.saveGraphicsState(); doc.roundedRect(x, y, w, h, r, r, null); doc.clip(); doc.discardPath(); draw(); doc.restoreGraphicsState(); };
  const bar = (x: number, y: number, w: number, h: number, pct: number, track: string) => { doc.setFillColor(...hex(track)); doc.roundedRect(x, y, w, h, h / 2, h / 2, 'F'); const fw = Math.max(h, (w * pct) / 100); clipRound(x, y, fw, h, h / 2, () => grad(x, y, fw, h, 40)); };
  const hr = (y: number, c = '#E6E6EC', x0 = M, x1 = W - M) => { doc.setDrawColor(...hex(c)); doc.setLineWidth(0.75); doc.line(x0, y, x1, y); };
  const date = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }).toUpperCase();
  const ref = C.ref || '', prepared = [C.name.trim(), C.org.trim()].filter(Boolean).join(', ') || (C.pathLabel ? C.pathLabel + ' organization' : '');
  const pathUp = C.pathLabel.toUpperCase();
  const header = (big: boolean, top: string, bot?: string) => {
    grad(0, 0, W, 6, 140);
    const ph = big ? 26 : 19, y0 = 40; let x = M;
    if (A.plate) { doc.addImage(A.plate.d, 'PNG', x, y0, ph * A.plate.r, ph); x += ph * A.plate.r + (big ? 9 : 7); }
    const fs = big ? 13.5 : 10.5, by = y0 + ph / 2 + fs * 0.36;
    font('bold', fs, '#0B0B0E', -0.01); x += txt('[TANCHES.', x, by) + cs; doc.setTextColor(...hex('#DA358B')); x += txt('GG', x, by) + cs; doc.setTextColor(...hex('#0B0B0E')); txt(']', x, by);
    font('monoB', 7, '#0B0B0E', 0.14); txt(top, W - M, bot ? by - 5 : by, 'right');
    if (bot) { font('mono', 7, '#6A6A76', 0.14); txt(bot, W - M, by + 6.5, 'right'); }
    return y0 + ph;
  };
  const footer = (n: number) => {
    font('mono', 6.2, '#8A8A96', 0.12);
    const rw = txt('REF ' + ref + ' · 0' + n + ' / 02', W - M, H - 32, 'right'), room = CW - rw - 20;
    const full = prepared.toUpperCase(), tail = ' · © TANCHES.GG';
    let s = 'CONFIDENTIAL · PREPARED FOR ' + full + tail;
    if (tw(s) > room) {
      const words = full.split(' ');
      while (words.length > 1 && tw('CONFIDENTIAL · PREPARED FOR ' + words.join(' ') + '…' + tail) > room) words.pop();
      s = 'CONFIDENTIAL · PREPARED FOR ' + words.join(' ').replace(/[,\s]+$/, '') + '…' + tail;
      if (tw(s) > room) s = 'CONFIDENTIAL · PREPARED FOR ' + words.join(' ').replace(/[,\s]+$/, '') + '…';
    }
    txt(s, M, H - 32);
  };

  // page 1
  let y = header(true, 'FACILITY READINESS REPORT', date + ' · REF ' + ref) + 22;
  hr(y); font('mono', 6.75, '#6A6A76', 0.16); txt('PREPARED FOR', M, y + 17); font('semi', 12, '#0B0B0E'); txt(prepared, M, y + 34); y += 47; hr(y);
  y += 34;
  const boxW = 160, lw = CW - boxW - 26, bx = M + lw + 26, byy = y - 12;
  font('mono', 7, '#DA358B', 0.16); txt('READINESS TIER', M, y);
  font('bold', 38, '#0B0B0E', -0.045); txt(tier[0], M, y + 38);
  font('sans', 9.75, '#4A4A55'); const dh = para(doc.splitTextToSize(tier[1], lw), M, y + 60, 14.5);
  clipRound(bx, byy, boxW, 120, 12, () => { doc.setFillColor(...hex('#0B0B0E')); doc.rect(bx, byy, boxW, 120, 'F'); });
  font('mono', 6.75, '#A0A0AC', 0.16); txt('READINESS INDEX', bx + 16, byy + 25);
  font('bold', 50, '#FFFFFF', -0.05); const sw = txt(String(R.score), bx + 16, byy + 80);
  font('mono', 9, '#A0A0AC'); txt('/ 100', bx + 16 + sw + 6, byy + 80);
  bar(bx + 16, byy + 98, boxW - 32, 4.5, R.score, '#2A2A33');
  y = Math.max(y + 50 + dh, byy + 120) + 34;
  font('mono', 7, '#6A6A76', 0.16); txt('READINESS BY AREA', M, y); y += 11;
  R.dims.forEach((dd) => {
    hr(y, '#ECECF0'); const cy = y + 18;
    font('semi', 9.75, '#0B0B0E'); txt(dd.name, M, cy + 3.4);
    bar(M + 124, cy - 2.6, CW - 124 - 100, 5.2, dd.pct, '#EEEEF2');
    font('mono', 7, '#0B0B0E', 0.1); const w = txt(dd.status, W - M, cy + 2.5, 'right');
    doc.setFillColor(...hex(dd.pdot)); doc.circle(W - M - w - 8, cy, 2.6, 'F');
    y += 36;
  });
  hr(y, '#ECECF0'); y += 34;
  font('mono', 7, '#6A6A76', 0.16); txt('WHAT YOU ALREADY HAVE', M, y); y += 12;
  if (R.strengths.length) {
    const cw2 = (CW - 8) / 2;
    R.strengths.forEach((s, i) => {
      const cx = M + (i % 2) * (cw2 + 8), cy = y + Math.floor(i / 2) * 44;
      doc.setDrawColor(...hex('#E6E6EC')); doc.setLineWidth(0.75); doc.roundedRect(cx, cy, cw2, 36, 9, 9, 'S');
      doc.setDrawColor(...hex('#1E9E5A')); doc.setLineWidth(1.6); doc.setLineCap('round'); doc.setLineJoin('round'); doc.lines([[3.2, 3.2], [6.6, -7.2]], cx + 12, cy + 18.4, [1, 1], 'S', false);
      font('semi', 9, '#0B0B0E'); txt(s.t, cx + 30, cy + 16.5); font('mono', 6, '#8A8A96', 0.1); txt(s.dimUp, cx + 30, cy + 27.5);
    });
  } else { font('sans', 9.5, '#4A4A55'); para(doc.splitTextToSize('Nothing is locked in yet, which means every decision is still open. This is the best time to get the order of operations right.', CW), M, y + 10, 14); }
  footer(1);

  // page 2
  doc.addPage('letter');
  y = header(false, 'ACTION PLAN · ' + pathUp) + 34;
  font('bold', 25, '#0B0B0E', -0.04); txt('What to do next, in order.', M, y + 18); y += 42;
  const ctaH = 124, ctaY = H - 32 - 22 - ctaH;
  font('sans', 9, '#4A4A55'); const ecoBody = doc.splitTextToSize('Design, infrastructure, hardware, program, League competition, and ongoing support, built and run as one system. We partner with Dell, Lenovo, and other leading manufacturers, with one team accountable for all of it.', CW - 176);
  font('bold', 11.5, '#0B0B0E', -0.02); const ecoT = doc.splitTextToSize('Hardware is one part of the ecosystem.', 156);
  const ecoH = Math.max(ecoT.length * 14.5, ecoBody.length * 13.5) + 26, ecoY = ctaY - 20 - ecoH;
  R.plan.forEach((p) => {
    font('sans', 9, '#4A4A55'); const bl = doc.splitTextToSize(p.d, CW - 36);
    const h = 48 + (bl.length - 1) * 13.5 + (p.hasAns ? 15 : 0) + 15;
    if (y + h > ecoY) return;
    hr(y);
    font('bold', 15, '#B4B4BE', -0.03); txt(p.n, M, y + 27);
    font('monoB', 6.4, p.pPdf, 0.14); const pw = txt(p.priority, M + 36, y + 17); font('mono', 6.4, '#8A8A96', 0.14); txt(p.dimUp, M + 36 + pw + 12, y + 17);
    font('semi', 11.25, '#0B0B0E', -0.01); txt(p.t, M + 36, y + 32.5);
    font('sans', 9, '#4A4A55'); para(bl, M + 36, y + 47, 13.5);
    if (p.hasAns) { font('mono', 6.4, '#8A8A96', 0.08); txt('YOU ANSWERED: ' + p.ansUp, M + 36, y + 47 + (bl.length - 1) * 13.5 + 15); }
    y += h;
  });
  hr(ecoY);
  font('bold', 11.5, '#0B0B0E', -0.02); para(ecoT, M, ecoY + 21, 14.5);
  font('sans', 9, '#4A4A55'); para(ecoBody, M + 176, ecoY + 20, 13.5);
  clipRound(M, ctaY, CW, ctaH, 12, () => { doc.setFillColor(...hex('#0B0B0E')); doc.rect(M, ctaY, CW, ctaH, 'F'); grad(M, ctaY, CW, 2.5, 100); });
  font('bold', 17, '#FFFFFF', -0.03); txt('Turn this report into a plan.', M + 22, ctaY + 33);
  font('sans', 9, '#BDBDC8'); para(doc.splitTextToSize('Book a no-cost consultation with our team. We’ll evaluate your space, review your infrastructure, and scope a build to your budget and timeline.', CW - 44), M + 22, ctaY + 52, 13.5);
  hr(ctaY + ctaH - 36, '#2A2A33', M + 22, W - M - 22);
  font('semi', 10.5, '#FFFFFF'); const lw2 = txt('tanches.gg/contact', M + 22, ctaY + ctaH - 16); doc.link(M + 22, ctaY + ctaH - 28, lw2, 16, { url: 'https://www.tanches.gg/contact' });
  font('mono', 7, '#BDBDC8', 0.1); txt('QUOTE REF ' + ref + ' · (281) 826-2437', W - M - 22, ctaY + ctaH - 16, 'right');
  footer(2);
  doc.setProperties({ title: 'Facility Readiness Report · ' + prepared, author: 'TANCHES.GG', subject: 'Facility Readiness Assessment', creator: 'TANCHES.GG' });
  if (asBlob) return doc.output('blob') as Blob;
  doc.save(pdfFileName(C.name, C.org));
}
