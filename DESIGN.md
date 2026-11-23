---
name: TANCHES.GG
description: Esports environments presented like flagship hardware, one finished room on a seamless studio sweep.
colors:
  flame: "#F53F1D"
  ember: "#EE3C37"
  rose: "#E23869"
  magenta: "#DA358B"
  fuchsia: "#D031B2"
  violet: "#C92FD1"
  accent: "#B81E4E"
  accent-dark: "#F2628C"
  sweep-ground: "#F6F7F9"
  sweep-high: "#FFFFFF"
  sweep-floor: "#E3E6EB"
  surface: "#FFFFFF"
  surface-2: "#EEF0F3"
  ink: "#0E1016"
  ink-2: "#464B57"
  ink-3: "#5C616D"
  line: "rgba(14, 16, 22, 0.10)"
  line-2: "rgba(14, 16, 22, 0.18)"
  glass: "rgba(255, 255, 255, 0.64)"
  stage-ground: "#0A0B0E"
  stage-light: "#22242B"
  stage-surface: "#131419"
  stage-surface-2: "#1A1B21"
  stage-ink: "#F2F3F5"
  stage-ink-2: "#B7BBC5"
  stage-ink-3: "#9196A1"
  stage-glass: "rgba(22, 23, 29, 0.62)"
  showcase-black: "#0B0C10"
  showcase-ink: "#F4F5F7"
typography:
  display:
    fontFamily: "'Archivo Variable', 'Archivo', system-ui, -apple-system, 'Segoe UI', sans-serif"
    fontSize: "clamp(2.75rem, 1.2rem + 5.4vw, 5.75rem)"
    fontWeight: 340
    lineHeight: 0.98
    letterSpacing: "-0.04em"
    fontVariation: "'wdth' 100"
  headline:
    fontFamily: "'Archivo Variable', 'Archivo', system-ui, sans-serif"
    fontSize: "clamp(2.25rem, 1.3rem + 3.2vw, 4.25rem)"
    fontWeight: 360
    lineHeight: 1.02
    letterSpacing: "-0.038em"
  title:
    fontFamily: "'Archivo Variable', 'Archivo', system-ui, sans-serif"
    fontSize: "clamp(1.375rem, 1.1rem + 0.9vw, 1.875rem)"
    fontWeight: 640
    lineHeight: 1.15
    letterSpacing: "-0.02em"
  lede:
    fontFamily: "'Archivo Variable', 'Archivo', system-ui, sans-serif"
    fontSize: "clamp(1.125rem, 1rem + 0.4vw, 1.375rem)"
    fontWeight: 400
    lineHeight: 1.5
  body:
    fontFamily: "'Archivo Variable', 'Archivo', system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.6
    fontFeature: "'ss01'"
  small:
    fontFamily: "'Archivo Variable', 'Archivo', system-ui, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "'JetBrains Mono', ui-monospace, 'Cascadia Mono', monospace"
    fontSize: "0.75rem"
    fontWeight: 500
    letterSpacing: "0.08em"
rounded:
  sm: "12px"
  field: "14px"
  nested: "16px"
  md: "22px"
  stage: "28px"
  frame: "32px"
  pill: "999px"
