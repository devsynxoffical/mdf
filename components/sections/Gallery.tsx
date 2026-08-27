"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import RiseIn from "@/components/ui/RiseIn";
import GalleryCard from "./GalleryCard";
import { useScrollState } from "@/components/providers/ScrollProvider";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const ITEMS = [
  { niche: "Roofing", roas: "4.10", revenue: "$612,400" },
  { niche: "Med Spa", roas: "3.65", revenue: "$418,220" },
  { niche: "Coaching", roas: "3.32", revenue: "$847,307" },
  { niche: "HVAC", roas: "3.90", revenue: "$733,850" },
  { niche: "Legal", roas: "2.95", revenue: "$1,204,600" },
  { niche: "Dental", roas: "3.48", revenue: "$389,140" },
  { niche: "Solar", roas: "3.12", revenue: "$958,300" },
  { niche: "Fitness", roas: "4.35", revenue: "$276,900" },
  { niche: "Real Estate", roas: "3.05", revenue: "$1,092,750" },
];

// deterministic per-card tilt (±3°) so the row feels handled, not machine-placed
const TILTS = [-2.4, 1.8, -1.2, 2.8, -3, 1.4, -1.9, 2.2, -2.7];

export default function Gallery() {
  const { isMobile, reducedMotion, ready } = useScrollState();
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const progress = useRef(0);
  const [centered, setCentered] = useState(0);
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const lastFocused = useRef<HTMLElement | null>(null);

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
      // gentle horizontal arc facing the camera
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

  // Arrow keys move between planes by scrolling the pinned section.
  useEffect(() => {
    if (useStatic) return;
    const onKey = (e: KeyboardEvent) => {
      if (openIdx !== null) return;
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
  }, [useStatic, openIdx]);

  // Overlay focus handling: trap focus, Escape / click-outside returns it.
  useEffect(() => {
    if (openIdx === null) {
      lastFocused.current?.focus();
      return;
    }
    lastFocused.current = document.activeElement as HTMLElement;
    closeBtnRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenIdx(null);
      if (e.key === "Tab") {
        // single focusable element in the dialog — keep focus on it
        e.preventDefault();
        closeBtnRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openIdx]);

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
          This isn&apos;t a one-off win. It&apos;s a client acquisition machine
          that repeats across industries.
        </p>
      </RiseIn>
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
            <div key={item.niche} className="w-[70vw] max-w-[300px] shrink-0 snap-center" style={{ aspectRatio: "3/4" }}>
              <GalleryCard seed={i} label={item.niche.toUpperCase()} />
            </div>
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
      </section>
    );
  }

  /* ---------------- desktop: pinned 300vh horizontal arc --------------- */
  return (
    <section ref={sectionRef} className="relative" style={{ height: "300vh" }}>
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden pt-[140px]">
        <div className="pb-10">{intro}</div>

        <div
          className="relative mx-auto h-[46vh] w-full"
          style={{ perspective: "1200px" }}
        >
          {ITEMS.map((item, i) => (
            <button
              key={item.niche}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              onClick={() => {
                if (i === centered) setOpenIdx(i);
              }}
              tabIndex={i === centered ? 0 : -1}
              aria-label={`Open ${item.niche} case detail`}
              className="absolute left-1/2 top-1/2 h-full overflow-hidden rounded-xl will-change-transform"
              style={{ aspectRatio: "3/4", transformStyle: "preserve-3d" }}
            >
              <GalleryCard seed={i} label={item.niche.toUpperCase()} />
              <span data-tint className="pointer-events-none absolute inset-0 bg-ink opacity-0" aria-hidden />
            </button>
          ))}
        </div>

        <Readout item={ITEMS[centered]} />
      </div>

      {/* Detail overlay */}
      <AnimatePresence>
        {openIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/80 p-6 backdrop-blur-sm"
            onClick={() => setOpenIdx(null)}
            role="dialog"
            aria-modal="true"
            aria-label={`${ITEMS[openIdx].niche} case detail`}
          >
            <motion.div
              initial={{ y: 32, scale: 0.96 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: 32, scale: 0.96 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-lg rounded-[20px] border border-bone/[0.08] bg-slate2 p-8"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="bracket-label">{ITEMS[openIdx].niche}</p>
                  <p className="mt-3 font-display text-s40 font-light text-brass tabular">
                    {ITEMS[openIdx].revenue}
                  </p>
                  <p className="mt-1 font-mono text-s12 text-mute">
                    ROAS {ITEMS[openIdx].roas} · FULL SYSTEM BUILD
                  </p>
                </div>
                <button
                  ref={closeBtnRef}
                  onClick={() => setOpenIdx(null)}
                  className="p-2 text-mute hover:text-bone"
                  aria-label="Close case detail"
                >
                  <svg width="14" height="14" viewBox="0 0 12 12" fill="none" aria-hidden>
                    <path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                </button>
              </div>
              <p className="mt-5 font-body text-[16px] leading-[1.6] text-mute">
                Landing architecture, A2P infrastructure, AI follow-up, and CRM
                tracking rebuilt end to end. Cold traffic in, booked calls out —
                the same six-layer system, applied to this niche.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function Readout({ item }: { item: (typeof ITEMS)[number] }) {
  return (
    <div className="mt-8 text-center font-mono text-[13px] text-mute" aria-live="polite">
      <span className="text-bone">{item.niche.toUpperCase()}</span>
      <span className="mx-3 text-mute/50">·</span>
      <span className="tabular">ROAS {item.roas}</span>
      <span className="mx-3 text-mute/50">·</span>
      <span className="tabular text-brass">{item.revenue}</span>
    </div>
  );
}
