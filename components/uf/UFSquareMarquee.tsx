"use client";

import React from "react";

const RANDOM_PHOTOS = [
  { src: "/images/random/anastasia.png", alt: "Team & client partner Anastasia" },
  { src: "/images/random/ann.png", alt: "Team & client partner Ann" },
  { src: "/images/random/george.png", alt: "Team & client partner George" },
  { src: "/images/random/guilia.png", alt: "Team & client partner Giulia" },
  { src: "/images/random/owne.png", alt: "Team & client partner Owen" },
  { src: "/images/random/sina.png", alt: "Team & client partner Sina" },
  { src: "/images/random/edgar_jeermei.jpg", alt: "Team member Edgar" },
  { src: "/images/random/469219660_18021976397623346_1330974689308576103_n.jpg", alt: "Performance snapshot" },
  { src: "/images/random/Screenshot%202026-08-30%20at%204.22.59%E2%80%AFPM.png", alt: "Analytics dashboard proof" },
];

/**
 * Square Photo Scrolling Ribbon directly above footer:
 * Continuous infinite horizontal marquee populated from /public/images/random.
 */
export default function UFSquareMarquee() {
  return (
    <section className="marquee-row relative w-full overflow-hidden bg-[#050508] py-0 border-t border-b border-white/[0.08]">
      <div
        className="marquee-track-left flex w-max"
        style={{ "--marquee-duration": "30s" } as React.CSSProperties}
      >
        {/* Set 1 */}
        <div className="flex shrink-0 gap-3 sm:gap-4 py-3 sm:py-4 pr-3 sm:pr-4">
          {RANDOM_PHOTOS.map((p, idx) => (
            <div
              key={`p1-${idx}`}
              className="group relative h-[170px] w-[170px] sm:h-[220px] sm:w-[220px] md:h-[260px] md:w-[260px] shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-black/40 shadow-lg backdrop-blur-sm"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={p.src}
                alt={p.alt}
                className="h-full w-full object-cover object-center grayscale-[10%] contrast-[105%] transition-all duration-500 group-hover:scale-105 group-hover:grayscale-0"
                loading="lazy"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </div>
          ))}
        </div>

        {/* Set 2 (Identical duplicate for seamless infinite loop) */}
        <div className="flex shrink-0 gap-3 sm:gap-4 py-3 sm:py-4 pr-3 sm:pr-4" aria-hidden="true">
          {RANDOM_PHOTOS.map((p, idx) => (
            <div
              key={`p2-${idx}`}
              className="group relative h-[170px] w-[170px] sm:h-[220px] sm:w-[220px] md:h-[260px] md:w-[260px] shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-black/40 shadow-lg backdrop-blur-sm"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={p.src}
                alt={p.alt}
                className="h-full w-full object-cover object-center grayscale-[10%] contrast-[105%] transition-all duration-500 group-hover:scale-105 group-hover:grayscale-0"
                loading="lazy"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
