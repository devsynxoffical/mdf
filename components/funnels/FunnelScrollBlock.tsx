"use client";

import { useEffect, useRef, type CSSProperties } from "react";

/**
 * Fixed-ratio window that auto-pans a full-length funnel screenshot
 * while it is on screen. Keeps scrolling on hover.
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
      { threshold: 0.2, rootMargin: "0px 0px -8% 0px" }
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
      className={`funnel-scroll-frame funnel-screen-viewport relative aspect-[16/10] w-full overflow-hidden rounded-[10px] bg-[#0a1020] will-change-transform sm:rounded-[12px] ${className}`}
      style={{ "--shine-delay": `${shineDelay}s` } as CSSProperties}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={label}
        draggable={false}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={priority ? "high" : "auto"}
        className="funnel-auto-scroll pointer-events-none block h-auto w-full select-none"
        style={{ "--funnel-dur": `${duration}s` } as CSSProperties}
      />
    </div>
  );
}
