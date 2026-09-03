"use client";

import { useState } from "react";
import Reveal from "@/components/uf/Reveal";
import type { FunnelDesign } from "@/lib/funnels";

export default function FunnelDetailCard({
  funnel,
  index,
}: {
  funnel: FunnelDesign;
  index: number;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <Reveal as="div" delay={index * 60}>
        <article
          id={funnel.id}
          className="group overflow-hidden rounded-[24px] border border-[#070B1E]/10 bg-white shadow-[0_20px_60px_rgba(7,11,30,0.06)] transition duration-300 hover:border-cobalt/25 hover:shadow-[0_28px_80px_rgba(18,84,236,0.12)]"
        >
          {/* Browser chrome */}
          <div className="flex items-center justify-between gap-3 border-b border-[#070B1E]/8 bg-[#F5F7FB] px-4 py-3 sm:px-5">
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F56]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#FFBD2E]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#27C93F]" />
            </div>
            <div className="min-w-0 flex-1 rounded-full border border-[#070B1E]/10 bg-white px-3 py-1 text-center font-mono text-[10px] text-slate-500 sm:text-[11px]">
              <span className="truncate">{funnel.name}</span>
            </div>
            <span className="hidden font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-cobalt sm:block">
              {funnel.num}
            </span>
          </div>

          {/* Scroll viewport — hover to pan full funnel */}
          <button
            type="button"
            onClick={() => setExpanded(true)}
            className="funnel-viewport relative block h-[420px] w-full overflow-hidden bg-[#050508] sm:h-[480px] md:h-[520px]"
            style={
              {
                "--viewH": "520px",
                "--time": `${funnel.scrollDuration}s`,
              } as React.CSSProperties
            }
            aria-label={`Expand full ${funnel.name} funnel design`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={funnel.image}
              alt={funnel.name}
              loading="lazy"
              draggable={false}
              className="pointer-events-none block h-auto w-full select-none transition-transform duration-[var(--time)] ease-linear group-hover:translate-y-[calc(-100%+var(--viewH))]"
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="pointer-events-none absolute bottom-4 left-4 flex items-center gap-2 rounded-full border border-white/20 bg-black/75 px-3 py-1.5 backdrop-blur-sm">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-sky" />
              <span className="font-mono text-[10px] font-medium text-white/90">
                Hover to scroll · Click to expand
              </span>
            </div>
          </button>

          {/* Copy */}
          <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[1fr_auto] lg:items-start">
            <div>
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-cobalt">
                {funnel.category}
              </p>
              <h2 className="mt-3 font-sans text-[clamp(22px,2.8vw,28px)] font-extrabold leading-[1.12] tracking-[-0.03em] text-[#070B1E]">
                {funnel.title}
              </h2>
              <p className="mt-3 max-w-[56ch] font-sans text-[15px] leading-[1.65] text-slate-600 sm:text-[16px]">
                {funnel.body}
              </p>
              <ul className="mt-6 space-y-2.5">
                {funnel.highlights.map((line) => (
                  <li
                    key={line}
                    className="flex gap-2.5 font-sans text-[14px] leading-snug text-slate-700"
                  >
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-cobalt" />
                    {line}
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:min-w-[180px] lg:text-right">
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400">
                Stack
              </p>
              <div className="mt-3 flex flex-wrap gap-2 lg:justify-end">
                {funnel.stack.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-[#070B1E]/10 bg-[#F5F7FB] px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.1em] text-slate-600"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </article>
      </Reveal>

      {expanded && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby={`${funnel.id}-modal-title`}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#070B1E]/90 p-4 backdrop-blur-xl sm:p-6"
          onClick={() => setExpanded(false)}
        >
          <div
            className="flex max-h-[92vh] w-full max-w-[960px] flex-col overflow-hidden rounded-2xl border border-white/15 bg-[#0A1020] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-4 border-b border-white/10 px-5 py-4 sm:px-6">
              <div>
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-sky">
                  {funnel.category}
                </p>
                <h3
                  id={`${funnel.id}-modal-title`}
                  className="font-sans text-[18px] font-bold tracking-tight text-white sm:text-[20px]"
                >
                  {funnel.name}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setExpanded(false)}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:bg-white/20"
                aria-label="Close"
              >
                ✕
              </button>
            </div>
            <div className="flex-1 overflow-y-auto bg-black p-4 sm:p-6">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={funnel.image}
                alt={funnel.name}
                className="mx-auto w-full rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
