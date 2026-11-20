"use client";

import { useEffect, useRef, type CSSProperties } from "react";

/**
 * Fixed-ratio window that auto-pans a full-length funnel screenshot
 * styled with a tactile 3D book-page scrolling aesthetic, stacked pages,
 * spine shadow crease, top/bottom paper rolls, and folded corner curl.
 */
export default function FunnelScrollBlock({
  src,
  duration,
  label,
  priority = false,
  shineDelay = 0,
  className = "",
}: {
  src: string;
  duration: number;
  label: string;
  priority?: boolean;
  shineDelay?: number;
  className?: string;
}) {
  const viewportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;

    const sync = () => el.style.setProperty("--viewH", `${el.clientHeight}px`);
    sync();
    const ro = new ResizeObserver(sync);
    ro.observe(el);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return () => ro.disconnect();
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        el.classList.toggle("is-inview", entry.isIntersecting);
      },
      { threshold: 0.15, rootMargin: "0px 0px -5% 0px" }
    );
    io.observe(el);

    return () => {
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  return (
    <div
      ref={viewportRef}
      className={`book-page-frame funnel-scroll-frame funnel-screen-viewport relative aspect-[16/10] w-full overflow-hidden rounded-[14px] bg-[#0c101d] will-change-transform ${className}`}
      style={{ "--shine-delay": `${shineDelay}s` } as CSSProperties}
    >
      {/* 1. Left Book Spine Crease Shadow (gives depth of an open bound book/magazine) */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-8 bg-gradient-to-r from-black/35 via-black/10 to-transparent border-l border-white/20" />

      {/* 2. Top Page Curled Roll Shadow */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-10 bg-gradient-to-b from-black/35 via-black/10 to-transparent" />

      {/* 3. Bottom Page Curled Roll Shadow */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-14 bg-gradient-to-t from-black/45 via-black/15 to-transparent" />

      {/* 4. Realistic Page Fold / Dog-Ear Corner at Top Right */}
      <div className="pointer-events-none absolute top-0 right-0 z-30 h-9 w-9 overflow-hidden transition-transform duration-500 ease-out group-hover:scale-115">
        <div className="absolute top-0 right-0 h-14 w-14 origin-top-right -rotate-45 translate-x-7 -translate-y-7 bg-gradient-to-br from-white/95 via-slate-200 to-slate-400 shadow-[-3px_4px_6px_rgba(0,0,0,0.35)] border-b border-l border-slate-400/50" />
      </div>

      {/* 5. Paper Grain & Lighting Glare Layer */}
      <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(ellipse_at_30%_20%,rgba(255,255,255,0.06)_0%,transparent_60%)] mix-blend-screen" />

      {/* 6. Scrolling Book Page Image */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={label}
        draggable={false}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={priority ? "high" : "auto"}
        className="book-page-roll funnel-auto-scroll pointer-events-none block h-auto w-full select-none"
        style={{ "--funnel-dur": `${duration}s` } as CSSProperties}
      />

      {/* 7. Subtle "Book Page Scrolling" live preview badge at bottom */}
      <div className="pointer-events-none absolute bottom-3 right-3 z-20 flex items-center gap-1.5 rounded-full border border-white/20 bg-black/60 px-2.5 py-1 backdrop-blur-md transition-opacity duration-300 group-hover:opacity-40 shadow-sm">
        <span className="h-1.5 w-1.5 rounded-full bg-blue-400 animate-pulse" />
        <span className="font-sans text-[10px] font-medium tracking-wider uppercase text-white/80">
          Page Scroll
        </span>
      </div>
    </div>
  );
}
