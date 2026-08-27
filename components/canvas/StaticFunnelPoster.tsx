"use client";

import { useMemo } from "react";

/**
 * Composed static frame of the funnel — the fallback for mobile,
 * low-memory devices and prefers-reduced-motion. Pure SVG, no WebGL,
 * particles frozen mid-flow.
 */
export default function StaticFunnelPoster() {
  const particles = useMemo(() => {
    let s = 7;
    const rand = () => {
      s = (s * 16807) % 2147483647;
      return (s - 1) / 2147483646;
    };
    const pts: { x: number; y: number; r: number; c: string; o: number }[] = [];
    for (let i = 0; i < 140; i++) {
      const t = rand(); // 0 top → 1 bottom
      const y = 90 + t * 560;
      const halfWidth = 30 + (1 - Math.pow(t, 1.6)) * 250;
      const x = 400 + (rand() * 2 - 1) * halfWidth;
      const c = t < 0.33 ? "#8F887C" : t < 0.66 ? "#C0B49A" : "#D9A441";
      pts.push({ x, y, r: 1.2 + rand() * 1.6, c, o: 0.25 + rand() * 0.6 });
    }
    return pts;
  }, []);

  const rings = useMemo(() => {
    const out: { y: number; rx: number }[] = [];
    for (let i = 0; i < 14; i++) {
      const t = Math.pow(i / 13, 1.25);
      out.push({ y: 90 + t * 560, rx: 30 + (1 - Math.pow(t, 1.6)) * 250 });
    }
    return out;
  }, []);

  return (
    <div className="h-full w-full bg-ink">
      <svg
        viewBox="0 0 800 800"
        preserveAspectRatio="xMidYMid slice"
        className="h-full w-full opacity-70"
      >
        <defs>
          <radialGradient id="spoutGlow" cx="50%" cy="88%" r="30%">
            <stop offset="0%" stopColor="#D9A441" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#D9A441" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="800" height="800" fill="#0A0908" />
        <rect width="800" height="800" fill="url(#spoutGlow)" />
        {rings.map((r, i) => (
          <ellipse
            key={i}
            cx="400"
            cy={r.y}
            rx={r.rx}
            ry={r.rx * 0.22}
            fill="none"
            stroke="#8A7440"
            strokeWidth="1"
            opacity={0.5}
          />
        ))}
        {Array.from({ length: 16 }).map((_, i) => {
          const a = (i / 16) * Math.PI * 2;
          const cos = Math.cos(a);
          const topX = 400 + cos * 280;
          const botX = 400 + cos * 30;
          return (
            <line
              key={i}
              x1={topX}
              y1={90}
              x2={botX}
              y2={650}
              stroke="#8A7440"
              strokeWidth="0.8"
              opacity={0.35}
            />
          );
        })}
        {particles.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r={p.r} fill={p.c} opacity={p.o} />
        ))}
        <circle cx="400" cy="700" r="26" fill="#D9A441" opacity="0.9" />
        <circle cx="400" cy="700" r="40" fill="none" stroke="#D9A441" strokeWidth="1" opacity="0.4" />
      </svg>
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2"
        style={{ background: "linear-gradient(to top, #0A0908 10%, transparent)" }}
      />
    </div>
  );
}
