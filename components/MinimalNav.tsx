"use client";

import Magnetic from "@/components/uf/Magnetic";

export default function MinimalNav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 py-4 md:px-14 backdrop-blur-xl bg-[#000000]/60 border-b border-white/[0.08] transition-all duration-300">
      {/* Brand logo */}
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

      {/* Centered Navigation */}
      <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
        {[
          ["Proof", "/#proof"],
          ["Process", "/#process"],
          ["FAQ", "/#faq"],
        ].map(([label, href]) => (
          <a
            key={label}
            href={href}
            className="font-sans text-[12px] font-semibold tracking-[0.14em] uppercase text-slate-300 hover:text-white transition-colors"
          >
            {label}
          </a>
        ))}
      </nav>

      {/* Right Contact Pill (Halo Lab style) */}
      <div className="flex items-center gap-4">
        <Magnetic strength={0.2}>
          <a
            href="/#door"
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
