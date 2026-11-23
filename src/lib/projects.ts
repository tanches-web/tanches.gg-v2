import raw from '../content/projects.json';

const a = (p?: string | null) => (p ? (p.startsWith('/') || p.startsWith('http') ? p : '/' + p) : '');

export type Theme = {
  a: string; b: string; deep: string; deep2: string; hi: string;
  textLight: string; textDark: string; labelLight: string; labelDark: string;
  name?: string; mascot?: string; logoWhite?: string; logoColor?: string;
};

export function themeOf(t: any): Theme | null {
  if (!t) return null;
  return {
    a: t.a, b: t.b,
    deep: t.pal?.mahogany || t.deep,
    deep2: t.pal?.maroon || t.deepLight || t.a,
    hi: t.hi || t.b,
    textLight: (t.textLight || [t.a])[0],
    textDark: (t.textDark || [t.b])[0],
    labelLight: t.labelLight || t.a,
    labelDark: t.labelDark || t.hi || t.b,
    name: t.name, mascot: t.mascot,
    logoWhite: a(t.logoWhite), logoColor: a(t.logoColor),
  };
}

/** CSS custom properties that let the site's design language wear the client's colours. */
export function themeVars(t: Theme | null): Record<string, string> | undefined {
  if (!t) return undefined;
  return {
    '--ca': t.a, '--cb': t.b, '--cd': t.deep, '--cd2': t.deep2, '--chi': t.hi,
    '--ct-l': t.textLight, '--ct-d': t.textDark, '--clbl-l': t.labelLight, '--clbl-d': t.labelDark,
  };
}

export const projects = (raw as any[]).map((p) => {
  const d = p.data;
  const theme = themeOf(d.theme);
  return {
    slug: p.slug as string,
    order: p.order as number,
    ready: !!p.status?.ready && !d.loading,
    seo: p.seo,
    data: d,
    rendered: p.rendered,
    theme,
    title: d.title as string,
    loc: d.loc as string,
    img: a(d.img),
    lede: d.lede as string,
    cardLogo: a(d.cardLogo),
    asset: a,
  };
});

export const bySlug = (slug: string) => projects.find((p) => p.slug === slug);
export { a as assetPath };
