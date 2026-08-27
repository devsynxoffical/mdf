"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import RiseIn from "@/components/ui/RiseIn";
import VideoThumb from "@/components/ui/VideoThumb";
import VideoModal from "@/components/ui/VideoModal";
import { useScrollState } from "@/components/providers/ScrollProvider";
import {
  GALLERY_FEATURE_IDS,
  VIDEOS,
  categoryLabel,
  videosByCategory,
  type PortfolioVideo,
} from "@/lib/videos";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const ITEMS: PortfolioVideo[] = GALLERY_FEATURE_IDS.map(
  (id) => VIDEOS.find((v) => v.id === id)!
);

// deterministic per-card tilt (±3°) so the row feels handled, not machine-placed
const TILTS = [-2.4, 1.8, -1.2, 2.8, -3, 1.4, -1.9, 2.2, -2.7];

export default function Gallery() {
  const { isMobile, reducedMotion, ready } = useScrollState();
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const progress = useRef(0);
  const [centered, setCentered] = useState(0);
  const [openVideo, setOpenVideo] = useState<PortfolioVideo | null>(null);

  const useStatic = isMobile || reducedMotion;

  const layout = useCallback(() => {
    const c = progress.current * (ITEMS.length - 1);
    const spacing = Math.min(360, window.innerWidth * 0.24);
    for (let i = 0; i < ITEMS.length; i++) {
      const el = cardRefs.current[i];
      if (!el) continue;
      const off = i - c;
      const abs = Math.abs(off);
      const scale = abs < 0.5 ? 1.12 - abs * 0.24 : abs < 1.5 ? 1.0 - (abs - 1) * 0.1 : 0.9;
      const x = off * spacing;
      const z = -Math.pow(abs, 1.6) * 60;
      const rotY = -off * 5 + TILTS[i];
      el.style.transform = `translate(-50%, -50%) translate3d(${x}px, 0, ${z}px) rotateY(${rotY}deg) scale(${scale})`;
      el.style.zIndex = String(100 - Math.round(abs * 10));
      const tint = el.querySelector<HTMLElement>("[data-tint]");
      if (tint) tint.style.opacity = String(Math.min(0.55, Math.max(0, abs - 0.6) * 0.4));
    }
    const idx = Math.round(c);
    setCentered((prev) => (prev === idx ? prev : idx));
  }, []);

  useEffect(() => {
    if (useStatic || !ready) return;
    const section = sectionRef.current;
    if (!section) return;
    const st = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "bottom bottom",
      scrub: 1,
      onUpdate: (self) => {
        progress.current = self.progress;
        layout();
      },
    });
    layout();
    return () => st.kill();
  }, [useStatic, ready, layout]);

  // Arrow keys move between creatives by scrolling the pinned section.
  useEffect(() => {
    if (useStatic) return;
    const onKey = (e: KeyboardEvent) => {
      if (openVideo) return;
      const section = sectionRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      if (rect.top > 0 || rect.bottom < window.innerHeight) return;
      if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
        e.preventDefault();
        const step = (section.offsetHeight - window.innerHeight) / (ITEMS.length - 1);
        window.scrollBy({ top: e.key === "ArrowRight" ? step : -step, behavior: "smooth" });
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [useStatic, openVideo]);

  const intro = (
    <div className="mx-auto max-w-[1200px] px-6 md:px-12">
      <RiseIn>
        <p className="bracket-label">Proven Across Niches</p>
      </RiseIn>
      <RiseIn delay={80}>
        <h2 className="mt-5 max-w-[24ch] font-display text-[clamp(30px,3.6vw,48px)] font-light tracking-display text-bone">
          If it only works in one niche, it doesn&apos;t work.
        </h2>
      </RiseIn>
      <RiseIn delay={160}>
        <p className="mt-5 max-w-[56ch] font-body text-[18px] leading-[1.6] text-mute">
          Real ad creatives from the system, running right now across{" "}
          {new Set(VIDEOS.map((v) => v.category)).size} industries. Click one to
          watch it.
        </p>
      </RiseIn>
    </div>
  );

  const portfolioLink = (
    <div className="mt-8 text-center">
      <a
        href="/portfolio"
        className="group relative inline-block font-body text-s16 font-medium text-brass"
      >
        View the full portfolio — {VIDEOS.length} creatives →
        <span
          aria-hidden
          className="absolute -bottom-0.5 left-0 h-px w-0 bg-brass transition-[width] duration-[250ms] group-hover:w-full"
        />
      </a>
    </div>
  );

  /* ---------------- mobile / reduced-motion: snap carousel ------------- */
  if (useStatic) {
    return (
      <section className="py-32">
        {intro}
        <div
          className="mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-4"
          onScroll={(e) => {
            const el = e.currentTarget;
            const idx = Math.round(
              (el.scrollLeft / (el.scrollWidth - el.clientWidth)) * (ITEMS.length - 1)
            );
            setCentered(idx);
          }}
        >
          {ITEMS.map((item, i) => (
            <button
              key={item.id}
              onClick={() => setOpenVideo(item)}
              aria-label={`Play ${item.title}`}
              className="group relative w-[70vw] max-w-[300px] shrink-0 snap-center overflow-hidden rounded-xl border border-bone/[0.08]"
              style={{ aspectRatio: "3/4" }}
            >
              <VideoThumb video={item} seed={i} playSize={44} />
            </button>
          ))}
        </div>
        <div className="mt-4 flex justify-center gap-2" aria-hidden>
          {ITEMS.map((_, i) => (
            <span
              key={i}
              className={`h-1.5 w-1.5 rounded-full ${i === centered ? "bg-brass" : "bg-mute/50"}`}
            />
          ))}
        </div>
        <Readout item={ITEMS[centered]} />
        {portfolioLink}
        <VideoModal video={openVideo} onClose={() => setOpenVideo(null)} />
      </section>
    );
  }

  /* ---------------- desktop: pinned 300vh horizontal arc --------------- */
  return (
    <section ref={sectionRef} className="relative" style={{ height: "300vh" }}>
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden pt-[140px]">
        <div className="pb-10">{intro}</div>

        <div
          className="relative mx-auto h-[44vh] w-full"
          style={{ perspective: "1200px" }}
        >
          {ITEMS.map((item, i) => (
            <button
              key={item.id}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              onClick={() => {
                if (i === centered) setOpenVideo(item);
              }}
              tabIndex={i === centered ? 0 : -1}
              aria-label={`Play ${item.title}`}
              className="group absolute left-1/2 top-1/2 h-full overflow-hidden rounded-xl border border-bone/[0.08] will-change-transform"
              style={{ aspectRatio: "3/4", transformStyle: "preserve-3d" }}
            >
              <VideoThumb video={item} seed={i} />
              <span data-tint className="pointer-events-none absolute inset-0 bg-ink opacity-0" aria-hidden />
            </button>
          ))}
        </div>

        <Readout item={ITEMS[centered]} />
        {portfolioLink}
      </div>

      <VideoModal video={openVideo} onClose={() => setOpenVideo(null)} />
    </section>
  );
}

function Readout({ item }: { item: PortfolioVideo }) {
  const count = videosByCategory(item.category).length;
  return (
    <div className="mt-8 text-center font-mono text-[13px] text-mute" aria-live="polite">
      <span className="text-bone">{categoryLabel(item.category).toUpperCase()}</span>
      <span className="mx-3 text-mute/50">·</span>
      <span className="tabular">{item.duration}S CREATIVE</span>
      <span className="mx-3 text-mute/50">·</span>
      <span className="tabular text-brass">
        {count} IN PORTFOLIO
      </span>
    </div>
  );
}
