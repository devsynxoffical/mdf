"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Reveal from "./Reveal";
import { playTick } from "@/components/audio/SoundToggle";
import { WORK_PROOF, WORK_PROOF_FILTERS, type WorkProofItem } from "@/lib/workproof";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const ALL_THUMBS = Array.from({ length: 59 }, (_, i) => {
  const n = String(i + 1).padStart(3, "0");
  return `/workproof/wp-${n}.png`;
});

/** Keep the main wall focused — archive lives in the tape. */
const FEATURED_IDS = [
  "wp-001",
  "wp-006",
  "wp-016",
  "wp-026",
  "wp-041",
  "wp-008",
  "wp-018",
  "wp-028",
  "wp-035",
  "wp-042",
  "wp-048",
  "wp-058",
];

/**
 * Work Proof — editorial evidence gallery.
 * Clean hierarchy: featured stage, uniform grid, archive tape.
 */
export default function UFWorkProof() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [filter, setFilter] = useState<(typeof WORK_PROOF_FILTERS)[number]>("All");
  const [activeId, setActiveId] = useState(FEATURED_IDS[0]);
  const [lightbox, setLightbox] = useState<WorkProofItem | null>(null);

  const pool = useMemo(() => {
    const featured = FEATURED_IDS.map(
      (id) => WORK_PROOF.find((p) => p.id === id)!
    ).filter(Boolean);
    if (filter === "All") return featured;
    return featured.filter((p) => p.tag === filter);
  }, [filter]);

  const active = pool.find((p) => p.id === activeId) ?? pool[0];

  useEffect(() => {
    if (pool.length && !pool.some((p) => p.id === activeId)) {
      setActiveId(pool[0].id);
    }
  }, [pool, activeId]);

  useEffect(() => {
    const section = sectionRef.current;
    const grid = gridRef.current;
    if (!section || !grid) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        grid.querySelectorAll("[data-proof-card]"),
        { y: 36, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.75,
          stagger: 0.05,
          ease: "power2.out",
          scrollTrigger: { trigger: grid, start: "top 82%" },
        }
      );
    }, section);

    return () => ctx.revert();
  }, [filter]);

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [lightbox]);

  const select = (item: WorkProofItem, open = false) => {
    if (item.id !== activeId) {
      setActiveId(item.id);
      playTick();
    }
    if (open) setLightbox(item);
  };

  return (
    <section
      ref={sectionRef}
      id="workproof"
      className="relative overflow-hidden bg-[#030B1F] py-[12vh] text-white"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_-10%,rgba(18,84,236,0.22),transparent_50%)]"
      />

      <div className="relative mx-auto max-w-[1280px] px-6 md:px-10 lg:px-14">
        {/* Header */}
        <div className="grid gap-8 border-b border-white/[0.08] pb-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-sky/90">
              ( 05 ) — Work Proof
            </p>
            <h2 className="mt-4">
              <Reveal as="span">
                <span className="font-condensed block text-[clamp(36px,5.2vw,72px)] leading-[0.95] tracking-[-0.02em] text-white">
                  The receipts.
                </span>
              </Reveal>
              <Reveal as="span" delay={90}>
                <span className="mt-2 block max-w-[18ch] font-sans text-[clamp(16px,1.6vw,20px)] font-medium leading-snug text-slate-400">
                  Live Meta Ads &amp; CRM dashboards — not mockups.
                </span>
              </Reveal>
            </h2>
          </div>

          <div className="lg:pb-1 lg:text-right">
            <p className="max-w-[34ch] font-sans text-[14px] leading-[1.7] text-slate-500 lg:ml-auto">
              Cost per lead, closed revenue, and volume cuts from real client
              accounts. Select a frame to inspect.
            </p>
            <a
              href="/cases/coaching-lto"
              className="mt-4 inline-flex items-center gap-2 font-sans text-[12px] font-semibold uppercase tracking-[0.14em] text-sky transition-colors hover:text-white"
            >
              Full case study
              <span aria-hidden>→</span>
            </a>
          </div>
        </div>

        {/* Filters — underline tabs */}
        <div
          className="mt-8 flex flex-wrap gap-x-8 gap-y-3 border-b border-white/[0.06]"
          role="tablist"
          aria-label="Filter work proof"
        >
          {WORK_PROOF_FILTERS.map((f) => {
            const on = filter === f;
            return (
              <button
                key={f}
                role="tab"
                aria-selected={on}
                onClick={() => {
                  setFilter(f);
                  playTick();
                }}
                className={`relative pb-3 font-mono text-[11px] uppercase tracking-[0.18em] transition-colors duration-300 ${
                  on ? "text-white" : "text-slate-500 hover:text-slate-300"
                }`}
              >
                {f}
                {on && (
                  <span className="absolute inset-x-0 -bottom-px h-px bg-sky shadow-[0_0_12px_#38BDF8]" />
                )}
              </button>
            );
          })}
        </div>

        {/* Featured stage */}
        {active && (
          <div className="mt-12 grid gap-0 overflow-hidden rounded-2xl border border-white/[0.1] bg-[#071433] lg:grid-cols-[1.55fr_0.85fr]">
            {/* Browser chrome + image */}
            <button
              type="button"
              onClick={() => setLightbox(active)}
              className="group relative flex flex-col text-left"
              aria-label="Open full-size proof"
            >
              <div className="flex items-center gap-2 border-b border-white/[0.08] bg-[#0A1A3C] px-4 py-3">
                <span className="flex gap-1.5" aria-hidden>
                  <i className="h-2.5 w-2.5 rounded-full bg-white/15" />
                  <i className="h-2.5 w-2.5 rounded-full bg-white/15" />
                  <i className="h-2.5 w-2.5 rounded-full bg-white/15" />
                </span>
                <span className="ml-3 flex-1 truncate rounded-md border border-white/[0.06] bg-black/25 px-3 py-1 font-mono text-[10px] tracking-wide text-slate-500">
                  mdf.workproof / {active.id} · {active.tag.toLowerCase()}
                </span>
              </div>
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-black/40">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  key={active.id}
                  src={active.src}
                  alt={`${active.niche} — ${active.metricLabel}`}
                  className="h-full w-full object-cover object-top transition duration-700 group-hover:scale-[1.02]"
                />
                <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/[0.06]" />
              </div>
            </button>

            {/* Metric panel */}
            <div className="flex flex-col justify-between border-t border-white/[0.08] p-7 md:p-9 lg:border-l lg:border-t-0">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-sky">
                  {active.tag}
                </p>
                <p className="mt-2 font-sans text-[13px] font-medium text-slate-400">
                  {active.niche}
                </p>

                <p className="mt-10 font-condensed text-[clamp(48px,7vw,80px)] leading-none tracking-[-0.03em] text-white">
                  {active.metric}
                </p>
                <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.18em] text-slate-400">
                  {active.metricLabel}
                </p>

                <p className="mt-8 max-w-[28ch] font-sans text-[14px] leading-[1.65] text-slate-400">
                  {active.note}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setLightbox(active)}
                className="mt-10 inline-flex w-fit items-center gap-2 border-b border-sky/50 pb-1 font-mono text-[11px] uppercase tracking-[0.16em] text-sky transition hover:border-sky hover:text-white"
              >
                View full cut
                <span aria-hidden>→</span>
              </button>
            </div>
          </div>
        )}

        {/* Uniform gallery */}
        <div
          ref={gridRef}
          className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5"
        >
          {pool.map((item, idx) => {
            const on = item.id === active?.id;
            return (
              <button
                key={item.id}
                type="button"
                data-proof-card
                onMouseEnter={() => select(item)}
                onClick={() => select(item, true)}
                className={`group flex flex-col overflow-hidden rounded-xl border text-left transition duration-500 ${
                  on
                    ? "border-sky/45 bg-[#0A1C42] shadow-[0_0_0_1px_rgba(56,189,248,0.15)]"
                    : "border-white/[0.08] bg-[#071433] hover:border-white/20"
                }`}
              >
                <div className="relative aspect-[16/11] overflow-hidden bg-black/30">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.src}
                    alt=""
                    className="h-full w-full object-cover object-top transition duration-700 group-hover:scale-[1.03]"
                    loading="lazy"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#030B1F]/50 to-transparent opacity-60" />
                  <span className="absolute left-3 top-3 rounded border border-white/10 bg-black/50 px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.14em] text-slate-300 backdrop-blur-sm">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                </div>

                <div className="flex items-end justify-between gap-3 border-t border-white/[0.06] px-4 py-3.5">
                  <div className="min-w-0">
                    <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-sky/80">
                      {item.tag}
                    </p>
                    <p className="mt-1 truncate font-sans text-[12.5px] text-slate-400">
                      {item.niche}
                    </p>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="font-condensed text-[26px] leading-none tracking-tight text-white">
                      {item.metric}
                    </p>
                    <p className="mt-1 max-w-[14ch] font-mono text-[8px] uppercase tracking-[0.12em] text-slate-500">
                      {item.metricLabel}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {pool.length === 0 && (
          <p className="mt-16 text-center font-mono text-[11px] uppercase tracking-[0.18em] text-slate-500">
            No cuts in this filter
          </p>
        )}
      </div>

      {/* Archive tape */}
      <div className="marquee-row relative mt-20 border-t border-white/[0.08]">
        <div className="mx-auto flex max-w-[1280px] items-baseline justify-between px-6 py-5 md:px-10 lg:px-14">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500">
            Archive · {ALL_THUMBS.length} frames
          </p>
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-slate-600">
            Click any cut
          </p>
        </div>
        <div className="overflow-hidden pb-8">
          <div
            className="marquee-track-left flex w-max gap-2.5"
            style={{ ["--marquee-duration" as string]: "70s" }}
          >
            {[0, 1].map((copy) => (
              <div
                key={copy}
                className="flex shrink-0 gap-2.5 pr-2.5"
                aria-hidden={copy === 1 || undefined}
              >
                {ALL_THUMBS.map((src, i) => (
                  <button
                    key={`${copy}-${src}`}
                    type="button"
                    onClick={() => {
                      const curated = WORK_PROOF.find((p) => p.src === src);
                      setLightbox(
                        curated ?? {
                          id: `raw-${i}`,
                          src,
                          tag: "Meta Ads",
                          niche: "Archive frame",
                          metric: `#${i + 1}`,
                          metricLabel: "workproof cut",
                          note: "Raw account receipt from the full archive.",
                          size: "md",
                        }
                      );
                      playTick();
                    }}
                    className="relative h-[96px] w-[148px] shrink-0 overflow-hidden rounded-lg border border-white/[0.08] bg-[#071433] opacity-80 transition hover:border-sky/35 hover:opacity-100 sm:h-[108px] sm:w-[168px]"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={src}
                      alt=""
                      className="h-full w-full object-cover object-top"
                      loading="lazy"
                    />
                  </button>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-[#030B1F]/90 p-4 backdrop-blur-lg md:p-8"
          role="dialog"
          aria-modal="true"
          aria-label="Work proof detail"
          onClick={() => setLightbox(null)}
        >
          <div
            className="relative flex max-h-[92vh] w-full max-w-[1080px] flex-col overflow-hidden rounded-2xl border border-white/12 bg-[#071433] shadow-[0_40px_120px_rgba(0,0,0,0.55)]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-4 border-b border-white/[0.08] px-5 py-4 md:px-6">
              <div className="min-w-0">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-sky">
                  {lightbox.tag} · {lightbox.niche}
                </p>
                <p className="mt-1 truncate font-condensed text-[28px] leading-none text-white md:text-[34px]">
                  {lightbox.metric}
                  <span className="ml-3 font-mono text-[10px] uppercase tracking-[0.14em] text-slate-500">
                    {lightbox.metricLabel}
                  </span>
                </p>
              </div>
              <button
                type="button"
                onClick={() => setLightbox(null)}
                className="shrink-0 rounded-full border border-white/15 px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-slate-300 transition hover:border-sky/50 hover:text-sky"
              >
                Esc
              </button>
            </div>
            <div className="overflow-auto bg-black/50 p-3 md:p-5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={lightbox.src}
                alt={`${lightbox.niche} full proof`}
                className="mx-auto h-auto max-h-[72vh] w-full rounded-lg object-contain"
              />
            </div>
            <p className="border-t border-white/[0.06] px-5 py-3 font-sans text-[13px] text-slate-400 md:px-6">
              {lightbox.note}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
