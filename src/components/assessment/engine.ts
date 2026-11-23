// Facility Readiness Assessment: scoring, faithful to the source (Assessment.html → report()).
// Question bank, tiers and pad steps come from src/content/forms.json → assessment.

export interface Opt { l: string; v: number }
export interface Question { id: string; dim: string; w: number; text: string; strong: string; options: Opt[]; recs: [string, string][] }
export interface Path { key: string; label: string; title: string; sub: string }
export interface Tier { name: string; desc: string }
export interface AsmData {
  paths: Path[];
  tracks: Record<string, Question[]>;
  tiers: Record<'premier' | 'growth' | 'foundation', Tier>;
  pad: { t: string; d: string; dim: string; priority: string }[];
  secretIds: string[];
}
export type Answers = Record<string, number>;

export interface Dim { name: string; pct: number; w: string; status: 'STRONG' | 'DEVELOPING' | 'GAP'; pdot: string }
export interface PlanItem { n: string; t: string; d: string; dimUp: string; priority: string; pPdf: string; hasAns: boolean; ansUp: string }
export interface Report { score: number; tier: 'premier' | 'growth' | 'foundation'; dims: Dim[]; plan: PlanItem[]; strengths: { t: string; dimUp: string }[] }

// [0] on-screen, [1] PDF. The source used #6A6A76 for "worth doing"; on screen it follows the theme's muted ink.
export const PRIORITY_COLOR: Record<string, [string, string]> = {
  'HIGH PRIORITY': ['#D93A3A', '#D93A3A'],
  'MEDIUM PRIORITY': ['#B87A00', '#B87A00'],
  'WORTH DOING': ['var(--ink-3)', '#6A6A76'],
  'NEXT STEP': ['#1E9E5A', '#1E9E5A'],
};

export function report(qs: Question[], ans: Answers, pad: AsmData['pad']): Report {
  let sc = 0, mx = 0;
  const dm: Record<string, [number, number]> = {};
  const gaps: { impact: number; qi: number; t: string; d: string; dim: string; ans: string }[] = [];
  const strengths: { t: string; dimUp: string }[] = [];
  qs.forEach((q, qi) => {
    const i = ans[q.id]; if (i == null) return;
    const o = q.options[i]; if (!o) return;
    const v = o.v;
    sc += v * q.w; mx += 2 * q.w;
    (dm[q.dim] = dm[q.dim] || [0, 0])[0] += v * q.w; dm[q.dim][1] += 2 * q.w;
    if (v >= 2) strengths.push({ t: q.strong, dimUp: q.dim.toUpperCase() });
    else { const r = q.recs[v] || q.recs[0]; gaps.push({ impact: q.w * (2 - v), qi, t: r[0], d: r[1], dim: q.dim, ans: o.l }); }
  });
  const pct = mx ? sc / mx : 0, score = Math.round(pct * 100);
  const tier = pct >= 0.65 ? 'premier' : pct >= 0.35 ? 'growth' : 'foundation';
  gaps.sort((a, b) => b.impact - a.impact || a.qi - b.qi);
  const items: { t: string; d: string; dim: string; priority: string; ans?: string }[] = gaps.map((g) => ({ ...g, priority: g.impact >= 4 ? 'HIGH PRIORITY' : g.impact >= 2 ? 'MEDIUM PRIORITY' : 'WORTH DOING' }));
  for (let k = 0; items.length < 3 && k < pad.length; k++) items.push({ t: pad[k].t, d: pad[k].d, dim: pad[k].dim, priority: 'NEXT STEP' });
  const plan = items.map((g, k) => ({
    n: String(k + 1).padStart(2, '0'), t: g.t, d: g.d, dimUp: g.dim.toUpperCase(), priority: g.priority,
    pPdf: PRIORITY_COLOR[g.priority][1], hasAns: !!g.ans, ansUp: (g.ans || '').toUpperCase(),
  }));
  const order = ['Space', 'Infrastructure', 'Funding', 'Program', 'Timeline & Scope'];
  const dims = order.filter((n) => dm[n]).map((n) => {
    const p = Math.round((dm[n][0] / dm[n][1]) * 100), st = p >= 75 ? 0 : p >= 40 ? 1 : 2;
    return { name: n, pct: Math.max(p, 3), w: Math.max(p, 3) + '%', status: (['STRONG', 'DEVELOPING', 'GAP'] as const)[st], pdot: ['#1E9E5A', '#E0A100', '#D93A3A'][st] };
  });
  return { score, tier, dims, plan, strengths };
}

export function makeRef(d = new Date()) {
  return 'TG-' + String(d.getFullYear()).slice(2) + String(d.getMonth() + 1).padStart(2, '0') + String(d.getDate()).padStart(2, '0') + '-' + Math.random().toString(36).slice(2, 6).toUpperCase();
}
