// Source headings mark their emphasised continuation with a span (tg-grad / tg-sp-hi).
// Split them into the plain part and the part v3 sets in bold.
export function splitHeading(s: { heading: string; headingHtml?: string }): { title: string; strong?: string } {
  if (!s.headingHtml) return { title: s.heading };
  const m = s.headingHtml.match(/^(.*?)\s*<span class="[^"]*">(.*?)<\/span>(.*)$/s);
  if (!m) return { title: s.heading };
  return { title: m[1].trim(), strong: (m[2] + m[3]).trim() };
}

export const asset = (p: string) => (p.startsWith('/') || p.startsWith('http') ? p : '/' + p);
