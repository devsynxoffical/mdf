"use client";

import ContourBG from "./ContourBG";
import InkTrail from "./InkTrail";

const STATS = [
  ["$100M+", "Client revenue generated"],
  ["500+", "Service businesses scaled"],
  ["62", "Ad creatives running now"],
];

/**
 * Editorial hero: warm paper, contour lines, and a pointer-reactive ink
 * smear that follows the cursor and dissolves. Giant condensed/italic split
 * title bottom-left, stat stack bottom-right, rotating brand seal upper
 * right. Title lines rise in on load.
 */
export default function UFHero() {
  return (
    <section className="uf-light relative flex min-h-screen flex-col overflow-hidden">
      <ContourBG tone="light" />
      <InkTrail />

      {/* rotating brand seal */}
      <div className="absolute right-10 top-[22%] hidden h-[150px] w-[150px] md:block lg:right-20">
        <svg viewBox="0 0 150 150" className="spin-slow h-full w-full" aria-hidden>
          <defs>
            <path
              id="sealCircle"
              d="M75,75 m-58,0 a58,58 0 1,1 116,0 a58,58 0 1,1 -116,0"
            />
          </defs>
          <text
            fill="#0D0C0A"
            fontFamily="JetBrains Mono, monospace"
            fontSize="10"
            letterSpacing="2.6"
          >
            <textPath href="#sealCircle">
              MILLION DOLLAR FUNNEL™ · EST. 2015 ·&#160;
            </textPath>
          </text>
        </svg>
        <svg
          viewBox="0 0 24 24"
          className="absolute left-1/2 top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2"
          fill="#8C6420"
          aria-hidden
        >
          <path d="M12 1.5c.7 5.6 4.9 9.8 10.5 10.5-5.6.7-9.8 4.9-10.5 10.5C11.3 16.9 7.1 12.7 1.5 12 7.1 11.3 11.3 7.1 12 1.5z" />
        </svg>
      </div>

      {/* bottom row: title left, stats right */}
      <div className="relative z-10 mt-auto flex flex-col gap-10 px-6 pb-10 md:flex-row md:items-end md:justify-between md:px-14 md:pb-14">
        <div>
          <h1 className="leading-[0.84] text-inkdeep">
            <span className="uf-line">
              <span
                className="font-condensed text-[clamp(72px,13vw,180px)]"
                style={{ animationDelay: "150ms" }}
              >
                Million
              </span>
            </span>
            <span className="uf-line">
              <span
                className="font-editorial text-mint-deep text-[clamp(46px,9vw,124px)]"
                style={{ animationDelay: "320ms" }}
              >
                Dollar&nbsp;Funnel
                <sup className="align-super text-[0.35em]">™</sup>
              </span>
            </span>
          </h1>
          <div className="uf-line mt-6">
            <p
              className="uf-eyebrow text-inkdeep/70"
              style={{ animationDelay: "520ms" }}
            >
              High-ticket client acquisition for service providers
            </p>
          </div>
        </div>

        {/* stat stack */}
        <div className="uf-line shrink-0 md:pb-2 md:text-right">
          <div style={{ animationDelay: "640ms" }}>
            <ul className="space-y-3 border-l border-inkdeep/15 pl-5 md:border-l-0 md:border-r md:pl-0 md:pr-5">
              {STATS.map(([num, label]) => (
                <li key={label} className="leading-tight">
                  <span className="font-condensed block text-[24px] text-inkdeep md:text-[28px]">
                    {num}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-inkdeep/55">
                    {label}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-8 hidden font-mono text-[10px] uppercase tracking-[0.2em] text-inkdeep/45 md:block">
              ( Scroll )
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
