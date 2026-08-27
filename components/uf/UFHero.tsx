"use client";

import ContourBG from "./ContourBG";

/**
 * Editorial hero: bone canvas, contour lines, a morphing ink blob, a dark
 * silhouette center-stage, and the giant condensed/italic split title
 * anchored bottom-left. Title lines rise in on load.
 */
export default function UFHero() {
  return (
    <section className="uf-light relative flex min-h-screen flex-col overflow-hidden">
      <ContourBG tone="light" />

      {/* morphing ink blob, low right of the figure */}
      <div
        aria-hidden
        className="uf-blob absolute right-[14%] top-[58%] h-[180px] w-[420px] bg-inkdeep/60 max-md:hidden"
      />
      {/* mint thread running through the blob */}
      <svg
        aria-hidden
        className="absolute right-[10%] top-[52%] w-[480px] max-md:hidden"
        viewBox="0 0 480 200"
        fill="none"
      >
        <path
          d="M0,120 C90,60 150,180 240,110 C330,40 380,160 480,90"
          stroke="#118A6B"
          strokeWidth="1.5"
        />
      </svg>

      {/* silhouette */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center">
        <svg
          viewBox="0 0 420 560"
          className="h-[68vh] w-auto"
          aria-label="Founder silhouette"
        >
          <defs>
            <linearGradient id="sil" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#101319" />
              <stop offset="100%" stopColor="#07090E" />
            </linearGradient>
          </defs>
          {/* head */}
          <ellipse cx="210" cy="96" rx="58" ry="66" fill="url(#sil)" />
          {/* neck + shoulders + torso, arm raised to chin */}
          <path
            d="M186,150 L186,176 C120,190 84,238 74,320 L60,560 L360,560 L348,318 C338,236 300,190 234,176 L234,150 Z"
            fill="url(#sil)"
          />
          <path
            d="M234,214 C262,220 276,244 270,268 C264,288 246,296 232,290 C222,286 216,272 220,258 Z"
            fill="url(#sil)"
          />
        </svg>
      </div>

      {/* title block bottom-left */}
      <div className="relative z-10 mt-auto px-6 pb-10 md:px-14 md:pb-14">
        <h1 className="leading-[0.82] text-inkdeep">
          <span className="uf-line">
            <span
              className="font-condensed text-[clamp(72px,14vw,190px)]"
              style={{ animationDelay: "150ms" }}
            >
              Million
            </span>
          </span>
          <span className="uf-line">
            <span
              className="font-editorial text-mint-deep text-[clamp(48px,9.4vw,128px)]"
              style={{ animationDelay: "320ms" }}
            >
              Dollar&nbsp;Funnel
              <sup className="text-[0.35em] align-super">™</sup>
            </span>
          </span>
        </h1>
        <div className="uf-line mt-6">
          <p
            className="uf-eyebrow text-inkdeep/70"
            style={{ animationDelay: "520ms" }}
          >
            High-ticket client acquisition for service providers
            <br />
            $35M+ managed ad spend · 500+ businesses scaled
          </p>
        </div>
      </div>
    </section>
  );
}
