---
version: 1
slug: "src-pages-index-astro"
primary_target: "src/pages/index.astro"
related_targets: []
---

# Home (and site-wide world)

Scope: homepage at `src/pages/index.astro`; the world it sets carries every page in scope. Mode: Persuade.

Audience and job: district leaders and IT decide TANCHES.GG is a serious, accountable vendor; students and coaches feel the arena. Action: book a no-cost consultation or start the readiness assessment. Proof: real finished rooms, client case studies in their colours, figures, testimonials, cooperative contracts. Constraints: light default with dark toggle, translucent nav, fixed tagline, WCAG 2.1 AA, Astro static on Netlify, keep URLs and copy. No photo may appear twice on one page (`node scripts/check-images.mjs`). Logo marquees are one tone, colour on hover, never pause.

## Direction contract

THESIS: The finished room is the product. Every page presents it the way flagship hardware launches: one object on a seamless sweep, specified with precision. Refuses the category default of a dark neon gamer hero over grids of identical cards.

OWN-WORLD: Light is a seamless studio sweep, white falling to a cool grey floor, near-black ink, objects casting soft floor shadows. Dark is a black stage under one overhead light. Frosted glass only where something floats over an object or photo (nav, captions, dock). Brand spectrum is rationed: tagline line two, the primary action, spec markers. One variable grotesk: light and huge for statements, bold for emphasis; mono only for specs and figures. Client colours replace the spectrum wherever a client's build is on screen.

STORY: Hero (three finished labs, each with its client's own words; two actions) → proof (figures, client logos) → ecosystem (space, infrastructure, program) → solutions (find your environment) → IT-first trust → process and contracts → more builds and the reference ask → league → FAQ and assessment → contact form. Every section ends on its next step.

FIRST VIEWPORT (user-directed, 12 Nov 2026, replaces the floating 3D render): a full-screen stage, inset with rounded corners, cycling three completed labs (Stafford MSD, Alvin College, City of Muskogee), two shots each with a slow push-in. Tagline lower-left over a left-side scrim, line two in the spectrum, lede, and the two actions (Book a free consultation; Take the 4-minute assessment). Lower-right: a frosted caption with the client logo, one line and "See the build". Bottom: a frosted dock with one tab per lab whose progress bar fills in that client's colours, plus pause. The stage glow and tint follow the client on screen. Nav is dark glass while over the stage. Built video-ready: per-lab `loop` clip and `film` case-study player in `src/lib/showcase.ts`.

FORM: Premium hardware launch on a seamless sweep; my first-ranked grounded candidate (the pick). seed:009c7c1f7fe35c39

SIGNATURE: The Ecosystem as a product tour in three views: the eye-level room with hotspots (Space), a drawn plan with cable runs from the network closet (Infrastructure), and that plan pulling back to one site among many (Program).

## Unresolved

- The `[ BRACKETED ]` label device must not sit as an eyebrow above headings; carry it in the wordmark, spec labels, captions and data instead.
- Hero photos are 1280–2200px wide; sharper originals (or the planned video) would lift the stage on large monitors.
- Video path (`loop`, `film`) is built but untested with real footage.