spacing:
  gutter: "clamp(1rem, 0.4rem + 2.6vw, 2.5rem)"
  section: "clamp(5.5rem, 3rem + 8vw, 10rem)"
  max: "1280px"
  narrow: "760px"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.surface}"
    rounded: "{rounded.pill}"
    padding: "0 1.5rem"
    height: "3.25rem"
  button-primary-on-stage:
    backgroundColor: "{colors.showcase-ink}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "0 1.5rem"
    height: "3.25rem"
  button-ghost:
    backgroundColor: "{colors.glass}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "0 1.5rem"
    height: "3.25rem"
  button-sm:
    rounded: "{rounded.pill}"
    padding: "0 1.1rem"
    height: "2.625rem"
  label-glass:
    backgroundColor: "{colors.glass}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "0.45rem 0.9rem 0.45rem 0.5rem"
  nav-bar:
    backgroundColor: "{colors.glass}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "0 0.5rem 0 1.125rem"
    height: "3.75rem"
  input:
    backgroundColor: "{colors.sweep-ground}"
    textColor: "{colors.ink}"
    rounded: "{rounded.field}"
    padding: "0.75rem 0.95rem"
    height: "3rem"
  tag:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink-2}"
    rounded: "{rounded.pill}"
    padding: "0.25rem 0.65rem"
  photo-plate:
    backgroundColor: "{colors.surface-2}"
    rounded: "{rounded.md}"
---

# Design System: TANCHES.GG

## Overview

**Creative North Star: "The Seamless"**

The finished room is the product, so every page presents it the way flagship hardware launches: one object on a seamless studio sweep, specified with precision. In light theme the page is a studio backdrop that falls from white to a cool grey floor, with near-black ink and objects that throw soft floor shadows. In dark theme it is a black stage lit by one overhead light. Real photographs of finished builds are the objects; the interface stays quiet around them.

Density is low and confident. Statements are huge and light, emphasis is the same family at bold weight, and the only other voice is a small monospace spec line for figures, locations and data. Frosted glass appears only where something floats over an object or a photo (the nav, captions, the hero dock, spec callouts). The six-stop brand spectrum is rationed, so that a client's own colours can take over whenever that client's build is on screen.

The system refuses the category default of a dark neon gamer hero over grids of identical cards. Trust reads first; esports energy arrives through the photographs, the spectrum accents and the client colours.

**Key Characteristics:**
- Studio sweep (light) and single-light stage (dark), both with a visible theme toggle; light is the default.
- One variable grotesk (Archivo), light and huge for statements, 700+ for emphasis; JetBrains Mono only for specs.
- Spectrum rationed to tagline line two, the primary action's hover, spec markers and live dots.
- Client colours replace the spectrum wherever a client's build is shown.
- Pill-shaped controls, generously rounded photo plates, frosted glass only over imagery.
- Real finished builds as page openings; a photo never repeats on one page.

## Colors

A cool, near-colourless studio palette carrying one rationed hot spectrum, with client colours swapped in per build.

### Primary
- **Brand Spectrum** (flame → ember → rose → magenta → fuchsia → violet, as a 105deg linear gradient): the brand's signature. Used on the hero tagline's second line, as the halo that appears behind the primary button on hover and focus, on spec-callout dots, ecosystem hotspot pins and the active ecosystem row icon. Never as a section background or large fill.
- **Rose** (`rose`): the signature stop. Used alone for "live" indicators (the League nav dot and League button pulse) and the program network lines in the Ecosystem.
- **Text Rose** (`accent`, light; `accent-dark`, dark): the text-safe rose for inline links, "View project" calls, focus rings, input focus borders and caret. The spectrum stops themselves are not used as text colour on the sweep.

### Neutral
- **Sweep Ground** (`sweep-ground`): page background in light theme; also the input fill.
- **Sweep High / Sweep Floor** (`sweep-high`, `sweep-floor`): the top light and floor pool of the studio sweep gradient behind openings and the ecosystem frame.
- **Surface / Surface 2** (`surface`, `surface-2`): raised cards (assessment card, tags) and the placeholder fill behind photos and segmented-control tracks.
- **Ink, Ink 2, Ink 3** (`ink`, `ink-2`, `ink-3`): headings and primary text; ledes and body copy; spec lines, captions and secondary labels. All three pass AA on the sweep.
- **Line / Line 2** (`line`, `line-2`): hairline dividers, spec-table rules, field borders (line-2), hover tints on nav links.
- **Glass** (`glass`): frosted fill for the nav bar, ghost buttons and spec callouts in light theme.
- **Stage set** (`stage-ground`, `stage-light`, `stage-surface`, `stage-surface-2`, `stage-ink`, `stage-ink-2`, `stage-ink-3`, `stage-glass`): the dark-theme equivalents of every neutral above, swapped by `data-theme="dark"` on `<html>`.
- **Showcase Black / Showcase Ink** (`showcase-black`, `showcase-ink`): the home hero stage is always dark, whatever the theme; its primary button inverts to showcase ink on ink.

