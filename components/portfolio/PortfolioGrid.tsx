"use client";

import { useMemo, useState } from "react";
import CreativeCard from "@/components/ui/CreativeCard";
import VideoModal from "@/components/ui/VideoModal";
import Reveal from "@/components/uf/Reveal";
import ContourBG from "@/components/uf/ContourBG";
import ResultsLogos from "@/components/uf/ResultsLogos";
import { CATEGORIES, VIDEOS, type PortfolioVideo } from "@/lib/videos";

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
    <section className="uf-dark relative min-h-screen overflow-hidden pb-[14vh] pt-[22vh]">
      <ContourBG tone="dark" />

      <div className="relative mx-auto max-w-[1440px] px-6 md:px-14">
        {/* header */}
        <p className="uf-eyebrow text-mint">
          ( Portfolio ) — {VIDEOS.length} Creatives · {CATEGORIES.length} Niches
        </p>
        <div className="mt-6 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <h1 className="type-xl text-bone">
            <Reveal as="span">
              <span className="font-condensed block text-[clamp(42px,6.4vw,96px)]">
                Every Niche.
              </span>
            </Reveal>
            <Reveal as="span" delay={110}>
              <span className="font-editorial block text-mint text-[clamp(34px,5vw,76px)]">
                Same System.
              </span>
            </Reveal>
          </h1>
          <p className="max-w-[38ch] font-body text-[16px] leading-[1.62] text-mute">
            Every creative currently running. Click any card for sound.
          </p>
        </div>

        {/* filters */}
        <div
          className="mt-12 flex flex-wrap gap-2"
          role="tablist"
          aria-label="Filter by niche"
        >
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

        {/* grid */}
        <div
          key={filter}
          className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-5 lg:grid-cols-4 xl:grid-cols-5"
        >
          {visible.map((v, i) => (
            <CreativeCard key={v.id} video={v} index={i} onOpen={setOpenVideo} />
          ))}
        </div>

        {/* closer */}
        <div className="mt-24 border-t rule-dark pt-14 text-center">
          <p className="font-editorial normal-case text-[clamp(22px,2.8vw,36px)] text-bone/85">
            Yours is next —
          </p>
          <a href="/book" className="btn-gold mt-8">
            Book the call
          </a>
        </div>

        <div className="mt-24">
          <ResultsLogos tone="dark" />
        </div>
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
      className={`rounded-full border px-4 py-2 font-mono text-[10px] uppercase tracking-[0.14em] transition-all duration-300 ${
        active
          ? "border-brass bg-brass text-inkdeep"
          : "border-bone/15 text-mute hover:border-bone/40 hover:text-bone"
      }`}
    >
      {label}{" "}
      <span className={`tnum ${active ? "text-inkdeep/60" : "text-mute/50"}`}>
        {count}
      </span>
    </button>
  );
}
