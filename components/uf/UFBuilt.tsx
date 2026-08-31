"use client";

import { useMemo, useState } from "react";
import ContourBG from "./ContourBG";
import Reveal from "./Reveal";
import Magnetic from "./Magnetic";
import CreativeCard from "@/components/ui/CreativeCard";
import VideoModal from "@/components/ui/VideoModal";
import { VIDEOS, type PortfolioVideo } from "@/lib/videos";

// The niches we lead with on the home page.
const TABS = [
  { slug: "all", label: "Featured" },
  { slug: "roofing", label: "Roofing" },
  { slug: "solar", label: "Solar" },
  { slug: "mva", label: "MVA Law" },
  { slug: "hvac", label: "HVAC" },
  { slug: "finance", label: "Finance" },
];

const FEATURED = [
  "1203105527",
  "1203828901",
  "1203808485",
  "1203816135",
  "1203819145",
  "1203812402",
  "1203818782",
  "1203812276",
];

/** (06) The work — creative cards that play on hover. */
export default function UFBuilt() {
  const [tab, setTab] = useState("all");
  const [openVideo, setOpenVideo] = useState<PortfolioVideo | null>(null);

  const cards = useMemo(() => {
    if (tab === "all")
      return FEATURED.map((id) => VIDEOS.find((v) => v.id === id)!);
    return VIDEOS.filter((v) => v.category === tab).slice(0, 8);
  }, [tab]);

  return (
    <section id="work" className="uf-light relative overflow-hidden py-[15vh]">
      <ContourBG tone="light" />
      <div className="relative mx-auto max-w-[1440px] px-4 sm:px-6 md:px-14">
        <p className="uf-eyebrow text-mint-deep">( 06 ) — The Work</p>

        <div className="mt-6 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <h2 className="type-xl text-inkdeep">
            <Reveal as="span">
              <span className="font-condensed block text-[clamp(38px,5.6vw,88px)]">
                What We&apos;ve
              </span>
            </Reveal>
            <Reveal as="span" delay={110}>
              <span className="font-editorial block text-mint-deep text-[clamp(32px,4.6vw,72px)]">
                Built.
              </span>
            </Reveal>
          </h2>
        </div>

        {/* niche tabs */}
        <div className="mt-10 flex flex-wrap gap-2" role="tablist" aria-label="Filter creatives">
          {TABS.map((t) => {
            const active = tab === t.slug;
            return (
              <button
                key={t.slug}
                role="tab"
                aria-selected={active}
                onClick={() => setTab(t.slug)}
                className={`rounded-full border px-4 py-2 font-mono text-[10px] uppercase tracking-[0.14em] transition-all duration-300 ${
                  active
                    ? "border-inkdeep bg-inkdeep text-cream"
                    : "border-inkdeep/20 text-inkdeep/60 hover:border-inkdeep/50 hover:text-inkdeep"
                }`}
              >
                {t.label}
              </button>
            );
          })}
        </div>

        {/* cards */}
        <div
          key={tab}
          className="mt-9 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-5 lg:grid-cols-4"
        >
          {cards.map((v, i) => (
            <CreativeCard key={v.id} video={v} index={i} onOpen={setOpenVideo} />
          ))}
        </div>

        {/* closer */}
        <div className="mt-16 flex flex-col items-center gap-6 border-t rule-light pt-12 text-center">
          <p className="font-editorial normal-case text-[clamp(20px,2.4vw,32px)] text-inkdeep/80">
            Yours is next —
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Magnetic>
              <a href="/portfolio" className="btn-gold">
                See all {VIDEOS.length}
              </a>
            </Magnetic>
            <Magnetic strength={0.22}>
              <a href="/book" className="btn-ghost">
                Talk about yours
              </a>
            </Magnetic>
          </div>
        </div>
      </div>

      <VideoModal video={openVideo} onClose={() => setOpenVideo(null)} />
    </section>
  );
}
