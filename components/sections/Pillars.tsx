"use client";

import { useEffect, useRef } from "react";
import RiseIn from "@/components/ui/RiseIn";
import { useScrollState } from "@/components/providers/ScrollProvider";
import { PILLAR_MINIS } from "./PillarMinis";

const PILLARS = [
  {
    num: "01",
    title: "High-Conversion Landing Architecture",
    body: "Conversion-optimised landing pages that capture attention, qualify on entry, and move prospects into the funnel without friction.",
  },
  {
    num: "02",
    title: "A2P Compliance & Infrastructure",
    body: "Full A2P registration handled end to end, protecting deliverability so your SMS keeps landing at scale.",
  },
  {
    num: "03",
    title: "AI-Led Automations & Workflows",
    body: "Workflows that respond to lead behaviour in seconds, not hours — speed is the single biggest lever on close rate.",
  },
  {
    num: "04",
    title: "Multi-Touch SMS & Email Sequences",
    body: "Behaviour-triggered messaging that nurtures and follows up until the call is on the calendar.",
  },
  {
    num: "05",
    title: "Voicemail Drops for Follow-Up",
    body: "Ringless voicemail layered into follow-up to reach leads that ignore text and email entirely.",
  },
  {
    num: "06",
    title: "CRM Setup, Management & Optimisation",
    body: "Every lead, action, and conversion tracked in one place, so you can see the pipeline instead of guessing at it.",
  },
];

export default function Pillars() {
  const { activeStage, setActiveStage } = useScrollState();
  const blockRefs = useRef<(HTMLDivElement | null)[]>([]);
  const stripRef = useRef<HTMLDivElement>(null);

  // One source of truth: each block crossing mid-viewport sets the active
  // stage; the matching funnel ring pulses via the shared context.
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            const idx = Number((e.target as HTMLElement).dataset.stage);
            setActiveStage(idx);
          }
        }
      },
      { rootMargin: "-45% 0px -45% 0px" }
    );
    blockRefs.current.forEach((el) => el && io.observe(el));
    const section = document.getElementById("system");
    const exitIO = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) setActiveStage(-1);
      },
      { threshold: 0 }
    );
    if (section) exitIO.observe(section);
    return () => {
      io.disconnect();
      exitIO.disconnect();
    };
  }, [setActiveStage]);

  // Keep the mobile strip scrolled to the active stage.
  useEffect(() => {
    const strip = stripRef.current;
    if (!strip || activeStage < 0) return;
    const chip = strip.children[activeStage] as HTMLElement | undefined;
    chip?.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
  }, [activeStage]);

  return (
    <section id="system" className="relative mx-auto max-w-[1440px] px-6 py-32 md:px-24">
      {/* Intro */}
      <div className="max-w-[760px]">
        <RiseIn>
          <p className="bracket-label">The System</p>
        </RiseIn>
        <RiseIn delay={80}>
          <h2 className="mt-5 max-w-[20ch] font-display text-[clamp(34px,4vw,56px)] font-light leading-[1.05] tracking-display text-bone">
            A multi-layered growth framework, not a funnel-building service.
          </h2>
        </RiseIn>
        <RiseIn delay={160}>
          <p className="mt-6 max-w-[60ch] font-body text-[18px] leading-[1.6] text-mute">
            Each layer eliminates leaks, amplifies conversion, and compounds
            into the next. Powered by AI, supervised by our team.
          </p>
        </RiseIn>
      </div>

      {/* Mobile: horizontal scroll-snap stage strip pinned below the intro */}
      <div
        ref={stripRef}
        className="sticky top-24 z-20 mt-12 flex gap-3 overflow-x-auto pb-2 md:hidden"
        style={{ scrollSnapType: "x mandatory" }}
        aria-hidden
      >
        {PILLARS.map((p, i) => (
          <span
            key={p.num}
            className={`shrink-0 rounded-full border px-4 py-2 font-mono text-[11px] uppercase tracking-eyebrow transition-colors ${
              activeStage === i
                ? "border-brass/50 bg-slate2 text-bone"
                : "border-bone/[0.08] text-mute"
            }`}
            style={{ scrollSnapAlign: "center" }}
          >
            {p.num}
          </span>
        ))}
      </div>

      <div className="mt-12 flex gap-16 md:mt-24">
        {/* Sticky stage list — left 40% */}
        <div className="hidden w-[40%] md:block">
          <ol className="sticky top-44 relative">
            {/* connecting line */}
            <span
              aria-hidden
              className="absolute left-[5px] top-3 bottom-3 w-px bg-bone/[0.08]"
            />
            <span
              aria-hidden
              className="absolute left-[5px] top-3 w-px bg-brass transition-[height] duration-500 ease-out"
              style={{
                height:
                  activeStage < 0
                    ? "0%"
                    : `${(activeStage / (PILLARS.length - 1)) * 92 + 4}%`,
              }}
            />
            {PILLARS.map((p, i) => {
              const active = activeStage === i;
              return (
                <li key={p.num} className="relative flex items-center gap-5 py-4 pl-0">
                  <span
                    aria-hidden
                    className={`relative z-10 h-[11px] w-[11px] rounded-full border transition-colors duration-300 ${
                      active
                        ? "border-brass bg-brass"
                        : i < activeStage
                          ? "border-brass bg-ink"
                          : "border-mute bg-ink"
                    }`}
                  />
                  <span
                    className={`font-mono text-[13px] uppercase tracking-eyebrow transition-colors duration-300 ${
                      active ? "text-bone" : "text-mute"
                    }`}
                  >
                    {p.num} — {p.title}
                  </span>
                </li>
              );
            })}
          </ol>
        </div>

        {/* Right column — six full-height blocks */}
        <div className="w-full md:w-[60%]">
          {PILLARS.map((p, i) => {
            const Mini = PILLAR_MINIS[i];
            return (
              <div
                key={p.num}
                ref={(el) => {
                  blockRefs.current[i] = el;
                }}
                data-stage={i}
                className="relative flex min-h-[80vh] flex-col justify-center py-16"
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute -top-2 left-0 font-display text-[96px] font-light leading-none"
                  style={{ color: "rgba(63,224,176,0.14)" }}
                >
                  {p.num}
                </span>
                <h3 className="relative mt-10 max-w-[18ch] font-display text-[28px] md:text-[34px] font-light text-bone">
                  {p.title}
                </h3>
                <p className="mt-5 max-w-[44ch] font-body text-[17px] leading-[1.6] text-mute">
                  {p.body}
                </p>
                <div className="mt-10">
                  <Mini />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
