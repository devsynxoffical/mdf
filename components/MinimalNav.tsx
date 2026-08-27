"use client";

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
      <div className="flex items-center gap-6">
        <a
          href="/portfolio"
          className="hidden font-mono text-[11px] uppercase tracking-[0.18em] text-white underline-offset-4 mix-blend-difference hover:underline sm:inline"
        >
          Portfolio
        </a>
        <a href="/#door" className="uf-pill !px-5 !py-2.5 !text-[11px]">
          <span
            aria-hidden
            className="inline-block h-1.5 w-1.5 rounded-full bg-inkdeep"
          />
          Talk to us
        </a>
      </div>
    </header>
  );
}
