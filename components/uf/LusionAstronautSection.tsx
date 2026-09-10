"use client";

import { useCallback, useEffect, useRef, useState } from "react";
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
 * 3D WebGL + Canvas Fallback Astronaut Experience
 * - High-end Desktop: Full interactive 3D WebGL with mouse tracking, dynamic camera & audio sync
 * - Mobile / Constrained: Instant 60fps canvas frame scrubber
 */
export default function LusionAstronautSection() {
  const { reducedMotion, isMobile } = useScrollState();

  return (
    <div id="lusion-immersive-root" className="relative w-full">
      {reducedMotion || isMobile ? (
        <FrameAstronautExperience reducedMotion={reducedMotion} />
      ) : (
        <HybridAstronautExperience />
      )}
    </div>
  );
}

/* ─── Desktop: Interactive 3D WebGL Engine with Seamless Canvas Background ─── */

function HybridAstronautExperience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rangeRef = useRef({ start: 7121, end: 52094 });
  const ready3DRef = useRef(false);
  const soundOnRef = useRef(false);
  const frameRef = useRef(START_FRAME);
  const progressBarRef = useRef<HTMLDivElement>(null);

  const [ready3D, setReady3D] = useState(false);
  const [atFinale, setAtFinale] = useState(false);

  const getWin = useCallback(
    () => iframeRef.current?.contentWindow as LusionWindow | null,
    []
  );

  const syncSound = useCallback(
    (enabled: boolean) => {
      soundOnRef.current = enabled;
      try {
        const win = getWin();
        const audios = win?.lusionAudios;
        if (!audios) return;

        if (enabled && !audios.listener && audios._onBodyClick) {
          audios._onBodyClick();
        }

        if (win.homePage) win.homePage.updateAudio = true;

        if (enabled) audios.on();
        else audios.off();
      } catch {
        /* mid-load */
      }
    },
    [getWin]
  );

  const readRange = useCallback((win: LusionWindow) => {
    const ranges = win.homeGoalSectionRanges;
    if (!ranges || !ranges.totalPixelCount || ranges.totalPixelCount < 100) {
      return null;
    }
    const items = (ranges as any).items;
    const skipDwell =
      items?.blackFrameShow?.pixelCount != null
        ? items.blackFrameShow.pixelCount
        : Math.round(ranges.totalPixelCount * 0.08);

    const start = Math.max(0, (ranges.baseY || 0) + skipDwell);
    const end = (ranges.baseY || 0) + ranges.totalPixelCount;
    if (end <= start + 100) return null;
    return { start, end };
  }, []);

  // 1. Initial 2D Canvas Instant Render so screen is NEVER blank
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const img = new Image();
    img.src = frameSrc(START_FRAME);
    img.onload = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = canvas.clientWidth || window.innerWidth;
      const h = canvas.clientHeight || window.innerHeight;
      if (!w || !h) return;

      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, w, h);

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
  }, []);

  // 2. 3D WebGL Lifecycle & GSAP Scroll Sync
  useEffect(() => {
    const container = containerRef.current;
    const iframe = iframeRef.current;
    if (!container || !iframe) return;

    let dead = false;
    let pollId = 0;

    const tryReady = () => {
      if (dead || ready3DRef.current) return false;
      try {
        const win = getWin();
        if (!win?.scrollManager?.scrollToPixel) return false;

        const range = readRange(win);
        if (!range) return false;

        rangeRef.current = range;
        ready3DRef.current = true;
        setReady3D(true);
        win.scrollManager.scrollToPixel(range.start, true);
        if (win.homePage) win.homePage.updateAudio = true;
        syncSound(parentSoundOn());
        ScrollTrigger.refresh();
        return true;
      } catch {
        /* cross-origin / mid-load */
      }
      return false;
    };

    const onLoad = () => {
      if (dead) return;
      if (tryReady()) return;
      let attempts = 0;
      const poll = () => {
        if (dead || ready3DRef.current) return;
        attempts += 1;
        if (tryReady()) return;
        if (attempts < 100) {
          pollId = window.setTimeout(poll, 80);
        }
      };
      pollId = window.setTimeout(poll, 100);
    };

    const onMessage = (ev: MessageEvent) => {
      if (ev.data?.type === "lusion-ready") tryReady();
    };

    const onSoundChange = (ev: Event) => {
      const enabled = Boolean((ev as CustomEvent).detail?.enabled);
      syncSound(enabled);
    };

    window.addEventListener("message", onMessage);
    window.addEventListener("uf-sound-change", onSoundChange);
    iframe.addEventListener("load", onLoad);

    const trigger = ScrollTrigger.create({
      trigger: container,
      start: "top top",
      end: "+=450%",
      pin: true,
      pinReparent: false,
      scrub: 0.35,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onEnter: () => syncSound(parentSoundOn()),
      onEnterBack: () => syncSound(parentSoundOn()),
      onLeave: () => {
        try {
          getWin()?.lusionAudios?.off();
        } catch {}
      },
      onLeaveBack: () => {
        try {
          getWin()?.lusionAudios?.off();
        } catch {}
      },
      onUpdate: (self) => {
        setAtFinale(self.progress >= 0.88);
        if (progressBarRef.current) {
          progressBarRef.current.style.transform = `scaleX(${self.progress})`;
        }
        if (!ready3DRef.current) return;
        try {
          const win = getWin();
          const sm = win?.scrollManager;
          if (!sm?.scrollToPixel) return;

          const live = win ? readRange(win) : null;
          if (live) rangeRef.current = live;

          const { start, end } = rangeRef.current;
          const target = start + self.progress * (end - start);
          sm.scrollToPixel(target, true);

          if (self.progress > 0.72) {
            win?.document?.documentElement?.classList.remove("is-white-bg");
            win?.document?.documentElement?.classList.add("is-black-bg");
          }

          if (soundOnRef.current && win?.lusionAudios && !win.lusionAudios.isActive) {
            syncSound(true);
          }
        } catch {
          /* ignore */
        }
      },
    });

    if (iframe.contentDocument?.readyState === "complete") {
      onLoad();
    }

    return () => {
      dead = true;
      iframe.removeEventListener("load", onLoad);
      window.removeEventListener("message", onMessage);
      window.removeEventListener("uf-sound-change", onSoundChange);
      window.clearTimeout(pollId);
      try {
        getWin()?.lusionAudios?.off();
      } catch {}
      trigger.kill();
    };
  }, [getWin, readRange, syncSound]);

  const continueDown = () => {
    window.scrollBy({ top: window.innerHeight * 0.9, behavior: "smooth" });
  };

  return (
    <section
      ref={containerRef}
      id="lusion-immersive"
      className="relative h-[100dvh] w-full overflow-hidden bg-black text-white"
      aria-label="3D Astronaut Scroll Experience"
    >
      {/* Background Instant Canvas Frame */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0 h-full w-full object-cover"
        style={{ filter: "brightness(0.86) contrast(1.16) saturate(0.62)" }}
      />

      {/* Interactive 3D WebGL Iframe */}
      <iframe
        ref={iframeRef}
        src="/lusion_standalone.html?v=silver4"
        title="3D Astronaut interactive experience"
        className={`pointer-events-none absolute inset-0 z-10 h-full w-full border-0 bg-transparent transition-opacity duration-700 ${
          ready3D ? "opacity-100" : "opacity-0"
        }`}
        allow="autoplay; fullscreen"
      />

      {/* Progress rail */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-0.5 bg-white/10">
        <div
          ref={progressBarRef}
          className="h-full origin-left scale-x-0 bg-sky shadow-[0_0_12px_#38BDF8]"
        />
      </div>

      {/* Finale CTA Pill */}
      {atFinale && (
        <div className="absolute bottom-8 left-1/2 z-30 -translate-x-1/2">
          <button
            type="button"
            onClick={continueDown}
            className="group flex items-center gap-2 rounded-full border border-white/20 bg-black/75 px-5 py-2.5 font-mono text-[11px] font-bold uppercase tracking-wider text-white shadow-2xl backdrop-blur-md transition hover:border-sky hover:bg-black/90 hover:text-sky cursor-pointer"
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
      )}
    </section>
  );
}

/* ─── Mobile / Reduced-Motion Canvas Frame Scrubber ─── */

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
      const w = canvas.clientWidth || window.innerWidth;
      const h = canvas.clientHeight || window.innerHeight;
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
      if (Math.abs(i - frameRef.current) <= 3) draw(frameRef.current);
    };

    const firstImg = new Image();
    firstImg.decoding = "async";
    firstImg.src = frameSrc(START_FRAME);
    firstImg.onload = () => onImg(START_FRAME, true);
    firstImg.onerror = () => onImg(START_FRAME, true);
    images[START_FRAME] = firstImg;

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
      aria-label="Astronaut scroll experience"
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
