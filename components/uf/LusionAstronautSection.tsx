"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const TOTAL_FRAMES = 70;

export default function LusionAstronautSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Preload all 70 high-res authentic Lusion frames
    const images: HTMLImageElement[] = [];
    let loadedCount = 0;

    const renderFrame = (index: number) => {
      const img = images[index];
      if (!img || !img.complete || img.naturalWidth === 0) return;

      // Handle high-DPI crisp canvas rendering with object-fit: cover math
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const displayWidth = canvas.clientWidth;
      const displayHeight = canvas.clientHeight;

      if (canvas.width !== displayWidth * dpr || canvas.height !== displayHeight * dpr) {
        canvas.width = displayWidth * dpr;
        canvas.height = displayHeight * dpr;
      }

      ctx.save();
      ctx.scale(dpr, dpr);

      const imgAspect = img.naturalWidth / img.naturalHeight;
      const canvasAspect = displayWidth / displayHeight;

      let drawWidth = displayWidth;
      let drawHeight = displayHeight;
      let offsetX = 0;
      let offsetY = 0;

      if (canvasAspect > imgAspect) {
        drawWidth = displayWidth;
        drawHeight = displayWidth / imgAspect;
        offsetY = (displayHeight - drawHeight) / 2;
      } else {
        drawHeight = displayHeight;
        drawWidth = displayHeight * imgAspect;
        offsetX = (displayWidth - drawWidth) / 2;
      }

      ctx.clearRect(0, 0, displayWidth, displayHeight);
      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
      ctx.restore();
    };

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      const pad = String(i).padStart(3, "0");
      img.src = `/frames/lusion/frame_${pad}.webp`;
      img.onload = () => {
        loadedCount++;
        if (i === 0) {
          // Render first frame immediately
          renderFrame(0);
          setIsLoaded(true);
        }
      };
      images.push(img);
    }

    let currentFrameIndex = 0;

    // Master ScrollTrigger syncing parent page scroll directly to frame playback
    const trigger = ScrollTrigger.create({
      trigger: container,
      start: "top top",
      end: "+=600%",
      pin: true,
      scrub: 0.4,
      onUpdate: (self) => {
        const p = self.progress;
        setScrollProgress(p);

        const targetIndex = Math.min(
          TOTAL_FRAMES - 1,
          Math.max(0, Math.floor(p * TOTAL_FRAMES))
        );

        if (targetIndex !== currentFrameIndex) {
          currentFrameIndex = targetIndex;
          renderFrame(currentFrameIndex);
        }
      },
    });

    const onResize = () => {
      renderFrame(currentFrameIndex);
    };

    window.addEventListener("resize", onResize);

    return () => {
      trigger.kill();
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <section
      ref={containerRef}
      id="immersive-astronaut"
      className="relative h-screen w-full overflow-hidden bg-[#050508] text-white select-none"
    >
      {/* High-Fidelity 60FPS Canvas Frame Scroller */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full object-cover z-10 transition-opacity duration-500"
        style={{ opacity: isLoaded ? 1 : 0 }}
      />

      {/* Subtle Ambient Vignette & Glare */}
      <div className="pointer-events-none absolute inset-0 z-15 bg-gradient-to-b from-black/40 via-transparent to-black/60" />

      {/* ── STAGE 1: Editorial Typography (0% -> 24%) ── */}
      <div
        className="absolute inset-0 z-20 flex flex-col md:flex-row items-center justify-end px-8 md:px-24 max-w-[1440px] mx-auto transition-opacity duration-500 pointer-events-none"
        style={{
          opacity: scrollProgress < 0.22 ? 1 - scrollProgress * 4.5 : 0,
        }}
      >
        <div className="w-full md:max-w-[480px] text-left pt-6 md:pt-0 pointer-events-auto">
          <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-cyan-400 font-semibold">
            ( 07 ) — IMMERSIVE ARCHITECTURE
          </span>
          <h2 className="mt-3 font-sans text-[clamp(32px,4.5vw,58px)] font-extrabold tracking-tight leading-[0.98] text-white">
            Become Immersive <br />
            <span className="text-cyan-300">Experiences</span>
          </h2>
          <div className="mt-6 space-y-4 text-white/70 font-sans text-[14px] md:text-[15px] leading-relaxed">
            <p>
              We do not chase trends or produce work that looks like everyone else.
              We focus on creating visually distinctive digital experiences that
              reflect your brand, engage your audience, and make people remember
              what they saw.
            </p>
            <p>
              Our process blends creative direction, 3D craft, and interactive
              development to build tailored digital journeys that feel original,
              polished, and built for impact.
            </p>
          </div>
        </div>
      </div>

      {/* ── STAGE 2 & 3: Tunnel Plunge Title (25% -> 68%) ── */}
      <div
        className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-6 transition-opacity duration-500 pointer-events-none"
        style={{
          opacity:
            scrollProgress >= 0.26 && scrollProgress < 0.68
              ? Math.sin(((scrollProgress - 0.26) / 0.42) * Math.PI)
              : 0,
        }}
      >
        <p className="font-mono text-[12px] uppercase tracking-[0.35em] text-cyan-400 mb-4 font-semibold">
          DEEP SPACE CYBER TUNNEL
        </p>
        <h3 className="font-sans font-black text-[clamp(36px,6.5vw,84px)] tracking-tight leading-[0.95] text-white max-w-[950px] drop-shadow-[0_20px_50px_rgba(0,0,0,0.95)]">
          Step into a new world <br />
          and let your <br />
          <span className="bg-gradient-to-r from-cyan-400 via-emerald-300 to-pink-500 bg-clip-text text-transparent">
            imagination run wild
          </span>
        </h3>
      </div>

      {/* ── STAGE 5: Finale Call To Action (80% -> 100%) ── */}
      <div
        className="absolute inset-0 z-20 flex flex-col items-center justify-end pb-16 md:pb-20 px-6 text-center transition-opacity duration-500"
        style={{
          opacity: scrollProgress >= 0.82 ? (scrollProgress - 0.82) / 0.18 : 0,
          pointerEvents: scrollProgress >= 0.82 ? "auto" : "none",
        }}
      >
        <div className="relative z-30">
          <a
            href="#door"
            className="inline-flex items-center gap-3 rounded-full border border-white/25 bg-black/60 px-8 py-3.5 font-mono text-[11px] md:text-[12px] uppercase tracking-[0.25em] text-white backdrop-blur-xl transition-all duration-300 hover:border-cyan-400 hover:bg-cyan-400 hover:text-black shadow-[0_10px_35px_rgba(0,0,0,0.8)]"
          >
            <span>↓</span>
            <span>CONTINUE TO SCROLL</span>
            <span>↓</span>
          </a>
        </div>
      </div>
    </section>
  );
}
