"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ContourBG from "./ContourBG";
import ResultsLogos from "./ResultsLogos";
import { playTypingClick } from "@/components/audio/SoundToggle";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const STATEMENT_TOKENS = [
  { text: "Over", type: "word" },
  { text: "13", type: "word" },
  { text: "years,", type: "word" },
  { text: "we've", type: "word" },
  { text: "refined", type: "word" },
  { text: "our", type: "word" },
  { text: "Design", type: "word" },
  { text: "&", type: "word" },
  { text: "Development", type: "word" },
  { text: "expertise", type: "word" },
  { text: "and", type: "word" },
  { text: "combined", type: "word" },
  { text: "it", type: "word" },
  { text: "with", type: "word" },
  { text: "🔄 AI-workflows", type: "pill" },
  { text: "and", type: "word" },
  { text: "our", type: "word" },
  { text: "own", type: "word" },
  { text: "📑 AI-products", type: "pill" },
  { text: "to", type: "word" },
  { text: "help", type: "word" },
  { text: "ambitious", type: "word" },
  { text: "teams", type: "word" },
  { text: "move", type: "word" },
  { text: "faster,", type: "word" },
  { text: "build", type: "word" },
  { text: "smarter,", type: "word" },
  { text: "and", type: "word" },
  { text: "raise", type: "word" },
  { text: "the", type: "word" },
  { text: "bar.", type: "word" },
];

const STATS = [
  {
    label: "Service businesses scaled with the system",
    value: "500+",
  },
  {
    label: "Typical time from kickoff to live traffic",
    value: "3–4wk",
  },
  {
    label: "Facebook ad spend managed across 11 years",
    value: "$50M+",
  },
  {
    label: "Founders mentored on offer & funnel",
    value: "100+",
  },
];

/**
 * Halo Lab Signature Showreel & Statement Section:
 * Features scroll-driven typewriter writing animation with mechanical typing sound effects!
 */
