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

function ProofCard({
  item,
  onOpen,
}: {
  item: WorkProofItem;
  onOpen: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="group relative flex w-full flex-col overflow-hidden rounded-xl border border-slate-200/90 bg-white p-3 text-left shadow-[0_2px_12px_rgba(0,0,0,0.03)] transition-all duration-300 hover:-translate-y-1 hover:border-[#1254EC]/40 hover:shadow-[0_12px_30px_rgba(18,84,236,0.12)] outline-none focus-visible:ring-2 focus-visible:ring-cobalt"
    >
      {/* Top Mini Header */}
      <div className="mb-2.5 flex items-center justify-between gap-1 border-b border-slate-100 pb-2">
        <div className="flex items-center gap-1">
          <span className="h-2 w-2 rounded-full bg-slate-300 group-hover:bg-red-400 transition-colors" />
          <span className="h-2 w-2 rounded-full bg-slate-300 group-hover:bg-amber-400 transition-colors" />
          <span className="h-2 w-2 rounded-full bg-slate-300 group-hover:bg-emerald-400 transition-colors" />
        </div>
        <div className="flex items-center gap-1.5">
          <span className="rounded-md bg-blue-50 border border-blue-100 px-2 py-0.5 font-mono text-[9px] font-bold uppercase text-blue-700">
            {item.tag}
          </span>
          <span className="truncate font-sans text-[10px] font-semibold text-slate-500 max-w-[80px]">
            {item.niche}
          </span>
        </div>
      </div>

      {/* Uncropped Fully Visible Screenshot Container */}
      <div className="relative flex w-full items-center justify-center overflow-hidden rounded-lg border border-slate-100 bg-[#F8FAFC]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={item.src}
          alt={`${item.niche} — ${item.metric} ${item.metricLabel}`}
          className="block h-auto w-full object-contain transition-transform duration-500 ease-out group-hover:scale-[1.02]"
          loading="lazy"
          decoding="async"
        />

        {/* Hover View Badge */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/25 opacity-0 backdrop-blur-[1px] transition-opacity duration-300 group-hover:opacity-100">
          <span className="rounded-full border border-white/20 bg-black/80 px-2.5 py-1 font-sans text-[11px] font-bold text-white shadow-lg backdrop-blur-md">
            🔍 Expand
          </span>
        </div>
      </div>

      {/* Card Details Footer */}
      <div className="mt-2.5 flex items-center justify-between gap-2 pt-0.5">
        <div className="min-w-0">
          <p className="truncate font-sans text-[14px] font-extrabold tracking-tight text-[#070B1E]">
            {item.metric}
            <span className="ml-1 font-semibold text-slate-500 text-[12px]">
              {item.metricLabel}
            </span>
          </p>
          <p className="truncate font-sans text-[11px] text-slate-400">
            {item.niche} · {item.tag}
          </p>
        </div>
        <span
          aria-hidden
          className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-100 font-mono text-xs text-slate-500 transition-all duration-300 group-hover:bg-[#1254EC] group-hover:text-white group-hover:translate-x-0.5 shadow-sm"
        >
          →
        </span>
      </div>
    </button>
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
 * Results — Live Proof Grid with 4 screenshots per line on desktop.
 */
export default function UFWorkProofGrid({
  items,
  showFilters = false,
  hideAllLink = false,
  eyebrow = "( Results ) — Live proof",
  compactHeader = false,
  initialCount = 0,
  pageSize = 8,
}: Props) {
  const source = items ?? WORK_PROOF.slice(0, 8);
  const [filter, setFilter] = useState<(typeof WORK_PROOF_FILTERS)[number]>("All");
  const [active, setActive] = useState<WorkProofItem | null>(null);
  const [visibleCount, setVisibleCount] = useState(
    initialCount > 0 ? initialCount : Number.POSITIVE_INFINITY
  );

  const filtered = useMemo(() => {
    if (!showFilters || filter === "All") return source;
    return source.filter((item) => item.tag === (filter as WorkProofTag));
  }, [source, showFilters, filter]);

  const visible = useMemo(
    () => filtered.slice(0, visibleCount),
    [filtered, visibleCount]
  );

  const remaining = Math.max(0, filtered.length - visible.length);
  const canSeeMore = initialCount > 0 && remaining > 0;

  useEffect(() => {
    setVisibleCount(initialCount > 0 ? initialCount : Number.POSITIVE_INFINITY);
  }, [filter, initialCount]);

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
      className={`relative overflow-hidden bg-[#F5F7FB] text-[#070B1E] ${
        compactHeader ? "pb-16 pt-10 sm:pb-20 sm:pt-12" : "py-16 sm:py-20 lg:py-24"
      }`}
    >
      <div className="relative mx-auto max-w-[1340px] px-4 sm:px-6 md:px-10 lg:px-12">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between sm:gap-8">
          <div className="max-w-[36rem]">
            <p className="uf-eyebrow tracking-[0.18em] text-cobalt">{eyebrow}</p>
            <h2 className="mt-3 font-sans text-[clamp(28px,3.6vw,44px)] font-extrabold leading-[1.08] tracking-[-0.03em]">
              <Reveal as="span">
                <span className="text-[#070B1E]">Proof from live accounts.</span>
              </Reveal>
            </h2>
            <p className="mt-3 max-w-[48ch] font-sans text-[15px] leading-[1.65] text-slate-500">
              Real Meta and CRM screenshots — not mockups. Tap any receipt to expand.
            </p>
          </div>
          <p className="shrink-0 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400 sm:pb-1">
            {visible.length} of {filtered.length} Receipts
          </p>
        </div>

        {showFilters && (
          <div className="mt-8 flex flex-wrap gap-2">
            {WORK_PROOF_FILTERS.map((f) => {
              const on = filter === f;
              return (
                <button
                  key={f}
                  type="button"
                  onClick={() => setFilter(f)}
                  className={`h-9 px-4 rounded-lg font-mono text-[11px] font-semibold uppercase tracking-[0.12em] transition ${
                    on
                      ? "bg-cobalt text-white shadow-sm"
                      : "border border-[#070B1E]/12 bg-white text-slate-600 hover:border-cobalt/40 hover:text-cobalt"
                  }`}
                >
                  {f}
                </button>
              );
            })}
          </div>
        )}

        {/* 4 Screenshots in a Single Line (4-Column Grid on Desktop) */}
        <div className="mt-8 grid grid-cols-1 gap-4 sm:mt-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {visible.map((item) => (
            <ProofCard key={item.id} item={item} onOpen={() => setActive(item)} />
          ))}
        </div>

        {canSeeMore && (
          <div className="mt-12 flex flex-col items-center gap-2 border-t border-[#070B1E]/08 pt-8">
            <button
              type="button"
              onClick={() =>
                setVisibleCount((n) =>
                  Math.min(
                    filtered.length,
                    (Number.isFinite(n) ? n : initialCount) + pageSize
                  )
                )
              }
              className="inline-flex h-11 items-center justify-center rounded-xl bg-cobalt px-8 font-sans text-[14px] font-bold text-white shadow-md transition hover:bg-cobalt-deep hover:scale-[1.02]"
            >
              See more proof
            </button>
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400">
              {remaining} more receipts available
            </p>
          </div>
        )}

        {!hideAllLink && (
          <div className="mt-12 flex items-center justify-between gap-4 border-t border-[#070B1E]/08 pt-6">
            <p className="font-sans text-[14px] text-slate-500 font-medium">
              Full ledger of every receipt and live case.
            </p>
            <Link
              href={ROUTES.workProof}
              className="group inline-flex items-center font-sans text-[13px] font-bold uppercase tracking-[0.12em] text-[#070B1E] transition-colors hover:text-cobalt"
            >
              View all receipts
              <span
                aria-hidden
                className="ml-1.5 transition-transform group-hover:translate-x-1"
              >
                →
              </span>
            </Link>
          </div>
        )}
      </div>

      {/* Expanded Modal View */}
      {active && (
        <div
          className="fixed inset-0 z-[120] flex items-center justify-center bg-[#070B1E]/85 p-4 backdrop-blur-md sm:p-8"
          role="dialog"
          aria-modal
          aria-label={`${active.metric} ${active.metricLabel}`}
          onClick={() => setActive(null)}
        >
          <button
            type="button"
            className="absolute right-5 top-5 rounded-full bg-white/10 px-3.5 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-white hover:bg-white/20 transition"
            onClick={() => setActive(null)}
          >
            Close ✕
          </button>
          <div
            className="relative max-h-[90vh] w-full max-w-[960px] overflow-auto rounded-2xl border border-white/20 bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="border-b border-[#070B1E]/08 bg-[#FAFBFD] px-5 py-4">
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-blue-50 border border-blue-100 px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase text-cobalt">
                  {active.tag}
                </span>
                <span className="font-sans text-[12px] font-bold text-slate-600">
                  {active.niche}
                </span>
              </div>
              <p className="mt-2 font-sans text-[18px] font-extrabold tracking-tight text-[#070B1E]">
                {active.metric}{" "}
                <span className="font-semibold text-slate-500">{active.metricLabel}</span>
              </p>
              {active.note && (
                <p className="mt-1 font-sans text-[13px] text-slate-500">{active.note}</p>
              )}
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={active.src}
              alt={`${active.niche} receipt`}
              className="h-auto w-full object-contain block bg-[#F8FAFC] p-2"
            />
          </div>
        </div>
      )}
    </section>
  );
}
