"use client";

import { useEffect, useRef, useState } from "react";
import ContourBG from "./ContourBG";
import Reveal from "./Reveal";

interface BentoTestimonialItem {
  id: string;
  videoUrl: string;
  badge: string;
  gridClass: string;
  objectFit?: "cover" | "contain";
}

const BENTO_TESTIMONIALS: BentoTestimonialItem[] = [
  {
    id: "portrait-1",
    videoUrl: "/testimonials/portrait-1.mp4",
    badge: "Client Feedback",
    gridClass: "col-span-1 lg:col-span-1 lg:row-span-2 min-h-[420px] sm:min-h-[480px] lg:min-h-[560px]",
    objectFit: "cover",
  },
  {
    id: "landscape-3",
    videoUrl: "/testimonials/landscape-3.mp4",
    badge: "Founder Debrief",
    gridClass: "col-span-1 lg:col-span-1 lg:row-span-1 min-h-[240px] sm:min-h-[260px] lg:min-h-[265px]",
    objectFit: "cover",
  },
  {
    id: "portrait-2",
    videoUrl: "/testimonials/portrait-2.mp4",
    badge: "Results Review",
    gridClass: "col-span-1 lg:col-span-1 lg:row-span-2 min-h-[420px] sm:min-h-[480px] lg:min-h-[560px]",
    objectFit: "cover",
  },
  {
    id: "square-1",
    videoUrl: "/testimonials/square-1.mp4",
    badge: "Live Verification",
    gridClass: "col-span-1 lg:col-span-1 lg:row-span-1 min-h-[240px] sm:min-h-[260px] lg:min-h-[265px]",
    objectFit: "cover",
  },
  {
    id: "landscape-2",
    videoUrl: "/testimonials/landscape-2.mp4",
    badge: "Client Walkthrough",
    gridClass: "col-span-1 md:col-span-2 lg:col-span-2 lg:row-span-1 min-h-[250px] sm:min-h-[280px] lg:min-h-[300px]",
    objectFit: "cover",
  },
  {
    id: "landscape-1",
    videoUrl: "/testimonials/landscape-1.mp4",
    badge: "Case Study",
    gridClass: "col-span-1 md:col-span-1 lg:col-span-1 lg:row-span-1 min-h-[250px] sm:min-h-[280px] lg:min-h-[300px]",
    objectFit: "cover",
  },
];

