"use client";

import ContourBG from "./ContourBG";
import InkTrail from "./InkTrail";
import Magnetic from "./Magnetic";

const PROOF = [
  ["$100M+", "Client revenue generated"],
  ["500+", "Service businesses scaled"],
  ["62", "Creatives running live"],
  ["11 yrs", "Buying media at scale"],
];

/**
 * Hero: warm paper, contour lines, and a pointer-reactive ink smear.
 * Composition is a proper conversion hero — availability badge, value
 * headline, subhead, dual CTA, and a full-width proof strip on the base.
 */
export default function UFHero() {
  return (
    <section className="uf-light relative flex min-h-svh flex-col overflow-hidden">
      <ContourBG tone="light" />
      <InkTrail />

      {/* rotating brand seal */}
      <div className="absolute right-10 top-[13vh] hidden h-[112px] w-[112px] opacity-90 lg:block xl:right-16">
        <svg viewBox="0 0 150 150" className="spin-slow h-full w-full" aria-hidden>
          <defs>
            <path id="sealCircle" d="M75,75 m-58,0 a58,58 0 1,1 116,0 a58,58 0 1,1 -116,0" />
          </defs>
          <text
            fill="#0D0C0A"
            fillOpacity="0.55"
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
          className="absolute left-1/2 top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2"
          fill="#8C6420"
          aria-hidden
        >
          <path d="M12 1.5c.7 5.6 4.9 9.8 10.5 10.5-5.6.7-9.8 4.9-10.5 10.5C11.3 16.9 7.1 12.7 1.5 12 7.1 11.3 11.3 7.1 12 1.5z" />
        </svg>
      </div>

      {/* main column */}
      <div className="relative z-10 flex flex-1 items-center px-6 pt-[19vh] md:px-14">
        <div className="w-full">
          {/* availability badge */}
          <div className="mask-up mask-fit in">
            <span className="inline-flex items-center gap-2.5 rounded-full border border-inkdeep/20 bg-cream/50 px-4 py-2 backdrop-blur-sm">
              <span
                className="live-dot inline-block h-1.5 w-1.5 rounded-full bg-mint-deep"
                aria-hidden
              />
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-inkdeep/75">
                Accepting 4 clients this quarter
              </span>
            </span>
          </div>

          {/* headline */}
          <h1 className="type-hero mt-7 text-inkdeep">
            <span className="uf-line">
              <span
                className="font-condensed block text-[clamp(42px,7.6vw,112px)]"
                style={{ animationDelay: "120ms" }}
              >
                High-Ticket Clients,
              </span>
            </span>
            <span className="uf-line">
              <span
                className="font-editorial block text-mint-deep text-[clamp(36px,6.7vw,99px)]"
                style={{ animationDelay: "280ms" }}
              >
                Booked On Autopilot.
              </span>
            </span>
          </h1>

          {/* subhead + CTAs */}
          <div className="mt-9 flex flex-col gap-9 lg:flex-row lg:items-end lg:justify-between">
            <div className="uf-line max-w-[52ch]">
              <p
                className="font-body text-[16px] leading-[1.62] text-inkdeep/70 md:text-[18px]"
                style={{ animationDelay: "440ms" }}
              >
                We build and run the entire acquisition system — landing
                architecture, AI-led follow-up, and CRM — so cold traffic turns
                into booked calls. You never touch the tech.
              </p>
            </div>

            <div className="uf-line shrink-0">
              <div
                className="flex flex-wrap items-center gap-3"
                style={{ animationDelay: "580ms" }}
              >
                <Magnetic>
                  <a href="#door" className="btn-gold">
                    Book the call
                  </a>
                </Magnetic>
                <Magnetic strength={0.22}>
                  <a href="#work" className="btn-ghost">
                    See the work
                  </a>
                </Magnetic>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* proof strip */}
      <div className="relative z-10 border-t rule-light">
        <ul className="grid grid-cols-2 md:grid-cols-4">
          {PROOF.map(([num, label], i) => (
            <li
              key={label}
              className={`px-6 py-5 md:px-8 md:py-6 ${
                i > 0 ? "md:border-l md:rule-light" : ""
              } ${i === 1 ? "border-l rule-light md:border-l" : ""} ${
                i >= 2 ? "border-t rule-light md:border-t-0" : ""
              }`}
            >
              <span className="tnum font-condensed block text-[22px] text-inkdeep md:text-[27px]">
                {num}
              </span>
              <span className="mt-0.5 block font-mono text-[9.5px] uppercase tracking-[0.16em] text-inkdeep/50">
                {label}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
