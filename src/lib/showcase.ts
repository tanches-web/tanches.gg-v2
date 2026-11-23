/**
 * Homepage hero showcase: three completed labs that cycle behind the tagline.
 *
 * Each lab plays its `shots` in order (a wide shot of the room, then a closer one), then hands over
 * to the next lab. `seconds` is the total time a lab stays on screen.
 *
 * ADDING VIDEO (when the case-study films are ready)
 *   loop  A short silent background clip that replaces the photos while the lab is on screen.
 *         Export as .mp4 (H.264), 1920px wide, 8–15 seconds, no audio, ideally under 4 MB.
 *         Put it in public/assets/video/ and set e.g.  loop: '/assets/video/stafford-loop.mp4'
 *         The first photo stays as the poster frame, and is what visitors who turn off motion see.
 *   film  The full case-study film. Adds a "Watch the film" button to the lab's caption.
 *         An .mp4 or .webm path plays in an on-page player; any other link (YouTube, Vimeo) opens in a new tab.
 *         e.g.  film: '/assets/video/stafford-case-study.mp4'
 *
 * RULE: a photo may appear only once on a page. If you change a shot here, run
 *   node scripts/check-images.mjs
 * and swap any other homepage section that used the same photo.
 */
import type { ImageMetadata } from 'astro';
import stafford1 from '../../public/assets/stafford/stafford-01.jpg';
import stafford2 from '../../public/assets/opt/home-hero-stafford.webp';
import alvin1 from '../../public/assets/alvin/alvin-01.jpg';
import alvin2 from '../../public/assets/alvin-showcase.jpg';
import muskogee1 from '../../public/assets/muskogee-a.webp';
import muskogee2 from '../../public/assets/muskogee-b.webp';

export interface Shot {
  src: ImageMetadata;
  alt: string;
  /** CSS object-position, to keep the subject clear of the headline on the left. */
  pos?: string;
  /** object-position on phones, where the stage is tall and only a slice of the photo shows. */
  posMobile?: string;
}

export interface Lab {
  id: string;
  /** Short client name for the tab. */
  org: string;
  /** One-word name for the tab on phones. */
  short: string;
  /** Segment and place, shown small above the name. */
  meta: string;
  /** One line about the build (from the case study). */
  line: string;
  /** A sentence from the client's testimonial, word for word, with who said it. Shown in the hero caption. */
  quote: { text: string; name: string; role: string };
  href: string;
  /** White-on-dark client logo. */
  logo: string;
  /** Two client colours that read on a dark background; they tint the stage while the lab is showing. */
  colors: [string, string];
  /** The client's own colours as named on its case study, shown as two dots in the dock tab. */
  palette: { name: string; dots: [string, string] };
  shots: Shot[];
  seconds?: number;
  loop?: string;
  film?: string;
}

export const LABS: Lab[] = [
  {
    id: 'stafford',
    org: 'Stafford MSD',
    short: 'Stafford',
    meta: 'K-12 · Stafford, TX',
    line: 'First district in the region with a dedicated esports facility, procured through DIR and OMNIA.',
    quote: { text: 'Their partnership and support have played an important role in our students’ success and growth.', name: 'Colt Berry', role: 'Esports Head Coach' },
    href: '/Project-Stafford',
    logo: '/assets/district-stafford-h-white.png',
    colors: ['#EA0000', '#FCB326'],
    palette: { name: 'Spartans · Scarlet & Gold', dots: ['#EA0000', '#FCB326'] },
    shots: [
      { src: stafford2, alt: 'Students competing in the Stafford MSD esports arena built by TANCHES.GG', pos: '70% 45%', posMobile: '72% 45%' },
      { src: stafford1, alt: 'Students at their stations under the Spartans mural in the Stafford MSD esports lab', pos: '62% 38%', posMobile: '45% 30%' },
    ],
  },
  {
    id: 'alvin',
    org: 'Alvin College',
    short: 'Alvin',
    meta: 'Higher Ed · Alvin, TX',
    line: 'A collegiate esports lab, from program approval to ongoing support.',
    quote: { text: 'They helped us present the vision to our President, got it approved, and delivered our lab under budget.', name: 'Huff Mann', role: 'Director, Distance Education' },
    href: '/Project-Alvin',
    logo: '/assets/clients/alvin-dark.png',
    colors: ['#C10230', '#E5577A'],
    palette: { name: 'Finz · Red & Burgundy', dots: ['#C10230', '#66191D'] },
    shots: [
      { src: alvin1, alt: 'The Alvin College esports lab lit in red, with the Finz mascot glowing on the wall above players at their stations', pos: '60% 42%', posMobile: '60% 40%' },
      { src: alvin2, alt: 'Alvin College esports lab built by TANCHES.GG', pos: '55% 45%', posMobile: '45% 45%' },
    ],
  },
  {
    id: 'muskogee',
    org: 'City of Muskogee',
    short: 'Muskogee',
    meta: 'Community · Muskogee, OK',
    line: 'Lenovo Legion PCs for the Muskogee Esports Arena, shipped within a week in an out-of-stock market.',
    quote: { text: 'TANCHES.GG treats our program like it’s their own.', name: 'James Felder', role: 'Director of Esports' },
    href: '/Project-Muskogee',
    logo: '/assets/district-muskogee-white.png',
    colors: ['#0386D2', '#5AB6F2'],
    palette: { name: 'Esports Arena · Navy & Azure', dots: ['#03457F', '#0386D2'] },
    shots: [
      { src: muskogee1, alt: 'The City of Muskogee esports arena', pos: '70% 40%', posMobile: '88% 40%' },
      { src: muskogee2, alt: 'Lenovo Legion stations in the Muskogee Esports Arena', pos: '70% 45%', posMobile: '92% 40%' },
    ],
  },
];
