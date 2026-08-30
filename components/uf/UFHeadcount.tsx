"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ContourBG from "./ContourBG";
import { playWindMove, stopWind } from "@/components/audio/SoundToggle";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const HIRES = [
  {
    role: "Media Buyer",
    line: "Paid traffic that converts.",
    tag: "( Hire 01 )",
    rest: { x: "-28%", y: 12, r: -8 },
  },
  {
    role: "Funnel Builder",
    line: "Pages, tracking, integrations.",
    tag: "( Hire 02 )",
    rest: { x: "28%", y: -8, r: 6 },
  },
  {
    role: "Automation Engineer",
    line: "Follow-up that never sleeps.",
    tag: "( Hire 03 )",
    rest: { x: "0%", y: 70, r: -2 },
  },
];

/**
 * (03) The Headcount Section (matching hire.unickfunnel.com):
 * Features the three scattered hire cards, the central unified path card,
 * and the reactive cursor wind rush sound effect that tracks cursor speed.
 */
export default function UFHeadcount() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  // 1. Interactive Cursor Velocity Wind Sound
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let lastX = 0;
    let lastY = 0;
    let lastTime = 0;

    const onPointerMove = (e: PointerEvent) => {
      const now = performance.now();
      if (lastTime && now - lastTime < 140) {
        const dt = now - lastTime;
        const dist = Math.hypot(e.clientX - lastX, e.clientY - lastY);
        const speed = Math.min(4.5, dist / dt); // Speed in px/ms

        if (speed > 0.08) {
          const panNorm = (e.clientX / window.innerWidth - 0.5) * 2;
          playWindMove(speed, panNorm);
        }
      }
      lastX = e.clientX;
      lastY = e.clientY;
      lastTime = now;
    };

    const onPointerLeave = () => {
      stopWind();
      lastTime = 0;
    };

    section.addEventListener("pointermove", onPointerMove, { passive: true });
    section.addEventListener("pointerleave", onPointerLeave);

    return () => {
      section.removeEventListener("pointermove", onPointerMove);
      section.removeEventListener("pointerleave", onPointerLeave);
      stopWind();
    };
  }, []);

  // 2. Drop and scatter hire cards on scroll
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const cards = stage.querySelectorAll<HTMLElement>("[data-card]");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      cards.forEach((c) => {
        c.style.opacity = "1";
        c.style.transform = "none";
      });
      return;
    }

    const tween = gsap.fromTo(
      cards,
      { yPercent: -220, rotation: (i) => [-25, 20, -12][i], opacity: 0 },
      {
        yPercent: 0,
        rotation: (i) => HIRES[i].rest.r,
        opacity: 1,
        duration: 1.05,
        ease: "back.out(1.1)",
        stagger: 0.18,
        scrollTrigger: { trigger: stage, start: "top 72%", once: true },
      }
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="uf-light relative overflow-hidden bg-gradient-to-b from-[#EBF2FC] via-[#F3F7FD] to-[#FFFFFF] py-[18vh] text-[#070B1E]"
    >
      <ContourBG tone="light" />

      <div className="relative z-10 mx-auto max-w-[1200px] px-6 md:px-10">
        {/* Section Label */}
        <p className="uf-eyebrow text-cobalt font-bold tracking-[0.16em] font-sans">
          ( 03 ) — The Headcount
        </p>

        {/* Big Impact Headline matching Screenshot */}
        <h2 className="mt-4 leading-[0.92] text-[#070B1E]">
          <span className="font-sans block text-[clamp(42px,7.5vw,98px)] font-black tracking-[-0.04em] uppercase text-[#070B1E]">
            Who It Usually
          </span>
          <span className="font-sans block text-[clamp(42px,7.5vw,98px)] font-black tracking-[-0.04em] uppercase text-cobalt/85">
            Takes.
          </span>
        </h2>

        {/* Subtitle */}
        <p className="mt-6 max-w-[48ch] font-sans text-[17px] sm:text-[19px] font-normal leading-[1.55] text-slate-600">
          Building this takes <span className="font-semibold text-[#070B1E]">three hires</span>. Watch them land.
        </p>

        {/* Card Stage with Scattered Hire Cards & Central Focus Card */}
        <div className="relative mx-auto mt-14 max-w-[920px]">
          {/* Background Scattered Hire Cards */}
          <div ref={stageRef} className="relative h-[320px] sm:h-[360px] w-full">
            {HIRES.map((h, i) => (
              <div
                key={h.role}
                data-card
                className="absolute left-1/2 top-10 w-[270px] sm:w-[320px] -translate-x-1/2 rounded-2xl border border-blue-200/60 bg-white/90 p-6 text-[#070B1E] shadow-[0_15px_40px_rgba(18,84,236,0.1)] backdrop-blur-md"
                style={{
                  marginLeft: h.rest.x,
                  marginTop: h.rest.y,
                  zIndex: i + 1,
                  opacity: 0,
                }}
              >
                <span className="inline-block rounded-full bg-blue-50 px-2.5 py-0.5 font-sans text-[10.5px] font-bold text-cobalt border border-blue-200/50">
                  {h.tag}
                </span>
                <p className="font-sans mt-3 text-[20px] sm:text-[22px] font-extrabold leading-tight text-[#070B1E] tracking-tight">
                  {h.role}
                </p>
                <p className="mt-1.5 font-sans text-[13px] font-normal text-slate-500">
                  {h.line}
                </p>
              </div>
            ))}
          </div>

          {/* Central Foreground Card (matching Screenshot) */}
          <div
            ref={cardRef}
            className="relative z-20 mx-auto -mt-36 sm:-mt-44 max-w-[680px] rounded-3xl bg-[#020926] p-8 sm:p-11 text-white border border-white/15 shadow-[0_30px_70px_rgba(2,9,38,0.45)] transition-all duration-300 hover:border-sky/40 hover:shadow-[0_30px_80px_rgba(18,84,236,0.3)]"
          >
            <p className="font-sans text-[13px] sm:text-[14px] text-slate-400 leading-relaxed">
              Three invoices. Three timelines. Everyone pointing at someone else&apos;s step. Or —
            </p>

            <h3 className="mt-4 font-sans text-[clamp(28px,4.5vw,52px)] font-black tracking-[-0.03em] leading-[1.08] text-white">
              One team holds{" "}
              <span className="text-[#38BDF8]">
                the whole path.
              </span>
            </h3>

            <p className="mt-3 font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-blue-300">
              Architecture · Media Buying · AI Automation
            </p>

            <p className="mt-6 font-sans text-[13.5px] sm:text-[14.5px] text-slate-300 leading-relaxed border-t border-white/10 pt-5">
              One timeline. One invoice. One person accountable for the same revenue number you&apos;re looking at.
            </p>
          </div>
        </div>

        {/* Section Footnote */}
        <p className="mt-14 text-center font-sans text-[13.5px] font-medium text-slate-600">
          Move faster with <span className="text-cobalt font-bold">one dedicated partner · zero finger-pointing</span>
        </p>
      </div>
    </section>
  );
}
