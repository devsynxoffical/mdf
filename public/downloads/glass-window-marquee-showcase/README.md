# 3D Glass Window Marquee Component
### Live Client Recordings & Proof Continuous Loop

A modern, high-converting 3D macOS-styled glass window cards infinite marquee. Built for dark luxury aesthetics with smooth infinite translation, pause on hover, interactive 3D tilts, traffic light controls, pulsing status badges, and glare reflections.

---

## 📦 What's Inside This Package

```
glass-window-marquee-showcase/
├── images/                         # All 9 live client proof recordings (WebP & JPG)
│   ├── analytics.webp (and .jpg)   # ROAS Verified
│   ├── anastasia.webp (and .jpg)   # Funnel Build
│   ├── ann.webp (and .jpg)         # Strategy Session
│   ├── edgar_jeermei.webp (.jpg)   # Deep-Dive
│   ├── george.webp (and .jpg)      # Scaling Audit
│   ├── guilia.webp (and .jpg)      # Client Onboarding
│   ├── ig_shot.webp (and .jpg)     # Traffic Scale
│   ├── owne.webp (and .jpg)        # Growth Workshop
│   └── sina.webp (and .jpg)        # Pipeline Review
├── react-nextjs/
│   ├── GlassWindowMarquee.tsx     # Self-contained React / Next.js component
│   └── marquee.css                # Required CSS keyframes & hover pause
├── vanilla-html/
│   ├── index.html                 # 100% Standalone HTML file (ready to open)
│   └── style.css                  # Pure CSS with full glassmorphism & responsiveness
└── README.md                      # Integration guide (this file)
```

---

## 🚀 Integration Guide

### 1. React / Next.js (Tailwind CSS)

1. Copy the `images/` folder into your Next.js `public/images/` directory.
2. Copy `react-nextjs/GlassWindowMarquee.tsx` into your `components/` directory.
3. Add the keyframes from `react-nextjs/marquee.css` to your `globals.css`:
   ```css
   @keyframes marquee-left {
     from { transform: translateX(0); }
     to { transform: translateX(-50%); }
   }
   .marquee-track-left {
     animation: marquee-left var(--marquee-duration, 48s) linear infinite;
     will-change: transform;
   }
   .marquee-row:hover .marquee-track-left {
     animation-play-state: paused;
   }
   ```
4. Import and place the component anywhere on your page:
   ```tsx
   import GlassWindowMarquee from "@/components/GlassWindowMarquee";

   export default function Page() {
     return (
       <main>
         {/* Other sections */}
         <GlassWindowMarquee />
       </main>
     );
   }
   ```

---

### 2. Vanilla HTML / Webflow / WordPress / Shopify

1. Copy the `style.css` code into your stylesheet or `<style>` tag.
2. Copy the `<section class="marquee-section">` block from `vanilla-html/index.html` into your page.
3. Update the `img src` paths to point to where your images are hosted.
4. **No JavaScript required!** The entire infinite scrolling effect, pause-on-hover, and 3D tilts are powered by pure hardware-accelerated CSS.

---

## 🎨 Key Customization Options

* **Change Speed**: Modify `--marquee-speed: 48s;` (smaller = faster, e.g. `30s`; larger = slower, e.g. `60s`).
* **Reverse Direction**: In `@keyframes marquee-scroll`, invert `translateX(-50%)` to `translateX(50%)`.
* **Add Your Own Images**: Simply add new cards inside the track. Make sure to mirror them in Group 2 so the loop stays perfectly seamless!
