"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ContourBG from "./ContourBG";
import VideoThumb from "@/components/ui/VideoThumb";
import VideoModal from "@/components/ui/VideoModal";
import { VIDEOS, type PortfolioVideo } from "@/lib/videos";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// scattered collage tiles: position (%), size (px), tilt (deg), parallax speed
const TILES = [
  { id: "1203105527", x: 6, y: 2, w: 240, r: -3, s: -60 },
  { id: "1203828901", x: 66, y: 0, w: 280, r: 2, s: -110 },
  { id: "1203808485", x: 30, y: 6, w: 220, r: 4, s: -30 },
  { id: "1203818782", x: 2, y: 58, w: 300, r: 2, s: -130 },
  { id: "1219790482", x: 40, y: 66, w: 260, r: -4, s: -50 },
  { id: "1203819145", x: 72, y: 56, w: 250, r: 3, s: -90 },
  { id: "1203812276", x: 52, y: 30, w: 200, r: -2, s: -150 },
];

/** (05) The work — giant type over a parallax collage of real creatives. */
export default function UFBuilt() {
  const sectionRef = useRef<HTMLElement>(null);
  const [openVideo, setOpenVideo] = useState<PortfolioVideo | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const tiles = section.querySelectorAll<HTMLElement>("[data-tile]");
    const st = ScrollTrigger.create({
      trigger: section,
      start: "top bottom",
      end: "bottom top",
      scrub: 0.5,
      onUpdate: (self) => {
        tiles.forEach((t) => {
          const speed = Number(t.dataset.speed);
          t.style.transform = `translateY(${(self.progress - 0.5) * speed}px) rotate(${t.dataset.rot}deg)`;
        });
      },
    });
    return () => st.kill();
  }, []);

  return (
    <section ref={sectionRef} className="uf-light relative overflow-hidden py-[18vh]">
      <ContourBG tone="light" />
      <div className="relative mx-auto max-w-[1280px] px-6">
        <p className="uf-eyebrow relative z-20 text-mint-deep">( 05 ) — The Work</p>

        <div className="relative mt-4 min-h-[560px] md:min-h-[680px]">
          {/* collage behind + around the heading */}
          {TILES.map((t, i) => {
            const video = VIDEOS.find((v) => v.id === t.id)!;
            return (
              <button
                key={t.id}
                data-tile
                data-speed={t.s}
                data-rot={t.r}
                onClick={() => setOpenVideo(video)}
                aria-label={`Play ${video.title}`}
                className="group absolute z-10 hidden overflow-hidden rounded-[10px] shadow-[0_18px_48px_rgba(11,13,16,0.22)] md:block"
                style={{
                  left: `${t.x}%`,
                  top: `${t.y}%`,
                  width: t.w,
                  aspectRatio: "16/10",
                  transform: `rotate(${t.r}deg)`,
                }}
              >
                <VideoThumb video={video} seed={i} playSize={30} />
              </button>
            );
          })}

          {/* mobile: simple two-column collage */}
          <div className="grid grid-cols-2 gap-3 md:hidden">
            {TILES.slice(0, 4).map((t, i) => {
              const video = VIDEOS.find((v) => v.id === t.id)!;
              return (
                <button
                  key={t.id}
                  onClick={() => setOpenVideo(video)}
                  aria-label={`Play ${video.title}`}
                  className="group relative overflow-hidden rounded-[10px]"
                  style={{ aspectRatio: "16/10" }}
                >
                  <VideoThumb video={video} seed={i} playSize={26} />
                </button>
              );
            })}
          </div>

          {/* the heading floats over the collage */}
          <h2 className="pointer-events-none relative z-20 mt-10 text-center leading-[0.84] md:mt-[180px]">
            <span className="font-condensed block text-inkdeep text-[clamp(56px,11vw,170px)] drop-shadow-[0_2px_24px_rgba(242,239,232,0.55)]">
              What We&apos;ve
            </span>
            <span className="font-editorial block text-mint-deep text-[clamp(44px,9vw,140px)]">
              Built.
            </span>
          </h2>
        </div>

        <div className="relative z-20 mt-16 text-center">
          <p className="font-editorial normal-case text-[clamp(22px,2.6vw,34px)] text-inkdeep/80">
            62 creatives. 14 niches. Yours is next —
          </p>
          <div className="mt-8 flex flex-col items-center gap-5">
            <a href="#door" className="uf-pill">
              Let&apos;s talk about yours
            </a>
            <a
              href="/portfolio"
              className="font-mono text-[11px] uppercase tracking-[0.18em] text-inkdeep/60 underline underline-offset-4 hover:text-inkdeep"
            >
              See all 62 →
            </a>
          </div>
        </div>
      </div>
      <VideoModal video={openVideo} onClose={() => setOpenVideo(null)} />
    </section>
  );
}