### Client colours (per build)
Case-study pages and work tiles carry each client's palette through custom properties set from project data: `--ca` / `--cb` (the two brand colours), `--cd` / `--cd2` (deep grounds), `--chi` (highlight), `--ct-l` / `--ct-d` (text colour per theme) and `--clbl-l` / `--clbl-d` (labels per theme). The hero showcase uses each lab's two colours (`--ha` / `--hb`) to tint the stage glow and fill the dock progress bar, cross-fading between clients.

### Named Rules
**The Rationed Spectrum Rule.** The spectrum appears only on the bold half of headlines (the tagline's second line and every headline's `<strong>` continuation), the primary action's hover halo, spec dots, hotspot pins and cable runs. If a screen shows the spectrum anywhere else, remove it.

**The Client Is the Colour Rule.** Wherever a client's build is on screen (hero lab, work tile, case study), that client's two colours replace the spectrum for glows, top stripes, progress bars and status pulses.

**The Text-Safe Rose Rule.** Rose as text is always `accent` (light) or `accent-dark` (dark), never a raw spectrum stop.

## Typography

**Display Font:** Archivo Variable (with Archivo, system-ui, Segoe UI)
**Body Font:** Archivo Variable (same family; width axis held at 100)
**Label/Mono Font:** JetBrains Mono 500 (with ui-monospace, Cascadia Mono)

**Character:** One grotesk carries everything: whisper-light at display sizes, heavy for the phrase that matters, so a single headline reads as statement plus emphasis. The mono is a spec-sheet voice for figures, places and data, never prose.