function BentoVideoCard({
  item,
  onExpand,
}: {
  item: BentoTestimonialItem;
  onExpand: (item: BentoTestimonialItem) => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
          setIsPlaying(true);
        } else {
          video.pause();
          setIsPlaying(false);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  const toggleSound = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      const nextMuted = !videoRef.current.muted;
      videoRef.current.muted = nextMuted;
      setIsMuted(nextMuted);
      if (!nextMuted) {
        videoRef.current.play().catch(() => {});
        setIsPlaying(true);
      }
    } else {
      setIsMuted((prev) => !prev);
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play().catch(() => {});
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  return (
    <div
      className={`group relative overflow-hidden rounded-[22px] sm:rounded-[26px] border border-white/15 bg-[#030922]/90 shadow-[0_12px_36px_rgba(0,0,0,0.5)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-1.5 hover:border-cyan-400/40 hover:shadow-[0_20px_50px_rgba(18,84,236,0.3)] ${item.gridClass}`}
    >
      {/* Video element covering the bento tile */}
      <div
        className="relative h-full w-full overflow-hidden bg-black cursor-pointer"
        onClick={togglePlay}
      >
        <video
          ref={videoRef}
          src={item.videoUrl}
          playsInline
          loop
          muted={isMuted}
          autoPlay
          preload="metadata"
          className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.02]"
        />

        {/* Top Floating Badge */}
        <div className="pointer-events-none absolute left-3.5 top-3.5 z-20 flex items-center gap-1.5 rounded-full border border-white/20 bg-black/65 px-3 py-1 backdrop-blur-md">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
          <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-white/90">
            {item.badge}
          </span>
        </div>

        {/* Play/Pause Center Indicator */}
        {!isPlaying && (
          <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center bg-black/35 backdrop-blur-[1px]">
            <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/30 bg-black/75 text-white shadow-2xl">
              <svg className="ml-1 h-6 w-6 fill-white" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        )}

        {/* Bottom Floating Controls */}
        <div className="absolute inset-x-0 bottom-0 z-20 flex items-center justify-between p-3.5 bg-gradient-to-t from-black/85 via-black/40 to-transparent">
          {/* Sound Toggle */}
          <button
            type="button"
            onClick={toggleSound}
            aria-label={isMuted ? "Unmute audio" : "Mute audio"}
            className="flex items-center gap-1.5 rounded-full border border-white/20 bg-black/65 px-3 py-1 text-xs font-semibold text-white backdrop-blur-md transition hover:scale-105 hover:bg-black/85"
          >
            {isMuted ? (
              <>
                <svg className="h-3.5 w-3.5 text-white/80" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 14l4-4m0 0l-4-4m4 4l-4 4" />
                  <line x1="1" y1="1" x2="23" y2="23" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
                </svg>
                <span className="font-mono text-[10px]">Unmute</span>
              </>
            ) : (
              <>
                <svg className="h-3.5 w-3.5 text-cyan-300 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                </svg>
                <span className="font-mono text-[10px] text-cyan-300">Sound On</span>
              </>
            )}
          </button>

          {/* Fullscreen Expand */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onExpand(item);
            }}
            aria-label="Expand video"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-black/65 text-white backdrop-blur-md transition hover:scale-105 hover:bg-black/85"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

/**
 * ( 05 ) Testimonials Section — High-Ticket Bento Grid Layout
 */
export default function UFOpinions() {
  const [activeVideo, setActiveVideo] = useState<BentoTestimonialItem | null>(null);

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
      className="uf-dark relative overflow-hidden bg-[#020926] py-[14vh] text-white select-none"
    >
      <ContourBG tone="dark" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_0%,rgba(18,84,236,0.18),transparent_50%),radial-gradient(ellipse_at_20%_80%,rgba(56,189,248,0.12),transparent_50%)]"
      />

      <div className="relative mx-auto max-w-[1280px] px-4 sm:px-6 md:px-10 lg:px-12">
        {/* Section Header */}
        <div className="max-w-[740px]">
          <p className="uf-eyebrow tracking-[0.18em] text-sky font-mono text-[11px] uppercase font-semibold">
            ( 05 ) — Second Opinions
          </p>
          <h2 className="mt-4">
            <Reveal as="span">
              <span className="block font-sans text-[clamp(34px,5.2vw,56px)] font-extrabold leading-[1.05] tracking-[-0.03em] text-white">
                Enough from us.
              </span>
            </Reveal>
            <Reveal as="span" delay={80}>
              <span className="mt-1 block font-sans text-[clamp(34px,5.2vw,56px)] font-extrabold leading-[1.05] tracking-[-0.03em] bg-gradient-to-r from-sky-400 via-blue-400 to-indigo-300 bg-clip-text text-transparent">
                In their own words.
              </span>
            </Reveal>
          </h2>
          <p className="mt-5 max-w-[50ch] font-sans text-[16px] leading-[1.65] text-slate-300 sm:text-[17px]">
            Unfiltered feedback and walkthroughs from owners who built and scaled with the system.
          </p>
        </div>

        {/* Dynamic Bento Box Grid */}
        <div className="mt-12 sm:mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {BENTO_TESTIMONIALS.map((item) => (
            <BentoVideoCard
              key={item.id}
              item={item}
              onExpand={(vid) => setActiveVideo(vid)}
            />
          ))}
        </div>
      </div>

      {/* Fullscreen Video Modal Lightbox */}
      {activeVideo && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[120] flex flex-col items-center justify-center bg-black/90 p-4 sm:p-6 backdrop-blur-2xl"
          onClick={() => setActiveVideo(null)}
        >
          <div className="absolute top-5 right-5 z-30">
            <button
              type="button"
              onClick={() => setActiveVideo(null)}
              className="rounded-full bg-white/10 px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider text-white hover:bg-white/20 transition"
            >
              Close ✕
            </button>
          </div>

          <div
            className="relative flex max-h-[90vh] max-w-[90vw] items-center justify-center overflow-hidden rounded-2xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <video
              key={activeVideo.id}
              src={activeVideo.videoUrl}
              controls
              autoPlay
              playsInline
              className="max-h-[85vh] w-auto max-w-full rounded-2xl object-contain shadow-[0_25px_60px_rgba(0,0,0,0.8)]"
            />
          </div>
        </div>
      )}
    </section>
  );
}
