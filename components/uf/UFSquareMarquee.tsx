"use client";

import React from "react";

const RANDOM_PHOTOS = [
  { src: "/images/random/cropped/anastasia.jpg", alt: "Client funnel preview" },
  { src: "/images/random/cropped/ann.jpg", alt: "Strategy call with Ann" },
  { src: "/images/random/cropped/george.jpg", alt: "Team call with George" },
  { src: "/images/random/cropped/guilia.jpg", alt: "Client session with Giulia" },
  { src: "/images/random/cropped/owne.jpg", alt: "Client session with Owen" },
  { src: "/images/random/cropped/sina.jpg", alt: "Client session with Sina" },
  { src: "/images/random/cropped/edgar_jeermei.jpg", alt: "Edgar & Jeremi" },
  { src: "/images/random/cropped/ig_shot.jpg", alt: "Performance snapshot" },
  { src: "/images/random/cropped/analytics.jpg", alt: "Analytics dashboard proof" },
];

/**
 * Landscape photo ribbon above the footer.
 * Uses object-contain so each frame shows in full (no aggressive square crop).
 */
export default function UFSquareMarquee() {
  return (
    <section className="marquee-row relative w-full overflow-hidden border-y border-white/[0.08] bg-[#050508]">
      <div
        className="marquee-track-left flex w-max"
        style={{ "--marquee-duration": "42s" } as React.CSSProperties}
      >
        {[0, 1].map((copy) => (
          <div
            key={copy}
            className="flex shrink-0 gap-3 py-4 pr-3 sm:gap-4 sm:py-5 sm:pr-4"
            aria-hidden={copy === 1 || undefined}
          >
            {RANDOM_PHOTOS.map((p, idx) => (
              <div
                key={`${copy}-${idx}`}
                className="group relative h-[140px] w-[240px] shrink-0 overflow-hidden rounded-xl border border-white/10 bg-[#0a0a0f] sm:h-[170px] sm:w-[300px] md:h-[200px] md:w-[360px]"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.src}
                  alt={copy === 0 ? p.alt : ""}
                  className="h-full w-full object-contain object-center transition duration-500 group-hover:scale-[1.02]"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