export default function UFStatement() {
  const statementRef = useRef<HTMLParagraphElement>(null);
  const wordElsRef = useRef<(HTMLElement | null)[]>([]);
  const lastIndexRef = useRef(-1);

  // Scroll-driven Typewriter Writing Effect with Crick-Crick Sound
  useEffect(() => {
    const el = statementRef.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      wordElsRef.current.forEach((w) => {
        if (w) w.style.opacity = "1";
      });
      return;
    }

    const totalWords = STATEMENT_TOKENS.length;

    const st = ScrollTrigger.create({
      trigger: el,
      start: "top 78%",
      end: "bottom 38%",
      scrub: 0.25,
      onUpdate: (self) => {
        // Map scroll progress to current word index
        const currentIndex = Math.floor(self.progress * (totalWords + 1));

        if (currentIndex !== lastIndexRef.current) {
          // Trigger the mechanical typewriter typing sound on each word reveal
          if (currentIndex > lastIndexRef.current) {
            playTypingClick(0.8);
          }
          lastIndexRef.current = currentIndex;

          // Animate words from dimmed to illuminated
          wordElsRef.current.forEach((wordEl, i) => {
            if (!wordEl) return;
            if (i < currentIndex) {
              wordEl.style.opacity = "1";
              wordEl.style.filter = "blur(0px)";
              wordEl.style.transform = "translateY(0px)";
            } else {
              wordEl.style.opacity = "0.22";
              wordEl.style.filter = "blur(0.4px)";
              wordEl.style.transform = "translateY(1px)";
            }
          });
        }
      },
    });

    return () => {
      st.kill();
    };
  }, []);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#1254EC] via-[#104FE3] to-[#1254EC] pt-16 pb-24 text-white">
      <ContourBG tone="cobalt" />

      <div className="relative mx-auto max-w-[1320px] px-4 sm:px-6 md:px-12">
        {/* 1. SHOWREEL / VIDEO SECTION */}
        <div className="mx-auto w-full max-w-[1200px]">
          <div className="relative rounded-[28px] border border-white/25 bg-[#818CF8]/25 p-3 shadow-[0_25px_60px_rgba(0,0,0,0.25)] backdrop-blur-xl sm:rounded-[36px] sm:p-5 md:p-7">
            <div className="group relative flex aspect-[16/9] w-full items-center justify-center overflow-hidden rounded-[20px] border border-white/15 bg-[#020926] shadow-2xl sm:rounded-[26px]">
              <video
                src="/video/showreel_merged.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 2. TRUSTED LOGOS — edge-to-edge marquee (outside padded container) */}
      <ResultsLogos tone="cobalt" className="mt-20" logosOnly fullWidthMarquee />

      <div className="relative mx-auto max-w-[1320px] px-4 sm:px-6 md:px-12">
        {/* 3. EXPERTISE STATEMENT & SEAL BADGE WITH SCROLL-DRIVEN TYPEWRITER REVEAL & SOUND */}
        <div className="mx-auto mt-24 grid max-w-[1180px] grid-cols-1 items-center gap-10 lg:grid-cols-[240px_1fr]">
          {/* Left Seal Stamp */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
            <div className="relative flex h-20 w-20 items-center justify-center text-white">
              <svg viewBox="0 0 64 64" fill="none" className="h-full w-full drop-shadow-[0_0_15px_rgba(56,189,248,0.4)]">
                <circle cx="32" cy="32" r="28" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeDasharray="3 3" />
                <circle cx="32" cy="32" r="22" stroke="white" strokeWidth="2" />
                <path d="M22 32l7 7 13-13" stroke="#38BDF8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <p className="mt-3 font-sans text-[12px] font-semibold leading-tight text-blue-100">
              Crafted by Humans.<br />
              Accelerated by AI.
            </p>
          </div>

          {/* Right Main Statement: Typewriter Writing Reveal */}
          <p
            ref={statementRef}
            className="font-sans text-[clamp(24px,3.2vw,44px)] font-semibold leading-[1.3] text-white select-none"
          >
            {STATEMENT_TOKENS.map((token, i) => {
              if (token.type === "pill") {
                return (
                  <span
                    key={i}
                    ref={(el) => {
                      wordElsRef.current[i] = el;
                    }}
                    className="inline-flex items-center gap-1.5 align-middle rounded-lg bg-white/15 px-2.5 py-1 text-[0.8em] font-medium backdrop-blur-md mx-1 opacity-25 transition-[opacity,filter,transform] duration-150 ease-out will-change-[opacity,transform]"
                  >
                    {token.text}
                  </span>
                );
              }

              return (
                <span
                  key={i}
                  ref={(el) => {
                    wordElsRef.current[i] = el;
                  }}
                  className="inline-block mr-[0.28em] opacity-25 transition-[opacity,filter,transform] duration-150 ease-out will-change-[opacity,transform]"
                >
                  {token.text}
                </span>
              );
            })}
          </p>
        </div>

        {/* 4. 2X2 STAT CARDS GRID */}
        <div className="mx-auto mt-16 grid max-w-[1180px] grid-cols-1 gap-5 sm:grid-cols-2">
          {STATS.map((s) => (
            <div
              key={s.label}
              className="flex items-center justify-between gap-4 rounded-2xl bg-white px-5 py-5 text-[#070B1E] shadow-[0_20px_50px_rgba(0,0,0,0.18)] transition-transform duration-300 hover:scale-[1.01] sm:px-8 sm:py-7"
            >
              <p className="max-w-[18ch] font-sans text-[12px] font-medium leading-snug text-slate-500 sm:max-w-[22ch] sm:text-[13px]">
                {s.label}
              </p>
              <span className="shrink-0 font-serif text-[34px] italic font-normal tracking-tight text-[#070B1E] sm:text-[50px]">
                {s.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
