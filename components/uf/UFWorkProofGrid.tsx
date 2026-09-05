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
      className="group flex w-full flex-col text-left outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cobalt"
    >
      <div className="relative overflow-hidden rounded-lg border border-[#070B1E]/10 bg-white transition duration-300 group-hover:border-cobalt/40 group-hover:shadow-[0_8px_28px_rgba(18,84,236,0.1)]">
        <div className="relative aspect-[16/11] overflow-hidden bg-[#EEF2F8]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={item.src}
            alt={`${item.niche} — ${item.metric} ${item.metricLabel}`}
            className="h-full w-full object-cover object-top transition duration-500 ease-out group-hover:scale-[1.04]"
            loading="lazy"
            decoding="async"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#070B1E]/40 via-transparent to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />
        </div>
      </div>

      <div className="mt-2.5 flex items-baseline justify-between gap-2 px-0.5">
        <div className="min-w-0">
          <p className="truncate font-sans text-[13px] font-bold tracking-tight text-[#070B1E]">
            {item.metric}
            <span className="ml-1.5 font-medium text-slate-500">
              {item.metricLabel}
            </span>
          </p>
          <p className="mt-0.5 truncate font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-slate-400">
            {item.niche} · {item.tag}
          </p>
        </div>
        <span
          aria-hidden
          className="shrink-0 font-mono text-[10px] text-slate-300 transition group-hover:text-cobalt"
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
 * Results — compact proof grid.
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
      <div className="relative mx-auto max-w-[1180px] px-4 sm:px-6 md:px-10 lg:px-12">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between sm:gap-8">
          <div className="max-w-[36rem]">
            <p className="uf-eyebrow tracking-[0.18em] text-cobalt">{eyebrow}</p>
            <h2 className="mt-3 font-sans text-[clamp(26px,3.4vw,40px)] font-extrabold leading-[1.1] tracking-[-0.03em]">
              <Reveal as="span">
                <span className="text-[#070B1E]">Proof from live accounts.</span>
              </Reveal>
            </h2>
            <p className="mt-3 max-w-[44ch] font-sans text-[14px] leading-[1.65] text-slate-500">
              Real Meta and CRM screenshots — not mockups. Tap to expand.
            </p>
          </div>
          <p className="shrink-0 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400 sm:pb-1">
            {visible.length} of {filtered.length}
          </p>
        </div>

        {showFilters && (
          <div className="mt-8 flex flex-wrap gap-1.5">
            {WORK_PROOF_FILTERS.map((f) => {
              const on = filter === f;
              return (
                <button
                  key={f}
                  type="button"
                  onClick={() => setFilter(f)}
                  className={`h-8 px-3 font-mono text-[9px] font-semibold uppercase tracking-[0.12em] transition ${
                    on
                      ? "bg-cobalt text-white"
                      : "border border-[#070B1E]/12 bg-white text-slate-500 hover:border-cobalt/40 hover:text-cobalt"
                  }`}
                >
                  {f}
                </button>
              );
            })}
          </div>
        )}

        <div className="mt-8 grid grid-cols-2 gap-3 sm:mt-10 sm:gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-5">
          {visible.map((item) => (
            <ProofCard key={item.id} item={item} onOpen={() => setActive(item)} />
          ))}
        </div>

        {canSeeMore && (
          <div className="mt-10 flex flex-col items-center gap-2 border-t border-[#070B1E]/08 pt-8">
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
              className="inline-flex h-10 items-center justify-center bg-cobalt px-6 font-sans text-[13px] font-bold text-white transition hover:bg-cobalt-deep"
            >
              See more proof
            </button>
            <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-slate-400">
              {remaining} more
            </p>
          </div>
        )}

        {!hideAllLink && (
          <div className="mt-10 flex items-center justify-between gap-4 border-t border-[#070B1E]/08 pt-6">
            <p className="font-sans text-[13px] text-slate-500">
              Full ledger of every receipt.
            </p>
            <Link
              href={ROUTES.workProof}
              className="group inline-flex items-center font-sans text-[12px] font-bold uppercase tracking-[0.12em] text-[#070B1E] transition-colors hover:text-cobalt"
            >
              View all
              <span
                aria-hidden
                className="ml-1.5 transition-transform group-hover:translate-x-0.5"
              >
                →
              </span>
            </Link>
          </div>
        )}
      </div>

      {active && (
        <div
          className="fixed inset-0 z-[120] flex items-center justify-center bg-[#070B1E]/80 p-4 backdrop-blur-md sm:p-8"
          role="dialog"
          aria-modal
          aria-label={`${active.metric} ${active.metricLabel}`}
          onClick={() => setActive(null)}
        >
          <button
            type="button"
            className="absolute right-5 top-5 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-white/70 hover:text-white"
            onClick={() => setActive(null)}
          >
            Close ✕
          </button>
          <div
            className="relative max-h-[90vh] w-full max-w-[880px] overflow-auto rounded-xl border border-white/15 bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="border-b border-[#070B1E]/08 px-4 py-3 sm:px-5">
              <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-cobalt">
                {active.tag} · {active.niche}
              </p>
              <p className="mt-0.5 font-sans text-[16px] font-extrabold tracking-tight text-[#070B1E]">
                {active.metric}{" "}
                <span className="font-semibold text-slate-500">{active.metricLabel}</span>
              </p>
              <p className="mt-0.5 font-sans text-[13px] text-slate-500">{active.note}</p>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={active.src}
              alt={`${active.niche} receipt`}
              className="h-auto w-full bg-[#F5F7FB]"
            />
          </div>
        </div>
      )}
    </section>
  );
}
