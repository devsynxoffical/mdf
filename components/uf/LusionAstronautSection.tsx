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
/** Skip empty early tablet bezels — astronaut sequence starts here. */
const START_FRAME = 8;
const PLAYABLE = TOTAL_FRAMES - START_FRAME;

const frameSrc = (i: number) =>
  `/frames/lusion/frame_${String(i).padStart(3, "0")}.webp`;

function parentSoundOn() {
  try {
    const saved = sessionStorage.getItem("uf-sound");
    return saved !== "off";
  } catch {
    return true;
  }
}

/**
 * Exact Lusion home-goal WebGL on desktop.
 * On mobile / low-memory: local 101-frame canvas scrub (WebGL iframe is unreliable on phones).
 */
export default function LusionAstronautSection() {
  const { isMobile, ready: scrollReady, reducedMotion } = useScrollState();
  const [useFrames, setUseFrames] = useState(false);
  const [probed, setProbed] = useState(false);

  useEffect(() => {
    if (!scrollReady) return;
    const coarse =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(pointer: coarse)").matches;
    const narrow = window.innerWidth < 900;
    // Phones, tablets, low-memory, and touch+narrow viewports → frame scrubber
    setUseFrames(isMobile || reducedMotion || (coarse && narrow));
    setProbed(true);
  }, [scrollReady, isMobile, reducedMotion]);

  if (!scrollReady || !probed) {
    return (
      <section
        id="lusion-immersive"
        className="relative h-[100dvh] w-full overflow-hidden bg-black"
        aria-label="Immersive astronaut scroll experience"
      >
        <LoadingOverlay label="Loading sequence" pct={null} />
      </section>
    );
  }

  if (useFrames) {
    return <FrameAstronautExperience reducedMotion={reducedMotion} />;
  }

  return <IframeAstronautExperience onFail={() => setUseFrames(true)} />;
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

    const onImg = (i: number) => {
      if (dead) return;
      loaded += 1;
      setLoadPct(Math.round((loaded / PLAYABLE) * 100));
      if (i === START_FRAME) {
        draw(START_FRAME);
        setReady(true);
        ScrollTrigger.refresh();
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

/* ─── Desktop: live Lusion WebGL iframe ─── */

function IframeAstronautExperience({ onFail }: { onFail: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const rangeRef = useRef({ start: 7121, end: 52094 });
  const readyRef = useRef(false);
  const soundOnRef = useRef(false);
  const onFailRef = useRef(onFail);
  onFailRef.current = onFail;

  const [ready, setReady] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    const iframe = iframeRef.current;
    if (!container || !iframe) return;

    let dead = false;
    let pollId = 0;
    let failTimer = 0;

    const getWin = () => iframe.contentWindow as LusionWindow | null;

    const syncSound = (enabled: boolean) => {
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
    };

    const readRange = (win: LusionWindow) => {
      const ranges = win.homeGoalSectionRanges;
      if (!ranges || !ranges.totalPixelCount || ranges.totalPixelCount < 1000) {
        return null;
      }
      const start = Math.max(0, ranges.baseY || 0);
      const end = start + ranges.totalPixelCount;
      if (end <= start + 500) return null;
      return { start, end };
    };

    const tryReady = () => {
      if (dead || readyRef.current) return false;
      try {
        const win = getWin();
        if (!win?.scrollManager?.scrollToPixel) return false;
        if (win.properties && win.properties.hasStarted === false) return false;

        const range = readRange(win);
        if (!range) return false;

        rangeRef.current = range;
        readyRef.current = true;
        setReady(true);
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
        if (dead || readyRef.current) return;
        attempts += 1;
        if (tryReady()) return;
        if (attempts < 120) {
          pollId = window.setTimeout(poll, 100);
        } else {
          onFailRef.current();
        }
      };
      pollId = window.setTimeout(poll, 200);
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
    failTimer = window.setTimeout(() => {
      if (!readyRef.current) onFailRef.current();
    }, 20000);

    const trigger = ScrollTrigger.create({
      trigger: container,
      start: "top top",
      end: "+=1400%",
      pin: true,
      scrub: 0.45,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onEnter: () => syncSound(parentSoundOn()),
      onEnterBack: () => syncSound(parentSoundOn()),
      onLeave: () => {
        try {
          getWin()?.lusionAudios?.off();
        } catch {
          /* */
        }
      },
      onLeaveBack: () => {
        try {
          getWin()?.lusionAudios?.off();
        } catch {
          /* */
        }
      },
      onUpdate: (self) => {
        if (!readyRef.current) return;
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
      window.clearTimeout(failTimer);
      try {
        getWin()?.lusionAudios?.off();
      } catch {
        /* */
      }
      trigger.kill();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      id="lusion-immersive"
      className="relative h-screen w-full overflow-hidden bg-black"
      aria-label="Immersive astronaut scroll experience"
    >
      <iframe
        ref={iframeRef}
        src="/lusion_standalone.html?v=silver2"
        title="Lusion astronaut interactive experience"
        className="pointer-events-none absolute inset-0 h-full w-full border-0 bg-black"
        allow="autoplay; fullscreen"
      />

      {!ready && <LoadingOverlay label="Loading sequence" pct={null} />}
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
