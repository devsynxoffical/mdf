"use client";

import { useEffect, useRef, useState } from "react";

const LOAD_MS = 2000;
const EXPAND_MS = 1100;
const FAILSAFE_MS = 5500;

function DigitColumn({ digit }: { digit: number }) {
  return (
    <span className="relative inline-block h-[0.92em] w-[0.58em] overflow-hidden">
      <span
        className="absolute inset-x-0 top-0 will-change-transform"
        style={{
          transform: `translate3d(0, ${-digit * 10}%, 0)`,
          transition: "transform 380ms cubic-bezier(0.16, 1, 0.3, 1)",
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
      className={`flex select-none items-start font-sans text-[clamp(64px,16vw,150px)] font-extrabold leading-none tracking-[-0.04em] text-white transition-opacity duration-500 ${
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
 * StartScreen: Signature Million Dollar Funnel™ Splash Screen Opening Effect
 * Mechanical rolling counter (000 → 100) → Logo Reveal → Radial Portal Expansion into the site
 */
export default function StartScreen() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const markWrapRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<Phase>("load");
  const [markVisible, setMarkVisible] = useState(false);
  const finishedRef = useRef(false);

  useEffect(() => {
    let cancelled = false;
    let raf = 0;
    let expandRaf = 0;
    const timers: number[] = [];

    const finishBoot = () => {
      try {
        document.documentElement.classList.remove("mdf-booting");
        document.body.style.overflow = "";
      } catch {
        /* ignore */
      }
    };

    const endIntro = () => {
      if (cancelled || finishedRef.current) return;
      finishedRef.current = true;
      finishBoot();

      const el = overlayRef.current;
      if (el) {
        el.style.webkitMaskImage = "none";
        el.style.maskImage = "none";
        el.style.transform = "";
      }
      if (markWrapRef.current) {
        markWrapRef.current.style.transform = "";
        markWrapRef.current.style.opacity = "";
      }

      setPhase("done");
    };

    // Safety failsafe timer so user is never trapped
    timers.push(window.setTimeout(endIntro, FAILSAFE_MS));

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      endIntro();
      return () => {
        cancelled = true;
        timers.forEach((id) => window.clearTimeout(id));
      };
    }

    try {
      document.body.style.overflow = "hidden";
    } catch {
      /* ignore */
    }

    const start = performance.now();

    const runExpand = () => {
      if (cancelled || finishedRef.current) return;
      setPhase("expand");
      finishBoot();

      const expandStart = performance.now();
      const tickExpand = (now: number) => {
        if (cancelled || finishedRef.current) return;
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
      if (cancelled || finishedRef.current) return;
      const t = Math.min(1, (now - start) / LOAD_MS);
      const eased = 1 - Math.pow(1 - t, 3);
      setProgress(Math.round(eased * 100));

      if (t < 1) {
        raf = requestAnimationFrame(tick);
        return;
      }

      setMarkVisible(true);
      timers.push(window.setTimeout(runExpand, 380));
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

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[200] flex bg-black"
      role="status"
      aria-live="polite"
      aria-hidden={done}
      aria-label={
        done ? undefined : expanding ? "Opening site" : `Loading ${progress} percent`
      }
      hidden={done}
      style={done ? { display: "none" } : undefined}
    >
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div
          className={`h-[2px] w-20 overflow-hidden bg-white/15 transition-all duration-400 sm:w-24 ${
            markVisible || done ? "scale-x-0 opacity-0" : "scale-x-100 opacity-100"
          }`}
        >
          <div
            className="h-full bg-gradient-to-r from-[#1254EC] via-[#38BDF8] to-white transition-[width] duration-150 ease-out shadow-[0_0_15px_rgba(56,189,248,0.9)]"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div
          ref={markWrapRef}
          className={`absolute inset-0 flex items-center justify-center will-change-transform transition-opacity duration-500 ${
            markVisible && !done ? "opacity-100" : "opacity-0"
          }`}
          style={{ transform: "scale(1)" }}
          aria-hidden
        >
          <div className="flex h-16 w-[4.5rem] items-end justify-center sm:h-20 sm:w-24 drop-shadow-[0_0_35px_rgba(56,189,248,0.7)]">
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
        <ProgressDigits value={progress} fade={expanding || markVisible || done} />
      </div>
    </div>
  );
}
