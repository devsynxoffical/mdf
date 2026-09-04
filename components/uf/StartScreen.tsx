"use client";

import { useEffect, useRef, useState } from "react";

const LOAD_MS = 2400;
const EXPAND_MS = 1300;
const FAILSAFE_MS = 7000;

function DigitColumn({ digit }: { digit: number }) {
  return (
    <span className="relative inline-block h-[0.92em] w-[0.58em] overflow-hidden">
      <span
        className="absolute inset-x-0 top-0 will-change-transform"
        style={{
          transform: `translate3d(0, ${-digit * 10}%, 0)`,
          transition: "transform 420ms cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        {Array.from({ length: 10 }, (_, n) => (
          <span
            key={n}
            className="flex h-[0.92em] items-center justify-center font-sans font-extrabold leading-none tracking-tight text-white"
          >
            {n}
          </span>
        ))}
      </span>
    </span>
  );
}

function ProgressDigits({ value, fade }: { value: number; fade: boolean }) {
  const padded = Math.min(100, Math.max(0, value)).toString().padStart(3, "0");
  return (
    <div
      className={`flex select-none items-start font-sans text-[clamp(72px,18vw,168px)] font-extrabold leading-none tracking-[-0.04em] text-white transition-opacity duration-500 ${
        fade ? "opacity-0" : "opacity-100"
      }`}
      aria-hidden
    >
      {padded.split("").map((d, i) => (
        <DigitColumn key={i} digit={Number(d)} />
      ))}
    </div>
  );
}

type Phase = "load" | "expand" | "done";

/**
 * Start screen: count up → M grows → site opens.
 * When finished, uses display:none (not opacity) so it can't cover the page.
 */
export default function StartScreen() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const markWrapRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<Phase>("load");
  const [markVisible, setMarkVisible] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let raf = 0;
    let expandRaf = 0;
    const timers: number[] = [];

    const finishBoot = () => {
      document.documentElement.classList.remove("mdf-booting");
      document.body.style.overflow = "";
    };

    const endIntro = () => {
      if (cancelled) return;
      finishBoot();
      const el = overlayRef.current;
      if (el) {
        el.style.webkitMaskImage = "";
        el.style.maskImage = "";
        el.style.transform = "";
      }
      if (markWrapRef.current) {
        markWrapRef.current.style.transform = "";
        markWrapRef.current.style.opacity = "";
      }
      setPhase("done");
    };

    // Never leave the site stuck behind the loader
    timers.push(window.setTimeout(endIntro, FAILSAFE_MS));

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      endIntro();
      return () => {
        cancelled = true;
        timers.forEach((id) => window.clearTimeout(id));
      };
    }

    document.body.style.overflow = "hidden";
    const start = performance.now();

    const runExpand = () => {
      if (cancelled) return;
      setPhase("expand");
      document.documentElement.classList.remove("mdf-booting");

      const expandStart = performance.now();
      const tickExpand = (now: number) => {
        if (cancelled) return;
        const t = Math.min(1, (now - expandStart) / EXPAND_MS);
        const eased =
          t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
        const hole = eased * 160;
        const scale = 1 + eased * 58;
        const soft = Math.min(hole + 6, 160);

        const el = overlayRef.current;
        if (el) {
          const mask = `radial-gradient(circle at 50% 50%, transparent ${hole}%, #000 ${soft}%)`;
          el.style.webkitMaskImage = mask;
          el.style.maskImage = mask;
        }
        if (markWrapRef.current) {
          markWrapRef.current.style.transform = `scale(${scale})`;
          markWrapRef.current.style.opacity = String(1 - eased * 0.85);
        }

        if (t < 1) {
          expandRaf = requestAnimationFrame(tickExpand);
          return;
        }

        endIntro();
      };

      expandRaf = requestAnimationFrame(tickExpand);
    };

    const tick = (now: number) => {
      if (cancelled) return;
      const t = Math.min(1, (now - start) / LOAD_MS);
      const eased = 1 - Math.pow(1 - t, 3);
      setProgress(Math.round(eased * 100));

      if (t < 1) {
        raf = requestAnimationFrame(tick);
        return;
      }

      setMarkVisible(true);
      timers.push(window.setTimeout(runExpand, 480));
    };

    raf = requestAnimationFrame(tick);

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      cancelAnimationFrame(expandRaf);
      timers.forEach((id) => window.clearTimeout(id));
      finishBoot();
    };
  }, []);

  const expanding = phase === "expand";
  const done = phase === "done";

  if (done) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[200] flex bg-black"
      role="status"
      aria-live="polite"
      aria-label={expanding ? "Opening site" : `Loading ${progress} percent`}
    >
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div
          className={`h-[2px] w-20 overflow-hidden bg-white/15 transition-all duration-400 sm:w-24 ${
            markVisible ? "scale-x-0 opacity-0" : "scale-x-100 opacity-100"
          }`}
        >
          <div
            className="h-full bg-white transition-[width] duration-150 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div
          ref={markWrapRef}
          className={`absolute inset-0 flex items-center justify-center will-change-transform transition-opacity duration-500 ${
            markVisible ? "opacity-100" : "opacity-0"
          }`}
          style={{ transform: "scale(1)" }}
          aria-hidden
        >
          <div className="flex h-16 w-[4.5rem] items-end justify-center sm:h-20 sm:w-24">
            <svg viewBox="0 0 64 56" className="h-full w-full">
              <rect x="2" y="4" width="14" height="48" rx="1.5" fill="white" />
              <rect x="48" y="4" width="14" height="48" rx="1.5" fill="white" />
              <path
                d="M16 8 L32 36 L48 8"
                fill="none"
                stroke="white"
                strokeWidth="12"
                strokeLinejoin="round"
                strokeLinecap="square"
              />
            </svg>
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 left-5 sm:bottom-8 sm:left-8 md:bottom-10 md:left-12">
        <ProgressDigits value={progress} fade={expanding || markVisible} />
      </div>
    </div>
  );
}