### Hierarchy
- **Display** (340, fluid 2.75→5.75rem, line-height 0.98, -0.04em): page titles on interior openings (capped at 4.5rem in the page hero). The home tagline uses its own size (up to 5.25rem, capped by viewport height) with line one at 330 and line two at 720.
- **Headline** (360, fluid 2.25→4.25rem, 1.02, -0.038em): section headings. A trailing `<strong>` continuation is set at 720 in the brand spectrum (owner's call, 12 Nov 2026).
- **Title** (640, fluid 1.375→1.875rem, 1.15, -0.02em): card and tile titles, step names.
- **Lede** (400, fluid 1.125→1.375rem, 1.5, ink-2, max 46ch; 60ch on openings): the sentence under a heading.
- **Body** (400, 1.0625rem, 1.6, ink-2, max 66ch, stylistic set ss01): running copy.
- **Small** (400, 0.9375rem): card body, figure labels, notes.
- **Label / Spec** (JetBrains Mono 500, 0.75rem, 0.08em, uppercase, ink-3): segment and place lines ("HIGHER ED · ALVIN, TX"), figure captions, footer column titles, plan labels in the ecosystem drawing. Figures use tabular lining numerals.

### Named Rules
**The Statement and Emphasis Rule.** Headlines are one sentence in two weights: the plain part light (330–360), the continuation bold (720) in the brand spectrum. Do not add a second typeface or any other colour for emphasis.

**The Spec Voice Rule.** Mono is only for specs, figures, places and data labels. It never sits above a heading as an eyebrow or kicker; the heading carries the section on its own.

## Layout

Content sits in a centred column of 1280px max with a fluid gutter (1rem→2.5rem); a 760px narrow column serves long-form text. Sections are separated by a fluid vertical rhythm (5.5rem→10rem); consecutive sections share one gap rather than doubling it, and a `tight` variant uses 60% of it.

Section heads come in three layouts: split (heading left, lede right, bottom-aligned, collapsing below 960px), centred stack, and left stack. Content grids favour asymmetric two-column splits (1.35fr/1fr work grid with a lead tile spanning two rows; 1fr/1.05fr copy and collage; 0.9fr/1.1fr process with a sticky head) over rows of identical cards. The solutions section shows one vertical in focus at a time (see Verticals Focus).

The home hero is a full-viewport stage inset by 0.75rem (0.5rem on phones) with its content aligned to the page grid. Breakpoints in use: 1100px (hero caption compacts), 1080px (nav collapses to a sheet), 960px (two-column grids stack), 860px (hero restacks, work grid to one column), 760px (figures to two columns, mobile CTA bar appears), 560px (phone layouts: hero lede moves below the stage, form to one column), 380px.

Every section ends on its next step: a primary action, a link with an arrow, or the form.

## Elevation & Depth

Depth is photographic, not material: objects sit on a lit sweep and cast a long soft floor shadow, while floating controls get a short diffuse lift. Glass layers add depth only over imagery. In dark theme shadows deepen to near-black and the object shadow gains a faint rose under-glow. Client-coloured glows (`color-mix` of the client's first colour) replace the neutral object shadow under work tiles, case-study plates and the hero stage.

### Shadow Vocabulary
- **Object** (`box-shadow: 0 50px 60px -30px rgba(14,16,22,.30), 0 18px 24px -18px rgba(14,16,22,.25)`; dark: `0 50px 70px -30px rgba(0,0,0,.8), 0 0 120px -40px rgba(226,56,105,.18)`): photo plates and renders sitting on the sweep.
- **Float** (`box-shadow: 0 12px 30px -12px rgba(14,16,22,.22), 0 2px 6px -2px rgba(14,16,22,.10)`; dark: `0 14px 34px -12px rgba(0,0,0,.65), 0 2px 6px -2px rgba(0,0,0,.5)`): primary buttons, glass labels, dropdowns, the mobile CTA bar, segmented-control thumbs, expanded rows.
- **Client glow** (`0 40px 60px -34px color-mix(in srgb, var(--ca) 70%, transparent)` plus Float): work tiles and case-study plates; rises on hover.
- **Cut-out drop** (`filter: drop-shadow(0 40px 34px rgba(14,16,22,.22))`): transparent renders placed directly on the sweep.

### Named Rules
**The Glass Over Objects Rule.** Frosted glass (blur 12–24px, saturate 1.4–1.6) is used only for things that float over a photo or object: nav, dropdowns, hero caption and dock, spec callouts, the mobile CTA bar, the league card. Content cards on the sweep are solid or borderless.

**The Floor Shadow Rule.** Shadows fall long and below (negative spread, large y offset) like a product on a studio floor. No hard offset shadows, no even all-round halos.

## Shapes

Soft, product-like geometry. Every control is a full pill (999px): buttons, nav bar, nav links, tags, chips, captions on narrow screens. Photo plates and renders use a 22px radius; the hero stage 28px; large frames (ecosystem frame, result cards) 28–32px; glass panels 20–26px; nested pieces inside a glass container step down to 16px; fields 14px. Hairline 1px borders define structure; heavier rules are not used. Case-study and work plates carry a 6px top stripe in the client's two colours as their only coloured edge.

## Components

### Buttons
Tactile, quiet at rest, the spectrum appears only on intent.
- **Shape:** full pill (999px), 3.25rem tall (2.625rem small), 1.5rem horizontal padding, weight 620.
- **Primary:** ink fill with on-ink text and the Float shadow; usually followed by a right arrow icon.
- **Hover / Focus:** the spectrum halo fades in 2px outside the pill (0.35s, ease-out), the arrow nudges 3px right, press scales to 0.98. Focus also shows a 2px accent outline offset 3px.
- **Ghost:** glass fill, line-2 border, 12px backdrop blur; hover brightens to glass-hi with an ink-3 border. On phones inside the hero it becomes an underlined text link.
- **On the stage:** the primary inverts to showcase-ink on ink; the ghost becomes 10% white with a 36% white border.
- **Text link:** accent colour, weight 600, arrow that nudges on hover, underline on hover.

### Chips and Tags
- **Tags:** surface fill, line border, ink-2 text at 0.8125rem/560, pill shape; used for solution capabilities.
- **Status chip:** mono 0.75rem uppercase in a line-2 pill with a coloured dot (green for "Received"); work tiles use a glass label with a pulsing client-colour dot for "In progress".

### Cards / Containers
- **Corner Style:** 22px for photo plates, 24px for the assessment card, 28px for glass feature cards.
- **Background:** photo plates fill with surface-2 (or the client's deep colour) behind the image; the assessment card is solid surface.
- **Shadow Strategy:** Object for plates on the sweep, Float for raised cards, Client glow for client builds.
- **Border:** 1px line where a card needs an edge; none on photo plates.
- **Internal Padding:** 1.5rem on small cards, fluid 1.5→2.5rem on glass feature cards.

### Inputs / Fields
- **Style:** 3rem min height, 14px radius, sweep-ground fill, 1px line-2 border, 0.875rem/600 labels above.
- **Focus:** border turns accent with a 4px accent ring at 18% and the fill lifts to surface.
- **Error / Disabled:** invalid fields take a red border after interaction; the form error is a tinted red panel with an email fallback link. Busy submit drops to 70% opacity.

### Navigation
- **Style:** a floating pill bar (3.75rem tall, max 1200px) fixed 0.875rem from the top, glass fill with 22px blur and a fine inner top highlight. Bracketed wordmark lockup left, links centred (0.9375rem/560), theme toggle and a small primary action right.
- **States:** links get a line-tinted pill on hover and for the current page; dropdowns are glass-hi panels (20px radius) with a label and note per item, opening on hover-intent or click, closing on Escape.
- **Over dark stages:** when the bar sits over any element marked `data-nav-tone="dark"` (the home hero) it re-scopes its tokens to dark glass with light type, regardless of theme.
- **Mobile:** below 1080px links collapse into a glass sheet (26px radius) with grouped links and a full-width primary action; below 480px the bar's action hides.

### Hero Showcase (signature)
A full-screen dark stage, inset with 28px corners, cycling three finished labs, two shots each, with a slow 1.02→1.1 push-in and 1.3s cross-fades. A left scrim and a radial shade behind the words keep the tagline at AA over any photo. Lower right, a frosted caption carries the client logo, one line and "See the build". Along the bottom, a frosted dock holds one tab per lab whose 3px progress bar fills in that client's two colours, plus a pause/play control. The stage's under-glow and scrim tint follow the client on screen. Keyboard arrows move between tabs; hover or focus on the controls holds the rotation; reduced motion starts paused. Each lab can take a silent `loop` video and a `film` case-study player (data in `src/lib/showcase.ts`).

### Logo Marquee
Client and partner logos scroll continuously in one neutral tone (greyscale at 55% in light; inverted pale tone in dark) and show their true colours only on the hovered logo. The loop never pauses on hover. Edges fade with a mask; reduced motion gets a static, wrapped row.

### Frosted Spec Label
A glass pill with a spectrum dot, 0.875rem/600, used to call out parts of a photo or render ("LED walls · AV · Stations") and as status badges.

### Ecosystem Tour (signature)
One rounded frame on a sweep with a segmented glass control (Space, Infrastructure, Program) and a side panel of expandable rows. Space shows the eye-level room with hotspot pins; Infrastructure switches to the overhead render (iso-dark.png) and draws cable runs from the network closet to each system, with pins on the real displays, station pods and the two shoutcast rooms on the right, plus a ceiling speaker (sound cone onto its zone) and a ceiling camera (field of view over the station pods) drawn at ceiling height; Program pulls the camera back so the room becomes one site among many on a network.

### Verticals Focus

Education, Community and Commercial as one list beside one large photo. The chosen vertical is full ink with a spectrum rule beneath and opens to its audience line, description, tags and link; the others wait in grey with a rotated arrow. The photo of the chosen vertical fills a 32px-radius stage with its audience chip and an Explore pill. Hovering a name with a mouse, tapping it, or pressing Enter on it brings it forward; without JavaScript the first stays open and every name links to its page. Below 860px the photo leads and the list follows (`src/components/Verticals.astro`).

### Figures
Proof figures are a four-column spec sheet: hairline rule above, light 380-weight numerals with tabular figures, small ink-2 labels, columns divided by hairlines. Every figure on the site counts up from zero the first time it scrolls into view, with its + or % set bold in the spectrum (`src/components/CountUp.astro`, which reads a value like "$5.5M+" or "50%+" as written; text values such as "24/7" stay as they are).

### Team Portraits
The character art shows first. On hover, or with the frosted toggle on touch screens, it glides until its face sits exactly on the photo's face (480ms), then dissolves (from 460ms) to the photo already lined up beneath; leaving fades it back in, then glides it home after 220ms. Per-person framing lives in Team.json (`frame`: photo, art at rest, art lined up).

### Case Study Gallery
Each finished case study ends with 10 to 15 photos from the build (none repeating the hero or side image) in a snapping strip. Drag it sideways with a mouse, swipe on touch, or use the arrows and arrow keys. Selecting a photo opens a full-screen viewer on a dark blurred backdrop with a counter, previous, next and close; arrow keys and swipes step through, Escape or a click outside closes and leaves the strip on that photo.

### Call-to-action labels (current state)
The `/Contact` action currently carries mixed labels pending a copy decision by the owner: "Start Planning" (nav bar and mobile sheet), "Book a free consultation" (hero and process section), "Start your project" (Ecosystem), "Book a call" (phone CTA bar), "Request my consultation" (form submit), plus "Ask for a reference" in the work section. Record any new `/Contact` action against this list until one label is chosen; this section records the shipped state, not a rule.

## Do's and Don'ts

### Do:
- **Do** open pages with a real finished build on the sweep or stage; renders are for the ecosystem drawing and plans.
- **Do** keep every photo unique on a page; register files that show the same shot in `scripts/image-groups.mjs` and run `node scripts/check-images.mjs`.
- **Do** set headings as one sentence in two weights (light plain part, 720 continuation).
- **Do** let a client's two colours replace the spectrum wherever their build is shown, via `themeVars` on case studies and `--ca`/`--cb`/`--cd` on tiles.
- **Do** use the mono spec voice for segment, place and figure lines.
- **Do** use glass only over photos or objects, and re-scope the nav to dark glass over `data-nav-tone="dark"` areas.
- **Do** keep logo marquees single-tone, colour on hover, and never paused; keep the hero showcase pausable.
- **Do** honour reduced motion: content is visible by default, reveals and push-ins are opt-in, the showcase starts paused.
- **Do** persist the theme choice under `localStorage` key `tg-theme-v2` with light as the default.

### Don't:
- **Don't** spread the spectrum beyond the tagline's second line, the primary hover halo, spec dots and pins, or use it as a section fill.
- **Don't** use raw spectrum stops as text colour; use `accent` / `accent-dark`.
- **Don't** put bracketed or mono labels above headings as eyebrows or kickers; carry the `[ BRACKETED ]` device in the wordmark, spec labels, captions and data.
- **Don't** build a dark neon gamer hero over grids of identical cards.
- **Don't** add a second display typeface or decorative fonts.
- **Don't** use hard offset shadows or square corners on controls.
- **Don't** pause a logo marquee on hover.
