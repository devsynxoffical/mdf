"use client";

import { useEffect, useRef, useState } from "react";
import Counter from "@/components/ui/Counter";
import RiseIn from "@/components/ui/RiseIn";
import PlayButton from "@/components/ui/PlayButton";

const BEFORE_ITEMS = [
  "Couldn't sell the low-ticket offer consistently",
  "Funnel had no proper tracking or flow",
  "Revenue leaking on every campaign",
  "Chasing high-ticket without a foundation",
];

const AFTER_ITEMS = [
  "Funnel rebuilt with strategic architecture",
  "Automated follow-up and clean tracking in place",
  "$255,130 spent → $847,307 collected",
  "3.32 ROAS across 13,630 low-ticket sales",
  "Predictable, scalable revenue without guesswork",
  "A backend his competitors still can't reverse-engineer",
];

export default function CaseStudy() {
  const afterRef = useRef<HTMLDivElement>(null);
  const [afterIn, setAfterIn] = useState(false);

  useEffect(() => {
    const el = afterRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAfterIn(true);
          io.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section id="case-studies" className="mx-auto max-w-[1200px] px-6 py-32 md:px-12">
      {/* Intro */}
      <RiseIn>
        <p className="font-mono text-s12 uppercase tracking-eyebrow text-signal">
          Case Study · Low-Ticket to Predictable Scale
        </p>
      </RiseIn>
      <RiseIn delay={80}>
        <h2 className="mt-5 font-display text-[clamp(30px,4vw,52px)] font-light tracking-display text-bone">
          13,630 sales. $847,307 collected. 3.32 ROAS.
        </h2>
      </RiseIn>
      <RiseIn delay={160}>
        <p className="mt-5 max-w-[58ch] font-body text-[18px] leading-[1.6] text-mute">
          A coaching client stuck in the high-ticket hype, with a funnel that
          couldn&apos;t reliably sell his low-ticket offer. The real problem was
          a backend with no tracking, no follow-up, and no conversion path.
        </p>
      </RiseIn>

      {/* The split */}
      <div className="mt-16 grid gap-6 md:grid-cols-2">
        {/* BEFORE — enters flat, no movement: stagnant */}
        <RiseIn className="!transform-none">
          <div className="h-full rounded-[20px] border border-bone/[0.06] bg-slate2 p-10">
            <p className="font-mono text-s12 uppercase tracking-eyebrow text-mute">
              How he came to us
            </p>
            <ul className="mt-8 space-y-5">
              {BEFORE_ITEMS.map((item) => (
                <li key={item} className="flex items-start gap-4">
                  <span
                    aria-hidden
                    className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full border border-mute"
                  />
                  <span className="font-body text-[16px] leading-[1.5] text-mute">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </RiseIn>

        {/* AFTER — rises 32px with its glow ramping in: lift */}
        <div
          ref={afterRef}
          className="h-full rounded-[20px] p-10 transition-all"
          style={{
            border: "1px solid rgba(63,224,176,0.25)",
            background:
              "radial-gradient(120% 80% at 0% 0%, rgba(63,224,176,0.10), transparent 60%), #121826",
            opacity: afterIn ? 1 : 0,
            transform: afterIn ? "translateY(0)" : "translateY(32px)",
            transitionDuration: "800ms",
            transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          <p className="font-mono text-s12 uppercase tracking-eyebrow text-brass">
            What the system did
          </p>
          <ul className="mt-8 space-y-5">
            {AFTER_ITEMS.map((item, i) => (
              <li
                key={item}
                className="flex items-start gap-4"
                style={{
                  opacity: afterIn ? 1 : 0,
                  transform: afterIn ? "translateY(0)" : "translateY(12px)",
                  transition: `opacity 500ms cubic-bezier(0.16,1,0.3,1) ${200 + i * 60}ms, transform 500ms cubic-bezier(0.16,1,0.3,1) ${200 + i * 60}ms`,
                }}
              >
                <span aria-hidden className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-brass" />
                <span className="font-body text-[16px] leading-[1.5] text-bone/85">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Numbers strip */}
      <div className="mt-12 grid grid-cols-2 gap-y-10 md:grid-cols-4">
        {[
          { label: "Spent", node: <Counter value={255130} prefix="$" /> },
          { label: "Collected", node: <Counter value={847307} prefix="$" delay={100} /> },
          { label: "ROAS", node: <Counter value={3.32} decimals={2} format={false} delay={200} /> },
          { label: "Sales", node: <Counter value={13630} delay={300} /> },
        ].map((s, i) => (
          <RiseIn key={s.label} delay={i * 100} className="text-center">
            <span className="font-display text-[32px] md:text-[44px] font-light text-brass">
              {s.node}
            </span>
            <p className="mt-2 font-mono text-[11px] uppercase tracking-eyebrow text-mute">
              {s.label}
            </p>
          </RiseIn>
        ))}
      </div>

      {/* Video slot */}
      <RiseIn delay={100} className="mt-16">
        <p className="mb-4 text-center font-mono text-s12 uppercase tracking-eyebrow text-mute">
          Click below to watch first
        </p>
        <button
          className="group relative block w-full overflow-hidden rounded-[20px]"
          style={{ border: "1px solid rgba(63,224,176,0.25)", aspectRatio: "16/9" }}
          aria-label="Play case study video"
        >
          <span
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(80% 100% at 50% 0%, rgba(142,123,255,0.06), transparent), radial-gradient(90% 90% at 50% 100%, rgba(63,224,176,0.10), transparent), #121826",
            }}
          />
          <span aria-hidden className="absolute inset-0 bg-ink/40 transition-colors duration-250 group-hover:bg-ink/25" />
          <span className="absolute inset-0 flex items-center justify-center">
            <PlayButton size={72} />
          </span>
        </button>
      </RiseIn>
    </section>
  );
}
