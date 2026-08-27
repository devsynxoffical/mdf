"use client";

import { useEffect, useRef, useState } from "react";

function easeOutPower2(t: number) {
  return 1 - (1 - t) * (1 - t);
}

/**
 * Counts up once when it crosses 60% of the viewport. Tabular numerals so
 * the layout never jitters while counting.
 */
export default function Counter({
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
  duration = 1200,
  delay = 0,
  format = true,
  className = "",
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  duration?: number;
  delay?: number;
  format?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started.current) return;
        started.current = true;
        io.disconnect();
        if (reduced) {
          setDisplay(value);
          return;
        }
        const t0 = performance.now() + delay;
        let raf = 0;
        const tick = (now: number) => {
          const t = Math.min(1, Math.max(0, (now - t0) / duration));
          setDisplay(value * easeOutPower2(t));
          if (t < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf);
      },
      { rootMargin: "0px 0px -40% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [value, duration, delay]);

  const num = format
    ? display.toLocaleString("en-US", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })
    : display.toFixed(decimals);

  return (
    <span ref={ref} className={`tabular ${className}`}>
      {prefix}
      {num}
      {suffix}
    </span>
  );
}
