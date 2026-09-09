"use client";

import { useEffect, useRef, useState, useCallback } from "react";
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
    items?: Record<string, { pixelFrom?: number; pixelTo?: number; pixelCount?: number }>;
    getRange?: (from: string, to?: string) => { pixelFrom: number; pixelTo: number; pixelCount: number };
  };
  lusionAudios?: LusionAudios;
  homePage?: { updateAudio?: boolean };
  properties?: { hasStarted?: boolean };
  jumpToAstronaut?: () => boolean;
};

function parentSoundOn() {
  try {
    const saved = sessionStorage.getItem("uf-sound");
    return saved !== "off";
  } catch {
    return true;
  }
}

/**
 * Authentic 3D WebGL / GLB Astronaut Scroll Experience
 */
export default function LusionAstronautSection() {
  const { reducedMotion } = useScrollState();
  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const readyRef = useRef(false);
  const rangeRef = useRef<{ start: number; end: number }>({ start: 0, end: 3000 });
  const soundOnRef = useRef(true);

  const [ready, setReady] = useState(false);
  const [progress, setProgress] = useState(0);

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
        /* cross-origin */
      }
    },
    [getWin]
  );

  const readRange = useCallback((win: LusionWindow) => {
    const ranges = win.homeGoalSectionRanges;
    if (!ranges || !ranges.totalPixelCount || ranges.totalPixelCount < 100) {
      return null;
    }

    const baseY = typeof ranges.baseY === "number" ? ranges.baseY : 0;
    const items = ranges.items;

    // Use items directly with absolute baseY
    if (items && items.whiteFrameBreak && items.astronautWait) {
      const start = baseY + (items.whiteFrameBreak.pixelFrom ?? 0);
      const end = baseY + (items.astronautWait.pixelTo ?? ranges.totalPixelCount);
      if (end > start + 50) {
        return { start, end };
      }
    }

    if (typeof ranges.getRange === "function") {
      try {
        const astroRange = ranges.getRange("whiteFrameBreak", "astronautWait");
        if (astroRange && astroRange.pixelCount > 50) {
          return {
            start: baseY + astroRange.pixelFrom,
            end: baseY + astroRange.pixelTo,
          };
        }
      } catch {}
    }

    // Proportional fallback
    const start = baseY + Math.round(ranges.totalPixelCount * 0.5);
    const end = baseY + ranges.totalPixelCount;
    return { start, end };
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    const iframe = iframeRef.current;
    if (!container || !iframe) return;

    let dead = false;
    let pollId = 0;

    const applyScroll = (targetPx: number) => {
      try {
        const win = getWin();
        if (win?.scrollManager?.scrollToPixel) {
          win.scrollManager.scrollToPixel(targetPx, true);
        }
      } catch {}
    };

    const tryReady = () => {
      if (dead) return false;
      try {
        const win = getWin();
        if (!win?.scrollManager?.scrollToPixel) return false;

        const range = readRange(win);
        if (!range) return false;

        rangeRef.current = range;
        readyRef.current = true;
        setReady(true);

        applyScroll(range.start);
        if (win.homePage) win.homePage.updateAudio = true;
        syncSound(parentSoundOn());
        ScrollTrigger.refresh();
        return true;
      } catch {
        /* cross-origin */
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

    // Fade overlay quickly
    const autoReadyTimer = window.setTimeout(() => {
      if (!readyRef.current) setReady(true);
    }, 400);

    // Smooth ScrollTrigger pinning and scrubbing
    const trigger = ScrollTrigger.create({
      trigger: container,
      start: "top top",
      end: "+=320%",
      pin: true,
      pinReparent: false,
      scrub: reducedMotion ? 0.2 : 0.6,
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
        setProgress(self.progress);
        try {
          const win = getWin();
          const sm = win?.scrollManager;
          if (!sm?.scrollToPixel) return;

          const { start, end } = rangeRef.current;
          const target = start + self.progress * (end - start);
          sm.scrollToPixel(target, true);
        } catch {}
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
      window.clearTimeout(autoReadyTimer);
      try {
        getWin()?.lusionAudios?.off();
      } catch {}
      trigger.kill();
    };
  }, [getWin, readRange, syncSound, reducedMotion]);

  return (
    <div id="lusion-immersive-root" className="relative w-full bg-black">
      <section
        ref={containerRef}
        id="lusion-immersive"
        className="relative h-screen w-full overflow-hidden bg-black select-none"
        aria-label="3D WebGL Astronaut Experience"
      >
        {/* Background glow effects */}
        <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_50%_40%,rgba(14,165,233,0.12)_0%,transparent_60%)]" />

        {/* 3D WebGL Canvas Viewport */}
        <iframe
          ref={iframeRef}
          src="/lusion_standalone.html?v=mdf_orbit1"
          title="3D Astronaut interactive experience"
          className="pointer-events-none absolute inset-0 h-full w-full border-0 bg-black"
          allow="autoplay; fullscreen"
        />

        {/* Ambient Dark Vignette Edges for smooth blending */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black via-black/60 to-transparent z-10" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black via-black/80 to-transparent z-10" />

        {/* HUD Top Status Bar */}
        <div className="pointer-events-none absolute top-8 inset-x-0 z-20 flex items-center justify-between px-6 md:px-12">
          <div className="flex items-center gap-3">
            <div className="h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/70">
              3D Zero-G Telemetry // MDF Core
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-[10px] text-white/50 backdrop-blur-md">
            <span>SCROLL CONTROL</span>
            <span className="text-cyan-400 font-bold">{Math.round(progress * 100)}%</span>
          </div>
        </div>

        {/* HUD Interactive Overlay Titles */}
        <div className="pointer-events-none absolute inset-0 z-20 flex flex-col justify-between p-8 md:p-14">
          <div className="mt-16 max-w-xl">
            <span className="inline-block font-mono text-[11px] font-semibold uppercase tracking-[0.25em] text-cyan-400">
              Autonomous Systems
            </span>
            <h2 className="mt-2 font-mono text-2xl font-bold uppercase tracking-tight text-white md:text-4xl drop-shadow-2xl">
              Break Into The Future
            </h2>
            <p className="mt-2 max-w-md text-xs font-sans text-white/60 leading-relaxed drop-shadow-md">
              High-ticket infrastructure engineered to scale your conversion architecture effortlessly across every channel.
            </p>
          </div>

          <div className="flex items-end justify-between">
            <div className="font-mono text-[10px] text-white/40 uppercase tracking-widest space-y-1">
              <div>// MODEL: LUSION 3D ENGINE</div>
              <div>// COORDINATES: 0G-ORBIT-MDF</div>
            </div>

            {/* Scroll Indicator */}
            <div className="flex flex-col items-center gap-2">
              <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/40">
                Scroll To Orbit
              </span>
              <div className="h-10 w-5 rounded-full border border-white/20 p-1 flex justify-center backdrop-blur-sm">
                <div
                  className="h-2 w-1.5 rounded-full bg-cyan-400 transition-transform duration-100"
                  style={{ transform: `translateY(${progress * 18}px)` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Fast Loading Transition */}
        {!ready && (
          <div className="pointer-events-none absolute inset-0 z-30 flex flex-col items-center justify-center bg-black transition-opacity duration-300">
            <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-white/70">
              Initializing 3D Environment
            </p>
            <div className="mt-4 h-0.5 w-32 overflow-hidden bg-white/10 rounded-full">
              <div className="h-full w-2/3 bg-cyan-400 animate-pulse" />
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

