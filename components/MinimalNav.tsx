"use client";

import { useEffect, useRef, useState } from "react";
import Magnetic from "@/components/uf/Magnetic";
import { CASE_STUDIES } from "@/lib/cases";

const LINKS = [
  ["Process", "/process"],
  ["About", "/about"],
  ["FAQ", "/faq"],
] as const;

export default function MinimalNav() {
  const [open, setOpen] = useState(false);
  const dropRef = useRef<HTMLDivElement>(null);
  const showCasesDropdown = CASE_STUDIES.length > 2;
  const singleCaseHref =
    CASE_STUDIES.length === 1
      ? `/cases/${CASE_STUDIES[0].slug}`
      : "/cases";

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: MouseEvent) => {
      if (!dropRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 py-4 md:px-14 backdrop-blur-xl bg-[#000000]/60 border-b border-white/[0.08] transition-all duration-300">
      <a
        href="/#top"
        className="font-sans text-[18px] font-bold text-white tracking-tight hover:text-sky transition-colors flex items-center gap-2.5"
      >
        <span className="flex h-6 w-6 items-center justify-center rounded-full border border-sky/40 bg-sky/10 shadow-[0_0_12px_rgba(56,189,248,0.4)]">
          <span className="h-2 w-2 rounded-full bg-sky" />
        </span>
        <span className="tracking-tight">
          MDF<span className="text-sky font-semibold">™</span>
        </span>
      </a>

      <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
        {/* Cases — direct link when ≤2, dropdown when >2 */}
        {showCasesDropdown ? (
          <div ref={dropRef} className="relative">
            <button
              type="button"
              aria-expanded={open}
              aria-haspopup="menu"
              onClick={() => setOpen((v) => !v)}
              className="inline-flex items-center gap-1.5 font-sans text-[12px] font-semibold tracking-[0.14em] uppercase text-slate-300 transition-colors hover:text-white"
            >
              Cases
              <svg
                viewBox="0 0 12 12"
                className={`h-3 w-3 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                aria-hidden
              >
                <path d="M2.5 4.5L6 8l3.5-3.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            {open && (
              <div
                role="menu"
                className="absolute left-1/2 top-full z-50 mt-3 w-[280px] -translate-x-1/2 overflow-hidden rounded-2xl border border-white/12 bg-[#020926]/95 shadow-[0_24px_60px_rgba(0,0,0,0.45)] backdrop-blur-xl"
              >
                <div className="max-h-[70vh] overflow-y-auto py-2">
                  {CASE_STUDIES.map((study) => (
                    <a
                      key={study.slug}
                      role="menuitem"
                      href={`/cases/${study.slug}`}
                      onClick={() => setOpen(false)}
                      className="block px-4 py-3 transition-colors hover:bg-white/[0.06]"
                    >
                      <span className="block font-sans text-[13px] font-semibold text-white">
                        {study.niche}
                      </span>
                      <span className="mt-0.5 line-clamp-2 block font-sans text-[12px] leading-snug text-slate-400">
                        {study.summary}
                      </span>
                    </a>
                  ))}
                </div>
                <a
                  href="/cases"
                  onClick={() => setOpen(false)}
                  className="block border-t border-white/10 px-4 py-3 font-sans text-[11px] font-bold uppercase tracking-[0.14em] text-sky hover:bg-white/[0.04]"
                >
                  View all cases →
                </a>
              </div>
            )}
          </div>
        ) : (
          <a
            href={singleCaseHref}
            className="font-sans text-[12px] font-semibold tracking-[0.14em] uppercase text-slate-300 hover:text-white transition-colors"
          >
            Cases
          </a>
        )}

        {LINKS.map(([label, href]) => (
          <a
            key={label}
            href={href}
            className="font-sans text-[12px] font-semibold tracking-[0.14em] uppercase text-slate-300 hover:text-white transition-colors"
          >
            {label}
          </a>
        ))}
      </nav>

      <div className="flex items-center gap-4">
        <Magnetic strength={0.2}>
          <a
            href="/book"
            className="group inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/[0.06] pl-4 pr-1.5 py-1.5 backdrop-blur-md transition-all duration-300 hover:border-white/50 hover:bg-white hover:text-[#070B1E]"
          >
            <span className="font-sans text-[11.5px] font-bold tracking-[0.14em] uppercase text-white transition-colors group-hover:text-[#070B1E]">
              Book a Call
            </span>
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-[#070B1E] shadow-sm transition-transform duration-200 group-hover:scale-95 group-hover:bg-[#070B1E] group-hover:text-white">
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M7 17L17 7M17 7H7M17 7V17" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </a>
        </Magnetic>
      </div>
    </header>
  );
}
