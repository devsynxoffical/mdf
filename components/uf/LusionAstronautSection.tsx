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
    items?: Record<string, { pixelFrom?: number; pixelCount?: number }>;
  };
  lusionAudios?: LusionAudios;
  homePage?: { updateAudio?: boolean };
  properties?: { hasStarted?: boolean };
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
 * Real 3D WebGL / GLB Astronaut Experience with Butter-Smooth Scroll Scrubbing
 */
export default function LusionAstronautSection() {
  const { reducedMotion } = useScrollState();
  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const readyRef = useRef(false);
  const rangeRef = useRef<{ start: number; end: number }>({ start: 0, end: 3000 });
  const soundOnRef = useRef(true);

  const [ready, setReady] = useState(false);
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
    const ranges = (win as any).homeGoalSectionRanges;
    if (!ranges || !ranges.totalPixelCount || ranges.totalPixelCount < 100) {
      return null;
    }

    // Target the exact 3D Astronaut scene range (whiteFrameBreak -> astronautWait)
    if (typeof ranges.getRange === "function") {
      try {
        const astroRange = ranges.getRange("whiteFrameBreak", "astronautWait");
        if (astroRange && astroRange.pixelTo > astroRange.pixelFrom + 100) {
          return { start: astroRange.pixelFrom, end: astroRange.pixelTo };
        }
      } catch {}
    }

    const items = ranges.items;
    if (items) {
      const start =
        items.whiteFrameBreak?.pixelFrom ??
        items.whiteFrameOut?.pixelFrom ??
        (ranges.baseY || 0) + Math.round(ranges.totalPixelCount * 0.48);
      const end =
        items.astronautWait?.pixelTo ?? (ranges.baseY || 0) + ranges.totalPixelCount;
      if (end > start + 100) {
        return { start, end };
      }
    }

    // Precise astronaut beat offset fallback
    const start = (ranges.baseY || 0) + Math.round(ranges.totalPixelCount * 0.48);
    const end = (ranges.baseY || 0) + ranges.totalPixelCount;
    if (end <= start + 100) return null;
    return { start, end };
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    const iframe = iframeRef.current;
    if (!container || !iframe) return;

    let dead = false;
    let pollId = 0;

    const tryReady = () => {
      if (dead || readyRef.current) return false;
      try {
        const win = getWin();
        if (!win?.scrollManager?.scrollToPixel) return false;

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
        if (attempts < 100) {
          pollId = window.setTimeout(poll, 100);
        }
      };
      pollId = window.setTimeout(poll, 150);
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

    // Fade out overlay after 800ms safety window
    const autoReadyTimer = window.setTimeout(() => {
      if (!readyRef.current) setReady(true);
    }, 800);

    // Smooth ScrollTrigger scrubbing the 3D scene
    const trigger = ScrollTrigger.create({
      trigger: container,
      start: "top top",
      end: "+=500%",
      pin: true,
      pinReparent: false,
      scrub: reducedMotion ? 0.2 : 0.8,
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
        try {
          const win = getWin();
          const sm = win?.scrollManager;
          if (!sm?.scrollToPixel) return;

          const { start, end } = rangeRef.current;
          const target = start + self.progress * (end - start);
          sm.scrollToPixel(target, true);
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
      window.clearTimeout(autoReadyTimer);
      try {
        getWin()?.lusionAudios?.off();
      } catch {}
      trigger.kill();
    };
  }, [getWin, readRange, syncSound, reducedMotion]);

  const continueDown = () => {
    window.scrollBy({ top: window.innerHeight * 0.9, behavior: "smooth" });
  };

  return (
    <div id="lusion-immersive-root" className="relative w-full">
      <section
        ref={containerRef}
        id="lusion-immersive"
        className="relative h-screen w-full overflow-hidden bg-black select-none"
        aria-label="3D WebGL Astronaut Scroll Experience"
      >
        {/* 3D WebGL Experience Viewport */}
        <iframe
          ref={iframeRef}
          src="/lusion_standalone.html?v=silver3"
          title="3D Astronaut interactive experience"
          className="pointer-events-none absolute inset-0 h-full w-full border-0 bg-black"
          allow="autoplay; fullscreen"
        />

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

        {/* Seamless Transient Fade (fades out immediately to reveal 3D canvas) */}
        {!ready && (
          <div className="pointer-events-none absolute inset-0 z-30 flex flex-col items-center justify-center bg-black/75 backdrop-blur-xs transition-opacity duration-500">
            <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-white/60">
              Initializing 3D Sequence
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
