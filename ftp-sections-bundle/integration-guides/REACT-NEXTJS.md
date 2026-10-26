# ⚛️ Integrating into React & Next.js Projects

This guide details how to integrate the components into Next.js (App Router or Pages Router), Vite + React, Remix, or Astro.

---

## 1. Copy Files into your React / Next.js Project

Copy the files from `react-nextjs/` into your project directory:
```text
your-nextjs-project/
├── public/
│   ├── img/
│   │   ├── hero/      <-- From assets/img/hero/
│   │   ├── funnels/   <-- From assets/img/funnels/
│   │   ├── team/      <-- From assets/img/team/
│   │   ├── tools/     <-- From assets/img/tools/
│   │   ├── sw/        <-- From assets/img/sw/
│   │   ├── cs/        <-- From assets/img/cs/
│   │   ├── cs2/       <-- From assets/img/cs2/
│   │   └── lg/        <-- From assets/img/lg/
│   └── vid/
│       ├── cs2/       <-- From assets/vid/cs2/
│       └── lg/        <-- From assets/vid/lg/
├── src/ (or root)
│   ├── components/
│   │   ├── Loader.tsx
│   │   ├── Hero.tsx
│   │   ├── PortfolioFoldfolio.tsx
│   │   ├── FeaturedCases.tsx
│   │   ├── CaseStudiesHub.tsx
│   │   ├── CaseGrid.tsx
│   │   └── CaseDetail.tsx
│   ├── data/
│   │   ├── siteContent.ts
│   │   ├── cases.ts
│   │   └── leads.ts
│   └── styles/
│       └── sections.css
```

---

## 2. Global Styles & Fonts

In your root layout (`app/layout.tsx` or `pages/_app.tsx`):
```tsx
import "./styles/sections.css";
// Or if you use Google Fonts via next/font:
import { Archivo, Inter, JetBrains_Mono } from "next/font/google";

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--disp",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--mono",
  display: "swap",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${archivo.variable} ${inter.variable} ${jetbrainsMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
```

---

## 3. Using the Components in your Pages

### A. Homepage (`app/page.tsx`):
```tsx
import Loader from "@/components/Loader";
import Hero from "@/components/Hero";
import PortfolioFoldfolio from "@/components/PortfolioFoldfolio";
import FeaturedCases from "@/components/FeaturedCases";
import CaseStudiesHub from "@/components/CaseStudiesHub";

export default function HomePage() {
  return (
    <>
      {/* Intro Loader with Pixel Dissolve (auto unmounts) */}
      <Loader />

      {/* Opening Hero Section */}
      <Hero />

      {/* 3D Foldable iPhone Duo Portfolio */}
      <PortfolioFoldfolio />

      {/* Featured Selected Work with Video Previews */}
      <FeaturedCases />

      {/* Case Studies Split Hub */}
      <CaseStudiesHub />
    </>
  );
}
```

### B. Lead Gen Case Studies Page (`app/case-leadgen/page.tsx`):
```tsx
import CaseGrid from "@/components/CaseGrid";
import { LEADS } from "@/data/leads";

export default function CaseLeadgenPage() {
  return (
    <CaseGrid
      type="lg"
      items={LEADS}
      title="Lead gen"
      tagline="QualifiedLeadsX™"
      description="125 QualifiedLeadsX™ campaigns across roofing, legal, mortgage, MedSpa, coaching, low-ticket offers and more."
    />
  );
}
```

### C. eCommerce Case Studies Page (`app/case-ecom/page.tsx`):
```tsx
import CaseGrid from "@/components/CaseGrid";
import { CASES } from "@/data/cases";

export default function CaseEcomPage() {
  return (
    <CaseGrid
      type="ec"
      items={CASES}
      title="Ecom"
      tagline="Brand Scaling Hacks"
      description="126 direct-response eCommerce and DTC brands scaled with Meta ads, creative engines and funnels."
    />
  );
}
```

### D. Single Case Detail View (`app/case/page.tsx`):
```tsx
"use client";

import { useSearchParams } from "next/navigation";
import CaseDetail from "@/components/CaseDetail";
import { CASES } from "@/data/cases";
import { LEADS } from "@/data/leads";

export default function CasePage() {
  const searchParams = useSearchParams();
  const set = searchParams.get("set") === "ec" ? "ec" : "lg";
  const id = searchParams.get("id");

  const dataset = set === "ec" ? CASES : LEADS;
  const current = dataset.find((item) => item.id === id) || dataset[0];

  return <CaseDetail current={current} set={set} />;
}
```

---

## 4. Smooth Scrolling (Optional, Recommended)
If you want ultra-fluid momentum scrolling, you can install Lenis:
```bash
npm install lenis
```
And wrap your app or initialize `new Lenis()` in an effect. The components in this bundle are 100% compatible with both Lenis and native browser scrolling.
