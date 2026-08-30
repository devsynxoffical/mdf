"use client";

import ResnDiamond from "./ResnDiamond";

const CAPABILITIES = [
  {
    title: "The Funnel Engine",
    subtitle: "UX/UI, High-Ticket VSL, Architecture",
    href: "#proof",
    iconSrc: "/images/hero-link-ico1.png",
  },
  {
    title: "Media & Traffic",
    subtitle: "Meta, Google & High-Ticket Ads",
    href: "#proof",
    iconSrc: "/images/hero-link-ico2.png",
  },
  {
    title: "AI Qualification",
    subtitle: "60s Response & CRM Pipeline",
    href: "#process",
    iconSrc: "/images/hero-link-ico3.png",
  },
];

export default function UFHero() {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="relative flex min-h-[96vh] flex-col justify-between overflow-hidden bg-[#050508] pt-24 sm:pt-28 pb-0 text-white select-none"
    >
      {/* 1. Deep Obsidian Vignette */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_55%,rgba(90,40,160,0.14)_0%,rgba(10,10,14,0.4)_50%,#050508_85%)]" />

      {/* 2. BACKGROUND 3D RESN DIAMOND */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-auto z-0 overflow-hidden top-[-4vh]">
        <ResnDiamond
          height="h-[520px] sm:h-[620px] md:h-[760px] lg:h-[840px]"
          showClickAndHoldPrompt={false}
          className="scale-100 sm:scale-110 md:scale-120 opacity-90 hover:opacity-100 transition-opacity duration-300"
        />
      </div>

      {/* 3. MAIN HERO CONTENT: Top Badges & Prefix */}
      <div className="relative z-20 mx-auto flex flex-col items-center justify-center px-4 sm:px-6 text-center max-w-[1400px] w-full pt-4 pb-2 pointer-events-none">

        {/* Elegant Hybrid Prefix: "Making Brands" */}
        <div className="mb-2 sm:mb-3 pointer-events-auto">
          <span className="font-['Instrument_Serif',serif] italic font-normal text-[clamp(26px,4.5vw,54px)] text-white/90 mr-2 sm:mr-3 drop-shadow-lg">
            Making Brands
          </span>
          <span className="font-sans font-extrabold text-[clamp(26px,4.5vw,54px)] text-white tracking-tight drop-shadow-lg">
            Unforgettable
          </span>
        </div>
      </div>

      {/* 4. FULL-WIDTH INFINITE SCROLLER HEADLINE (Never finishes, seamless loop) */}
      <div className="relative z-20 w-full overflow-hidden py-2 select-none pointer-events-none my-auto">
        <div
          className="flex w-max items-center whitespace-nowrap will-change-transform"
          style={{
            animation: "marquee-left 35s linear infinite",
          }}
        >
          {/* Set 1 */}
          <div className="flex shrink-0 items-center">
            {[
              "UNFORGETTABLE",
              "THE TOP 1%",
              "ACQUISITION",
              "UNFORGETTABLE",
              "UNSTOPPABLE",
              "HIGH-TICKET",
              "ARCHITECTING",
              "UNFORGETTABLE",
            ].map((word, i) => (
              <span key={`s1-${i}`} className="flex items-center">
                <span className="font-['Anton',sans-serif] uppercase tracking-[-0.015em] leading-[0.84] text-white text-[clamp(60px,16vw,220px)] select-none drop-shadow-[0_25px_60px_rgba(0,0,0,0.95)]">
                  {word}
                </span>
                <span className="mx-6 sm:mx-10 md:mx-14 inline-block font-sans text-[clamp(24px,5vw,72px)] text-cyan-400/80 align-middle">
                  ✦
                </span>
              </span>
            ))}
          </div>

          {/* Set 2 (Identical duplicate for seamless mathematical infinite loop) */}
          <div className="flex shrink-0 items-center" aria-hidden="true">
            {[
              "UNFORGETTABLE",
              "THE TOP 1%",
              "ACQUISITION",
              "UNFORGETTABLE",
              "UNSTOPPABLE",
              "HIGH-TICKET",
              "ARCHITECTING",
              "UNFORGETTABLE",
            ].map((word, i) => (
              <span key={`s2-${i}`} className="flex items-center">
                <span className="font-['Anton',sans-serif] uppercase tracking-[-0.015em] leading-[0.84] text-white text-[clamp(60px,16vw,220px)] select-none drop-shadow-[0_25px_60px_rgba(0,0,0,0.95)]">
                  {word}
                </span>
                <span className="mx-6 sm:mx-10 md:mx-14 inline-block font-sans text-[clamp(24px,5vw,72px)] text-cyan-400/80 align-middle">
                  ✦
                </span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* 5. SUBTITLE */}
      <div className="relative z-20 mx-auto px-4 sm:px-6 text-center max-w-[900px] w-full pb-6 pointer-events-none">
        <p className="font-mono text-[10px] sm:text-[12px] md:text-[13px] tracking-[0.28em] sm:tracking-[0.34em] uppercase text-white/60 pointer-events-auto">
          AWARD-WINNING CLIENT ACQUISITION ARCHITECTURE · EST. 2024
        </p>
      </div>

      {/* 6. 3-COLUMN CAPABILITY BAR (Deep Black Glass with Subtle Hairline Dividers) */}
      <div className="relative z-20 border-t border-white/[0.08] bg-[#050508]/80 backdrop-blur-xl">
        <div className="mx-auto max-w-[1360px] px-4 sm:px-6 md:px-12">
          <div className="grid grid-cols-1 divide-y divide-white/[0.08] md:grid-cols-3 md:divide-x md:divide-y-0">
            {CAPABILITIES.map((c) => (
              <a
                key={c.title}
                href={c.href}
                className="group flex items-center justify-between py-5 sm:py-6 px-4 md:px-8 transition-all duration-300 hover:bg-white/[0.02]"
              >
                <div className="flex items-center gap-3.5 sm:gap-4">
                  {/* Floating 3D glass asset */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={c.iconSrc}
                    alt={c.title}
                    className="h-11 w-11 sm:h-12 sm:w-12 md:h-14 md:w-14 shrink-0 object-contain filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.4)] transition-transform duration-300 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="text-left">
                    <h3 className="font-sans text-[14.5px] sm:text-[15.5px] md:text-[16px] font-semibold text-white transition-colors group-hover:text-sky-300">
                      {c.title}
                    </h3>
                    <p className="mt-0.5 font-sans text-[12px] sm:text-[12.5px] text-slate-400 font-normal">
                      {c.subtitle}
                    </p>
                  </div>
                </div>

                {/* Sleek diagonal arrow */}
                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4 sm:h-5 sm:w-5 shrink-0 text-slate-400 transition-all duration-200 group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                >
                  <path d="M7 17L17 7M17 7H7M17 7V17" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
