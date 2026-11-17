"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import type { WorkProofItem } from "@/lib/workproof";

/** Full-screen inspector for a work-proof receipt, with keyboard prev/next. */
export default function ReceiptLightbox({
  active,
  index,
  total,
  onClose,
  onPrev,
  onNext,
}: {
  active: WorkProofItem | null;
  index: number;
  total: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  useEffect(() => {
    if (!active) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [active, onClose, onPrev, onNext]);

  if (!active || typeof document === "undefined") return null;

  return createPortal(
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[120] flex items-center justify-center bg-black/85 p-3 sm:p-6 backdrop-blur-md transition-all duration-300"
          onClick={onClose}
        >
          {/* Close Button */}
          <div className="absolute top-4 right-4 z-30 flex items-center gap-3">
            <span className="hidden sm:inline-block rounded-full bg-white/10 px-3 py-1 font-mono text-[11px] text-slate-300">
              {index + 1} / {total}
            </span>
            <button
              type="button"
              onClick={onClose}
              className="rounded-full bg-white/15 px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider text-white hover:bg-white/30 transition shadow-lg"
            >
              Close ✕
            </button>
          </div>

          {/* Left Arrow Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onPrev();
            }}
            aria-label="Previous receipt"
            className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-30 flex h-11 w-11 sm:h-13 sm:w-13 items-center justify-center rounded-full border border-white/20 bg-black/70 text-lg font-bold text-white shadow-2xl backdrop-blur-md hover:bg-white hover:text-black hover:scale-110 transition-all duration-200"
          >
            ←
          </button>

          {/* Right Arrow Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
            aria-label="Next receipt"
            className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-30 flex h-11 w-11 sm:h-13 sm:w-13 items-center justify-center rounded-full border border-white/20 bg-black/70 text-lg font-bold text-white shadow-2xl backdrop-blur-md hover:bg-white hover:text-black hover:scale-110 transition-all duration-200"
          >
            →
          </button>

          <div
            className="relative flex max-h-[92vh] max-w-[94vw] sm:max-w-[90vw] md:max-w-[850px] flex-col items-center justify-center overflow-hidden rounded-2xl border border-white/15 bg-[#030922] p-4 sm:p-6 shadow-2xl transition-all duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-3 flex w-full items-center justify-between border-b border-white/10 pb-3">
              <div>
                <h3 className="font-sans text-[17px] sm:text-[19px] font-bold text-white">
                  {active.metric} <span className="text-cyan-300 text-[13.5px] sm:text-[14.5px]">{active.metricLabel}</span>
                </h3>
                <p className="font-mono text-[11.5px] text-slate-400">
                  {active.niche} · {active.tag}
                </p>
              </div>
              <span className="rounded-full bg-emerald-500/15 border border-emerald-400/30 px-3 py-1 font-mono text-[11px] font-bold text-emerald-300">
                ✓ Verified Account
              </span>
            </div>

            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              key={active.src}
              src={active.src}
              alt={`${active.niche} receipt`}
              className="max-h-[66vh] sm:max-h-[72vh] w-auto max-w-full rounded-xl object-contain shadow-2xl border border-white/10"
            />

            <p className="mt-3 text-center font-sans text-[13px] sm:text-[14px] text-slate-300 max-w-[650px]">
              {active.note}
            </p>
          </div>
        </div>,
    document.body
  );
}
