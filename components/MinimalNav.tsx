"use client";

import { useEffect, useRef, useState } from "react";
import Magnetic from "@/components/uf/Magnetic";
import { CASE_STUDIES } from "@/lib/cases";

const LINKS = [
  ["Work Proof", "/work-proof"],
  ["Funnels", "/funnels"],
  ["FAQ", "/faq"],
] as const;

export default function MinimalNav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [casesOpen, setCasesOpen] = useState(false);
  const dropRef = useRef<HTMLDivElement>(null);
  const showCasesDropdown = CASE_STUDIES.length > 2;
  const singleCaseHref =
    CASE_STUDIES.length === 1
      ? `/cases/${CASE_STUDIES[0].slug}`
      : "/cases";

  const casesHref = showCasesDropdown ? "/cases" : singleCaseHref;
  const casesNavLabel =
    CASE_STUDIES.length === 1 ? CASE_STUDIES[0].navLabel : "Cases";

  useEffect(() => {
    if (!casesOpen) return;
    const onPointer = (e: MouseEvent) => {
      if (!dropRef.current?.contains(e.target as Node)) setCasesOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setCasesOpen(false);
    };
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [casesOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/[0.08] bg-[#000000]/60 backdrop-blur-xl transition-all duration-300">
      <div className="flex items-center justify-between px-4 py-3.5 sm:px-6 md:px-14 md:py-4">
        <a
          href="/#top"
          className="flex items-center gap-2 font-sans text-[17px] font-bold tracking-tight text-white transition-colors hover:text-sky sm:gap-2.5 sm:text-[18px]"
          onClick={() => setMenuOpen(false)}
        >
          <span className="flex h-6 w-6 items-center justify-center rounded-full border border-sky/40 bg-sky/10 shadow-[0_0_12px_rgba(56,189,248,0.4)]">
            <span className="h-2 w-2 rounded-full bg-sky" />
          </span>
          <span className="tracking-tight">
            MDF<span className="font-semibold text-sky">™</span>
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex" aria-label="Main navigation">
          {showCasesDropdown ? (
            <div ref={dropRef} className="relative">
              <button
                type="button"
                aria-expanded={casesOpen}
                aria-haspopup="menu"
                onClick={() => setCasesOpen((v) => !v)}
                className="inline-flex items-center gap-1.5 font-sans text-[12px] font-semibold uppercase tracking-[0.14em] text-slate-300 transition-colors hover:text-white"
              >
                Cases
                <svg
                  viewBox="0 0 12 12"
                  className={`h-3 w-3 transition-transform duration-200 ${casesOpen ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  aria-hidden
                >
                  <path d="M2.5 4.5L6 8l3.5-3.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              {casesOpen && (
                <div
                  role="menu"
                  className="absolute left-1/2 top-full z-50 mt-3 w-[min(280px,calc(100vw-2rem))] -translate-x-1/2 overflow-hidden rounded-2xl border border-white/12 bg-[#020926]/95 shadow-[0_24px_60px_rgba(0,0,0,0.45)] backdrop-blur-xl"
                >
                  <div className="max-h-[70vh] overflow-y-auto py-2">
                    {CASE_STUDIES.map((study) => (
                      <a
                        key={study.slug}
                        role="menuitem"
                        href={`/cases/${study.slug}`}
                        onClick={() => setCasesOpen(false)}
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
                    onClick={() => setCasesOpen(false)}
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
              className="font-sans text-[12px] font-semibold uppercase tracking-[0.14em] text-slate-300 transition-colors hover:text-white"
            >
              {casesNavLabel}
            </a>
          )}

          {LINKS.map(([label, href]) => (
            <a
              key={label}
              href={href}
              className="font-sans text-[12px] font-semibold uppercase tracking-[0.14em] text-slate-300 transition-colors hover:text-white"
            >
              {label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <Magnetic strength={0.2}>
            <a
              href="/book"
              className="group inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.06] py-1.5 pl-3 pr-1.5 backdrop-blur-md transition-all duration-300 hover:border-white/50 hover:bg-white hover:text-[#070B1E] sm:gap-2.5 sm:pl-4"
            >
              <span className="hidden font-sans text-[11.5px] font-bold uppercase tracking-[0.14em] text-white transition-colors group-hover:text-[#070B1E] sm:inline">
                Book a Call
              </span>
              <span className="font-sans text-[11px] font-bold uppercase tracking-[0.12em] text-white transition-colors group-hover:text-[#070B1E] sm:hidden">
                Book
              </span>
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-[#070B1E] shadow-sm transition-transform duration-200 group-hover:scale-95 group-hover:bg-[#070B1E] group-hover:text-white">
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M7 17L17 7M17 7H7M17 7V17" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </a>
          </Magnetic>

          {/* Mobile menu toggle */}
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/[0.06] text-white md:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span className="relative block h-3.5 w-4">
              <span
                className={`absolute left-0 h-0.5 w-full bg-current transition-all duration-200 ${
                  menuOpen ? "top-1.5 rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 top-1.5 h-0.5 w-full bg-current transition-opacity duration-200 ${
                  menuOpen ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute left-0 h-0.5 w-full bg-current transition-all duration-200 ${
                  menuOpen ? "top-1.5 -rotate-45" : "top-3"
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        id="mobile-nav"
        className={`md:hidden overflow-hidden border-t border-white/[0.08] bg-[#020926]/98 backdrop-blur-xl transition-[max-height,opacity] duration-300 ease-out ${
          menuOpen ? "max-h-[80vh] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="flex flex-col gap-1 px-4 py-4" aria-label="Mobile navigation">
          <a
            href={casesHref}
            onClick={() => setMenuOpen(false)}
            className="rounded-xl px-4 py-3.5 font-sans text-[14px] font-semibold uppercase tracking-[0.14em] text-white transition-colors hover:bg-white/[0.06]"
          >
            {casesNavLabel}
          </a>
          {showCasesDropdown &&
            CASE_STUDIES.map((study) => (
              <a
                key={study.slug}
                href={`/cases/${study.slug}`}
                onClick={() => setMenuOpen(false)}
                className="rounded-xl px-4 py-2.5 pl-8 font-sans text-[13px] text-slate-400 transition-colors hover:bg-white/[0.06] hover:text-white"
              >
                {study.niche}
              </a>
            ))}
          {LINKS.map(([label, href]) => (
            <a
              key={label}
              href={href}
              onClick={() => setMenuOpen(false)}
              className="rounded-xl px-4 py-3.5 font-sans text-[14px] font-semibold uppercase tracking-[0.14em] text-white transition-colors hover:bg-white/[0.06]"
            >
              {label}
            </a>
          ))}
          <a
            href="/book"
            onClick={() => setMenuOpen(false)}
            className="mt-2 inline-flex items-center justify-center rounded-full bg-[#1254EC] px-5 py-3.5 font-sans text-[13px] font-bold uppercase tracking-[0.14em] text-white"
          >
            Book a Call
          </a>
        </nav>
      </div>
    </header>
  );
}
