"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useScrollState } from "@/components/providers/ScrollProvider";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type LusionAudios = {
  on: () => void;
  off: () => void;
  isActive?: boolean;
  volume?: number;
  _onBodyClick?: () => void;
  listener?: unknown;
};

type LusionWindow = Window & {
  scrollManager?: {
    scrollToPixel: (px: number, immediate?: boolean) => void;
    contentSizePixel?: number;
  };
  homeGoalSectionRanges?: {
    baseY: number;
    totalPixelCount: number;
    items?: Record<string, { pixelFrom?: number; pixelCount?: number }>;
  };
  lusionAudios?: LusionAudios;
  homePage?: { updateAudio?: boolean };
  properties?: { hasStarted?: boolean };
};

const TOTAL_FRAMES = 101;
/** Skip early static dwell — zoom animation starts immediately. */
const START_FRAME = 15;
const PLAYABLE = TOTAL_FRAMES - START_FRAME;

const frameSrc = (i: number) =>
  `/frames/lusion/frame_${String(i).padStart(3, "0")}.webp`;

if (typeof window !== "undefined") {
  const pre = new Image();
  pre.src = frameSrc(START_FRAME);
}

function parentSoundOn() {
  try {
    const saved = sessionStorage.getItem("uf-sound");
    return saved !== "off";
  } catch {
    return true;
  }
}

/**
 * High-performance zero-delay canvas frame scrubber.
 * Instant initial paint (<50ms) with staged background frame caching.
 */
export default function LusionAstronautSection() {
  const { reducedMotion } = useScrollState();

  return (
    <div id="lusion-immersive-root" className="relative w-full">
      <FrameAstronautExperience reducedMotion={reducedMotion} />
    </div>
  );
}

/* ─── Mobile / reduced-motion: canvas frame scrubber ─── */

function FrameAstronautExperience({ reducedMotion }: { reducedMotion: boolean }) {
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

    let milestonesLoaded = 0;
    let isReady = false;
    const onImg = (i: number, isMilestone: boolean) => {
      if (dead) return;
      loaded += 1;
      if (isMilestone) milestonesLoaded += 1;
      setLoadPct(Math.round((loaded / PLAYABLE) * 100));

      if (!isReady && (i === START_FRAME || milestonesLoaded >= 1)) {
        isReady = true;
        draw(frameRef.current);
        setReady(true);
        ScrollTrigger.refresh();
      }
      // Keep painting current frame as better neighbors arrive
      if (Math.abs(i - frameRef.current) <= 3) draw(frameRef.current);
    };

    // Priority 1: First frame immediately for zero-delay paint
    const firstImg = new Image();
    firstImg.decoding = "async";
    firstImg.src = frameSrc(START_FRAME);
    firstImg.onload = () => onImg(START_FRAME, true);
    firstImg.onerror = () => onImg(START_FRAME, true);
    images[START_FRAME] = firstImg;

    // Priority 2: Key milestones spaced out
    const milestones = [20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100];
    setTimeout(() => {
      if (dead) return;
      for (const i of milestones) {
        const img = new Image();
        img.decoding = "async";
        img.src = frameSrc(i);
        img.onload = () => onImg(i, true);
        img.onerror = () => onImg(i, true);
        images[i] = img;
      }
    }, 50);

    // Priority 3: Remaining frames in gentle background batches to prevent thread lag
    const remaining = Array.from({ length: PLAYABLE }, (_, k) => START_FRAME + k).filter(
      (i) => i !== START_FRAME && !milestones.includes(i)
    );
    setTimeout(() => {
      if (dead) return;
      let batchIdx = 0;
      const loadNextBatch = () => {
        if (dead) return;
        const chunk = remaining.slice(batchIdx, batchIdx + 8);
        for (const i of chunk) {
          const img = new Image();
          img.decoding = "async";
          img.src = frameSrc(i);
          img.onload = () => onImg(i, false);
          img.onerror = () => onImg(i, false);
          images[i] = img;
        }
        batchIdx += 8;
        if (batchIdx < remaining.length) {
          setTimeout(loadNextBatch, 60);
        }
      };
      loadNextBatch();
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
        end: "+=350%",
        pin: true,
        // Avoid reparenting the React-owned section into a spacer race.
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
      trigger?.kill();
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onResize);
    };
  }, [reducedMotion]);

  const continueDown = () => {
    window.scrollBy({ top: window.innerHeight * 0.9, behavior: "smooth" });
  };

  return (
    <section
      ref={containerRef}
      id="lusion-immersive"
      className="relative h-[100dvh] w-full overflow-hidden bg-black text-white"
      aria-label="Immersive astronaut scroll experience"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-10 h-full w-full transition-opacity duration-500"
        style={{
          opacity: ready ? 1 : 0,
          filter: "brightness(0.86) contrast(1.16) saturate(0.62)",
        }}
      />

      {!ready && <LoadingOverlay label="Loading sequence" pct={loadPct} />}

      {/* Progress rail */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-0.5 bg-white/10">
        <div
          ref={progressBarRef}
          className="h-full origin-left scale-x-0 bg-sky shadow-[0_0_12px_#38BDF8]"
        />
      </div>

      {/* Hit target over finale “continue” pill baked into frames */}
      {atFinale && (
        <button
          type="button"
          onClick={continueDown}
          className="absolute bottom-[max(1.25rem,env(safe-area-inset-bottom))] left-1/2 z-30 h-14 w-[min(18rem,80vw)] -translate-x-1/2 cursor-pointer opacity-0"
          aria-label="Continue scrolling"
        />
      )}
    </section>
  );
}

function LoadingOverlay({ label, pct }: { label: string; pct: number | null }) {
  return (
    <div className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center bg-black">
      <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-white/40">
        {label}
        {pct != null ? ` · ${pct}%` : ""}
      </p>
      <div className="mt-6 h-px w-40 overflow-hidden bg-white/10">
        <div
          className="h-full bg-white/50 transition-[width] duration-200"
          style={{ width: pct != null ? `${Math.max(8, pct)}%` : "50%" }}
        />
      </div>
    </div>
  );
}
