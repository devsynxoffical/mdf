"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
    // Match SoundToggle default: on unless explicitly off
    return saved !== "off";
  } catch {
    return true;
  }
}

/**
 * Exact Lusion home-goal WebGL section, driven by parent scroll.
 * Embeds /lusion_standalone.html and scrubs scrollManager.scrollToPixel.
 */
export default function LusionAstronautSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const rangeRef = useRef({ start: 7121, end: 52094 });
  const readyRef = useRef(false);
  const soundOnRef = useRef(false);

  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

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

        // Unlock WebAudio listener (iframe is pointer-events:none)
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
          setFailed(true);
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
      if (!readyRef.current) setFailed(true);
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

          // Keep finale title white (footer otherwise forces is-white-bg → black text)
          if (self.progress > 0.72) {
            win?.document?.documentElement?.classList.remove("is-white-bg");
            win?.document?.documentElement?.classList.add("is-black-bg");
          }

          // Re-assert audio while pinned if user enabled sound mid-scroll
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
        src="/lusion_standalone.html"
        title="Lusion astronaut interactive experience"
        className="pointer-events-none absolute inset-0 h-full w-full border-0 bg-black"
        allow="autoplay; fullscreen"
      />

      {!ready && !failed && (
        <div className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center bg-black">
          <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-white/40">
            Loading sequence
          </p>
          <div className="mt-6 h-px w-40 overflow-hidden bg-white/10">
            <div className="h-full w-1/2 animate-pulse bg-white/50" />
          </div>
        </div>
      )}

      {failed && !ready && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-black px-6 text-center">
          <p className="max-w-sm font-mono text-xs leading-relaxed text-white/50">
            The immersive sequence could not start. Refresh the page to try again.
          </p>
        </div>
      )}
    </section>
  );
}
