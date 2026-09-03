"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { playTick } from "@/components/audio/SoundToggle";
import {
  getWorkProofReceipts,
  WORK_PROOF_FILTERS,
  type WorkProofDetail,
  type WorkProofTag,
} from "@/lib/workproof";

type Props = {
  items: WorkProofDetail[];
  /** Show filter tabs (full page). */
  showFilters?: boolean;
  /** Link shown when a row is expanded. */
  expandLink?: { href: string; label: string };
  /** Start with first item open. */
  defaultActiveId?: string;
};

/**
 * Meridian-style expandable proof rows — colored expand blocks,
 * 3-col meta, detailed copy, and receipt gallery.
 */
export default function ProofExpandList({
  items,
  showFilters = false,
  expandLink,
  defaultActiveId,
}: Props) {
  const [filter, setFilter] = useState<(typeof WORK_PROOF_FILTERS)[number]>("All");
  const [activeId, setActiveId] = useState(
    defaultActiveId ?? items[0]?.id ?? ""
  );
  const [lightbox, setLightbox] = useState<{
    src: string;
    title: string;
    metric: string;
    metricLabel: string;
    note: string;
  } | null>(null);

  const pool = useMemo(() => {
    if (!showFilters || filter === "All") return items;
    return items.filter((p) => p.tag === (filter as WorkProofTag));
  }, [filter, items, showFilters]);

  useEffect(() => {
    if (!pool.length) return;
    if (!pool.some((p) => p.id === activeId)) {
      setActiveId(pool[0].id);
    }
  }, [pool, activeId]);

  const handleActivate = (id: string) => {
    if (activeId !== id) {
      setActiveId(id);
      playTick();
    }
  };

  return (
    <>
      {showFilters && (
        <div className="sticky top-[64px] z-30 -mx-4 mb-8 border-b border-white/10 bg-[#020926] px-4 py-3 sm:top-[72px] sm:mx-0 sm:px-0 sm:py-4">
          <div
            className="flex flex-wrap items-center gap-2 sm:gap-3"
            role="tablist"
            aria-label="Filter work proof"
          >
            {WORK_PROOF_FILTERS.map((f) => {
              const on = filter === f;
              const count =
                f === "All"
                  ? items.length
                  : items.filter((p) => p.tag === f).length;
              return (
                <button
                  key={f}
                  role="tab"
                  aria-selected={on}
                  onClick={() => {
                    setFilter(f);
                    playTick();
                    const next =
                      f === "All"
                        ? items[0]
                        : items.find((p) => p.tag === f);
                    if (next) setActiveId(next.id);
                  }}
                  className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-2 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] transition sm:px-4 sm:text-[11px] ${
                    on
                      ? "border-sky/50 bg-sky/15 text-white shadow-[0_0_20px_rgba(56,189,248,0.2)]"
                      : "border-white/10 bg-white/[0.03] text-slate-400 hover:border-white/20 hover:text-slate-200"
                  }`}
                >
                  {f}
                  <span
                    className={`rounded-full px-1.5 py-0.5 text-[9px] tabular-nums ${
                      on ? "bg-sky/25 text-sky" : "bg-white/5 text-slate-500"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
            <p className="ml-auto hidden font-mono text-[10px] uppercase tracking-[0.14em] text-slate-500 sm:block">
              {pool.length} showing
            </p>
          </div>
        </div>
      )}

      <div className={showFilters ? "border-t-0" : "border-t border-white/10"}>
        {pool.map((row) => {
          const isActive = activeId === row.id;
          const receipts = getWorkProofReceipts(row);

          return (
            <div
              key={row.id}
              id={row.id}
              onMouseEnter={() => handleActivate(row.id)}
              onClick={() => handleActivate(row.id)}
              className={`group relative cursor-pointer overflow-hidden border-b border-white/10 transition-all duration-500 ${
                isActive ? "py-10 md:py-14" : "py-7 md:py-9 hover:bg-white/[0.02]"
              }`}
              style={{
                backgroundColor: isActive ? row.expandBg : undefined,
              }}
            >
              <div className="mx-auto px-2 md:px-4">
                <div className="grid grid-cols-1 items-start gap-6 md:grid-cols-[220px_1fr_200px] lg:grid-cols-[280px_1fr_220px]">
                  <div>
                    <p
                      className={`font-mono text-[10px] font-semibold uppercase tracking-[0.14em] ${
                        isActive ? "text-white/75" : "text-sky/80"
                      }`}
                    >
                      {row.category}
                    </p>
                    <h3 className="mt-2 font-sans text-[clamp(20px,2.2vw,28px)] font-extrabold tracking-[-0.02em] text-white">
                      {row.displayName}
                    </h3>

                    {isActive && expandLink && (
                      <div className="mt-5">
                        <Link
                          href={expandLink.href}
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-white/90 underline-offset-4 transition hover:text-white hover:underline"
                        >
                          {expandLink.label}
                          <span className="transition-transform duration-200 group-hover:translate-x-1">
                            →
                          </span>
                        </Link>
                      </div>
                    )}
                  </div>

                  <div>
                    <p
                      className={`max-w-[560px] font-sans text-[15px] leading-[1.65] sm:text-[16px] ${
                        isActive ? "text-white/95" : "text-slate-400"
                      }`}
                    >
                      <span className="font-semibold">{row.headline}</span>{" "}
                      <span className={isActive ? "text-white/80" : "text-slate-500"}>
                        {row.note}
                      </span>
                    </p>

                    {isActive && (
                      <>
                        <p className="mt-4 max-w-[560px] font-sans text-[14px] leading-[1.7] text-white/85 sm:text-[15px]">
                          {row.body}
                        </p>
                        <div className="mt-5 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                          <p className="font-serif text-[clamp(32px,4vw,48px)] italic leading-none text-white">
                            {row.metric}
                          </p>
                          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-white/75">
                            {row.metricLabel}
                          </p>
                        </div>
                      </>
                    )}
                  </div>

                  <div className="text-left md:text-right">
                    <div className="flex flex-col gap-1">
                      {row.services.map((s) => (
                        <span
                          key={s}
                          className={`font-mono text-[10px] font-semibold tracking-[0.12em] ${
                            isActive ? "text-white/75" : "text-slate-500"
                          }`}
                        >
                          {s}
                        </span>
                      ))}
                      <span
                        className={`mt-2 font-mono text-[10px] font-bold tracking-[0.14em] ${
                          isActive ? "text-white" : "text-slate-400"
                        }`}
                      >
                        {row.market}
                      </span>
                    </div>
                  </div>
                </div>

                {isActive && (
                  <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3 md:mt-12">
                    {receipts.map((src, idx) => (
                      <button
                        key={`${row.id}-${src}-${idx}`}
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setLightbox({
                            src,
                            title: row.displayName,
                            metric: row.metric,
                            metricLabel: row.metricLabel,
                            note: row.note,
                          });
                          playTick();
                        }}
                        className="group/shot relative overflow-hidden rounded-xl border border-white/20 bg-black/30 shadow-[0_20px_50px_rgba(0,0,0,0.35)] transition hover:scale-[1.02] hover:border-white/40"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={src}
                          alt={`${row.displayName} receipt ${idx + 1}`}
                          className="aspect-[16/10] w-full object-cover object-top"
                          loading="lazy"
                        />
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-3 py-2 opacity-0 transition group-hover/shot:opacity-100">
                          <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-white/90">
                            Tap to enlarge
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {pool.length === 0 && (
        <p className="py-16 text-center font-sans text-[15px] text-slate-500">
          No receipts in this filter.
        </p>
      )}

      {lightbox && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#020926]/95 p-4 backdrop-blur-xl sm:p-8"
          onClick={() => setLightbox(null)}
        >
          <div
            className="relative flex max-h-[92vh] w-full max-w-[960px] flex-col overflow-hidden rounded-2xl border border-white/15 bg-[#0A1020] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 border-b border-white/10 px-5 py-4 sm:px-6">
              <div>
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-sky">
                  {lightbox.title}
                </p>
                <p className="mt-1 font-sans text-[18px] font-bold text-white">
                  <span className="font-serif italic">{lightbox.metric}</span>
                  <span className="ml-2 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-white/60">
                    {lightbox.metricLabel}
                  </span>
                </p>
                <p className="mt-1 font-sans text-[14px] text-slate-400">
                  {lightbox.note}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setLightbox(null)}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:bg-white/20"
                aria-label="Close"
              >
                ✕
              </button>
            </div>
            <div className="flex-1 overflow-y-auto bg-black p-3 sm:p-5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={lightbox.src}
                alt={`${lightbox.title} receipt`}
                className="mx-auto h-auto w-full rounded-lg"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
