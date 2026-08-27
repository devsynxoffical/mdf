"use client";

import Magnetic from "@/components/uf/Magnetic";

/**
 * Minimal fixed chrome: wordmark top-left, portfolio link + mint pill
 * top-right. mix-blend-difference keeps the text legible over both the
 * bone and ink sections.
 */
export default function MinimalNav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 py-6 md:px-14">
      <a
        href="/#top"
        className="font-condensed text-[20px] text-white mix-blend-difference"
      >
        MDF™
      </a>
      <div className="flex items-center gap-7">
        {[
          ["Proof", "/#proof"],
          ["Work", "/#work"],
          ["Portfolio", "/portfolio"],
          ["FAQ", "/#faq"],
        ].map(([label, href]) => (
          <a
            key={label}
            href={href}
            className="link-sweep hidden font-mono text-[10.5px] uppercase tracking-[0.18em] text-white mix-blend-difference md:inline-block"
          >
            {label}
          </a>
        ))}
        <Magnetic strength={0.24}>
          <a href="/#door" className="btn-gold !px-5 !py-2.5 !text-[10.5px]">
            Book the call
          </a>
        </Magnetic>
      </div>
    </header>
  );
}
