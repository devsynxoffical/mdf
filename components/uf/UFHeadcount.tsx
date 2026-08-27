"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ContourBG from "./ContourBG";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const HIRES = [
  {
    role: "Media Buyer",
    line: "Feeds the funnel with paid traffic that converts.",
    tag: "( Hire 01 )",
    rest: { x: "-26%", y: 10, r: -8 },
  },
  {
    role: "Funnel Builder",
    line: "Pages, tracking, integrations — wired together.",
    tag: "( Hire 02 )",
    rest: { x: "26%", y: -6, r: 6 },
  },
  {
    role: "Automation Engineer",
    line: "Sets up the follow-up that never sleeps.",
    tag: "( Hire 03 )",
    rest: { x: "0%", y: 64, r: -2 },
  },
];

/** (03) The headcount — three job cards drop and scatter onto the page. */
export default function UFHeadcount() {
  const stageRef = useRef<HTMLDivElement>(null);

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
      { yPercent: -260, rotation: (i) => [-30, 24, -14][i], opacity: 0 },
      {
        yPercent: 0,
        rotation: (i) => HIRES[i].rest.r,
        opacity: 1,
        duration: 1.05,
        ease: "back.out(1.1)",
        stagger: 0.22,
        scrollTrigger: { trigger: stage, start: "top 70%", once: true },
      }
    );
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <section className="uf-light relative overflow-hidden py-[16vh]">
      <ContourBG tone="light" />
      <div className="relative mx-auto max-w-[1200px] px-6 md:px-10">
        <p className="uf-eyebrow text-mint-deep">( 03 ) — The Headcount</p>
        <h2 className="mt-6 leading-[0.86] text-inkdeep">
          <span className="font-condensed block text-[clamp(44px,7vw,96px)]">
            Who It Usually
          </span>
          <span className="font-editorial block text-mint-deep text-[clamp(36px,5.6vw,78px)]">
            Takes.
          </span>
        </h2>
        <p className="mt-6 max-w-[40ch] font-body text-[17px] leading-[1.6] text-inkdeep/60">
          Doing this in-house takes three hires. Watch them land.
        </p>

        {/* card stage */}
        <div ref={stageRef} className="relative mx-auto mt-10 h-[440px] max-w-[820px] md:h-[400px]">
          {HIRES.map((h, i) => (
            <div
              key={h.role}
              data-card
              className="absolute left-1/2 top-1/4 w-[280px] md:w-[330px] -translate-x-1/2 rounded-[6px] bg-[#FBFAF6] p-7 text-inkdeep shadow-[0_24px_60px_rgba(13,12,10,0.18)]"
              style={{
                marginLeft: h.rest.x,
                marginTop: h.rest.y,
                zIndex: i + 1,
                opacity: 0,
              }}
            >
              <p className="font-mono text-[10px] tracking-[0.18em] text-inkdeep/50">
                {h.tag}
              </p>
              <p className="font-condensed mt-4 text-[26px] md:text-[30px] leading-none">
                {h.role}
              </p>
              <p className="mt-3 font-body text-[14px] leading-[1.5] text-inkdeep/65">
                {h.line}
              </p>
              <p className="mt-6 border-t border-inkdeep/10 pt-3 font-mono text-[9px] tracking-[0.16em] text-inkdeep/45">
                SALARY · TOOLS · MANAGEMENT
              </p>
            </div>
          ))}
        </div>

        <p className="mt-10 text-center font-mono text-[12px] uppercase tracking-[0.18em] text-inkdeep/70">
          Or: <span className="text-mint-deep">one team · one invoice · one timeline</span>
        </p>
      </div>
    </section>
  );
}
