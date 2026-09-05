"use client";

import { useEffect, useRef, useState } from "react";
import ContourBG from "./ContourBG";
import Reveal from "./Reveal";

interface VideoTestimonial {
  id: string;
  name: string;
  title: string;
  subtitle: string;
  duration: string;
  videoUrl: string;
  poster: string;
}

const TESTIMONIALS: VideoTestimonial[] = [
  {
    id: "edgar",
    name: "Edgar",
    title: "How Edgar landed high-ticket clients with the ScaleWithAds acquisition system.",
    subtitle: "High-ticket client acquisition",
    duration: "2:04",
    videoUrl: "/video/testimonials/edgar.mp4",
    poster: "/images/testimonials/edgar_poster.webp",
  },
  {
    id: "marie-grace-berg",
    name: "Marie Grace Berg",
    title: "2,000+ high-ticket registrations and sales for the Mary Grace Berg summit.",
    subtitle: "Summit registrations case study",
    duration: "1:12",
    videoUrl: "/video/testimonials/marie.mp4",
    poster: "/images/testimonials/marie_poster.webp",
  },
  {
    id: "edgar-jeremi",
    name: "Edgar & Jeremi",
    title: "High-ticket clients through the Million Dollar Funnel™ system — $4,500 MRR at $7 CPL.",
    subtitle: "$4,500 MRR at $7 CPL",
    duration: "0:45",
    videoUrl: "/video/testimonials/ej.mp4",
    poster: "/images/testimonials/edgar_jeremi_poster.webp",
  },
];

/**
 * Card uses poster only — video loads in the modal on tap.
 * Avoids downloading ~50MB of preview video on first paint.
 */
function OpinionClip({
  item,
  onOpen,
}: {
  item: VideoTestimonial;
  onOpen: () => void;
}) {
  return (
    <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#050508]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={item.poster}
        alt=""
        loading="lazy"
        decoding="async"
        className="h-full w-full object-cover object-[center_18%]"
      />

      <button
        type="button"
        onClick={onOpen}
        className="absolute inset-0 z-10"
        aria-label={`Watch ${item.name} case study`}
      />

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/70 to-transparent" />

      <span className="pointer-events-none absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/45 backdrop-blur-sm">
        <svg viewBox="0 0 24 24" className="ml-0.5 h-5 w-5 fill-white" aria-hidden>
          <path d="M8 5v14l11-7z" />
        </svg>
      </span>

      <span className="pointer-events-none absolute right-3 top-3 font-mono text-[10px] font-semibold tabular-nums text-white/80">
        {item.duration}
      </span>

      <span className="pointer-events-none absolute bottom-3 left-3 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-white/85">
        Watch
      </span>
    </div>
  );
}

/**
 * ( 05 ) Owner case-study videos — poster cards, fullscreen watch on tap.
 */
export default function UFOpinions() {
  const [activeVideo, setActiveVideo] = useState<VideoTestimonial | null>(null);

  useEffect(() => {
    if (!activeVideo) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveVideo(null);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [activeVideo]);

  return (
    <section
      id="opinions"
      className="uf-dark relative overflow-hidden bg-[#020926] py-[12vh] text-white"
    >
      <ContourBG tone="dark" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_0%,rgba(18,84,236,0.12),transparent_50%)]"
      />

      <div className="relative mx-auto max-w-[1180px] px-4 sm:px-6 md:px-10 lg:px-14">
        <div className="max-w-[720px]">
          <p className="uf-eyebrow tracking-[0.18em] text-sky">( 05 ) — Second Opinions</p>
          <h2 className="mt-4">
            <Reveal as="span">
              <span className="block font-sans text-[clamp(34px,5.2vw,56px)] font-extrabold leading-[1.05] tracking-[-0.03em] text-white">
                Enough from us.
              </span>
            </Reveal>
            <Reveal as="span" delay={90}>
              <span className="mt-1 block font-sans text-[clamp(34px,5.2vw,56px)] font-extrabold leading-[1.05] tracking-[-0.03em] text-sky">
                In their own words.
              </span>
            </Reveal>
          </h2>
          <p className="mt-5 max-w-[46ch] font-sans text-[16px] leading-[1.65] text-slate-400 sm:text-[17px]">
            The rest comes from the owners who hired us — three case-study walkthroughs.
            Tap a clip to watch with sound.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-8 sm:mt-16 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {TESTIMONIALS.map((item) => (
            <article
              key={item.id}
              className="flex flex-col overflow-hidden rounded-[12px] border border-white/10 bg-[#04103A]/50"
            >
              <OpinionClip item={item} onOpen={() => setActiveVideo(item)} />
              <div className="flex flex-1 flex-col px-5 py-5 sm:px-6 sm:py-6">
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-sky">
                  {item.subtitle}
                </p>
                <h3 className="mt-2 font-sans text-[18px] font-extrabold tracking-[-0.02em] text-white">
                  {item.name}
                </h3>
                <p className="mt-2 font-sans text-[14px] leading-[1.55] text-slate-400">
                  {item.title}
                </p>
                <button
                  type="button"
                  onClick={() => setActiveVideo(item)}
                  className="mt-5 self-start font-sans text-[12px] font-bold uppercase tracking-[0.12em] text-white transition hover:text-sky"
                >
                  Watch <span aria-hidden>→</span>
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>

      {activeVideo && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="opinion-modal-title"
          className="fixed inset-0 z-[80] flex flex-col bg-black"
        >
          <div className="flex shrink-0 items-center justify-between px-5 py-4 sm:px-8">
            <div>
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-sky">
                {activeVideo.subtitle}
              </p>
              <h4
                id="opinion-modal-title"
                className="mt-1 font-sans text-[16px] font-bold tracking-tight text-white sm:text-[18px]"
              >
                {activeVideo.name}
              </h4>
            </div>
            <button
              type="button"
              onClick={() => setActiveVideo(null)}
              className="font-sans text-[12px] font-bold uppercase tracking-[0.14em] text-white/70 transition hover:text-white"
            >
              Close
            </button>
          </div>

          <div className="flex min-h-0 flex-1 items-center justify-center px-4 pb-8">
            <video
              key={activeVideo.id}
              src={activeVideo.videoUrl}
              poster={activeVideo.poster}
              controls
              autoPlay
              playsInline
              preload="auto"
              className="max-h-full w-auto max-w-full object-contain"
              style={{ maxHeight: "calc(100vh - 96px)" }}
            />
          </div>
        </div>
      )}
    </section>
  );
}
