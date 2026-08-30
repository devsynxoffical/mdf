"use client";

import { useState } from "react";
import WordReveal from "./WordReveal";
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
    title: "How Edgar Landed High-Ticket Clients Using Our ScaleWithAds Client Acquisition System",
    subtitle: "High-Ticket Client Acquisition Walkthrough",
    duration: "2:04",
    videoUrl: "https://storage.googleapis.com/msgsndr/HWyar6Z3u3aF6ydghkCx/media/69624f63f8a93b76e0751a55.mp4",
    poster: "/images/testimonials/edgar_poster.jpg",
  },
  {
    id: "marie-grace-berg",
    name: "Marie Grace Berg",
    title: "Generated 2,000+ High-Ticket Registrations & Sales for Mary Grace Berg Summit",
    subtitle: "2,000+ Summit Registrations Case Study",
    duration: "1:12",
    videoUrl: "https://storage.googleapis.com/msgsndr/HWyar6Z3u3aF6ydghkCx/media/69624f62f8a93b0480751a4e.mp4",
    poster: "/images/testimonials/marie_poster.jpg",
  },
  {
    id: "edgar-jeremi",
    name: "Edgar & Jeremi",
    title: "How Edgar & Jeremi Are Getting High-Ticket Clients Using Our Million Dollar Funnel™ System",
    subtitle: "$4,500 MRR Deal at $7 CPL Walkthrough",
    duration: "0:45",
    videoUrl: "https://storage.googleapis.com/msgsndr/HWyar6Z3u3aF6ydghkCx/media/6978f116d560857126a4804c.mp4",
    poster: "/images/testimonials/edgar_jeremi_poster.jpg",
  },
];

export default function UFOpinions() {
  const [activeVideo, setActiveVideo] = useState<VideoTestimonial | null>(null);

  return (
    <section className="uf-dark relative bg-gradient-to-b from-[#072151] via-[#05163F] to-[#04112E] py-[18vh]">
      {/* Header & Word Reveal Statement */}
      <div className="mx-auto max-w-[1050px] px-6 text-center">
        <p className="uf-eyebrow mb-8 text-sky tracking-[0.18em] font-sans font-semibold">
          ( 05 ) — SECOND OPINIONS
        </p>
        <WordReveal
          className="font-sans text-[clamp(24px,3.2vw,44px)] font-bold leading-[1.4] text-white tracking-tight"
          parts={[
            { text: "Enough from us. The rest comes from the owners" },
            { img: "/images/testimonials/edgar_poster.jpg" },
            { img: "/images/testimonials/marie_poster.jpg" },
            { text: "who hired us." },
            { text: "In their own words.", accent: true },
          ]}
        />
      </div>

      {/* 3 Video Testimonial Cards */}
      <div className="mx-auto mt-16 grid max-w-[1340px] grid-cols-1 gap-8 px-6 sm:px-8 md:grid-cols-3 md:px-12">
        {TESTIMONIALS.map((item, i) => (
          <Reveal as="div" key={item.id} delay={i * 120}>
            <div
              onClick={() => setActiveVideo(item)}
              className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-sky/20 bg-[#0B2256]/80 p-5 sm:p-6 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1.5 hover:border-sky/60 hover:bg-[#0E2A6B] hover:shadow-[0_20px_50px_rgba(56,189,248,0.22)] cursor-pointer"
            >
              {/* Video Thumbnail Frame */}
              <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-black/60 shadow-inner">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.poster}
                  alt={item.title}
                  className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />

                {/* Ambient vignette overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-300 group-hover:opacity-60" />

                {/* Duration Badge */}
                <div className="absolute top-3 right-3 rounded-md border border-white/15 bg-black/75 px-2.5 py-1 backdrop-blur-md">
                  <span className="flex items-center gap-1.5 font-mono text-[11px] font-semibold text-white/90">
                    <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
                    {item.duration}
                  </span>
                </div>

                {/* High-Tech Glowing Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative flex h-14 w-14 items-center justify-center rounded-full border border-sky/40 bg-sky/20 backdrop-blur-md shadow-[0_0_25px_rgba(56,189,248,0.4)] transition-all duration-500 group-hover:scale-110 group-hover:bg-sky group-hover:shadow-[0_0_35px_rgba(56,189,248,0.8)]">
                    <span className="absolute inset-0 rounded-full border border-sky/30 animate-ping opacity-75" />
                    <svg
                      className="ml-1 h-6 w-6 text-white transition-colors duration-300 group-hover:text-slate-950"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Text Info Stack */}
              <div className="mt-5 flex flex-1 flex-col justify-between">
                <div>
                  {/* Name & Verified Badge */}
                  <div className="flex items-center justify-between">
                    <span className="font-sans text-[18px] font-extrabold text-white tracking-tight">
                      {item.name}
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full border border-sky/30 bg-sky/10 px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-sky">
                      <span>✦</span> Verified
                    </span>
                  </div>

                  {/* Subtitle / Metric */}
                  <p className="mt-2 font-mono text-[11px] uppercase tracking-wider text-sky/90 font-medium">
                    {item.subtitle}
                  </p>

                  {/* Title Description */}
                  <h3 className="mt-2.5 font-sans text-[15px] font-semibold leading-[1.45] text-slate-200 group-hover:text-white transition-colors duration-300">
                    {item.title}
                  </h3>
                </div>

                {/* Card Footer: Action Prompt */}
                <div className="mt-6 flex items-center justify-between border-t border-white/[0.08] pt-4">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-white/50 group-hover:text-sky transition-colors duration-300">
                    Watch Case Study
                  </span>
                  <span className="text-sky font-bold transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      {/* Cinematic Fullscreen Video Modal */}
      {activeVideo && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 sm:p-6 backdrop-blur-2xl transition-all duration-300 animate-in fade-in"
          onClick={() => setActiveVideo(null)}
        >
          <div
            className="relative w-full max-w-[1000px] overflow-hidden rounded-2xl border border-white/20 bg-[#050508] shadow-[0_25px_80px_rgba(0,0,0,0.95)]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-white/10 px-6 py-4 bg-black/40">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-sky">
                  {activeVideo.subtitle}
                </span>
                <h4 className="font-sans text-[16px] font-bold text-white tracking-tight">
                  {activeVideo.name} — Case Study
                </h4>
              </div>
              <button
                type="button"
                onClick={() => setActiveVideo(null)}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition-colors hover:bg-white/20"
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>

            {/* Video Player */}
            <div className="relative aspect-video w-full bg-black">
              <video
                src={activeVideo.videoUrl}
                poster={activeVideo.poster}
                controls
                autoPlay
                playsInline
                className="h-full w-full object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
