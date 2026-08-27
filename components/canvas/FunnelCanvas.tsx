"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { Canvas } from "@react-three/fiber";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useScrollState } from "@/components/providers/ScrollProvider";
import StaticFunnelPoster from "./StaticFunnelPoster";

const FunnelScene = dynamic(() => import("./FunnelScene"), { ssr: false });

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * The single site-wide canvas. Fixed behind all content, pointer-events none.
 * Mobile / low-memory / reduced-motion get the static composed poster instead —
 * no WebGL context is ever created there.
 */
export default function FunnelCanvas() {
  const { isMobile, reducedMotion, ready } = useScrollState();
  const wrapRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  const [particleCount, setParticleCount] = useState(12000);

  useEffect(() => {
    const w = window.innerWidth;
    setParticleCount(w <= 1100 ? 4000 : 12000);
  }, []);

  // Fade the canvas out over the last stretch before the footer so the page
  // lands on solid ink; also pause rendering entirely once it is invisible.
  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const footer = document.getElementById("site-footer");
    if (!footer) return;
    const st = ScrollTrigger.create({
      trigger: footer,
      start: "top bottom",
      end: "top 60%",
      scrub: true,
      onUpdate: (self) => {
        wrap.style.opacity = String(1 - self.progress);
        setVisible(self.progress < 0.999);
      },
    });
    return () => st.kill();
  }, [ready, isMobile, reducedMotion]);

  if (!ready) return <div className="fixed inset-0 z-0 bg-ink" aria-hidden />;

  if (isMobile || reducedMotion) {
    return (
      <div ref={wrapRef} className="fixed inset-0 z-0 pointer-events-none" aria-hidden>
        <StaticFunnelPoster />
      </div>
    );
  }

  return (
    <div
      ref={wrapRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ paddingTop: 140 }} // top safe-area so the nav never overlaps the focal point
      aria-hidden
    >
      <Canvas
        dpr={[1, 1.75]}
        gl={{
          antialias: false,
          powerPreference: "high-performance",
          alpha: true,
        }}
        camera={{ fov: 42, position: [0, 1.2, 9], near: 0.1, far: 60 }}
        frameloop={visible ? "always" : "never"}
        style={{ background: "transparent" }}
      >
        <FunnelScene particleCount={particleCount} />
      </Canvas>
    </div>
  );
}
