"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import lottie, { AnimationItem } from "lottie-web";
import ContourBG from "./ContourBG";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const CATEGORIES = [
  {
    name: "Architecture",
    tag: "Funnel & Strategy",
    href: "#funnels",
  },
  {
    name: "Acquisition",
    tag: "Paid Traffic & Ads",
    href: "/work-proof",
  },
  {
    name: "Conversion",
    tag: "AI CRM & Pipeline",
    href: "#system",
  },
];

/**
 * Halo Lab Signature Diamond Section:
 * Features the official 3D pre-rendered diamond animation where the bottom tip
 * (pencil point) stays fixed in place on the ground plane, and the crystal spins
 * in 3D as the user scrolls through the section.
 */
export default function UFCrystal() {
  const sectionRef = useRef<HTMLElement>(null);
  const lottieContainerRef = useRef<HTMLDivElement>(null);
  const shadowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const lottieContainer = lottieContainerRef.current;
    const shadow = shadowRef.current;
    if (!section || !lottieContainer) return;

    let anim: AnimationItem | null = null;
    let st: ScrollTrigger | null = null;

    anim = lottie.loadAnimation({
      container: lottieContainer,
      renderer: "canvas",
      loop: false,
      autoplay: false,
      path: "/documents/diamond.json",
    });

    anim.addEventListener("DOMLoaded", () => {
      if (!anim) return;
      const totalFrames = anim.totalFrames > 0 ? anim.totalFrames - 1 : 62;

      st = ScrollTrigger.create({
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        scrub: 0.5,
        onUpdate: (self) => {
          // Drive the exact 3D spin frame from 0 to totalFrames
          const currentFrame = (self.progress * totalFrames * 2) % totalFrames;
          anim?.goToAndStop(currentFrame, true);

          if (shadow) {
            // Subtle breathing shadow pulse in sync with spin
            const scale = 0.95 + 0.1 * Math.sin(self.progress * Math.PI * 4);
            shadow.style.transform = `scale(${scale})`;
          }
        },
      });
    });

    return () => {
      st?.kill();
      anim?.destroy();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="uf-light relative overflow-hidden bg-gradient-to-b from-[#FFFFFF] via-[#F3F7FD] to-[#EBF2FC] py-[18vh] text-[#070B1E]"
    >
      <ContourBG tone="light" />

      {/* Radiant ambient glow behind the diamond */}
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-[420px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.2)_0%,rgba(18,84,236,0.08)_50%,transparent_75%)] blur-2xl" />

      <div className="relative z-10 mx-auto max-w-[1280px] px-6 text-center md:px-14">
        {/* 3D Spinning Diamond Canvas (Bottom point planted on the ground plane) */}
        <div className="relative mx-auto flex h-[280px] w-[320px] items-center justify-center sm:h-[340px] sm:w-[400px] md:h-[400px] md:w-[460px]">
          {/* Soft reflection shadow anchored at the bottom pencil point */}
          <div
            ref={shadowRef}
            className="pointer-events-none absolute bottom-8 sm:bottom-10 h-7 w-44 rounded-full bg-blue-950/20 blur-lg transition-transform duration-150 ease-out md:w-56"
          />

          {/* Lottie Canvas where the bottom point stays planted and diamond spins */}
          <div
            ref={lottieContainerRef}
            className="relative h-full w-full will-change-transform flex items-center justify-center drop-shadow-[0_20px_35px_rgba(18,84,236,0.18)]"
          />
        </div>

        {/* Vision to Brilliance Headline matching Screenshot */}
        <h2 className="mx-auto mt-6 max-w-[860px] font-sans text-[clamp(34px,5.4vw,76px)] font-extrabold tracking-[-0.03em] leading-[1.08] text-[#070B1E]">
          We take products from{" "}
          <span className="relative inline-block">
            <span className="bg-gradient-to-r from-[#070B1E] via-[#1254EC] to-[#38BDF8] bg-clip-text text-transparent">
              vision to brilliance
            </span>
          </span>
        </h2>

        {/* Subtitle */}
        <p className="mx-auto mt-6 max-w-[560px] font-sans text-[16px] font-normal leading-[1.65] text-slate-600 md:text-[18px]">
          Engineering high-ticket client acquisition systems that elevate high-value service brands into industry authorities.
        </p>

        {/* Interactive Capability Categories matching Screenshot */}
        <div className="mt-16 flex flex-wrap items-center justify-center gap-6 md:gap-12">
          {CATEGORIES.map((c) => (
            <a
              key={c.name}
              href={c.href}
              className="group inline-flex items-center gap-3 rounded-full border border-blue-200/70 bg-white/80 px-6 py-3 shadow-[0_4px_20px_rgba(18,84,236,0.06)] backdrop-blur-md transition-all duration-300 hover:border-cobalt hover:bg-white hover:shadow-[0_8px_30px_rgba(18,84,236,0.15)] hover:scale-105"
            >
              <span className="font-sans text-[15px] font-bold text-[#070B1E] transition-colors group-hover:text-cobalt">
                {c.name}
              </span>
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-50 text-cobalt transition-transform duration-300 group-hover:bg-cobalt group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M7 17L17 7M17 7H7M17 7V17" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
