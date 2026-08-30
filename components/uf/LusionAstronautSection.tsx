"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function LusionAstronautSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    const iframe = iframeRef.current;
    if (!container || !iframe) return;

    let isLoaded = false;
    const onIframeLoad = () => {
      isLoaded = true;
      try {
        const win = iframe.contentWindow as any;
        if (win && win.scrollManager) {
          // Immediately position to the astronaut start point
          win.scrollManager.scrollToPixel(7337, true);
        }
      } catch (e) {
        console.warn("Could not init iframe scroll:", e);
      }
      // Reveal iframe smoothly after 3D scene is positioned
      setTimeout(() => {
        setIsReady(true);
      }, 400);
    };

    iframe.addEventListener("load", onIframeLoad);

    // Master ScrollTrigger syncing parent page scroll directly to Lusion WebGL engine
    const trigger = ScrollTrigger.create({
      trigger: container,
      start: "top top",
      end: "+=700%",
      pin: true,
      scrub: 0.4,
      onUpdate: (self) => {
        if (!isLoaded) return;
        try {
          const win = iframe.contentWindow as any;
          if (win && win.scrollManager) {
            // Lusion's Goal & Astronaut Sequence runs from pixel 7,337 to 47,200
            const startPixel = 7337;
            const endPixel = 47200;
            const target = startPixel + self.progress * (endPixel - startPixel);
            win.scrollManager.scrollToPixel(target, true);
          }
        } catch (e) {
          // Handle any frame access timing
        }
      },
    });

    return () => {
      iframe.removeEventListener("load", onIframeLoad);
      trigger.kill();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      id="lusion-immersive"
      className="relative h-screen w-full overflow-hidden bg-[#050508]"
    >
      <iframe
        ref={iframeRef}
        src="/lusion_standalone.html"
        title="Lusion 3D Astronaut Interactive Experience"
        className={`h-full w-full border-0 bg-[#050508] pointer-events-none transition-opacity duration-700 ${
          isReady ? "opacity-100" : "opacity-0"
        }`}
        allow="autoplay; fullscreen"
      />
    </section>
  );
}
