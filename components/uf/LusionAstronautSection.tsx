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

function parentSoundOn() {
  try {
    const saved = sessionStorage.getItem("uf-sound");
    return saved !== "off";
  } catch {
    return true;
  }
}

/**
 * Real 3D WebGL interactive astronaut tunnel experience.
 * Driven by smooth scroll scrub with seamless audio & spatial control.
 */
export default function LusionAstronautSection() {
  const { ready: scrollReady } = useScrollState();
  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const readyRef = useRef(false);
  const rangeRef = useRef<{ start: number; end: number }>({ start: 0, end: 4000 });
  const soundOnRef = useRef(true);

  const [ready, setReady] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    const iframe = iframeRef.current;
    if (!container || !iframe) return;

    let dead = false;
    let pollId = 0;

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
      if (!ranges || !ranges.totalPixelCount || ranges.totalPixelCount < 100) {
        return null;
      }
      const items = (ranges as any).items;
      // Skip static dwell so it immediately begins zooming into the 3D tunnel
      const skipDwell =
        items?.blackFrameShow?.pixelCount != null
          ? items.blackFrameShow.pixelCount
          : Math.round(ranges.totalPixelCount * 0.06);

      const start = Math.max(0, (ranges.baseY || 0) + skipDwell);
      const end = (ranges.baseY || 0) + ranges.totalPixelCount;
      if (end <= start + 100) return null;
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
        /* mid-load */
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
        if (attempts < 150) {
          pollId = window.setTimeout(poll, 100);
        } else {
          // Fallback range if metadata calculation takes long
          readyRef.current = true;
          setReady(true);
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

    // Fallback timer: ensure overlay is dismissed even if slow network
    const fallbackTimer = window.setTimeout(() => {
      if (!readyRef.current) {
        readyRef.current = true;
        setReady(true);
      }
    }, 3500);

    const trigger = ScrollTrigger.create({
      trigger: container,
      start: "top top",
      end: "+=700%",
      pin: true,
      pinReparent: false,
      scrub: 0.6,
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
      window.clearTimeout(fallbackTimer);
      window.clearTimeout(pollId);
      iframe.removeEventListener("load", onLoad);
      window.removeEventListener("message", onMessage);
      window.removeEventListener("uf-sound-change", onSoundChange);
      try {
        getWin()?.lusionAudios?.off();
      } catch {
        /* */
      }
      trigger.kill();
    };
  }, []);

  return (
    <div id="lusion-immersive-root" className="relative w-full">
      <section
        ref={containerRef}
        id="lusion-immersive"
        className="relative h-screen w-full overflow-hidden bg-black select-none"
        aria-label="3D Interactive Astronaut Experience"
      >
        <iframe
          ref={iframeRef}
          src="/lusion_standalone.html"
          title="3D Astronaut Experience"
          className="pointer-events-none absolute inset-0 h-full w-full border-0 bg-black"
          allow="autoplay; fullscreen"
        />

        {/* Transient subtle loading bar (fades out immediately when 3D scene is ready) */}
        {!ready && (
          <div className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/70 backdrop-blur-xs transition-opacity duration-700">
            <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-white/60">
              Initializing 3D Scene
            </p>
            <div className="mt-4 h-0.5 w-32 overflow-hidden bg-white/10 rounded-full">
              <div className="h-full bg-cyan-400 w-1/2 animate-pulse" />
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
