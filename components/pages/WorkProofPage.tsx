"use client";

import React, { useState, useMemo, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import ContourBG from "@/components/uf/ContourBG";
import Reveal from "@/components/uf/Reveal";
import Magnetic from "@/components/uf/Magnetic";
import { playTick } from "@/components/audio/SoundToggle";
import {
  WORK_PROOF,
  WORK_PROOF_FILTERS,
  type WorkProofItem,
  type WorkProofTag,
} from "@/lib/workproof";
import { ROUTES } from "@/lib/routes";

/* ─── HOMEPAGE BENTO TESTIMONIALS DATA ─── */
interface BentoTestimonialItem {
  id: string;
  name: string;
  role: string;
  headline: string;
  subdetail?: string;
  videoUrl: string;
  badge: string;
  gridClass: string;
  isSquare?: boolean;
}

const BENTO_TESTIMONIALS: BentoTestimonialItem[] = [
  {
    id: "mohanded-smma",
    name: "Mohanded",
    role: "Social Media Marketing Agency Germany",
    headline: "Massive ROAS Growth Across eCommerce, Skincare, Supplements & More",
    videoUrl: "/testimonials/portrait-1.mp4",
    badge: "Massive ROAS Scale",
    gridClass: "col-span-1 lg:col-span-1 lg:row-span-2 min-h-[440px] sm:min-h-[500px] lg:min-h-[580px]",
  },
  {
    id: "giulia-mva",
    name: "Giulia",
    role: "MVA Marketing Agency Founder",
    headline: "From 1 Lead in 3 Months to 2 Verified MVA Leads in Under 24 Hours",
    videoUrl: "/testimonials/landscape-3.mp4",
    badge: "2 Leads in 24h",
    gridClass: "col-span-1 lg:col-span-1 lg:row-span-1 min-h-[260px] sm:min-h-[280px]",
  },
  {
    id: "edgar-portrait",
    name: "Edgar",
    role: "Agency Owner",
    headline: "Landed a $4,500 High-Ticket Client at Just $7 Per Lead",
    subdetail: "$1,500/mo × 3-month retainer",
    videoUrl: "/testimonials/portrait-2.mp4",
    badge: "$4,500 Retainer Won",
    gridClass: "col-span-1 lg:col-span-1 lg:row-span-2 min-h-[440px] sm:min-h-[500px] lg:min-h-[580px]",
  },
  {
    id: "edgar-jeremi-square",
    name: "Edgar & Jeremi",
    role: "Co-Founders · High-Ticket Funnel Agency",
    headline: "Winning High-Ticket Clients While Generating Incredible Results for Their Clients Too",
    videoUrl: "/testimonials/square-1.mp4",
    badge: "1:1 Live Case",
    isSquare: true,
    gridClass: "col-span-1 lg:col-span-1 lg:row-span-1 aspect-square min-h-[260px] sm:min-h-[280px]",
  },
  {
    id: "marie-grace-berg",
    name: "Marie Grace Berg",
    role: "High-Ticket Coach",
    headline: "From Zero Results to 2,000+ Online Summit Registrations",
    videoUrl: "/testimonials/landscape-1.mp4",
    badge: "2,000+ Registrations",
    gridClass: "col-span-1 md:col-span-1 lg:col-span-1 lg:row-span-1 min-h-[260px] sm:min-h-[280px]",
  },
  {
    id: "muhammad-ghattas",
    name: "Muhammad Ghattas",
    role: "Roofing Marketing Agency",
    headline: "Cut CPL by 50% & Getting Amazing Results for His Roofing Clients",
    videoUrl: "/testimonials/landscape-2.mp4",
    badge: "50% CPL Reduction",
    gridClass: "col-span-1 md:col-span-2 lg:col-span-2 lg:row-span-1 min-h-[260px] sm:min-h-[280px]",
  },
];

/* ─── HOMEPAGE STYLE BENTO VIDEO CARD ─── */
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

        {/* Bottom Details Overlay */}
        <div className="absolute inset-x-0 bottom-0 z-20 flex flex-col justify-end p-4 sm:p-5 bg-gradient-to-t from-black/95 via-black/70 to-transparent">
          <div className="mb-3">
            <div className="flex items-baseline gap-2">
              <h4 className="font-sans text-[15px] sm:text-[16px] font-bold text-white tracking-tight">
                {item.name}
              </h4>
              <span className="font-mono text-[11px] font-medium text-cyan-300">
                · {item.role}
              </span>
            </div>
            <p className="mt-1 font-sans text-[12.5px] sm:text-[13px] leading-snug text-slate-200 line-clamp-2">
              &ldquo;{item.headline}&rdquo;
            </p>
            {item.subdetail && (
              <span className="mt-1 inline-block font-mono text-[10.5px] text-emerald-300">
                ⚡ {item.subdetail}
              </span>
            )}
          </div>

          {/* Bottom Controls Bar */}
          <div className="flex items-center justify-between pt-2 border-t border-white/10">
            {/* Sound Toggle */}
            <button
              type="button"
              onClick={toggleSound}
              aria-label={isMuted ? "Unmute audio" : "Mute audio"}
              className="flex items-center gap-1.5 rounded-full border border-white/20 bg-black/65 px-3 py-1 text-xs font-semibold text-white backdrop-blur-md transition hover:scale-105 hover:bg-black/85 cursor-pointer"
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
              className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-black/65 text-white backdrop-blur-md transition hover:scale-105 hover:bg-black/85 cursor-pointer"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function WorkProofPage() {
  const [selectedTag, setSelectedTag] = useState<(typeof WORK_PROOF_FILTERS)[number]>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeReceipt, setActiveReceipt] = useState<WorkProofItem | null>(null);
  const [activeBentoVideo, setActiveBentoVideo] = useState<BentoTestimonialItem | null>(null);
  const [visibleCount, setVisibleCount] = useState<number>(24);

  // Close modals on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveReceipt(null);
        setActiveBentoVideo(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const filteredReceipts = useMemo(() => {
    return WORK_PROOF.filter((item) => {
      const matchTag = selectedTag === "All" || item.tag === selectedTag;
      const matchSearch =
        searchQuery === "" ||
        item.metric.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.metricLabel.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.niche.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.note.toLowerCase().includes(searchQuery.toLowerCase());
      return matchTag && matchSearch;
    });
  }, [selectedTag, searchQuery]);

  const visibleReceipts = useMemo(() => {
    return filteredReceipts.slice(0, visibleCount);
  }, [filteredReceipts, visibleCount]);

  const loadMore = useCallback(() => {
    playTick();
    setVisibleCount((prev) => Math.min(prev + 18, filteredReceipts.length));
  }, [filteredReceipts.length]);

  return (
    <div className="bg-[#020926] text-white">
      {/* ─── 1. HERO SECTION ─── */}
      <section className="relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24 border-b border-white/10">
        <ContourBG tone="dark" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(18,84,236,0.35),transparent_65%)]" />

        <div className="relative mx-auto max-w-[1240px] px-4 sm:px-6 md:px-10 lg:px-14">
          <p className="uf-eyebrow text-sky">
            ( Proof & Reviews ) — Verified Campaign Data
          </p>

          <div className="mt-6 grid gap-8 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">
            <div>
              <h1 className="font-sans text-[clamp(36px,5.5vw,64px)] font-extrabold leading-[1.08] tracking-[-0.03em] text-white">
                <Reveal as="span">
                  <span className="block">The Receipts First.</span>
                </Reveal>
                <Reveal as="span" delay={90}>
                  <span className="block bg-gradient-to-r from-sky via-cyan-300 to-amber-300 bg-clip-text text-transparent">
                    The Client Reviews Next.
                  </span>
                </Reveal>
              </h1>
              <p className="mt-6 max-w-[56ch] font-sans text-[16px] leading-[1.7] text-slate-300 sm:text-[17.5px]">
                Every single metric below is verified directly inside active Meta Ads Manager accounts, HighLevel CRMs, and live client pipelines.
              </p>
            </div>

            {/* Quick Stats Cards */}
            <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-white/12 bg-white/[0.04] p-5 backdrop-blur-md sm:p-6">
              <div className="flex-1 min-w-[110px]">
                <p className="font-serif text-[clamp(30px,4vw,40px)] italic leading-none text-white">
                  59
                </p>
                <p className="mt-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-sky">
                  Receipts
                </p>
              </div>
              <div className="h-10 w-px bg-white/15" aria-hidden />
              <div className="flex-1 min-w-[110px]">
                <p className="font-serif text-[clamp(30px,4vw,40px)] italic leading-none text-amber-300">
                  6
                </p>
                <p className="mt-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-amber-300/90">
                  Video Reviews
                </p>
              </div>
              <div className="h-10 w-px bg-white/15 hidden sm:block" aria-hidden />
              <div className="flex-1 min-w-[110px] hidden sm:block">
                <p className="font-serif text-[clamp(30px,4vw,40px)] italic leading-none text-emerald-400">
                  100%
                </p>
                <p className="mt-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-emerald-400/90">
                  Verified Data
                </p>
              </div>
            </div>
          </div>

          {/* Quick Anchor Navigation */}
          <div className="mt-10 flex flex-wrap items-center gap-3 border-t border-white/10 pt-6">
            <a
              href="#receipts"
              onClick={() => playTick()}
              className="inline-flex items-center gap-2 rounded-full border border-sky/30 bg-sky/10 px-5 py-2 font-mono text-[11px] font-bold uppercase tracking-wider text-sky hover:bg-sky/20 transition"
            >
              <span>1. Inspect 59 Screenshot Receipts ↓</span>
            </a>
            <a
              href="#testimonials"
              onClick={() => playTick()}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2 font-mono text-[11px] font-bold uppercase tracking-wider text-slate-300 hover:bg-white/15 hover:text-white transition"
            >
              <span>2. Watch Video Reviews ↓</span>
            </a>
          </div>
        </div>
      </section>

      {/* ─── 2. SECTION 1: PROOF FIRST (59 SCREENSHOT RECEIPTS) ─── */}
      <section id="receipts" className="relative py-16 sm:py-24 border-b border-white/10">
        <ContourBG tone="dark" />
        <div className="relative mx-auto max-w-[1240px] px-4 sm:px-6 md:px-10 lg:px-14">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between mb-10">
            <div>
              <span className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-sky bg-sky/10 px-3 py-1 rounded-md border border-sky/20">
                SECTION 01 · VERIFIED RECEIPTS
              </span>
              <h2 className="mt-3 font-sans text-[clamp(28px,4vw,44px)] font-extrabold tracking-tight text-white">
                The Proof Vault (59 Live Accounts)
              </h2>
              <p className="mt-2 font-sans text-[15px] sm:text-[16px] text-slate-300 max-w-[54ch]">
                Click any screenshot receipt to inspect high-resolution ad spend, CPL, ROAS, and booked revenue data.
              </p>
            </div>

            {/* Filter Tabs & Search */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <div className="flex flex-wrap gap-1.5">
                {WORK_PROOF_FILTERS.map((tag) => {
                  const isActive = selectedTag === tag;
                  return (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => {
                        playTick();
                        setSelectedTag(tag);
                      }}
                      className={`rounded-full px-3.5 py-1.5 font-mono text-[10.5px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                        isActive
                          ? "bg-sky text-[#020926] shadow-[0_0_15px_rgba(56,189,248,0.4)]"
                          : "bg-white/[0.06] text-slate-300 hover:bg-white/15 hover:text-white border border-white/10"
                      }`}
                    >
                      {tag === "All" ? "All (59)" : tag}
                    </button>
                  );
                })}
              </div>

              <input
                type="text"
                placeholder="Search niche/stat..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full sm:w-[180px] rounded-full border border-white/15 bg-white/[0.06] px-3.5 py-1.5 font-sans text-[12px] text-white placeholder-slate-400 outline-none transition focus:border-sky"
              />
            </div>
          </div>

          {/* Receipts Grid */}
          {visibleReceipts.length === 0 ? (
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-12 text-center">
              <p className="font-sans text-[18px] text-slate-300">
                No receipts found matching &ldquo;{searchQuery}&rdquo;.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedTag("All");
                }}
                className="mt-4 text-sky hover:underline font-mono text-xs uppercase font-bold"
              >
                Reset filters
              </button>
            </div>
          ) : (
            <div className="grid gap-4 sm:gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {visibleReceipts.map((item, index) => (
                <div
                  key={item.src}
                  onClick={() => {
                    playTick();
                    setActiveReceipt(item);
                  }}
                  className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/12 bg-[#030922] p-3.5 shadow-xl transition-all duration-300 hover:border-sky/50 hover:shadow-[0_16px_40px_rgba(18,84,236,0.2)] cursor-pointer"
                >
                  {/* Image Viewport */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-black">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.src}
                      alt={`${item.niche} proof receipt`}
                      loading="lazy"
                      className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

                    {/* Top Tag & Number */}
                    <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between">
                      <span className="rounded-md bg-black/75 px-2 py-0.5 font-mono text-[9.5px] font-bold uppercase tracking-wider text-sky border border-white/15 backdrop-blur-md">
                        {item.tag}
                      </span>
                      <span className="font-mono text-[10px] text-slate-400 bg-black/60 px-2 py-0.5 rounded backdrop-blur-md">
                        #{String(index + 1).padStart(2, "0")}
                      </span>
                    </div>

                    {/* Hover Zoom Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-[2px]">
                      <span className="rounded-full bg-white/20 border border-white/40 px-3 py-1 font-mono text-[11px] font-bold text-white shadow-lg">
                        🔍 Click to Zoom Receipt
                      </span>
                    </div>
                  </div>

                  {/* Receipt Information */}
                  <div className="mt-3 flex flex-1 flex-col justify-between pt-1">
                    <div>
                      <div className="flex items-baseline justify-between gap-2">
                        <span className="font-sans text-[18px] font-extrabold text-white">
                          {item.metric}
                        </span>
                        <span className="font-mono text-[11px] font-semibold text-cyan-300 truncate">
                          {item.metricLabel}
                        </span>
                      </div>
                      <p className="mt-1 font-mono text-[11px] text-slate-400 truncate">
                        {item.niche}
                      </p>
                    </div>

                    <p className="mt-2 text-[12.5px] font-sans text-slate-300 line-clamp-2 leading-relaxed border-t border-white/8 pt-2">
                      {item.note}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Load More Button */}
          {visibleCount < filteredReceipts.length && (
            <div className="mt-12 text-center">
              <button
                type="button"
                onClick={loadMore}
                className="inline-flex items-center gap-2 rounded-full border border-sky/30 bg-white/5 px-8 py-3.5 font-mono text-[12px] font-bold uppercase tracking-wider text-sky hover:bg-sky/20 transition shadow-lg cursor-pointer"
              >
                <span>Load More Receipts ({filteredReceipts.length - visibleCount} remaining)</span>
                <span>↓</span>
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ─── 3. SECTION 2: TESTIMONIALS NEXT (HOMEPAGE BENTO STYLE) ─── */}
      <section id="testimonials" className="relative py-16 sm:py-24 border-b border-white/10">
        <ContourBG tone="dark" />
        <div className="relative mx-auto max-w-[1280px] px-4 sm:px-6 md:px-10 lg:px-12">
          {/* Section Header */}
          <div className="max-w-[760px]">
            <span className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-amber-300 bg-amber-400/10 px-3 py-1 rounded-md border border-amber-400/20">
              SECTION 02 · CLIENT VIDEO AUDITS
            </span>
            <h2 className="mt-4">
              <Reveal as="span">
                <span className="block font-sans text-[clamp(34px,5vw,56px)] font-extrabold leading-[1.05] tracking-[-0.03em] text-white">
                  Enough from us.
                </span>
              </Reveal>
              <Reveal as="span" delay={80}>
                <span className="mt-1 block font-sans text-[clamp(34px,5vw,56px)] font-extrabold leading-[1.05] tracking-[-0.03em] bg-gradient-to-r from-sky-400 via-blue-400 to-indigo-300 bg-clip-text text-transparent">
                  In their own words.
                </span>
              </Reveal>
            </h2>
            <p className="mt-4 max-w-[54ch] font-sans text-[16px] leading-[1.65] text-slate-300 sm:text-[17px]">
              Unfiltered video walkthroughs, agency retainers, and revenue audits from owners who scaled with the system.
            </p>
          </div>

          {/* Dynamic Bento Box Grid (Same as Home Page) */}
          <div className="mt-12 sm:mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
            {BENTO_TESTIMONIALS.map((item) => (
              <BentoVideoCard
                key={item.id}
                item={item}
                onExpand={(vid) => setActiveBentoVideo(vid)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ─── 4. FINAL CTA BANNER ─── */}
      <section className="relative py-20 sm:py-28 bg-[#030B2E] overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(18,84,236,0.25),transparent_60%)]" />
        <div className="relative mx-auto max-w-[720px] px-4 text-center sm:px-6">
          <p className="uf-eyebrow justify-center text-sky">Next Step</p>
          <h2 className="mt-4 font-sans text-[clamp(30px,4.5vw,48px)] font-extrabold tracking-[-0.03em] text-white leading-tight">
            Ready to Build Your Own Million Dollar Funnel™?
          </h2>
          <p className="mt-4 font-sans text-[16px] sm:text-[17.5px] leading-relaxed text-slate-300">
            We map your offer, write the high-converting copy, build the landing architecture, wire the CRM automations, and launch traffic with you.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Magnetic strength={0.2}>
              <Link
                href={ROUTES.book}
                onClick={() => playTick()}
                className="btn-gold shadow-[0_12px_40px_rgba(234,179,8,0.35)]"
              >
                Book a Strategy Call →
              </Link>
            </Magnetic>
          </div>
        </div>
      </section>

      {/* ─── 5. FULLSCREEN BENTO VIDEO LIGHTBOX MODAL ─── */}
      {activeBentoVideo && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[120] flex flex-col items-center justify-center bg-black/90 p-4 sm:p-6 backdrop-blur-2xl"
          onClick={() => setActiveBentoVideo(null)}
        >
          <div className="absolute top-5 right-5 z-30">
            <button
              type="button"
              onClick={() => setActiveBentoVideo(null)}
              className="rounded-full bg-white/10 px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider text-white hover:bg-white/20 transition cursor-pointer"
            >
              Close ✕
            </button>
          </div>

          <div
            className="relative flex flex-col max-h-[90vh] max-w-[90vw] items-center justify-center overflow-hidden rounded-2xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <video
              key={activeBentoVideo.id}
              src={activeBentoVideo.videoUrl}
              controls
              autoPlay
              playsInline
              className="max-h-[75vh] w-auto max-w-full rounded-2xl object-contain shadow-[0_25px_60px_rgba(0,0,0,0.8)]"
            />
            <div className="mt-3 text-center">
              <h3 className="text-lg font-bold text-white">
                {activeBentoVideo.name} · <span className="text-cyan-300 font-normal">{activeBentoVideo.role}</span>
              </h3>
              <p className="text-sm text-slate-300 mt-0.5">
                &ldquo;{activeBentoVideo.headline}&rdquo;
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ─── 6. FULLSCREEN RECEIPT LIGHTBOX MODAL ─── */}
      {activeReceipt && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[120] flex items-center justify-center bg-black/90 p-4 sm:p-6 backdrop-blur-2xl"
          onClick={() => setActiveReceipt(null)}
        >
          <div className="absolute top-5 right-5 z-30">
            <button
              type="button"
              onClick={() => setActiveReceipt(null)}
              className="rounded-full bg-white/10 px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider text-white hover:bg-white/25 transition cursor-pointer"
            >
              Close ✕
            </button>
          </div>

          <div
            className="relative flex max-h-[92vh] max-w-[94vw] flex-col items-center justify-center overflow-hidden rounded-2xl border border-white/15 bg-[#030922] p-4 sm:p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-3 flex w-full items-center justify-between border-b border-white/10 pb-3">
              <div>
                <h3 className="font-sans text-[18px] font-bold text-white">
                  {activeReceipt.metric}{" "}
                  <span className="text-cyan-300 text-[14px]">
                    {activeReceipt.metricLabel}
                  </span>
                </h3>
                <p className="font-mono text-[12px] text-slate-400">
                  {activeReceipt.niche} · {activeReceipt.tag}
                </p>
              </div>
              <span className="rounded-full bg-emerald-500/15 border border-emerald-400/30 px-3 py-1 font-mono text-[11px] font-bold text-emerald-300">
                ✓ Verified Account
              </span>
            </div>

            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={activeReceipt.src}
              alt={`${activeReceipt.niche} receipt`}
              className="max-h-[72vh] w-auto max-w-full rounded-xl object-contain shadow-2xl border border-white/10"
            />

            <p className="mt-3 text-center font-sans text-[13.5px] text-slate-300 max-w-[650px]">
              {activeReceipt.note}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
