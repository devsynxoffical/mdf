# 📦 Funnels That Print — Modular Sections & Assets Bundle

This bundle contains clean, production-ready exports of the **Opening**, **Funnels Portfolio iPhone Duo Layout**, and **Case Studies (Lead Gen & Ecom)** sections from [Funnels That Print](https://funnelsthatprint.com).

Everything is packaged with:
- **All Media Assets** (videos, screenshots, WEBP mockups, team avatars, SVG icons)
- **Vanilla HTML / CSS / JavaScript** implementations (ready for static websites, Webflow, WordPress, Shopify)
- **React / Next.js (TypeScript)** components (ready to drop into any React or Next.js app)
- **Self-Contained Working Demos** you can double-click and preview immediately
- **Integration Guides** for popular site builders and frameworks

---

## 🚀 Quick Preview (Demos)

Open any of the following HTML files directly in your web browser:
1. **`demo-all.html`** — Complete page featuring all 3 sections seamlessly integrated.
2. **`demo-opening.html`** — Opening Loader, Pixel Dissolve Matrix & Hero Stage.
3. **`demo-portfolio-iphone-duo.html`** — 3D Foldable Dual-Screen iPhone, Slide-to-Talk & in-phone consultation form.
4. **`demo-case-studies.html`** — Case Studies Hub & dynamic Lead Gen (125) / Ecom (126) filterable directories.

---

## 📁 Bundle File Structure

```text
ftp-sections-bundle/
├── README.md                           # Master Documentation & Quick Start
├── demo-all.html                       # All-in-one demo page
├── demo-opening.html                   # Opening section standalone demo
├── demo-portfolio-iphone-duo.html      # iPhone Duo portfolio standalone demo
├── demo-case-studies.html              # Case studies standalone demo
│
├── assets/                             # Complete media files
│   ├── img/
│   │   ├── hero/                       # agent.mp4, agent.webm, agent.webp, bg.mp4, bg.webm
│   │   ├── funnels/                    # f1.webp - f8.webp and thumbnails f1-t.webp - f8-t.webp
│   │   ├── team/                       # gaurav.webp (caller avatar), ali.webp, taqi.webp, etc.
│   │   ├── tools/                      # clickfunnels, highlevel, zapier, openai, twilio
│   │   ├── sw/                         # c1.mp4 - c6.mp4 (selected work preview clips)
│   │   ├── cs/                         # Case breakdown screenshots
│   │   ├── cs2/                        # eCommerce case screenshots (126 files)
│   │   ├── lg/                         # Lead Gen case screenshots (125 files)
│   │   └── x/                          # office photo & icons
│   └── vid/
│       ├── cs2/                        # eCommerce video proofs (.mp4)
│       └── lg/                         # Lead Gen video proofs (.mp4)
│
├── vanilla-html/                       # Pure HTML, CSS & Vanilla JS
│   ├── css/
│   │   ├── styles.css                  # Master CSS with variables, typography & layout
│   │   ├── opening.css                 # Specific styles for Opening (Loader + Hero)
│   │   ├── portfolio-iphone.css        # Specific styles for iPhone Duo Foldfolio
│   │   └── case-studies.css            # Specific styles for Case Studies Hub, Grid & Detail
│   ├── js/
│   │   ├── opening.js                  # Typewriter, loader, pixel dissolve & mouse parallax
│   │   ├── portfolio-iphone.js         # 3D fold math, slide-to-talk, clock & in-phone form
│   │   ├── case-studies.js             # Filter chips, instant search, pagination & rendering
│   │   ├── cases.js                    # 126 verified eCommerce cases dataset
│   │   └── leads.js                    # 125 verified Lead Gen cases dataset
│   ├── opening.html                    # Embed snippet for Opening section
│   ├── portfolio-iphone.html           # Embed snippet for iPhone Duo layout
│   ├── case-studies-hub.html           # Embed snippet for Case Studies Hub
│   ├── case-ecom.html                  # Full standalone eCommerce case studies page
│   ├── case-leadgen.html               # Full standalone Lead Gen case studies page
│   └── case-detail.html                # Full standalone Case Study breakdown page
│
├── react-nextjs/                       # React / Next.js Components (TypeScript)
│   ├── components/
│   │   ├── Loader.tsx                  # Opening intro loader with pixel dissolve matrix
│   │   ├── Hero.tsx                    # Opening Hero section with agent video & live cards
│   │   ├── PortfolioFoldfolio.tsx      # iPhone Duo Dual Screen interactive portfolio
│   │   ├── FeaturedCases.tsx           # Homepage selected work showcase & lightbox
│   │   ├── CaseStudiesHub.tsx          # Case Studies Hub selector component
│   │   ├── CaseGrid.tsx                # Reusable filterable Case Studies grid
│   │   └── CaseDetail.tsx              # Single case study breakdown view
│   ├── data/
│   │   ├── siteContent.ts              # Hero words, loader words, funnels list & featured cases
│   │   ├── cases.ts                    # TypeScript dataset of 126 eCommerce cases
│   │   └── leads.ts                    # TypeScript dataset of 125 Lead Gen cases
│   └── styles/
│       └── sections.css                # React-ready CSS stylesheet
│
└── integration-guides/                 # Step-by-step guides for other platforms
    ├── VANILLA-HTML.md                 # Static sites, PHP, custom CMS
    ├── REACT-NEXTJS.md                 # React, Next.js (App & Pages router), Remix, Vite
    ├── WEBFLOW.md                      # Webflow custom code & asset uploads
    ├── WORDPRESS.md                    # WordPress, Elementor & theme embeds
    └── SHOPIFY.md                      # Shopify Liquid sections & theme integration
```

---

## 🎯 Section Details & Features

### 1. Opening Section (Loader + Pixel Matrix + Hero)
- **Intro Loader**: Smooth percentage counter (`0%` to `100%`) cycling through key offer pillars: *Funnels, AI, Automations, SMS, Emails, Workflows, Landing Pages, GHL, ClickFunnels*.
- **Pixel Dissolve Transition**: Procedurally generates an adaptive grid of colored pixel tiles that dissolve with staggered fade-out timing to unveil the website.
- **Hero Headline Typewriter**: Rotates between `"booked calls."`, `"qualified leads."`, `"applications."`, and `"customers."`. Automatically measures the widest word's width so the layout never jumps or jitters.
- **Word-by-Word Lead Reveal**: Each word is wrapped in an animated span with incremental delays (`--i`).
- **3D Holographic Stage**:
  - Center: Glowing looping video of the AI Agent.
  - Left Card: Real-time "Live Funnel" with animated conversion funnel bars (Ad clicks → Page views → Applications → AI qualified → Booked calls) and simulated live event stream.
  - Right Card: Connected CRM integrations (GoHighLevel, Calendar + reminders).
  - Mouse-Parallax: Interactive 3D tilt tracking user cursor position.

### 2. Funnels Portfolio iPhone Duo Layout
- **3D Foldable Mockup**: Realistic iPhone Duo / foldfolio device with dual glass screens.
  - Left Screen (`.pane.pl`): Displays real full-page funnel screenshot with smooth viewport scrolling and realistic status bar (`09:41`).
  - Right Screen (`.pane.pr`): Displays continuation screenshot with `5G` and battery indicators.
  - Front Cover (`.cover`): Rotates -180° in 3D perspective space as you scroll through `#portwrap`.
- **Live Digital Clock**: Real-time accurate clock updating automatically.
- **Interactive "Slide to Talk"**:
  - Touch & mouse draggable handle with realistic spring resistance.
  - Dragging past 60% snaps into an active call state with founder Gaurav Kapoor!
- **In-Phone Consultation Form**:
  - Slides up inside the phone screen with connected timer (`00:14`) and audio waveform visualizer.
  - Checkbox multi-select for needs (*AC Funnel, VSL Funnel, Landing page, Automation, AI calling*).
  - Validated fields (Name, Email, Website, Monthly Ad Spend dropdown, message).
  - "Send to Gaurav ↗" submission triggers an automated mailto or webhook.
- **Funnel Switcher Tabs**:
  - Switch between 6 live funnels (*Mortgage AI System, Rowan Security, Inventiv, Pluto CRM, Bio-Optimization, Growth Foundry*).
  - Updates both phone screens instantaneously.

### 3. Case Studies (Both Lead Gen and Ecom)
- **Case Studies Hub**: Split cards with realistic fanned out screenshot stacks for Lead Generation (QualifiedLeadsX™) and eCommerce (Brand Scaling Hacks).
- **Lead Gen Directory (125 Campaigns)**:
  - Niche filters: *All, Video proofs, Breakdowns, Roofing, Legal/MVA, Mortgage, MedSpa, Coaching, Low-ticket, Real Estate, Solar, HVAC*, and more.
  - Instant live search matching keywords, niches, and revenue.
  - Card displays with verified leads count, cost per lead (CPL), and campaign title.
- **eCommerce Directory (126 Brands)**:
  - Verified revenue tags, ROAS multiples (*e.g. 19x ROAS, $388K revenue*).
  - Proof type badges (*Video proof* vs *Breakdown*).
- **Case Breakdown Detail Page (`case-detail.html` / `CaseDetail.tsx`)**:
  - Supports both `set=ec` and `set=lg` via URL parameter or React props.
  - High-res breakdown image viewer or embedded HTML5 video player with controls.
  - 4-metric grid (Headline result, ROAS / Proof type, Niche, System).
  - Bulleted key deliverables and expandable narrative breakdown story.
  - Direct Instagram post verification links.

---

## 🛠️ Integration Summary

| Platform | Recommended Implementation | Detailed Guide |
| :--- | :--- | :--- |
| **Vanilla HTML / Static Site** | Include `vanilla-html/css/styles.css`, copy `assets/`, paste snippet | [VANILLA-HTML.md](file:///Users/hassan/Downloads/ftp/ftp-sections-bundle/integration-guides/VANILLA-HTML.md) |
| **React / Next.js** | Import components from `react-nextjs/components/`, import CSS | [REACT-NEXTJS.md](file:///Users/hassan/Downloads/ftp/ftp-sections-bundle/integration-guides/REACT-NEXTJS.md) |
| **Webflow** | Custom Code Embed block + upload media to Webflow Asset Manager | [WEBFLOW.md](file:///Users/hassan/Downloads/ftp/ftp-sections-bundle/integration-guides/WEBFLOW.md) |
| **WordPress / Elementor** | Use HTML Code Element + upload assets to Media Library | [WORDPRESS.md](file:///Users/hassan/Downloads/ftp/ftp-sections-bundle/integration-guides/WORDPRESS.md) |
| **Shopify** | Create custom `.liquid` section and upload assets to Theme Assets | [SHOPIFY.md](file:///Users/hassan/Downloads/ftp/ftp-sections-bundle/integration-guides/SHOPIFY.md) |

---

## 📄 License & Attribution
Extracted from Funnels That Print. Cleaned and structured for modular export and multi-platform integration.
