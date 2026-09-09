"use client";

import { useState, useEffect } from "react";
import Reveal from "@/components/uf/Reveal";
import { playTick } from "@/components/audio/SoundToggle";
import type { FunnelDesign } from "@/lib/funnels";

export default function FunnelDetailCard({
  funnel,
  index,
}: {
  funnel: FunnelDesign;
  index: number;
}) {
  const [expanded, setExpanded] = useState(false);

  // Close modal on Escape
  useEffect(() => {
    if (!expanded) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setExpanded(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [expanded]);

  return (
    <>
      <Reveal as="div" delay={index * 50}>
        <article
          id={funnel.id}
          className="group flex flex-col h-full overflow-hidden rounded-[22px] border border-[#070B1E]/10 bg-white shadow-[0_16px_50px_rgba(7,11,30,0.06)] transition-all duration-300 hover:border-cobalt/35 hover:shadow-[0_24px_70px_rgba(18,84,236,0.14)]"
        >
          {/* ─── Browser Frame Chrome Header ─── */}
          <div className="flex items-center justify-between gap-2.5 border-b border-[#070B1E]/8 bg-[#F5F7FB] px-4 py-2.5 sm:px-5">
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F56]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#FFBD2E]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#27C93F]" />
            </div>

            <div className="min-w-0 max-w-[280px] flex-1 rounded-full border border-[#070B1E]/10 bg-white px-3 py-0.5 text-center font-mono text-[10.5px] text-slate-600 shadow-2xs">
              <span className="truncate block">{funnel.name}</span>
            </div>

            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-cobalt">
              {funnel.num}
            </span>
          </div>

          {/* ─── Scroll Viewport (Hover to scroll, Click to expand) ─── */}
          <button
            type="button"
            onClick={() => {
              playTick();
              setExpanded(true);
            }}
            className="funnel-viewport relative block h-[280px] sm:h-[340px] md:h-[360px] w-full overflow-hidden bg-[#050508] cursor-zoom-in group/vp text-left"
            style={
              {
                "--viewH": "360px",
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
              className="pointer-events-none block h-auto w-full select-none transition-transform duration-[var(--time)] ease-linear group-hover/vp:translate-y-[calc(-100%+var(--viewH))]"
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
            
            {/* Interactive Overlay Badge */}
            <div className="pointer-events-none absolute bottom-3 left-3 flex items-center gap-2 rounded-full border border-white/20 bg-black/80 px-3 py-1 backdrop-blur-md shadow-md transition-transform group-hover/vp:scale-105">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-sky" />
              <span className="font-mono text-[10px] font-semibold text-white tracking-wide">
                Hover to scroll · Click to expand
              </span>
            </div>

            {/* Quick Zoom Trigger in top-right */}
            <div className="pointer-events-none absolute top-3 right-3 rounded-full border border-white/20 bg-black/60 px-2.5 py-0.5 font-mono text-[9px] text-white/90 backdrop-blur-md opacity-0 group-hover/vp:opacity-100 transition-opacity">
              🔍 Inspect Wireframe
            </div>
          </button>

          {/* ─── What We Did & Funnel Breakdown Copy ─── */}
          <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between">
            <div>
              {/* Upper Category & Stack Header */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#070B1E]/8 pb-3.5">
                <span className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-cobalt bg-cobalt/10 px-2.5 py-0.5 rounded">
                  {funnel.category}
                </span>

                <div className="flex items-center gap-1.5">
                  <span className="font-mono text-[9px] font-bold uppercase tracking-[0.12em] text-slate-400">
                    STACK
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {funnel.stack.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-[#070B1E]/10 bg-[#F5F7FB] px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-[0.08em] text-slate-700"
                      >
                        {tag}
                      </span>
                    ))}
                    {funnel.stack.length > 3 && (
                      <span className="rounded-full border border-[#070B1E]/10 bg-[#F5F7FB] px-1.5 py-0.5 font-mono text-[9px] font-bold text-slate-500">
                        +{funnel.stack.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Title & Description */}
              <div className="mt-4">
                <h2 className="font-sans text-[20px] sm:text-[22px] font-extrabold leading-[1.2] tracking-[-0.02em] text-[#070B1E]">
                  {funnel.title}
                </h2>
                <p className="mt-2 font-sans text-[14px] leading-[1.6] text-slate-600">
                  {funnel.body}
                </p>
              </div>

              {/* What Was Engineered in this Funnel */}
              <div className="mt-4 rounded-xl bg-[#F8FAFD] border border-[#070B1E]/6 p-4">
                <p className="font-mono text-[9.5px] font-bold uppercase tracking-[0.14em] text-cobalt mb-2.5">
                  DELIVERABLES & MECHANISMS:
                </p>
                <ul className="space-y-2">
                  {funnel.highlights.map((line) => (
                    <li
                      key={line}
                      className="flex items-start gap-2.5 font-sans text-[13px] leading-snug text-slate-800"
                    >
                      <span className="mt-0.5 flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full bg-cobalt text-white">
                        <svg viewBox="0 0 24 24" className="h-2 w-2" fill="none" stroke="currentColor" strokeWidth="3.5">
                          <path d="M5 12l5 5L20 7" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="mt-5 flex items-center justify-between border-t border-[#070B1E]/8 pt-4">
              <button
                type="button"
                onClick={() => {
                  playTick();
                  setExpanded(true);
                }}
                className="inline-flex items-center gap-1.5 font-sans text-[12.5px] font-bold text-cobalt hover:underline cursor-pointer"
              >
                <span>Inspect Full Wireframe</span>
                <span>→</span>
              </button>

              <span className="font-mono text-[10px] text-slate-400">
                100% Custom Build
              </span>
            </div>
          </div>
        </article>
      </Reveal>

      {/* ─── High-Resolution Fullscreen Funnel Modal ─── */}
      {expanded && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby={`${funnel.id}-modal-title`}
          className="fixed inset-0 z-[120] flex items-center justify-center bg-[#070B1E]/95 p-3 sm:p-6 backdrop-blur-2xl"
          onClick={() => setExpanded(false)}
        >
          <div
            className="flex max-h-[94vh] w-full max-w-[1040px] flex-col overflow-hidden rounded-3xl border border-white/20 bg-[#0A1020] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between gap-4 border-b border-white/10 bg-[#030922] px-6 py-4">
              <div>
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-sky">
                  {funnel.category} · Build #{funnel.num}
                </p>
                <h3
                  id={`${funnel.id}-modal-title`}
                  className="font-sans text-[18px] font-bold tracking-tight text-white sm:text-[20px]"
                >
                  {funnel.name}
                </h3>
              </div>
              <div className="flex items-center gap-3">
                <span className="hidden sm:inline-block font-mono text-[11px] text-slate-400">
                  Scroll inside to inspect entire page
                </span>
                <button
                  type="button"
                  onClick={() => setExpanded(false)}
                  className="rounded-full bg-white/10 px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider text-white hover:bg-white/25 transition cursor-pointer"
                  aria-label="Close"
                >
                  Close ✕
                </button>
              </div>
            </div>

            {/* Scrollable Funnel Body */}
            <div className="flex-1 overflow-y-auto bg-black p-4 sm:p-8">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={funnel.image}
                alt={funnel.name}
                className="mx-auto w-full max-w-[880px] rounded-xl shadow-2xl border border-white/10"
              />
            </div>

            {/* Modal Bottom Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/10 bg-[#030922] px-6 py-3.5">
              <div className="flex flex-wrap gap-1.5">
                {funnel.stack.map((s) => (
                  <span
                    key={s}
                    className="rounded-full bg-white/10 px-2.5 py-0.5 font-mono text-[10px] text-slate-300"
                  >
                    {s}
                  </span>
                ))}
              </div>
              <a
                href="/book"
                onClick={() => playTick()}
                className="btn-gold !py-2 !px-4 !text-xs"
              >
                Build A Funnel Like This →
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
