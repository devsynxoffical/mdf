"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useScrollState } from "@/components/providers/ScrollProvider";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const TOTAL_FRAMES = 101;
/** Skip early static dwell — zoom animation starts immediately. */
const START_FRAME = 15;
const PLAYABLE = TOTAL_FRAMES - START_FRAME;

const frameSrc = (i: number) =>
  `/frames/lusion/frame_${String(i).padStart(3, "0")}.webp`;

/**
 * High-Performance Butter-Smooth 60fps Canvas Scrubber
 * Uses continuous requestAnimationFrame lerping & sub-frame cross-fading for cinematic fluidity.
 */
export default function LusionAstronautSection() {
  const { reducedMotion } = useScrollState();
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);
  const progressBarRef = useRef<HTMLDivElement>(null);

  const [ready, setReady] = useState(false);
  const [atFinale, setAtFinale] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let dead = false;
    let targetProgress = 0;
    let currentProgress = 0;
    let rafId: number | null = null;

    const images: (HTMLImageElement | null)[] = new Array(TOTAL_FRAMES).fill(null);
    imagesRef.current = images;

    // Helper to get nearest valid image
    const getValidImage = (idx: number): HTMLImageElement | null => {
      const clamped = Math.max(0, Math.min(TOTAL_FRAMES - 1, Math.round(idx)));
      if (images[clamped]?.complete && images[clamped]!.naturalWidth) {
        return images[clamped];
      }
      for (let d = 1; d < TOTAL_FRAMES; d++) {
        const a = clamped - d;
        const b = clamped + d;
        if (a >= 0 && images[a]?.complete && images[a]!.naturalWidth) return images[a];
        if (b < TOTAL_FRAMES && images[b]?.complete && images[b]!.naturalWidth) return images[b];
      }
      return null;
    };

    // Draw single image to canvas with cover sizing
    const drawCoverImage = (img: HTMLImageElement, alpha = 1) => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      if (!w || !h) return;

      if (canvas.width !== Math.floor(w * dpr) || canvas.height !== Math.floor(h * dpr)) {
        canvas.width = Math.floor(w * dpr);
        canvas.height = Math.floor(h * dpr);
      }

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.globalAlpha = alpha;

      const imgAspect = img.naturalWidth / img.naturalHeight;
      const canvasAspect = w / h;
      let dw = w;
      let dh = h;
      let ox = 0;
      let oy = 0;

      if (canvasAspect > imgAspect) {
        dw = w;
        dh = w / imgAspect;
        oy = (h - dh) / 2;
      } else {
        dh = h;
        dw = h * imgAspect;
        ox = (w - dw) / 2;
      }

      ctx.drawImage(img, ox, oy, dw, dh);
    };

    // Render frame with sub-frame interpolation and smooth blend
    const render = () => {
      if (dead) return;

      // Smooth lerp towards target scroll position
      const diff = targetProgress - currentProgress;
      if (Math.abs(diff) > 0.0001) {
        currentProgress += diff * 0.14; // smooth fluid damping
      } else {
        currentProgress = targetProgress;
      }

      const p = Math.max(0, Math.min(1, currentProgress));
      const exactFrame = START_FRAME + p * (PLAYABLE - 1);
      const baseFrame = Math.floor(exactFrame);
      const nextFrame = Math.min(TOTAL_FRAMES - 1, baseFrame + 1);
      const blendFactor = exactFrame - baseFrame;

      const imgA = getValidImage(baseFrame);
      const imgB = getValidImage(nextFrame);

      if (imgA) {
        // Base frame
        ctx.globalAlpha = 1;
        drawCoverImage(imgA, 1);

        // Cross-fade with next frame for 60fps continuity
        if (imgB && imgB !== imgA && blendFactor > 0.02) {
          drawCoverImage(imgB, blendFactor);
        }
      }

      setAtFinale(p >= 0.88);
      if (progressBarRef.current) {
        progressBarRef.current.style.transform = `scaleX(${p})`;
      }

      rafId = requestAnimationFrame(render);
    };

    // Preload images
    const onImgLoad = (i: number) => {
      if (dead) return;
      if (i === START_FRAME && !ready) {
        setReady(true);
      }
    };

    const order = [
      START_FRAME,
      ...Array.from({ length: PLAYABLE }, (_, k) => START_FRAME + k).filter(
        (i) => i !== START_FRAME
      ),
    ];

    for (const i of order) {
      const img = new Image();
      img.decoding = "async";
      img.src = frameSrc(i);
      img.onload = () => onImgLoad(i);
      img.onerror = () => onImgLoad(i);
      images[i] = img;
    }

    // Safety fallback: ensure ready state is enabled quickly
    const fallbackTimer = window.setTimeout(() => {
      if (!dead) setReady(true);
    }, 200);

    // ScrollTrigger with generous scroll travel for luxurious zoom control
    let trigger: ScrollTrigger | null = null;

    if (reducedMotion) {
      targetProgress = 0.35;
      currentProgress = 0.35;
    } else {
      trigger = ScrollTrigger.create({
        trigger: container,
        start: "top top",
        end: "+=550%",
        pin: true,
        pinReparent: false,
        scrub: 0.8,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          targetProgress = self.progress;
        },
      });
    }

    // Start continuous animation loop
    rafId = requestAnimationFrame(render);

    const onResize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(canvas.clientWidth * dpr);
      canvas.height = Math.floor(canvas.clientHeight * dpr);
    };
    window.addEventListener("resize", onResize);
    window.addEventListener("orientationchange", onResize);

    return () => {
      dead = true;
      if (rafId) cancelAnimationFrame(rafId);
      window.clearTimeout(fallbackTimer);
      trigger?.kill();
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onResize);
    };
  }, [reducedMotion, ready]);

  const continueDown = () => {
    window.scrollBy({ top: window.innerHeight * 0.9, behavior: "smooth" });
  };

  return (
    <div id="lusion-immersive-root" className="relative w-full">
      <section
        ref={containerRef}
        id="lusion-immersive"
        className="relative h-screen w-full overflow-hidden bg-black select-none"
        aria-label="Immersive astronaut scroll experience"
      >
        {/* Instant background poster while canvas starts */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${frameSrc(START_FRAME)})` }}
        />

        {/* 60fps Continuous Canvas Renderer */}
        <canvas
          ref={canvasRef}
          className="pointer-events-none absolute inset-0 h-full w-full bg-transparent"
        />

        {/* Subtle Bottom Scrubber Progress Bar */}
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-0 left-0 right-0 z-10 h-0.5 bg-white/10"
        >
          <div
            ref={progressBarRef}
            className="h-full w-full origin-left scale-x-0 bg-gradient-to-r from-sky via-cyan-300 to-white will-change-transform"
          />
        </div>

        {/* Scroll Prompt / Continue CTA */}
        <div
          className={`absolute bottom-8 left-1/2 z-20 -translate-x-1/2 transition-all duration-500 ${
            atFinale
              ? "pointer-events-auto opacity-100 translate-y-0"
              : "pointer-events-none opacity-0 translate-y-2"
          }`}
        >
          <button
            type="button"
            onClick={continueDown}
            className="group flex items-center gap-2 rounded-full border border-white/20 bg-black/70 px-5 py-2.5 font-mono text-[11px] font-bold uppercase tracking-wider text-white shadow-2xl backdrop-blur-md transition hover:border-sky hover:bg-black/90 hover:text-sky cursor-pointer"
          >
            <span>Explore The System</span>
            <span
              aria-hidden
              className="transition-transform duration-300 group-hover:translate-y-0.5"
            >
              ↓
            </span>
          </button>
        </div>
      </section>
    </div>
  );
}
