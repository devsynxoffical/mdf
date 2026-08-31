"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  life: number;
  maxLife: number;
  color: string;
};

const PALETTE = [
  "#FFFFFF",
  "#E2E8F0",
  "#94A3B8",
  "#38BDF8",
  "#7DD3FC",
  "#1254EC",
  "#60A5FA",
  "#0B2256",
];

/**
 * Cursor pixel-shatter overlay (Unick / Halo Lab style).
 * Draws grid-snapped squares + flying debris around the pointer.
 */
export default function PixelShatter({
  active = true,
  className = "",
}: {
  active?: boolean;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap || !active) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    if (reduced || coarse) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const parent = wrap.parentElement;
    if (!parent) return;

    let w = 0;
    let h = 0;
    let dpr = 1;
    let raf = 0;
    let hovering = false;
    let mx = -9999;
    let my = -9999;
    let prevMx = -9999;
    let prevMy = -9999;
    const particles: Particle[] = [];
    const CELL = 6;
    const RADIUS = 110;

    const resize = () => {
      const rect = parent.getBoundingClientRect();
      dpr = Math.min(2, window.devicePixelRatio || 1);
      w = Math.max(1, Math.round(rect.width));
      h = Math.max(1, Math.round(rect.height));
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const spawnBurst = (x: number, y: number, strength: number) => {
      const count = Math.min(18, 6 + Math.floor(strength * 14));
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 0.6 + Math.random() * 3.2 * strength;
        const size = CELL * (0.55 + Math.random() * 1.1);
        particles.push({
          x: x + (Math.random() - 0.5) * 18,
          y: y + (Math.random() - 0.5) * 18,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - Math.random() * 0.8,
          size,
          life: 1,
          maxLife: 0.55 + Math.random() * 0.55,
          color: PALETTE[(Math.random() * PALETTE.length) | 0],
        });
      }
      // Cap debris
      if (particles.length > 220) particles.splice(0, particles.length - 220);
    };

    const drawField = () => {
      ctx.clearRect(0, 0, w, h);

      if (!hovering) return;

      const col0 = Math.floor((mx - RADIUS) / CELL);
      const col1 = Math.ceil((mx + RADIUS) / CELL);
      const row0 = Math.floor((my - RADIUS) / CELL);
      const row1 = Math.ceil((my + RADIUS) / CELL);

      for (let row = row0; row <= row1; row++) {
        for (let col = col0; col <= col1; col++) {
          const cx = col * CELL + CELL * 0.5;
          const cy = row * CELL + CELL * 0.5;
          const dx = cx - mx;
          const dy = cy - my;
          const dist = Math.hypot(dx, dy);
          if (dist > RADIUS) continue;

          const t = 1 - dist / RADIUS;
          // denser near cursor, dithered at edges
          const chance = t * t * 0.92;
          // stable-ish hash so grid doesn't flicker every frame too wildly
          // include a time slice so shards shimmer while the cursor rests
          const tick = (performance.now() / 40) | 0;
          const hash =
            ((col * 73856093) ^
              (row * 19349663) ^
              ((mx * 0.2) | 0) ^
              ((my * 0.2) | 0) ^
              (tick * 2654435761)) >>>
            0;
          const rnd = (hash % 1000) / 1000;
          if (rnd > chance * 1.05) continue;

          const jitter = ((hash >> 3) % 5) - 2;
          const size = CELL - 1 + ((hash >> 7) % 3);
          const px = col * CELL + jitter * 0.35;
          const py = row * CELL + (((hash >> 5) % 5) - 2) * 0.35;
          const color = PALETTE[hash % PALETTE.length];
          const alpha = 0.35 + t * 0.65;

          ctx.globalAlpha = alpha;
          ctx.fillStyle = color;
          ctx.fillRect(px, py, size, size);

          // occasional brighter “shard”
          if ((hash & 7) === 0 && t > 0.45) {
            ctx.globalAlpha = alpha * 0.85;
            ctx.fillStyle = "#FFFFFF";
            ctx.fillRect(px + 1, py + 1, Math.max(2, size * 0.45), Math.max(2, size * 0.45));
          }
        }
      }
      ctx.globalAlpha = 1;

      // Flying debris
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life -= 0.016 / p.maxLife;
        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.96;
        p.vy *= 0.96;
        p.vy += 0.04;
        ctx.globalAlpha = Math.max(0, p.life);
        ctx.fillStyle = p.color;
        const s = p.size * (0.55 + p.life * 0.55);
        ctx.fillRect(p.x - s * 0.5, p.y - s * 0.5, s, s);
      }
      ctx.globalAlpha = 1;
    };

    const tick = () => {
      drawField();
      raf = requestAnimationFrame(tick);
    };

    const onEnter = () => {
      hovering = true;
    };

    const onLeave = () => {
      hovering = false;
      mx = my = -9999;
      particles.length = 0;
      ctx.clearRect(0, 0, w, h);
    };

    const onMove = (e: PointerEvent) => {
      const rect = parent.getBoundingClientRect();
      prevMx = mx;
      prevMy = my;
      mx = e.clientX - rect.left;
      my = e.clientY - rect.top;
      hovering = true;

      const speed = Math.min(
        1,
        Math.hypot(mx - prevMx, my - prevMy) / 28
      );
      if (speed > 0.08 || Math.random() > 0.55) {
        spawnBurst(mx, my, 0.35 + speed * 0.9);
      }
    };

    resize();
    raf = requestAnimationFrame(tick);

    const ro = new ResizeObserver(resize);
    ro.observe(parent);

    parent.addEventListener("pointerenter", onEnter);
    parent.addEventListener("pointerleave", onLeave);
    parent.addEventListener("pointermove", onMove, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      parent.removeEventListener("pointerenter", onEnter);
      parent.removeEventListener("pointerleave", onLeave);
      parent.removeEventListener("pointermove", onMove);
    };
  }, [active]);

  return (
    <div
      ref={wrapRef}
      className={`pointer-events-none absolute inset-0 overflow-hidden rounded-[26px] mix-blend-screen ${className}`}
      aria-hidden
    >
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
    </div>
  );
}
