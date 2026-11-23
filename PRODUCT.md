# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

**Primary: K-12 district leaders.** Superintendents, CTE/STEM directors and district IT directors who approve, fund and procure an esports or STEM lab. Many know little about esports or gaming. They are judging whether TANCHES.GG is a safe, accountable vendor: procurement fit, IT and security standards, support after launch, and outcomes for students.

**Secondary:** students, esports coaches and teachers who push for a program and want it to feel real and exciting; higher-ed (colleges, universities), community and government (cities, nonprofits, community centers), and commercial buyers (LAN centers, hotels, hospitals, casinos, cruise lines, apartment complexes).

## Product Purpose

TANCHES.GG designs, builds and supports esports environments for schools, colleges, communities and businesses: facility design, electrical and structured cabling, network, hardware, AV, cybersecurity, curriculum, league play and managed support. It is a full turn-key provider; competitors such as Esports Supply and Stay Plugged In cover only parts of this. The site exists to earn trust and start projects. Success is a booked no-cost consultation or a completed Facility Readiness Assessment.

## Positioning

An enterprise IT and cybersecurity company that builds esports rooms "like a corporate network: secure, segmented, and supportable", then builds the program that keeps the room full. One team is accountable from first conversation to opening day and every season after. TANCHES.GG is the esports vertical of TanChes Global Management, Inc., which has 28 years of enterprise IT experience.

The site must read as high-end and corporate first, with unmistakable esports energy close behind.

## Operating Context

- Public buyers purchase through active cooperative contracts (DIR, OMNIA Partners, NCPA, GSA; E-Rate SPIN 143052684), so they can skip a standalone RFP or bid. Grant funding research is part of the service.
- Six-step process: Discover, Plan, Design (3D renders for stakeholder review), Approve, Build & Launch, Scale.
- Every build is themed to the client's brand: school colours, logo and mascot built into the room. Case-study pages carry each client's colours and mascot inside the site's own design language (theme data previously lived in `tanches.gg-site/CaseStudy.dc.html` → `PROJECTS`).
- Based in Houston, TX: 10804 Roark Road, Houston, TX 77099 · (281) 826-2437 · contact@tanches.gg.

## Capabilities and Constraints

- v3 is a from-scratch rebuild in `tanches.gg-v3/`. The previous build (`tanches.gg-site/`) is reference for content, copy, SEO metadata, assets and the page list, not for its look or its custom `<x-dc>` component runtime.
- Built with Astro (static output), deployed to Netlify. The whole in-scope site is delivered in one pass. Clean URLs, redirects from old paths, `sitemap.xml` and per-page SEO and structured data must keep working.
- Pages in scope: Home, About, Team, Education, Community, Commercial, Technology, Procurement, Projects plus every case study, Contact, Assessment, League, Brand Center. Out of scope: Program Store, Team Hub, internal pages.
- Light and dark themes with a visible toggle are required. Light is the default for first-time visitors; the toggle choice is remembered.
- Translucent (frosted) navigation bar is a stated preference.
- Keep existing copy, content and SEO metadata unless the user approves changes.

## Brand Commitments

- Name: TANCHES.GG, written as a bracketed wordmark `[TANCHES.GG]`; lion icon mark. Brand kit in `tanches.gg-site/assets/brand-kit/` and `assets/tanches-gg-*`.
- Brand spectrum, six stops: Flame `#F53F1D` (start) · Ember `#EE3C37` · Rose `#E23869` (signature) · Magenta `#DA358B` · Fuchsia `#D031B2` · Violet `#C92FD1` (end). Gradient: `linear-gradient(105deg, #F53F1D → #C92FD1)`. Used deliberately, not everywhere, so client colours can carry case studies.
- Hero tagline is fixed: "Not just equipment. We build esports ecosystems."
- The homepage hero showcases three completed labs (real photos, cycling), not a render. It is planned to become a video showcase as case-study films are produced; lab data and video slots live in `src/lib/showcase.ts`.
- A photo never appears twice on one page. Logo marquees are a single tone, show colour on hover, and never pause.
- Finished labs sell better than renders or stock photos: page openings use real builds.
- Voice: plain, confident and accountable ("Skip the bid. Start the build.", "You have questions. We have time.").
- `[ BRACKETED ]` monospace section labels are a recurring brand device.
- Keep the "Esports is an Ecosystem" interactive and its three audiences: what students see and care about (the space), what leadership and IT care about (the infrastructure), and how the room is used and kept full after launch (the program). Its layout may be redesigned.

## Evidence on Hand

- Homepage figures (November 2026): 28+ years of IT expertise, $5.5M+ in esports infrastructure deployed, 750+ students and gamers reached, 100% referral-driven business.
- Testimonials: Colt Berry, Esports Head Coach, Stafford MSD; Huff Mann, Director, Distance Education, Alvin College; James Felder, Director of Esports, City of Muskogee. The Longview ISD quote is a placeholder and must not be presented as real.
- Case studies: Stafford MSD (+65% student engagement), Alvin College, City of Muskogee (shipped within a week), TexSEF's Swampy Conquest, Longview ISD (in progress), Fort Bend ISD, Navarro College, Pleasant Grove ISD, SAMSAT, University of Houston, UH Sugar Land, University of St. Thomas.
- Photos and renders: `tanches.gg-site/assets/` (per-client galleries, `opt/` hero shots, room renders `iso-plan.png`, `iso-dark.png`, `labtour-*.png`); client logos in `assets/clients/`; partner logos (Dell/Alienware, MSI, Samsung, Lenovo, Logitech, Extron and others); procurement logos.
- Do not invent stats, quotes, clients or partner claims.

## Product Principles

1. Trust first, excitement close behind. A superintendent with no esports background should feel this is a serious, accountable vendor within seconds; students should still feel the energy.
2. Show the room, not the hype. Real photos of finished builds carry the story.
3. The client's brand is the hero. Each school's colours and mascot prove the core service: building around their identity.
4. Make procurement feel easy. Contracts, funding, process and support are answered up front, in plain language.
5. One partner, every season. Emphasize continuity: support, curriculum and league play after launch.

## Accessibility & Inclusion

WCAG 2.1 AA is a hard requirement (public schools and cities, ADA Title II): AA contrast in both themes, full keyboard operation with visible focus, screen-reader-friendly structure and alternative text, and reduced-motion support.
