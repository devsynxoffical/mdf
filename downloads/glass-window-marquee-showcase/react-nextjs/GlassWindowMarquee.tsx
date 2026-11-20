"use client";

import React from "react";

export interface MarqueeItem {
  src: string;
  alt: string;
  tag: string;
  title: string;
  badge?: string;
  tilt?: string;
}

export const DEFAULT_MARQUEE_ITEMS: MarqueeItem[] = [
  {
    src: "./images/anastasia.webp",
    alt: "Client funnel preview",
    tag: "Funnel Build",
    title: "Client Offer Architecture",
    tilt: "-rotate-1 sm:-rotate-2",
  },
  {
    src: "./images/ann.webp",
    alt: "Strategy call with Ann",
    tag: "Strategy Session",
    title: "Live Growth Breakdown",
    tilt: "rotate-1 sm:rotate-2",
  },
  {
    src: "./images/analytics.webp",
    alt: "Analytics dashboard proof",
    tag: "ROAS Verified",
    title: "Real-Time Tracking Core",
    tilt: "-rotate-1",
  },
  {
    src: "./images/george.webp",
    alt: "Team call with George",
    tag: "Scaling Audit",
    title: "Backend Conversion Review",
    tilt: "rotate-1 sm:rotate-1.5",
  },
  {
    src: "./images/edgar_jeermei.webp",
    alt: "Edgar & Jeremi",
    tag: "Deep-Dive",
    title: "Offer & Angle Mapping",
    tilt: "-rotate-1 sm:-rotate-2",
  },
  {
    src: "./images/guilia.webp",
    alt: "Client session with Giulia",
    tag: "Client Onboarding",
    title: "High-Ticket Pipeline Setup",
    tilt: "rotate-2",
  },
  {
    src: "./images/ig_shot.webp",
    alt: "Performance snapshot",
    tag: "Traffic Scale",
    title: "Paid Acquisition Proof",
    tilt: "-rotate-1.5",
  },
  {
    src: "./images/owne.webp",
    alt: "Client session with Owen",
    tag: "Growth Workshop",
    title: "Unit Economics Audit",
    tilt: "rotate-1",
  },
  {
    src: "./images/sina.webp",
    alt: "Client session with Sina",
    tag: "Pipeline Review",
    title: "Closing Optimization",
    tilt: "-rotate-2",
  },
];

interface GlassWindowMarqueeProps {
  items?: MarqueeItem[];
  duration?: string; // e.g. "48s"
  className?: string;
}

/**
 * GlassWindowMarquee Component
 * 3D macOS glassmorphic window cards infinite carousel with hover pause and tilt effects.
 */
export default function GlassWindowMarquee({
  items = DEFAULT_MARQUEE_ITEMS,
  duration = "48s",
  className = "",
}: GlassWindowMarqueeProps) {
  return (
    <section
      className={`marquee-row relative w-full overflow-hidden border-y border-white/[0.08] bg-[#020512] py-10 sm:py-14 ${className}`}
    >
      {/* Ambient background radial glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(18,84,236,0.12),transparent_70%)]" />

      {/* Left and Right Edge Vignette Fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-20 bg-gradient-to-r from-[#020512] via-[#020512]/80 to-transparent sm:w-36 md:w-52" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-20 bg-gradient-to-l from-[#020512] via-[#020512]/80 to-transparent sm:w-36 md:w-52" />

      {/* Marquee Track with CSS loop animation */}
      <div
        className="marquee-track-left flex w-max hover:[animation-play-state:paused]"
        style={{ "--marquee-duration": duration } as React.CSSProperties}
      >
        {[0, 1].map((copy) => (
          <div
            key={copy}
            className="flex shrink-0 items-center gap-6 py-4 pr-6 sm:gap-8 sm:pr-8 md:gap-10 md:pr-10"
            aria-hidden={copy === 1 || undefined}
          >
            {items.map((p, idx) => (
              <div
                key={`${copy}-${idx}`}
                className={`group relative shrink-0 transition-all duration-500 ease-out hover:z-30 hover:scale-[1.06] hover:rotate-0 ${
                  p.tilt || ""
                }`}
              >
                {/* Outer Glass Window Frame */}
                <div className="relative w-[280px] sm:w-[340px] md:w-[400px] overflow-hidden rounded-2xl border border-white/15 bg-gradient-to-b from-white/[0.09] via-white/[0.03] to-white/[0.01] p-2.5 sm:p-3 shadow-[0_16px_40px_rgba(0,0,0,0.65)] backdrop-blur-xl transition-all duration-300 group-hover:border-[#38BDF8]/50 group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_25px_rgba(56,189,248,0.25)]">
                  
                  {/* Top Window Bar: Traffic Light Dots + Pulsing Live Badge */}
                  <div className="mb-2.5 flex items-center justify-between px-1">
                    <div className="flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-rose-500/80" />
                      <span className="h-2 w-2 rounded-full bg-amber-500/80" />
                      <span className="h-2 w-2 rounded-full bg-emerald-500/80" />
                    </div>
                    <div className="inline-flex items-center gap-1.5 rounded-full border border-[#38BDF8]/30 bg-[#38BDF8]/10 px-2 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-wider text-[#38BDF8]">
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#38BDF8]" />
                      {p.tag}
                    </div>
                  </div>

                  {/* Window Screen Display Area */}
                  <div className="relative h-[155px] sm:h-[190px] md:h-[225px] w-full overflow-hidden rounded-xl border border-white/10 bg-[#060816]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={p.src}
                      alt={copy === 0 ? p.alt : ""}
                      className="h-full w-full object-contain object-center transition-transform duration-700 ease-out group-hover:scale-105"
                      loading="lazy"
                      decoding="async"
                    />

                    {/* Subtle Top-Right Glare Gradient */}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-white/[0.08]" />
                  </div>

                  {/* Bottom Caption Pill */}
                  <div className="mt-2 flex items-center justify-between px-1">
                    <span className="font-mono text-[10.5px] font-medium text-slate-300 transition-colors group-hover:text-white">
                      {p.title}
                    </span>
                    <span className="font-mono text-[9.5px] text-slate-500">
                      {p.badge || "LIVE RECORDING"}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
