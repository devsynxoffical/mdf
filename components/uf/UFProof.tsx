"use client";

import { useEffect, useRef, useState } from "react";
import Reveal from "./Reveal";

const FIGURES = [
  { value: 255130, prefix: "$", label: "Ad spend managed" },
  { value: 847307, prefix: "$", label: "Revenue collected" },
  { value: 3.32, decimals: 2, label: "Return on ad spend" },
  { value: 13630, label: "Sales attributed" },
];

const BEFORE = [
  "Couldn't sell the offer consistently",
  "No tracking, no visible funnel",
  "Revenue leaking on every campaign",
];

const AFTER = [
  "Architecture rebuilt around one path",
  "Automated follow-up, clean attribution",
  "Predictable, repeatable, scalable",
];

function Figure({
  value,
  prefix = "",
  decimals = 0,
  label,
  delay,
}: {
  value: number;
  prefix?: string;
  decimals?: number;
  label: string;
  delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(value);
      return;
    }
    let raf = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const t0 = performance.now() + delay;
        const tick = (now: number) => {
          const t = Math.min(1, Math.max(0, (now - t0) / 1400));
          setShown(value * (1 - Math.pow(1 - t, 3)));
          if (t < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { rootMargin: "0px 0px -25% 0px" }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value, delay]);

  return (
    <div ref={ref} className="border-t rule-dark pt-5">
      <span className="tnum font-condensed block text-mint text-[clamp(30px,4.4vw,58px)] leading-none">
        {prefix}
        {shown.toLocaleString("en-US", {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        })}
      </span>
      <span className="mt-2.5 block font-mono text-[10px] uppercase tracking-[0.18em] text-mute">
        {label}
      </span>
    </div>
  );
}

/** (04) The proof — one engagement, in numbers. */
export default function UFProof() {
  return (
    <section id="proof" className="uf-dark relative py-[16vh]">
      <div className="mx-auto max-w-[1280px] px-6 md:px-14">
        <p className="uf-eyebrow text-mint">( 04 ) — The Proof</p>

        <div className="mt-6 grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-20">
          <div>
            <h2 className="type-xl text-bone">
              <Reveal as="span">
                <span className="font-condensed block text-[clamp(38px,5.6vw,84px)]">
                  One Client.
                </span>
              </Reveal>
              <Reveal as="span" delay={110}>
                <span className="font-editorial block text-mint text-[clamp(32px,4.6vw,68px)]">
                  Nineteen Months.
                </span>
              </Reveal>
            </h2>
            <p className="mt-7 max-w-[50ch] font-body text-[17px] leading-[1.65] text-mute">
              A coaching business with traffic but no path — a funnel that
              couldn&apos;t convert its own offer and a backend nobody was
              tracking. We rebuilt the architecture, wired the follow-up, and
              let it run.
            </p>

            {/* before / after ledger */}
            <div className="mt-10 grid gap-8 sm:grid-cols-2">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-mute/70">
                  Before
                </p>
                <ul className="mt-4 space-y-3">
                  {BEFORE.map((b) => (
                    <li
                      key={b}
                      className="flex gap-3 font-body text-[14px] leading-[1.5] text-mute"
                    >
                      <span className="mt-[7px] h-px w-3 shrink-0 bg-mute/50" aria-hidden />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-mint">
                  After
                </p>
                <ul className="mt-4 space-y-3">
                  {AFTER.map((a) => (
                    <li
                      key={a}
                      className="flex gap-3 font-body text-[14px] leading-[1.5] text-bone/85"
                    >
                      <span className="mt-[7px] h-px w-3 shrink-0 bg-mint" aria-hidden />
                      {a}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* figures */}
          <div className="grid grid-cols-2 gap-x-8 gap-y-10 self-center">
            {FIGURES.map((f, i) => (
              <Figure key={f.label} {...f} delay={i * 120} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
