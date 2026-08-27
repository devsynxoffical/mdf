# Million Dollar Funnel™ — 3D Website

A single-page marketing site where **the particles are a living interface and
scrolling is the journey through the funnel**. The hero opens on a breathing
mint-and-violet particle orb that answers the pointer; on scroll it blows open
into a spiral galaxy, then gathers into a wireframe funnel. The camera descends
the funnel, most particles get filtered out through the lattice, and the 6%
that survive crystallise into a solid mint mass beneath the spout — booked
revenue.

**Design language** (GetLayers/Vesper-inspired): deep ink base, mint `#3FE0B0`
(money, conversion, CTAs) + violet `#8E7BFF` (live/system states) accents,
aurora gradient backdrops, light-weight General Sans display type, `[ BRACKETED ]`
JetBrains Mono system labels, instrument-strip stats with tick marks, and
sparkle-square companion buttons on primary CTAs. Legacy Tailwind token names
(`brass`, `signal`) are kept but now map to mint and violet.

## Stack

- Next.js 14 (App Router) + TypeScript
- React Three Fiber + three.js — one shared `<Canvas>` for the whole page
- GSAP ScrollTrigger — scroll drives the camera and pinned sections
- Lenis — smooth scroll (`lerp: 0.08`)
- Tailwind CSS (design tokens in `tailwind.config.ts`)
- Framer Motion — 2D UI only (mobile sheet, gallery overlay)

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Architecture

- `components/providers/ScrollProvider.tsx` — Lenis + ScrollTrigger, exposes
  scroll progress (0→1), the active pillar stage, and an event sink so 2D
  sections can fire 3D moments (lattice pulse, ring pulses). One source of truth.
- `components/canvas/FunnelCanvas.tsx` — the single fixed canvas
  (`dpr [1, 1.75]`, antialias off, `powerPreference: high-performance`).
  Fades to 0 before the footer and stops its render loop when invisible.
- `components/canvas/FunnelScene.tsx` — lattice (24 rings + 48 ribs merged into
  one mesh / one draw call), 12,000 instanced particles (4,000 under 1100px),
  six stage-marker rings bound to the pillar section, spout mass, camera rig.
  All per-frame math uses preallocated scratch objects — zero allocation in the
  frame loop.
- `components/canvas/StaticFunnelPoster.tsx` — composed static frame (pure SVG,
  no WebGL) served to mobile (≤768px), low-memory devices
  (`deviceMemory < 4`), and `prefers-reduced-motion`. **No canvas ever mounts
  there** — verified: 0 `<canvas>` elements at 390px.
- `components/sections/*` — the fourteen content sections from the build spec.

## Placeholders to swap before launch

- Client logos in `LogoMarquee.tsx` (currently text wordmarks)
- Funnel screenshots in `GalleryCard.tsx` (currently SVG mocks) and the
  niche/ROAS/revenue data in `Gallery.tsx`
- Founder portrait in `Founder.tsx` (currently an SVG placeholder)
- Video testimonial posters + real video embeds (`CaseStudy.tsx`, `Testimonials.tsx`)
- Booking link (`#book` CTAs), contact email, social URLs, legal pages
- **The numbers.** $1.52M, $847,307, 3.32 ROAS, 13,630 sales, $35M ad spend,
  500+ businesses are from the reference content. Substitute your own evidenced
  figures before this goes live — the earnings-claim disclaimer in the footer is
  required either way (Meta ad policy on business-opportunity claims).
