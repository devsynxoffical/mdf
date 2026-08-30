"use client";

import { useEffect, useRef } from "react";
import { playWindMove } from "@/components/audio/SoundToggle";

type Stamp = {
  x: number;
  y: number;
  r: number;
  life: number; // 1 → 0
  decay: number;
  gold: boolean;
};

/**
 * Pointer-reactive ink: moving the cursor smears soft charcoal blots across
 * the paper that swell and dissolve, with occasional gold sparks in the
 * trail. Pure 2D canvas, no libraries; renders a static composition for
 * touch devices and prefers-reduced-motion.
 */
export default function InkTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(2, window.devicePixelRatio || 1);
    let width = 0;
    let height = 0;
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const stamps: Stamp[] = [];
    const MAX_STAMPS = 260;

    const stamp = (x: number, y: number, r: number, gold = false) => {
      stamps.push({
        x,
        y,
        r,
        life: 1,
        decay: gold ? 0.012 : 0.0065,
        gold,
      });
      if (stamps.length > MAX_STAMPS) stamps.splice(0, stamps.length - MAX_STAMPS);
    };

    const staticComposition = () => {
      // frozen smear so the hero still has depth without a pointer
      let s = 7;
      const rand = () => ((s = (s * 16807) % 2147483647) - 1) / 2147483646;
      for (let i = 0; i < 26; i++) {
        const t = i / 25;
        stamp(
          width * (0.3 + t * 0.45 + (rand() - 0.5) * 0.06),
          height * (0.35 + Math.sin(t * Math.PI * 1.6) * 0.14),
          30 + rand() * 46
        );
      }
      for (let i = 0; i < 8; i++) {
        stamp(width * (0.35 + rand() * 0.35), height * (0.3 + rand() * 0.3), 2 + rand() * 2, true);
      }
    };

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const interactive = !reduced && !coarse;

    let last: { x: number; y: number } | null = null;
    let moveCount = 0;
    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      if (y < 0 || y > height) return;
      if (last) {
        const dx = x - last.x;
        const dy = y - last.y;
        const dist = Math.hypot(dx, dy);
        const speed = Math.min(80, dist);
        // interpolate so fast moves leave a continuous smear
        const steps = Math.max(1, Math.floor(dist / 14));
        for (let i = 1; i <= steps; i++) {
          stamp(
            last.x + (dx * i) / steps,
            last.y + (dy * i) / steps,
            22 + speed * 0.55
          );
        }
        if (++moveCount % 6 === 0) {
          stamp(x + (Math.random() - 0.5) * 40, y + (Math.random() - 0.5) * 40, 2.2, true);
        }
        if (speed > 5) {
          playWindMove(speed * 0.05, (x / width - 0.5) * 2);
        }
      }
      last = { x, y };
    };
    if (interactive) {
      window.addEventListener("pointermove", onMove, { passive: true });
    } else {
      staticComposition();
    }

    let raf = 0;
    const frame = () => {
      ctx.clearRect(0, 0, width, height);
      for (let i = stamps.length - 1; i >= 0; i--) {
        const st = stamps[i];
        st.life -= st.decay;
        if (st.life <= 0) {
          stamps.splice(i, 1);
          continue;
        }
        if (!interactive) st.life = Math.max(st.life, 0.55); // freeze static frame
        const r = st.gold ? st.r : st.r * (1.15 - st.life * 0.15);
        if (st.gold) {
          ctx.globalAlpha = st.life * 0.95;
          ctx.fillStyle = Math.random() > 0.4 ? "#60A5FA" : "#FFAE33";
          ctx.beginPath();
          ctx.arc(st.x, st.y, r, 0, Math.PI * 2);
          ctx.fill();
        } else {
          const g = ctx.createRadialGradient(st.x, st.y, 0, st.x, st.y, r);
          g.addColorStop(0, `rgba(56,189,248,${0.32 * st.life})`);
          g.addColorStop(0.45, `rgba(18,84,236,${0.22 * st.life})`);
          g.addColorStop(1, "rgba(5,8,20,0)");
          ctx.globalAlpha = 1;
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.arc(st.x, st.y, r, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      if (interactive) window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full"
      aria-hidden
    />
  );
}
