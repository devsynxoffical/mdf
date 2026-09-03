"use client";

import { useEffect, useRef, useState } from "react";
import { useScrollState } from "@/components/providers/ScrollProvider";
import Sparkle from "@/components/ui/Sparkle";

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
    <section
      id="top"
      className="relative flex min-h-screen flex-col justify-between pt-[160px] pb-20"
    >
      <div className="aurora" aria-hidden />

      {/* Headline — top left, light weight, Vesper-style */}
      <div className="relative mx-auto w-full max-w-[1440px] px-6 md:px-16">
        <Beat delay={300}>
          <p className="bracket-label">High-Ticket Client Acquisition</p>
        </Beat>
        <h1 className="mt-6 max-w-[20ch] font-display font-light leading-[1.04] tracking-display text-bone">
          <Beat delay={420}>
            <span className="block text-[clamp(34px,4.2vw,68px)]">
              Cold strangers,
            </span>
          </Beat>
          <Beat delay={540}>
            <span className="block whitespace-nowrap text-[clamp(34px,4.2vw,68px)]">
              turned into{" "}
              <span className="text-brass">
                <HeroCount />
              </span>
            </span>
          </Beat>
          <Beat delay={620}>
            <span className="block text-[clamp(34px,4.2vw,68px)] text-mute">
              in 19 months.
            </span>
          </Beat>
        </h1>
      </div>

      {/* The orb breathes in the center of the viewport, behind this content */}

      {/* Bottom row — mono narration left, subhead + CTAs right */}
      <div className="relative mx-auto grid w-full max-w-[1440px] items-end gap-10 px-6 md:grid-cols-2 md:px-16">
        <div>
          <Beat delay={760}>
            <p className="max-w-[38ch] font-mono text-s12 uppercase leading-[1.8] tracking-eyebrow text-mute">
              It reads your traffic — clicks, replies, bookings — and answers
              in revenue. 6% survive the funnel.
            </p>
          </Beat>
          <Beat delay={880}>
            <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2">
              <span className="bracket-label">Living Funnel</span>
              <span className="text-mute/40" aria-hidden>·</span>
              <span className="bracket-label">Motion Layer</span>
              <span className="text-mute/40" aria-hidden>·</span>
              <span className="bracket-label">Performance-Backed</span>
            </div>
          </Beat>
        </div>

        <div className="md:justify-self-end md:text-right">
          <Beat delay={820}>
            <p className="max-w-[40ch] font-body text-[16px] leading-[1.6] text-mute md:ml-auto">
              A predictable high-ticket acquisition system, built and run for
              you — without raising ad spend, hiring setters, or touching the
              tech yourself.
            </p>
          </Beat>
          <Beat delay={940}>
            <p className="mt-4 inline-flex items-center gap-2 font-mono text-[13px] text-signal">
              <span className="pulse-dot inline-block h-1.5 w-1.5 rounded-full bg-signal" aria-hidden />
              If it doesn&apos;t perform, we keep working for free.
            </p>
          </Beat>
          <Beat delay={1060}>
            <div className="mt-6 flex items-center gap-3 md:justify-end">
              <a
                href="#system"
                className="rounded-full border border-bone/[0.14] px-7 py-4 font-body text-[15px] text-bone transition-colors duration-200 hover:border-bone/40"
              >
                See the system
              </a>
              <a
                href="/book"
                className="rounded-full bg-brass px-7 py-4 font-body text-[15px] font-semibold text-ink transition-[filter,box-shadow] duration-200 hover:brightness-[1.08] hover:shadow-[0_0_32px_rgba(217,164,65,0.35)]"
              >
                Reserve your spot
              </a>
              <a
                href="/book"
                aria-label="Reserve your spot"
                className="sparkle-btn h-[52px] w-[52px]"
              >
                <Sparkle size={18} />
              </a>
            </div>
          </Beat>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={indicatorRef}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center transition-opacity duration-500"
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
