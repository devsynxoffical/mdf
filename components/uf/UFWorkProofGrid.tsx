"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Reveal from "./Reveal";
import {
  WORK_PROOF,
  WORK_PROOF_FILTERS,
  type WorkProofItem,
  type WorkProofTag,
} from "@/lib/workproof";
import { ROUTES } from "@/lib/routes";
import { playTick } from "@/components/audio/SoundToggle";

import { ScrollTrigger } from "gsap/ScrollTrigger";

function ProofCard({
  item,
  onOpen,
}: {
  item: WorkProofItem;
  onOpen: () => void;
}) {
  return (
    <div
      onClick={() => {
        playTick();
        onOpen();
      }}
      className="group relative flex w-[320px] sm:w-[360px] md:w-[400px] shrink-0 flex-col overflow-hidden rounded-[20px] border border-white/10 bg-[#060c24]/90 p-3.5 text-left shadow-[0_12px_36px_rgba(0,0,0,0.45)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 hover:border-cyan-400/40 hover:shadow-[0_20px_50px_rgba(18,84,236,0.3)] cursor-pointer select-none"
    >
      {/* Top Device Window Bar */}
      <div className="mb-2.5 flex items-center justify-between border-b border-white/10 pb-2 px-1">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
        </div>
        <div className="flex items-center gap-2">
          <span
            className={`rounded-md px-2 py-0.5 font-mono text-[9.5px] font-bold uppercase tracking-wider ${
              item.tag === "Meta Ads"
                ? "bg-blue-500/15 text-blue-300 border border-blue-400/20"
                : item.tag === "CRM"
                ? "bg-purple-500/15 text-purple-300 border border-purple-400/20"
                : "bg-emerald-500/15 text-emerald-300 border border-emerald-400/20"
            }`}
          >
            {item.tag}
          </span>
          <span className="font-mono text-[10.5px] font-medium text-slate-400">
            {item.niche}
          </span>
        </div>
      </div>

      {/* Uncropped Screenshot Viewport */}
      <div className="relative flex w-full min-h-[220px] sm:min-h-[240px] items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-[#020617]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={item.src}
          alt={`${item.niche} — ${item.metric} ${item.metricLabel}`}
          className="block h-auto w-full object-contain transition-transform duration-500 ease-out group-hover:scale-[1.025]"
          loading="lazy"
          decoding="async"
          onLoad={() => {
            if (typeof window !== "undefined") {
              ScrollTrigger.refresh();
            }
          }}
        />

        {/* Hover Spotlight Glow */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/35 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100">
          <span className="rounded-full border border-white/30 bg-black/80 px-3.5 py-1.5 font-sans text-[12px] font-bold text-white shadow-xl backdrop-blur-md">
            🔍 Click to Inspect
          </span>
        </div>
      </div>

      {/* Bottom Metric Bar */}
      <div className="mt-3 flex items-center justify-between gap-2 px-1 pt-1 border-t border-white/5">
        <div className="min-w-0">
          <p className="truncate font-sans text-[15px] font-extrabold tracking-tight text-white">
            {item.metric}
            <span className="ml-1.5 font-semibold text-cyan-300 text-[12.5px]">
              {item.metricLabel}
            </span>
          </p>
          <p className="truncate font-sans text-[11.5px] text-slate-400">
            {item.note}
          </p>
        </div>
        <span
          aria-hidden
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/10 text-xs font-bold text-white transition-all duration-300 group-hover:bg-[#1254EC] group-hover:scale-110 shadow-sm"
        >
          →
        </span>
      </div>
    </div>
  );
}

type Props = {
  items?: WorkProofItem[];
  showFilters?: boolean;
  hideAllLink?: boolean;
  eyebrow?: string;
  compactHeader?: boolean;
  initialCount?: number;
  pageSize?: number;
};

/**
 * Results — Verified Performance Dual-Track Scroller & Inspector
 */
export default function UFWorkProofGrid({
  items,
  showFilters = true,
  hideAllLink = false,
  eyebrow = "( 03 ) — VERIFIED PERFORMANCE",
  compactHeader = false,
}: Props) {
  const source = items ?? WORK_PROOF;
  const [filter, setFilter] = useState<(typeof WORK_PROOF_FILTERS)[number]>("All");
  const [active, setActive] = useState<WorkProofItem | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  const filtered = useMemo(() => {
    if (!showFilters || filter === "All") return source;
    return source.filter((item) => item.tag === (filter as WorkProofTag));
  }, [source, showFilters, filter]);

  // Split into 2 rows for smooth dual marquee
  const row1 = useMemo(() => filtered.slice(0, Math.ceil(filtered.length / 2)), [filtered]);
  const row2 = useMemo(() => filtered.slice(Math.ceil(filtered.length / 2)), [filtered]);

  // Handle ESC key for modal
  useEffect(() => {
    if (!active) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [active]);

  return (
    <section
      id="results"
      className={`relative overflow-hidden bg-[#020926] text-white select-none ${
        compactHeader ? "pb-16 pt-10 sm:pb-20 sm:pt-12" : "py-16 sm:py-24 lg:py-28"
      }`}
    >
      {/* Ambient background glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(18,84,236,0.2),transparent_50%),radial-gradient(ellipse_at_70%_80%,rgba(56,189,248,0.12),transparent_50%)]"
      />

      <div className="relative mx-auto max-w-[1340px] px-4 sm:px-6 md:px-10 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-[42rem]">
            <p className="uf-eyebrow tracking-[0.18em] text-[#38BDF8] font-mono text-[12px] uppercase font-semibold">
              {eyebrow}
            </p>
            <h2 className="mt-4 font-sans text-[clamp(32px,4.5vw,56px)] font-extrabold leading-[1.06] tracking-[-0.035em] text-white">
              <Reveal as="span">
                <span className="block">Real campaign receipts</span>
              </Reveal>
              <Reveal as="span" delay={80}>
                <span className="mt-1 block bg-gradient-to-r from-[#38BDF8] via-[#818CF8] to-[#C084FC] bg-clip-text text-transparent">
                  &amp; pipeline ROI.
                </span>
              </Reveal>
            </h2>
            <p className="mt-5 max-w-[50ch] font-sans text-[15.5px] sm:text-[16.5px] leading-[1.65] text-slate-300">
              Direct exports from Meta Ads Manager, GoHighLevel, and live client CRM systems.
              Hover to pause, click any receipt to inspect full high-resolution metrics.
            </p>
          </div>

          {/* Filter Tabs */}
          {showFilters && (
            <div className="flex flex-wrap items-center gap-2">
              {WORK_PROOF_FILTERS.map((f) => {
                const isCurrent = filter === f;
                return (
                  <button
                    key={f}
                    type="button"
                    onClick={() => {
                      playTick();
                      setFilter(f);
                    }}
                    className={`rounded-full px-4 py-2 font-mono text-[11.5px] font-bold uppercase tracking-wider transition-all duration-300 ${
                      isCurrent
                        ? "bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.4)] scale-105"
                        : "border border-white/15 bg-white/5 text-slate-300 hover:border-white/30 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    {f}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Dual-Track Infinite Marquee Scroller */}
      <div className="relative mt-12 sm:mt-16 space-y-6 overflow-hidden">
        {/* Left/Right Edge Gradient Fade Masks */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-16 sm:w-32 bg-gradient-to-r from-[#020926] via-[#020926]/80 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-16 sm:w-32 bg-gradient-to-l from-[#020926] via-[#020926]/80 to-transparent" />

        {/* Row 1: Scrolling Left */}
        <div className="marquee-row overflow-hidden">
          <div
            className={`marquee-track-left flex w-max gap-5 ${
              isPaused ? "[animation-play-state:paused]" : ""
            }`}
            style={{ "--marquee-duration": "55s" } as React.CSSProperties}
          >
            {/* Loop 1 */}
            {row1.map((item) => (
              <ProofCard key={`${item.id}-r1-a`} item={item} onOpen={() => setActive(item)} />
            ))}
            {/* Loop 2 */}
            {row1.map((item) => (
              <ProofCard key={`${item.id}-r1-b`} item={item} onOpen={() => setActive(item)} />
            ))}
          </div>
        </div>

        {/* Row 2: Scrolling Right */}
        <div className="marquee-row overflow-hidden">
          <div
            className={`marquee-track-right flex w-max gap-5 ${
              isPaused ? "[animation-play-state:paused]" : ""
            }`}
            style={{ "--marquee-duration": "60s" } as React.CSSProperties}
          >
            {/* Loop 1 */}
            {row2.map((item) => (
              <ProofCard key={`${item.id}-r2-a`} item={item} onOpen={() => setActive(item)} />
            ))}
            {/* Loop 2 */}
            {row2.map((item) => (
              <ProofCard key={`${item.id}-r2-b`} item={item} onOpen={() => setActive(item)} />
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Footer Actions */}
      {!hideAllLink && (
        <div className="relative mx-auto mt-14 flex flex-col sm:flex-row items-center justify-center gap-4 px-4 text-center">
          <Link
            href={ROUTES.workProof}
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-7 py-3 font-sans text-[14px] font-bold text-white shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-white hover:text-black hover:shadow-[0_0_25px_rgba(255,255,255,0.4)]"
          >
            <span>Browse All 41+ Verified Receipts</span>
            <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
        </div>
      )}

      {/* Fullscreen Lightbox Zoom Modal */}
      {active && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[120] flex items-center justify-center bg-black/90 p-4 sm:p-6 backdrop-blur-2xl"
          onClick={() => setActive(null)}
        >
          {/* Close Button */}
          <div className="absolute top-5 right-5 z-30">
            <button
              type="button"
              onClick={() => setActive(null)}
              className="rounded-full bg-white/10 px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider text-white hover:bg-white/25 transition"
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
                  {active.metric} <span className="text-cyan-300 text-[14px]">{active.metricLabel}</span>
                </h3>
                <p className="font-mono text-[12px] text-slate-400">
                  {active.niche} · {active.tag}
                </p>
              </div>
              <span className="rounded-full bg-emerald-500/15 border border-emerald-400/30 px-3 py-1 font-mono text-[11px] font-bold text-emerald-300">
                ✓ Verified Account
              </span>
            </div>

            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={active.src}
              alt={`${active.niche} receipt`}
              className="max-h-[72vh] w-auto max-w-full rounded-xl object-contain shadow-2xl border border-white/10"
            />

            <p className="mt-3 text-center font-sans text-[13.5px] text-slate-300 max-w-[650px]">
              {active.note}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
