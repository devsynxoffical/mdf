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
    tags: ["Landing Pages", "Qualification", "CRO"],
    outcome: "Cold click → qualified lead",
  },
  {
    num: "02",
    title: "A2P Compliance & Infrastructure",
    body: "Full A2P registration handled end to end, protecting deliverability so your SMS keeps landing at scale.",
    tags: ["A2P 10DLC", "Deliverability", "Compliance"],
    outcome: "Every message lands",
  },
  {
    num: "03",
    title: "AI-Led Automations & Workflows",
    body: "Workflows that respond to lead behaviour in seconds, not hours — speed is the single biggest lever on close rate.",
    tags: ["AI Workflows", "Speed-to-Lead", "Behaviour Triggers"],
    outcome: "Response in seconds",
  },
  {
    num: "04",
    title: "Multi-Touch SMS & Email Sequences",
    body: "Behaviour-triggered messaging that nurtures and follows up until the call is on the calendar.",
    tags: ["SMS", "Email", "Nurture Sequences"],
    outcome: "Follow-up that never sleeps",
  },
  {
    num: "05",
    title: "Voicemail Drops for Follow-Up",
    body: "Ringless voicemail layered into follow-up to reach leads that ignore text and email entirely.",
    tags: ["Ringless VM", "Re-Engagement", "Reach"],
    outcome: "Unreachable leads, reached",
  },
  {
    num: "06",
    title: "CRM Setup, Management & Optimisation",
    body: "Every lead, action, and conversion tracked in one place, so you can see the pipeline instead of guessing at it.",
    tags: ["CRM", "Tracking", "Pipeline Visibility"],
    outcome: "One pipeline, zero guessing",
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
    <section id="system" className="relative mx-auto max-w-[1440px] px-6 py-32 md:px-16">
      {/* Intro */}
      <div className="max-w-[760px]">
        <RiseIn>
          <p className="bracket-label">The System · Six Layers</p>
        </RiseIn>
        <RiseIn delay={80}>
          <h2 className="mt-5 max-w-[22ch] font-display text-[clamp(34px,4vw,56px)] font-light leading-[1.08] tracking-display text-bone">
            A multi-layered growth framework,{" "}
            <span className="text-mute">not a funnel-building service.</span>
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
            className={`shrink-0 rounded-full border px-4 py-2 font-mono text-[11px] uppercase tracking-eyebrow backdrop-blur-md transition-colors ${
              activeStage === i
                ? "border-brass/50 bg-slate2/80 text-bone"
                : "border-bone/[0.08] bg-ink/50 text-mute"
            }`}
            style={{ scrollSnapAlign: "center" }}
          >
            {p.num}
          </span>
        ))}
      </div>

      <div className="mt-12 flex gap-16 md:mt-24">
        {/* Sticky stage rail — left 40% */}
        <div className="hidden w-[38%] md:block">
          <ol className="sticky top-44 relative">
            {/* connecting line */}
            <span
              aria-hidden
              className="absolute left-[15px] top-4 bottom-4 w-px bg-bone/[0.08]"
            />
            <span
              aria-hidden
              className="absolute left-[15px] top-4 w-px bg-gradient-to-b from-brass to-signal transition-[height] duration-500 ease-out"
              style={{
                height:
                  activeStage < 0
                    ? "0%"
                    : `${(activeStage / (PILLARS.length - 1)) * 90 + 5}%`,
              }}
            />
            {PILLARS.map((p, i) => {
              const active = activeStage === i;
              const passed = activeStage > i;
              return (
                <li key={p.num} className="relative flex items-center gap-5 py-4">
                  <span
                    aria-hidden
                    className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border font-mono text-[11px] transition-all duration-300 ${
                      active
                        ? "border-brass bg-brass/15 text-brass shadow-[0_0_18px_rgba(217,164,65,0.35)]"
                        : passed
                          ? "border-brass/50 bg-ink text-brass/70"
                          : "border-bone/[0.14] bg-ink text-mute"
                    }`}
                  >
                    {p.num}
                  </span>
                  <span className="min-w-0">
                    <span
                      className={`block truncate font-body text-[15px] font-medium transition-colors duration-300 ${
                        active ? "text-bone" : "text-mute"
                      }`}
                    >
                      {p.title}
                    </span>
                    <span
                      className={`block font-mono text-[10px] uppercase tracking-[0.14em] transition-all duration-300 ${
                        active ? "text-signal opacity-100" : "opacity-0"
                      }`}
                    >
                      {p.outcome}
                    </span>
                  </span>
                </li>
              );
            })}
          </ol>
        </div>

        {/* Right column — glass panels, one per layer */}
        <div className="w-full md:w-[62%]">
          {PILLARS.map((p, i) => {
            const Mini = PILLAR_MINIS[i];
            const active = activeStage === i;
            return (
              <div
                key={p.num}
                ref={(el) => {
                  blockRefs.current[i] = el;
                }}
                data-stage={i}
                className="flex min-h-[72vh] items-center py-10"
              >
                <div
                  className={`relative w-full overflow-hidden rounded-[24px] border p-8 backdrop-blur-xl transition-all duration-500 md:p-12 ${
                    active
                      ? "border-brass/25 shadow-[0_0_60px_rgba(217,164,65,0.08)]"
                      : "border-bone/[0.08]"
                  }`}
                  style={{ background: "rgba(10,13,20,0.72)" }}
                >
                  {/* corner glow + recessed stage numeral */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0"
                    style={{
                      background: `radial-gradient(60% 50% at ${i % 2 ? "100%" : "0%"} 0%, rgba(${
                        i % 2 ? "192,180,154" : "217,164,65"
                      },0.08), transparent 65%)`,
                    }}
                  />
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -top-8 right-4 select-none font-display text-[150px] font-light leading-none md:text-[190px]"
                    style={{
                      background: "linear-gradient(135deg, rgba(217,164,65,0.16), rgba(192,180,154,0.14))",
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                      color: "transparent",
                    }}
                  >
                    {p.num}
                  </span>

                  <div className="relative">
                    <p className="bracket-label">
                      Stage {p.num} / 06
                    </p>
                    <h3 className="mt-5 max-w-[18ch] font-display text-[28px] font-light leading-[1.15] text-bone md:text-[36px]">
                      {p.title}
                    </h3>
                    <p className="mt-5 max-w-[46ch] font-body text-[17px] leading-[1.65] text-mute">
                      {p.body}
                    </p>

                    <div className="mt-7 flex flex-wrap gap-2">
                      {p.tags.map((t) => (
                        <span
                          key={t}
                          className="rounded-full border border-bone/[0.1] px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-mute"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="mt-9 flex flex-wrap items-end justify-between gap-6">
                      <p className="inline-flex items-center gap-2.5 font-mono text-[12px] text-signal">
                        <span className="inline-block h-1.5 w-1.5 rounded-full bg-signal" aria-hidden />
                        {p.outcome.toUpperCase()}
                      </p>
                      <div className="opacity-90">
                        <Mini />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
