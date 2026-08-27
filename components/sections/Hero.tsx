"use client";

import { useEffect, useRef, useState } from "react";
import { useScrollState } from "@/components/providers/ScrollProvider";

/** Staged hero load sequence: each child fades up on its own beat. */
function Beat({
  delay,
  children,
  className = "",
}: {
  delay: number;
  children: React.ReactNode;
  className?: string;
}) {
  const [on, setOn] = useState(false);
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setOn(true);
      return;
    }
    const t = setTimeout(() => setOn(true), delay);
    return () => clearTimeout(t);
  }, [delay]);
  return <div className={`rise ${on ? "in" : ""} ${className}`}>{children}</div>;
}

function HeroCount() {
  const [val, setVal] = useState(0);
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setVal(1.52);
      return;
    }
    const t0 = performance.now() + 540;
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, Math.max(0, (now - t0) / 1100));
      const eased = 1 - Math.pow(1 - t, 3);
      setVal(1.52 * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);
  return <span className="tabular">${val.toFixed(2)}M</span>;
}

export default function Hero() {
  const { progressRef } = useScrollState();
  const indicatorRef = useRef<HTMLDivElement>(null);

  // Scroll indicator fades out once progress exceeds 0.04.
  useEffect(() => {
    let raf = 0;
    const loop = () => {
      const el = indicatorRef.current;
      if (el) {
        el.style.opacity = progressRef.current > 0.04 ? "0" : "1";
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [progressRef]);

  return (
    <section id="top" className="relative flex min-h-screen items-center pt-[150px] pb-16">
      <div className="mx-auto w-full max-w-[1440px] px-6 md:px-24">
        <div className="w-full text-center md:w-[52%] md:text-left">
          <Beat delay={300}>
            <p className="eyebrow">High-Ticket Client Acquisition</p>
          </Beat>

          <h1 className="mt-6 font-display font-bold leading-[0.95] tracking-display text-bone">
            <Beat delay={420}>
              <span className="block text-[clamp(36px,5.2vw,88px)]">
                How we turned cold strangers into
              </span>
            </Beat>
            <Beat delay={540}>
              <span className="block text-brass text-[clamp(41px,6vw,101px)]">
                <HeroCount /> in 19 months
              </span>
            </Beat>
          </h1>

          <Beat delay={760}>
            <p className="mt-7 max-w-[46ch] font-body text-[19px] leading-[1.55] text-mute md:max-w-[46ch] mx-auto md:mx-0">
              We build you a predictable high-ticket client acquisition system
              with the Million Dollar Funnel™ — without raising ad spend, hiring
              setters, or touching the tech yourself.
            </p>
          </Beat>

          <Beat delay={880}>
            <p className="mt-6 inline-flex items-center gap-2 font-mono text-[13px] text-signal">
              <span className="pulse-dot inline-block h-1.5 w-1.5 rounded-full bg-signal" aria-hidden />
              If it doesn&apos;t perform, we keep working for free.
            </p>
          </Beat>

          <Beat delay={1000}>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center justify-center md:justify-start">
              <a
                href="#book"
                className="rounded-full bg-brass px-8 py-[18px] text-center font-body text-s16 font-semibold text-ink transition-[filter,box-shadow] duration-200 hover:brightness-[1.08] hover:shadow-[0_0_32px_rgba(224,163,64,0.35)]"
              >
                Reserve your spot
              </a>
              <a
                href="#system"
                className="rounded-full border border-mute px-8 py-[18px] text-center font-body text-s16 text-bone transition-colors duration-200 hover:border-bone"
              >
                See the system
              </a>
            </div>
            <p className="mt-5 font-body text-[13px] text-mute">
              100% risk-free · Performance-backed
            </p>
          </Beat>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={indicatorRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center transition-opacity duration-500"
        aria-hidden
      >
        <p className="font-mono text-[11px] uppercase tracking-eyebrow text-mute">
          Scroll
        </p>
        <div className="relative mx-auto mt-2 h-10 w-px overflow-hidden bg-bone/10">
          <span className="scroll-segment absolute left-0 top-0 h-1/4 w-px bg-brass" />
        </div>
      </div>
    </section>
  );
}
