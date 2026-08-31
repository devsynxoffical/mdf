"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const TOTAL_FRAMES = 101;

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

    // Preload all 101 authentic frames (Tablet -> Tunnel -> Kaleidoscope -> Shatter -> Lens Flare -> Let's work together finale)
    const images: HTMLImageElement[] = [];

    const renderFrame = (index: number) => {
      const img = images[index];
      if (!img || !img.complete || img.naturalWidth === 0) return;

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
        if (i === 0) {
          renderFrame(0);
          setIsLoaded(true);
        }
      };
      images.push(img);
    }

    let currentFrameIndex = 0;

    // Master ScrollTrigger syncing parent page scroll directly to all 101 frames
    const trigger = ScrollTrigger.create({
      trigger: container,
      start: "top top",
      end: "+=340%",
      pin: true,
      scrub: 0.15,
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

  const scrollToNext = () => {
    const doorEl = document.getElementById("door");
    if (doorEl) {
      doorEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={containerRef}
      id="immersive-astronaut"
      className="relative h-screen w-full overflow-hidden bg-black text-white select-none"
    >
      {/* 60FPS High-DPI Canvas Frame Scroller */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full object-cover z-10 pointer-events-none transition-opacity duration-500"
        style={{ opacity: isLoaded ? 1 : 0 }}
      />

      {/* Invisible Click Target over the authentic 'CONTINUE TO SCROLL' pill */}
      {scrollProgress >= 0.85 && (
        <button
          type="button"
          onClick={scrollToNext}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 w-72 h-16 cursor-pointer opacity-0"
          aria-label="Continue to scroll"
        />
      )}
    </section>
  );
}
