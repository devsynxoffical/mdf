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
 * 101-frame high-performance canvas scrubber.
 * Renders instantly across all devices, zero WebGL context loss, zero iframe cross-origin lag.
 */
export default function LusionAstronautSection() {
  const { reducedMotion } = useScrollState();
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);
  const frameRef = useRef(START_FRAME);
  const progressBarRef = useRef<HTMLDivElement>(null);

  const [ready, setReady] = useState(false);
  const [loadPct, setLoadPct] = useState(0);
  const [atFinale, setAtFinale] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let dead = false;
    let loaded = 0;
    const images: (HTMLImageElement | null)[] = new Array(TOTAL_FRAMES).fill(null);
    imagesRef.current = images;

    const draw = (index: number) => {
      let img = images[index];
      if (!img?.complete || !img.naturalWidth) {
        // Nearest loaded neighbor so scrub never blanks mid-load
        for (let d = 1; d < TOTAL_FRAMES; d++) {
          const a = images[index - d];
          const b = images[index + d];
          if (a?.complete && a.naturalWidth) {
            img = a;
            break;
          }
          if (b?.complete && b.naturalWidth) {
            img = b;
            break;
          }
        }
      }
      if (!img?.complete || !img.naturalWidth) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      if (!w || !h) return;

      if (canvas.width !== Math.floor(w * dpr) || canvas.height !== Math.floor(h * dpr)) {
        canvas.width = Math.floor(w * dpr);
        canvas.height = Math.floor(h * dpr);
      }

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, w, h);

      const imgAspect = img.naturalWidth / img.naturalHeight;
      const canvasAspect = w / h;
      let dw = w;
      let dh = h;
      let ox = 0;
      let oy = 0;

      // Cover
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

    const onImg = (i: number) => {
      if (dead) return;
      loaded += 1;
      setLoadPct(Math.round((loaded / PLAYABLE) * 100));
      if (!ready) {
        draw(START_FRAME);
        setReady(true);
      }
      // Keep painting current frame as better neighbors arrive
      if (Math.abs(i - frameRef.current) <= 2) draw(frameRef.current);
    };

    // Priority: start frame first, then remaining in play order
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
      img.onload = () => onImg(i);
      img.onerror = () => onImg(i);
      images[i] = img;
    }

    // Safety fallback: mark ready after 300ms so no black screen lingers
    const fallbackTimer = window.setTimeout(() => {
      if (!dead) setReady(true);
    }, 300);

    const applyProgress = (p: number) => {
      const idx = Math.min(
        TOTAL_FRAMES - 1,
        START_FRAME + Math.floor(p * (PLAYABLE - 0.0001))
      );
      frameRef.current = idx;
      draw(idx);
      setAtFinale(p >= 0.88);
      if (progressBarRef.current) {
        progressBarRef.current.style.transform = `scaleX(${p})`;
      }
    };

    let trigger: ScrollTrigger | null = null;

    if (reducedMotion) {
      applyProgress(0.35);
    } else {
      trigger = ScrollTrigger.create({
        trigger: container,
        start: "top top",
        end: "+=280%",
        pin: true,
        pinReparent: false,
        scrub: 0.35,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => applyProgress(self.progress),
      });
    }

    const onResize = () => draw(frameRef.current);
    window.addEventListener("resize", onResize);
    window.addEventListener("orientationchange", onResize);

    return () => {
      dead = true;
      window.clearTimeout(fallbackTimer);
      trigger?.kill();
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onResize);
    };
  }, [reducedMotion]);

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
        {/* Instant background poster while first frame is decoded */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${frameSrc(START_FRAME)})` }}
        />

        {/* 60fps Canvas Scrubber */}
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
            className="group flex items-center gap-2 rounded-full border border-white/20 bg-black/70 px-5 py-2.5 font-mono text-[11px] font-bold uppercase tracking-wider text-white shadow-2xl backdrop-blur-md transition hover:border-sky hover:bg-black/90 hover:text-sky"
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

        {/* Transient subtle loading bar (fades out immediately) */}
        {!ready && (
          <div className="pointer-events-none absolute inset-0 z-30 flex flex-col items-center justify-center bg-black/60 backdrop-blur-xs transition-opacity duration-500">
            <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-white/60">
              Loading sequence · {loadPct}%
            </p>
            <div className="mt-4 h-0.5 w-32 overflow-hidden bg-white/10 rounded-full">
              <div
                className="h-full bg-cyan-400 transition-[width] duration-200"
                style={{ width: `${Math.max(10, loadPct)}%` }}
              />
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
