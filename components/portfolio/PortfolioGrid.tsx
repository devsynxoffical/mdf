"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import RiseIn from "@/components/ui/RiseIn";
import VideoThumb from "@/components/ui/VideoThumb";
import VideoModal from "@/components/ui/VideoModal";
import {
  CATEGORIES,
  VIDEOS,
  categoryLabel,
  type PortfolioVideo,
} from "@/lib/videos";

export default function PortfolioGrid() {
  const [filter, setFilter] = useState<string>("all");
  const [openVideo, setOpenVideo] = useState<PortfolioVideo | null>(null);

  const counts = useMemo(() => {
    const m = new Map<string, number>();
    for (const v of VIDEOS) m.set(v.category, (m.get(v.category) ?? 0) + 1);
    return m;
  }, []);

  const visible = useMemo(
    () => (filter === "all" ? VIDEOS : VIDEOS.filter((v) => v.category === filter)),
    [filter]
  );

  return (
    <section className="relative mx-auto min-h-screen max-w-[1440px] px-6 pb-32 pt-[180px] md:px-16">
      <div className="aurora" aria-hidden />

      {/* Header */}
      <div className="relative">
        <RiseIn>
          <p className="bracket-label">Portfolio · {VIDEOS.length} Creatives</p>
        </RiseIn>
        <RiseIn delay={80}>
          <h1 className="mt-5 leading-[0.86]">
            <span className="font-condensed block text-bone text-[clamp(48px,7vw,100px)]">
              Every Niche.
            </span>
            <span className="font-editorial block text-mint text-[clamp(38px,5.6vw,82px)]">
              Same System.
            </span>
          </h1>
        </RiseIn>
        <RiseIn delay={160}>
          <p className="mt-6 max-w-[56ch] font-body text-[18px] leading-[1.6] text-mute">
            The ad creatives feeding the Million Dollar Funnel™ across{" "}
            {CATEGORIES.length} industries. Filter by niche, click to watch.
          </p>
        </RiseIn>
      </div>

      {/* Filters */}
      <RiseIn delay={220}>
        <div className="relative mt-12 flex flex-wrap gap-2.5" role="tablist" aria-label="Filter by niche">
          <FilterChip
            active={filter === "all"}
            onClick={() => setFilter("all")}
            label="All"
            count={VIDEOS.length}
          />
          {CATEGORIES.map((c) => (
            <FilterChip
              key={c.slug}
              active={filter === c.slug}
              onClick={() => setFilter(c.slug)}
              label={c.label}
              count={counts.get(c.slug) ?? 0}
            />
          ))}
        </div>
      </RiseIn>

      {/* Grid */}
      <motion.div layout className="relative mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <AnimatePresence mode="popLayout">
          {visible.map((v, i) => (
            <motion.button
              layout
              key={v.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1], delay: Math.min(i * 0.03, 0.4) }}
              onClick={() => setOpenVideo(v)}
              aria-label={`Play ${v.title}`}
              className="group relative block overflow-hidden rounded-[16px] border border-bone/[0.08] bg-slate2 text-left transition-colors duration-[250ms] hover:border-brass/30"
            >
              <span className="relative block" style={{ aspectRatio: "16/9" }}>
                <VideoThumb video={v} seed={i} playSize={44} />
              </span>
              <span className="block px-4 py-3.5">
                <span className="block truncate font-body text-[14px] font-medium text-bone">
                  {v.title}
                </span>
                <span className="mt-1 block font-mono text-[11px] uppercase tracking-eyebrow text-mute">
                  {categoryLabel(v.category)} · {v.duration}s
                </span>
              </span>
            </motion.button>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* CTA */}
      <div className="relative mt-20 text-center">
        <p className="font-body text-[17px] text-mute">
          Want creatives like these feeding your calendar?
        </p>
        <a
          href="/#book"
          className="mt-5 inline-block rounded-full bg-brass px-9 py-4 font-body text-s16 font-semibold text-ink transition-[filter,box-shadow] duration-200 hover:brightness-[1.08] hover:shadow-[0_0_32px_rgba(217,164,65,0.35)]"
        >
          Reserve your spot
        </a>
      </div>

      <VideoModal video={openVideo} onClose={() => setOpenVideo(null)} />
    </section>
  );
}

function FilterChip({
  active,
  onClick,
  label,
  count,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  count: number;
}) {
  return (
    <button
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={`rounded-full border px-4 py-2 font-mono text-[11px] uppercase tracking-[0.12em] transition-colors duration-200 ${
        active
          ? "border-brass/60 bg-brass/10 text-bone"
          : "border-bone/[0.1] text-mute hover:border-bone/25 hover:text-bone"
      }`}
    >
      {label} <span className={active ? "text-brass" : "text-mute/60"}>{count}</span>
    </button>
  );
}
