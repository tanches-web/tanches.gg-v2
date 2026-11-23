// Files in public/assets that show the SAME photograph or render under different names.
// Rule: a page may use each group (and each ungrouped photo) at most once.
export const IMAGE_GROUPS = {
  'iso-room-render': ['assets/iso-plan.png', 'assets/iso-dark.png', 'assets/labtour-topdown.png', 'assets/opt/home-overhead-network.webp'],
  'eye-level-render': ['assets/room-eye.png', 'assets/render-lounge.png', 'assets/labtour-player.png', 'assets/opt/home-hero-render.webp', 'assets/opt/home-room-inside.webp'],
  'lobos-arena-stage': ['assets/about-after.jpeg', 'assets/opt/about-after.jpg', 'assets/hero-room.jpeg', 'assets/hero-room-2.jpeg'],
  'empty-room-before': ['assets/about-before.jpg', 'assets/opt/about-before.jpg'],
  'lobos-broadcast-booth': ['assets/broadcast-booth.jpg', 'assets/opt/home-broadcast-booth.webp'],
  'alvin-showcase': ['assets/alvin-showcase.jpg', 'assets/alvin/alvin-03.jpg'],
  'alvin-side': ['assets/opt/alvin-side.webp', 'assets/alvin/alvin-06.jpg'],
  'stafford-hero': ['assets/opt/home-hero-stafford.webp', 'assets/stafford/stafford-05.jpg'],
  'uh-tournament-wide': ['assets/cta-tournament.jpg', 'assets/opt/league-swampy-hero-v2.webp'],
  'swampy-stage': ['assets/process-tournament.jpg', 'assets/opt/league-swampy-conquest-v2.webp'],
  'chesley-founder': ['assets/about/chesley-founder.webp', 'assets/about/chesley-founder-v2.webp'],
};

const byFile = new Map();
for (const [g, files] of Object.entries(IMAGE_GROUPS)) for (const f of files) byFile.set(f, g);
export const groupOf = (src) => {
  const clean = src.replace(/^https?:\/\/[^/]+/, '').replace(/^\//, '').split('?')[0];
  return byFile.get(clean) ?? clean;
};
