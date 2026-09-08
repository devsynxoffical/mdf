"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { playTick } from "@/components/audio/SoundToggle";

/**
 * Enhanced interactive Funnel Window:
 * - 3D dynamic cursor tilt & depth
 * - Holographic glass sheen following mouse coordinates
 * - Tactile physical stacked paper book layers with dog-ear corner curl
 * - Auto-panning high-res page scroll with smooth acceleration
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
  const [coords, setCoords] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [rotate, setRotate] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

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

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!viewportRef.current) return;
    const rect = viewportRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = ((y - centerY) / centerY) * -5.5;
    const rotY = ((x - centerX) / centerX) * 5.5;

    setCoords({ x, y });
    setRotate({ x: rotX, y: rotY });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    playTick();
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotate({ x: 0, y: 0 });
  };

  return (
    <div
      ref={viewportRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`book-page-frame funnel-scroll-frame funnel-screen-viewport relative aspect-[16/10] w-full overflow-hidden rounded-[16px] sm:rounded-[20px] bg-[#0c101d] will-change-transform cursor-pointer border border-black/10 shadow-[0_16px_40px_rgba(0,0,0,0.12)] ${className}`}
      style={{
        "--shine-delay": `${shineDelay}s`,
        transform: `perspective(1200px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale3d(${isHovered ? 1.025 : 1}, ${isHovered ? 1.025 : 1}, 1)`,
        transition: isHovered
          ? "transform 0.12s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s"
          : "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.5s",
      } as CSSProperties}
    >
      {/* 1. Left Book Spine Crease Shadow (gives depth of an open bound book/magazine) */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-8 bg-gradient-to-r from-black/40 via-black/15 to-transparent border-l border-white/20" />

      {/* 2. Top Page Curled Roll Shadow */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-10 bg-gradient-to-b from-black/35 via-black/10 to-transparent" />

      {/* 3. Bottom Page Curled Roll Shadow */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-14 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />

      {/* 4. Realistic Page Fold / Dog-Ear Corner at Top Right with 3D Spring Curl */}
      <div className="pointer-events-none absolute top-0 right-0 z-30 h-10 w-10 overflow-hidden transition-transform duration-500 ease-out group-hover:scale-125">
        <div className="absolute top-0 right-0 h-16 w-16 origin-top-right -rotate-45 translate-x-8 -translate-y-8 bg-gradient-to-br from-white via-slate-200 to-slate-400 shadow-[-4px_5px_8px_rgba(0,0,0,0.4)] border-b border-l border-slate-400/60" />
      </div>

      {/* 5. Dynamic Cursor-Follow Spotlight & Holographic Flare */}
      <div
        className="pointer-events-none absolute inset-0 z-20 transition-opacity duration-300 mix-blend-overlay"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(450px circle at ${coords.x}px ${coords.y}px, rgba(255,255,255,0.22), transparent 70%)`,
        }}
      />

      {/* 6. Paper Grain & Lighting Glare Layer */}
      <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(ellipse_at_30%_20%,rgba(255,255,255,0.08)_0%,transparent_60%)] mix-blend-screen" />

      {/* 7. Scrolling Book Page Image */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={label}
        draggable={false}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={priority ? "high" : "auto"}
        className="book-page-roll funnel-auto-scroll pointer-events-none block h-auto w-full select-none transition-opacity duration-300"
        style={{
          "--funnel-dur": `${duration}s`,
          filter: isHovered ? "brightness(1.02) contrast(1.02)" : "none",
        } as CSSProperties}
      />

      {/* 8. Floating Action Badges: Live Auto-Pan & Inspect CTA */}
      <div className="pointer-events-none absolute bottom-3.5 inset-x-3.5 z-20 flex items-center justify-between">
        {/* Left "Auto-Scrolling" live badge */}
        <div className="flex items-center gap-1.5 rounded-full border border-white/20 bg-black/70 px-3 py-1 backdrop-blur-md transition-all duration-300 shadow-lg">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
          <span className="font-mono text-[10px] font-semibold tracking-wider uppercase text-white/90">
            Live Page Scroll
          </span>
        </div>

        {/* Right Hover "Inspect" pill */}
        <div
          className={`flex items-center gap-1.5 rounded-full border border-white/30 bg-blue-600/90 px-3 py-1 font-sans text-[11px] font-bold text-white shadow-xl backdrop-blur-md transition-all duration-300 ${
            isHovered ? "translate-y-0 opacity-100 scale-100" : "translate-y-2 opacity-0 scale-95"
          }`}
        >
          <span>Inspect Architecture</span>
          <span className="text-cyan-200">↗</span>
        </div>
      </div>
    </div>
  );
}
