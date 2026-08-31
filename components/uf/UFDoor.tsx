"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Magnetic from "./Magnetic";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const SHOT_IMAGES = [
  "/images/shots/shot1.webp",
  "/images/shots/shot2.webp",
  "/images/shots/shot3.webp",
  "/images/shots/shot4.webp",
  "/images/shots/shot5.webp",
  "/images/shots/shot6.webp",
  "/images/shots/shot7.webp",
  "/images/shots/shot8.webp",
  "/images/shots/shot9.webp",
  "/images/shots/shot10.webp",
  "/images/shots/shot11.webp",
  "/images/shots/shot12.webp",
  "/images/shots/shot13.webp",
  "/images/shots/shot14.webp",
  "/images/shots/shot15.webp",
  "/images/shots/shot16.webp",
];

/**
 * Authentic Halo Lab Final CTA Section:
 * Features the giant rotating shot wheel (with 16 tablet mockup cards)
 * that rotates as the user scrolls, plus supports pointer drag and idle momentum.
 */
export default function UFDoor() {
  const sectionRef = useRef<HTMLElement>(null);
  const wheelRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const wheel = wheelRef.current;
    const orbit = orbitRef.current;
    if (!section || !wheel || !orbit) return;

    let baseScrollRotation = 0;
    let dragRotation = 0;
    let idleRotation = 0;
    let isDragging = false;
    let startAngle = 0;
    let lastDragAngle = 0;
    let lastTime = performance.now();
    let velocity = 0;
    let rafId: number;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // 1. Scroll-driven rotation with GSAP ScrollTrigger
    const st = ScrollTrigger.create({
      trigger: section,
      start: "top bottom",
      end: "bottom top",
      scrub: 1.2,
      onUpdate: (self) => {
        // Rotate ~90 degrees across the scroll
        baseScrollRotation = self.progress * 110;
      },
    });

    // Pointer Drag handlers
    const getPointerAngle = (clientX: number, clientY: number) => {
      const rect = orbit.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      return (Math.atan2(clientY - cy, clientX - cx) * 180) / Math.PI;
    };

    const onPointerDown = (e: PointerEvent) => {
      isDragging = true;
      startAngle = getPointerAngle(e.clientX, e.clientY);
      lastDragAngle = startAngle;
      velocity = 0;
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging) return;
      const currentAngle = getPointerAngle(e.clientX, e.clientY);
      let delta = currentAngle - lastDragAngle;
      if (delta > 180) delta -= 360;
      if (delta < -180) delta += 360;
      dragRotation += delta;
      velocity = delta * 15;
      lastDragAngle = currentAngle;
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);

    // Animation Loop combining scroll rotation + drag + idle drift
    const update = (now: number) => {
      const delta = Math.min(34, now - lastTime) / 1000;
      lastTime = now;

      if (!isDragging) {
        if (!reducedMotion) {
          idleRotation += 1.8 * delta; // subtle idle rotation
        }
        if (Math.abs(velocity) > 0.05) {
          dragRotation += velocity * delta;
          velocity *= 0.94; // friction
        }
      }

      const totalRotation = baseScrollRotation + dragRotation + idleRotation;
      wheel.style.transform = `rotate(${totalRotation}deg)`;

      rafId = requestAnimationFrame(update);
    };

    rafId = requestAnimationFrame(update);

    return () => {
      st.kill();
      cancelAnimationFrame(rafId);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
    };
  }, []);

  const total = SHOT_IMAGES.length;
  const angleStep = 360 / total; // 22.5 deg per shot

  return (
    <section
      id="door"
      ref={sectionRef}
      className="relative flex min-h-[105vh] flex-col items-center justify-end overflow-hidden pb-28 pt-20"
      style={{
        background:
          "linear-gradient(180deg, #020926 0%, #05163F 22%, #1964D1 54%, #EBF2FC 82%, #F8F9FD 100%)",
      }}
    >
      {/* Halo Lab Celestial Top Horizon Glow */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-[#020926] to-transparent z-10" />

      {/* GIANT FINAL CTA ORBIT WHEEL (Halo Lab Architecture) */}
      <div className="pointer-events-none absolute inset-0 flex items-end justify-center overflow-hidden">
        <div
          ref={orbitRef}
          className="relative aspect-square w-[max(115vw,1180px)] -bottom-[52vw] sm:-bottom-[54vw] md:-bottom-[56vw]"
          style={{ transform: "translateZ(0)" }}
        >
          {/* Rotating Wheel Container */}
          <div
            ref={wheelRef}
            className="pointer-events-auto relative flex h-full w-full items-center justify-center will-change-transform cursor-grab active:cursor-grabbing"
            style={{ transformOrigin: "50% 50%" }}
          >
            {SHOT_IMAGES.map((src, index) => {
              const angle = angleStep * index + 90;
              return (
                <div
                  key={index}
                  className="final-cta__shot group absolute left-1/2 top-1/2 will-change-transform"
                  style={{
                    // Halo Lab exact CSS positioning
                    transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(calc(var(--orbit-radius, 46rem) * -1))`,
                    transformOrigin: "center center",
                  }}
                >
                  {/* Tablet Frame with Screen Mockup */}
                  <div className="relative h-[11rem] w-[14.75rem] rounded-xl bg-slate-900/90 p-1.5 shadow-[0_20px_50px_rgba(0,0,0,0.35)] ring-1 ring-white/20 backdrop-blur-md transition-all duration-300 group-hover:scale-105 group-hover:ring-sky group-hover:shadow-[0_25px_60px_rgba(18,84,236,0.4)] sm:h-[13rem] sm:w-[17.5rem]">
                    {/* Screen Image with Subtle Inner Bezel */}
                    <div className="relative h-full w-full overflow-hidden rounded-lg bg-black">
                      <img
                        src={src}
                        alt={`Project Screen ${index + 1}`}
                        className="h-full w-full object-cover select-none pointer-events-none transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                        draggable={false}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* CENTRAL CTA CONTENT (Matching Halo Lab Screenshot 2) */}
      <div className="relative z-20 mx-auto max-w-[880px] px-6 text-center">
        {/* Main Headline */}
        <h2 className="font-sans text-[clamp(38px,6vw,84px)] font-extrabold tracking-[-0.035em] leading-[1.08] text-[#070B1E]">
          Ready to discuss your <br className="hidden sm:inline" />
          project with us?
        </h2>

        {/* Subtitle */}
        <p className="mx-auto mt-6 max-w-[580px] font-sans text-[16px] font-normal leading-[1.65] text-slate-600 md:text-[18px]">
          Let&apos;s discuss how we can craft a distinctive client acquisition
          engine that captivates, connects, and converts.
        </p>

        {/* Halo Lab Royal Blue BOOK A CALL Button */}
        <div className="mt-9 flex items-center justify-center">
          <Magnetic strength={0.24}>
            <a
              href="/book"
              className="inline-flex items-center justify-center rounded-full bg-[#1254EC] px-9 py-4 font-sans text-[13px] font-bold tracking-[0.14em] uppercase text-white shadow-[0_10px_35px_rgba(18,84,236,0.4)] transition-all duration-300 hover:scale-105 hover:bg-[#0B3BB3] hover:shadow-[0_15px_45px_rgba(18,84,236,0.6)]"
            >
              BOOK A CALL
            </a>
          </Magnetic>
        </div>
      </div>
    </section>
  );
}
