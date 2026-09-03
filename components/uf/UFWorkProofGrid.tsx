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
      className="group flex w-full flex-col overflow-hidden rounded-2xl border border-sky/25 bg-[#0A0A0A] text-left transition duration-300 hover:border-sky/55 hover:bg-[#0F0F0F]"
    >
      <div className="flex items-center gap-2.5 px-3 py-2.5 sm:px-3.5">
        <span
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-sky/40 bg-sky/15"
          aria-hidden
        >
          <span className="h-2 w-2 rounded-full bg-sky" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate font-sans text-[12px] font-bold text-white sm:text-[13px]">
            Million Dollar Funnel™
          </p>
          <p className="truncate font-sans text-[10px] text-white/45 sm:text-[11px]">
            {item.niche} · {item.tag}
          </p>
        </div>
        <span className="shrink-0 rounded-full border border-sky/30 bg-sky/10 px-2 py-0.5 font-mono text-[8px] font-semibold uppercase tracking-[0.1em] text-sky sm:text-[9px]">
          {item.tag === "Meta Ads" ? "Campaign" : item.tag}
        </span>
      </div>

      <p className="px-3 pb-2.5 font-sans text-[12px] leading-[1.45] text-white/80 sm:px-3.5 sm:text-[13px]">
        <span className="font-semibold text-white">{item.metric}</span>{" "}
        <span className="text-white/55">{item.metricLabel}</span>
        {" — "}
        {item.note}
      </p>

      <div className="relative w-full overflow-hidden bg-black">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={item.src}
          alt={`${item.niche} — ${item.metric} ${item.metricLabel}`}
          className="block h-auto w-full object-contain object-top transition duration-500 group-hover:scale-[1.015]"
          loading="lazy"
        />
      </div>
    </button>
  );
}

type Props = {
  /** Items to render. Defaults to homepage subset (8). */
  items?: WorkProofItem[];
  /** Show filter tabs (All / Meta / CRM / Scale). */
  showFilters?: boolean;
  /** Hide “View all work proof” link. */
  hideAllLink?: boolean;
  /** Override section eyebrow. */
  eyebrow?: string;
  /** Extra top padding for standalone page hero flow. */
  compactHeader?: boolean;
  /**
   * How many cards to show first. Further rows unlock via “See more”.
   * Omit / 0 = show everything at once.
   */
  initialCount?: number;
  /** How many more cards each “See more” click adds. */
  pageSize?: number;
};

/**
 * Social-proof card grid of live workproof screenshots.
 */
export default function UFWorkProofGrid({
  items,
  showFilters = false,
  hideAllLink = false,
  eyebrow = "( Results ) — Live receipts",
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
    // Reset pagination when filter changes
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
      className={`uf-dark relative overflow-hidden bg-black text-white ${
        compactHeader ? "pb-[10vh] pt-10 sm:pt-14" : "py-[12vh]"
      }`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(18,84,236,0.12),transparent_50%)]"
      />

      <div className="relative mx-auto max-w-[1180px] px-4 sm:px-6 md:px-10 lg:px-14">
        <div className="mx-auto max-w-[720px] text-center">
          <p className="uf-eyebrow justify-center tracking-[0.18em] text-sky">
            {eyebrow}
          </p>
          <h2 className="mt-5 font-sans text-[clamp(32px,4.8vw,52px)] font-extrabold leading-[1.1] tracking-[-0.03em]">
            <Reveal as="span">
              <span className="block text-white">We are recognised by</span>
            </Reveal>
            <Reveal as="span" delay={80}>
              <span className="mt-1 block text-sky">the success of our clients.</span>
            </Reveal>
          </h2>
          <p className="mx-auto mt-5 max-w-[48ch] font-sans text-[16px] leading-[1.65] text-white/60">
            Booked calendars, paid invoices, closed deals. Every screenshot below is
            real client output — not marketing mockups.
          </p>
          <p className="mt-3 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-sky/80">
            Showing {visible.length} of {filtered.length} receipts
          </p>
          <span
            className="mx-auto mt-6 block h-1.5 w-1.5 rounded-full bg-sky"
            aria-hidden
          />
        </div>

        {showFilters && (
          <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
            {WORK_PROOF_FILTERS.map((f) => {
              const on = filter === f;
              return (
                <button
                  key={f}
                  type="button"
                  onClick={() => setFilter(f)}
                  className={`h-9 px-4 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] transition ${
                    on
                      ? "bg-sky text-[#020926]"
                      : "border border-white/15 text-white/60 hover:border-sky/40 hover:text-white"
                  }`}
                >
                  {f}
                </button>
              );
            })}
          </div>
        )}
      </div>

      <div className="relative mx-auto mt-12 max-w-[1680px] px-3 sm:mt-14 sm:px-5 md:px-8 lg:px-10">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {visible.map((item) => (
            <ProofCard key={item.id} item={item} onOpen={() => setActive(item)} />
          ))}
        </div>

        {canSeeMore && (
          <div className="mt-12 flex flex-col items-center gap-3">
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
              className="inline-flex h-12 items-center justify-center bg-white px-8 font-sans text-[14px] font-bold text-black transition hover:bg-sky"
            >
              See more
            </button>
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-white/40">
              {remaining} more available
            </p>
          </div>
        )}

        {!hideAllLink && (
          <div className="mt-12 flex justify-center">
            <Link
              href={ROUTES.workProof}
              className="inline-flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-sky transition hover:text-white"
            >
              View all work proof →
            </Link>
          </div>
        )}
      </div>

      {active && (
        <div
          className="fixed inset-0 z-[120] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm sm:p-8"
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
            className="relative max-h-[90vh] w-full max-w-[920px] overflow-auto rounded-2xl border border-sky/30 bg-[#0A0A0A]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="border-b border-white/10 px-5 py-4">
              <p className="font-sans text-[15px] font-bold text-white">
                {active.metric}{" "}
                <span className="font-medium text-sky">{active.metricLabel}</span>
              </p>
              <p className="mt-1 font-sans text-[13px] text-white/55">
                {active.niche} · {active.note}
              </p>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={active.src}
              alt={`${active.niche} receipt`}
              className="h-auto w-full"
            />
          </div>
        </div>
      )}
    </section>
  );
}
