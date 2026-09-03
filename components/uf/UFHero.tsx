"use client";

import ResnDiamond from "./ResnDiamond";

const CAPABILITIES = [
  {
    num: "01",
    title: "The Funnel Engine",
    subtitle: "UX/UI, High-Ticket VSL, Architecture",
    href: "#funnels",
    iconSrc: "/images/hero-link-ico1.png",
  },
  {
    num: "02",
    title: "Media & Traffic",
    subtitle: "Meta, Google & High-Ticket Ads",
    href: "/work-proof",
    iconSrc: "/images/hero-link-ico2.png",
  },
  {
    num: "03",
    title: "AI Qualification",
    subtitle: "60s Response & CRM Pipeline",
    href: "#system",
    iconSrc: "/images/hero-link-ico3.png",
  },
] as const;

export default function UFHero() {
  const scrollToSection = (href: string) => {
    if (href.startsWith("/")) {
      window.location.assign(href);
      return;
    }
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative flex min-h-[96vh] flex-col justify-between overflow-hidden bg-[#050508] pb-0 pt-24 text-white select-none sm:pt-28"
    >
      {/* 1. Deep Obsidian Vignette */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_55%,rgba(90,40,160,0.14)_0%,rgba(10,10,14,0.4)_50%,#050508_85%)]" />

      {/* 2. BACKGROUND 3D RESN DIAMOND */}
      <div className="pointer-events-auto absolute inset-0 top-[-4vh] z-0 flex items-center justify-center overflow-hidden">
        <ResnDiamond
          height="h-[520px] sm:h-[620px] md:h-[760px] lg:h-[840px]"
          showClickAndHoldPrompt={false}
          className="scale-100 opacity-90 transition-opacity duration-300 hover:opacity-100 sm:scale-110 md:scale-120"
        />
      </div>

      {/* 3. MAIN HERO CONTENT: Top Badges & Prefix */}
      <div className="pointer-events-none relative z-20 mx-auto flex w-full max-w-[1400px] flex-col items-center justify-center px-4 pb-2 pt-4 text-center sm:px-6">
        <div className="pointer-events-auto mb-2 sm:mb-3">
          <span className="font-serif mr-2 text-[clamp(26px,4.5vw,54px)] font-normal italic text-white/90 drop-shadow-lg sm:mr-3">
            Making Brands
          </span>
          <span className="font-sans text-[clamp(26px,4.5vw,54px)] font-extrabold tracking-tight text-white drop-shadow-lg">
            Unforgettable
          </span>
        </div>
      </div>

      {/* 4. FULL-WIDTH INFINITE SCROLLER HEADLINE */}
      <div className="pointer-events-none relative z-20 my-auto w-full overflow-hidden py-2 select-none">
        <div
          className="flex w-max items-center whitespace-nowrap will-change-transform"
          style={{ animation: "marquee-left 35s linear infinite" }}
        >
          {[0, 1].map((set) => (
            <div
              key={set}
              className="flex shrink-0 items-center"
              aria-hidden={set === 1 || undefined}
            >
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
                <span key={`${set}-${i}`} className="flex items-center">
                  <span className="font-anton select-none text-[clamp(60px,16vw,220px)] uppercase leading-[0.84] tracking-[-0.015em] text-white drop-shadow-[0_25px_60px_rgba(0,0,0,0.95)]">
                    {word}
                  </span>
                  <span className="mx-6 inline-block align-middle font-sans text-[clamp(24px,5vw,72px)] text-cyan-400/80 sm:mx-10 md:mx-14">
                    ✦
                  </span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* 5. SUBTITLE */}
      <div className="pointer-events-none relative z-20 mx-auto w-full max-w-[900px] px-4 pb-6 text-center sm:px-6">
        <p className="pointer-events-auto font-mono text-[10px] uppercase tracking-[0.28em] text-white/60 sm:text-[12px] sm:tracking-[0.34em] md:text-[13px]">
          AWARD-WINNING CLIENT ACQUISITION ARCHITECTURE · EST. 2024
        </p>
      </div>

      {/* 6. CAPABILITY BAR — enhanced glass row */}
      <div className="relative z-20 border-t border-white/[0.08] bg-[#050508]/90 backdrop-blur-2xl">
        {/* Cobalt shimmer line */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sky/50 to-transparent"
        />

        <div className="mx-auto max-w-[1360px] px-0 sm:px-4 md:px-12">
          {/* Mobile: horizontal snap cards */}
          <div className="flex gap-3 overflow-x-auto px-4 pb-4 pt-4 [-ms-overflow-style:none] [scrollbar-width:none] snap-x snap-mandatory sm:px-0 md:hidden [&::-webkit-scrollbar]:hidden">
            {CAPABILITIES.map((c) => (
              <HeroCapabilityCard
                key={c.title}
                {...c}
                layout="mobile"
                onNavigate={scrollToSection}
              />
            ))}
          </div>

          {/* Desktop: 3-column bar */}
          <div className="hidden divide-x divide-white/[0.08] md:grid md:grid-cols-3">
            {CAPABILITIES.map((c) => (
              <HeroCapabilityCard
                key={c.title}
                {...c}
                layout="desktop"
                onNavigate={scrollToSection}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroCapabilityCard({
  num,
  title,
  subtitle,
  href,
  iconSrc,
  layout,
  onNavigate,
}: {
  num: string;
  title: string;
  subtitle: string;
  href: string;
  iconSrc: string;
  layout: "mobile" | "desktop";
  onNavigate: (href: string) => void;
}) {
  const isMobile = layout === "mobile";

  return (
    <a
      href={href}
      onClick={(e) => {
        e.preventDefault();
        onNavigate(href);
      }}
      className={`hero-capability group relative flex shrink-0 items-center justify-between overflow-hidden transition-all duration-300 ${
        isMobile
          ? "min-w-[min(88vw,320px)] snap-center rounded-2xl border border-white/[0.1] bg-white/[0.03] px-4 py-4 active:scale-[0.99]"
          : "px-6 py-6 lg:px-8 lg:py-7 hover:bg-white/[0.025]"
      }`}
    >
      {/* Hover wash */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_0%_50%,rgba(56,189,248,0.12),transparent_55%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />

      <div className="relative flex min-w-0 items-center gap-3.5 sm:gap-4">
        {/* Icon orb */}
        <span className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_12px_28px_rgba(0,0,0,0.35)] transition-all duration-300 group-hover:border-sky/30 group-hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_16px_36px_rgba(18,84,236,0.25)] sm:h-14 sm:w-14">
          <span
            aria-hidden
            className="absolute inset-0 rounded-xl bg-[radial-gradient(circle_at_30%_20%,rgba(56,189,248,0.18),transparent_65%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={iconSrc}
            alt=""
            className="relative z-[1] h-8 w-8 object-contain drop-shadow-[0_6px_14px_rgba(0,0,0,0.45)] transition-transform duration-300 group-hover:scale-110 sm:h-9 sm:w-9"
            loading="lazy"
            draggable={false}
          />
        </span>

        <div className="min-w-0 text-left">
          <p className="font-mono text-[9px] font-medium uppercase tracking-[0.22em] text-sky/70 transition-colors group-hover:text-sky">
            {num}
          </p>
          <h3 className="mt-0.5 truncate font-sans text-[15px] font-semibold text-white transition-colors group-hover:text-sky-100 sm:text-[16px]">
            {title}
          </h3>
          <p className="mt-0.5 line-clamp-2 font-sans text-[11.5px] font-normal leading-snug text-slate-400 transition-colors group-hover:text-slate-300 sm:text-[12.5px]">
            {subtitle}
          </p>
        </div>
      </div>

      {/* Arrow chip */}
      <span className="relative ml-3 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] transition-all duration-300 group-hover:border-sky/35 group-hover:bg-sky/10 sm:h-9 sm:w-9">
        <svg
          viewBox="0 0 24 24"
          className="h-3.5 w-3.5 text-slate-400 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white sm:h-4 sm:w-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          aria-hidden
        >
          <path d="M7 17L17 7M17 7H7M17 7V17" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </a>
  );
}
