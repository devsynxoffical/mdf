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
 * Halo Lab–style final CTA: rotating shot wheel + centered book CTA.
 * Mobile: smaller cards, lower orbit, copy kept clear of the wheel.
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
    let lastDragAngle = 0;
    let lastTime = performance.now();
    let velocity = 0;
    let rafId: number;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const st = ScrollTrigger.create({
      trigger: section,
      start: "top bottom",
      end: "bottom top",
      scrub: 1.2,
      onUpdate: (self) => {
        baseScrollRotation = self.progress * 110;
      },
    });

    const getPointerAngle = (clientX: number, clientY: number) => {
      const rect = orbit.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      return (Math.atan2(clientY - cy, clientX - cx) * 180) / Math.PI;
    };

    const onPointerDown = (e: PointerEvent) => {
      isDragging = true;
      lastDragAngle = getPointerAngle(e.clientX, e.clientY);
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
    orbit.addEventListener("pointerdown", onPointerDown);

    const update = (now: number) => {
      const delta = Math.min(34, now - lastTime) / 1000;
      lastTime = now;

      if (!isDragging) {
        if (!reducedMotion) {
          idleRotation += 1.8 * delta;
        }
        if (Math.abs(velocity) > 0.05) {
          dragRotation += velocity * delta;
          velocity *= 0.94;
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
      orbit.removeEventListener("pointerdown", onPointerDown);
    };
  }, []);

  const total = SHOT_IMAGES.length;
  const angleStep = 360 / total;

  return (
    <section
      id="door"
      ref={sectionRef}
      className="relative flex min-h-[100dvh] flex-col items-center justify-end overflow-hidden pb-40 pt-28 sm:min-h-[105vh] sm:pb-28 sm:pt-20 md:pb-32"
      style={{
        background:
          "linear-gradient(180deg, #020926 0%, #05163F 22%, #1964D1 54%, #EBF2FC 82%, #F8F9FD 100%)",
      }}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-32 bg-gradient-to-b from-[#020926] to-transparent sm:h-48" />

      {/* Orbit wheel — pushed lower + smaller on mobile so copy stays readable */}
      <div className="pointer-events-none absolute inset-0 z-[5] flex items-end justify-center overflow-hidden">
        <div
          ref={orbitRef}
          className="relative aspect-square w-[max(155vw,560px)] -bottom-[72vw] sm:w-[max(115vw,900px)] sm:-bottom-[54vw] md:w-[max(115vw,1180px)] md:-bottom-[56vw]"
          style={{ transform: "translateZ(0)" }}
        >
          <div
            ref={wheelRef}
            className="pointer-events-auto relative flex h-full w-full cursor-grab items-center justify-center will-change-transform active:cursor-grabbing"
            style={{ transformOrigin: "50% 50%" }}
          >
            {SHOT_IMAGES.map((src, index) => {
              const angle = angleStep * index + 90;
              return (
                <div
                  key={index}
                  className="final-cta__shot group absolute left-1/2 top-1/2 will-change-transform"
                  style={{
                    transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(calc(var(--orbit-radius, 46rem) * -1))`,
                    transformOrigin: "center center",
                  }}
                >
                  <div className="relative h-[7rem] w-[9.5rem] rounded-lg bg-slate-900/90 p-1 shadow-[0_12px_32px_rgba(0,0,0,0.35)] ring-1 ring-white/20 backdrop-blur-md transition-all duration-300 group-hover:scale-105 group-hover:ring-sky sm:h-[11rem] sm:w-[14.75rem] sm:rounded-xl sm:p-1.5 md:h-[13rem] md:w-[17.5rem]">
                    <div className="relative h-full w-full overflow-hidden rounded-md bg-black sm:rounded-lg">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={src}
                        alt={`Project screen ${index + 1}`}
                        className="pointer-events-none h-full w-full select-none object-cover transition-transform duration-500 group-hover:scale-105"
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

      {/* Soft read plate behind CTA on phones — keeps headline readable over cards */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-[18%] z-[15] h-[42%] bg-gradient-to-t from-[#EBF2FC]/90 via-[#EBF2FC]/55 to-transparent sm:hidden"
      />

      <div className="relative z-20 mx-auto mb-2 max-w-[880px] px-4 text-center sm:mb-0 sm:px-6">
        <h2 className="font-sans text-[clamp(30px,7.5vw,84px)] font-extrabold leading-[1.08] tracking-[-0.035em] text-[#070B1E] drop-shadow-[0_1px_0_rgba(255,255,255,0.35)] sm:text-[clamp(38px,6vw,84px)]">
          Ready to discuss your <br className="hidden sm:inline" />
          project with us?
        </h2>

        <p className="mx-auto mt-4 max-w-[34ch] font-sans text-[15px] font-normal leading-[1.65] text-slate-700 sm:mt-6 sm:max-w-[580px] sm:text-[16px] sm:text-slate-600 md:text-[18px]">
          Let&apos;s discuss how we can craft a distinctive client acquisition
          engine that captivates, connects, and converts.
        </p>

        <div className="mt-7 flex items-center justify-center sm:mt-9">
          <Magnetic strength={0.16}>
            <a
              href="/book"
              className="inline-flex items-center justify-center rounded-full bg-[#1254EC] px-7 py-3.5 font-sans text-[12px] font-bold uppercase tracking-[0.14em] text-white shadow-[0_10px_35px_rgba(18,84,236,0.4)] transition-all duration-300 hover:scale-105 hover:bg-[#0B3BB3] hover:shadow-[0_15px_45px_rgba(18,84,236,0.6)] sm:px-9 sm:py-4 sm:text-[13px]"
            >
              BOOK A CALL
            </a>
          </Magnetic>
        </div>
      </div>
    </section>
  );
}
