"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const LINKS = [
  { label: "System", href: "#system" },
  { label: "Results", href: "#results" },
  { label: "Case Studies", href: "#case-studies" },
  { label: "About", href: "#about" },
  { label: "FAQ", href: "#faq" },
];

const SECTION_IDS = ["system", "results", "case-studies", "about", "faq"];

export default function Nav() {
  const [dismissed, setDismissed] = useState<boolean | null>(null);
  const [contracted, setContracted] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setDismissed(sessionStorage.getItem("mdf-announce-dismissed") === "1");
  }, []);

  useEffect(() => {
    const onScroll = () => setContracted(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Track the active section for the brass dot.
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(e.target.id);
        }
      },
      { rootMargin: "-30% 0px -60% 0px" }
    );
    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  const dismiss = useCallback(() => {
    sessionStorage.setItem("mdf-announce-dismissed", "1");
    setDismissed(true);
  }, []);

  // Escape closes the mobile sheet and returns focus to the trigger.
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        triggerRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const showBar = dismissed === false;

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Announcement bar */}
      <div
        className="overflow-hidden bg-brass text-ink transition-[max-height] duration-300 ease-out"
        style={{ maxHeight: showBar ? 44 : 0 }}
      >
        <div className="relative flex items-center justify-center px-10 py-3">
          <p className="font-mono text-s12 uppercase tracking-eyebrow text-center">
            Not a high-ticket service provider? This isn&apos;t for you.
          </p>
          <button
            onClick={dismiss}
            aria-label="Dismiss announcement"
            className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-ink/70 hover:text-ink"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
              <path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </button>
        </div>
      </div>

      {/* Floating pill nav */}
      <div
        className="mx-auto mt-8 flex w-full max-w-[980px] items-center justify-between gap-4 px-4 transition-all duration-300"
        style={{ marginTop: contracted ? 16 : 32 }}
      >
        <a
          href="#top"
          className="font-display text-[18px] font-semibold text-bone shrink-0"
        >
          MDF<span className="text-brass">™</span>
        </a>

        <nav
          aria-label="Primary"
          className={`hidden md:block rounded-full border border-bone/[0.08] transition-all duration-[250ms] ${
            contracted ? "backdrop-blur-2xl" : "backdrop-blur-xl"
          }`}
          style={{ background: "rgba(18,24,38,0.72)" }}
        >
          <ul className="flex items-center">
            {LINKS.map((l) => {
              const isActive = active === l.href.slice(1);
              return (
                <li key={l.href} className="relative">
                  <a
                    href={l.href}
                    className={`block font-body font-medium text-mute transition-colors duration-200 hover:text-bone ${
                      contracted ? "px-4 py-2.5 text-s14" : "px-5 py-3 text-[15px]"
                    }`}
                  >
                    {l.label}
                  </a>
                  {isActive && (
                    <span
                      aria-hidden
                      className="absolute left-1/2 -translate-x-1/2 h-1 w-1 rounded-full bg-brass"
                      style={{ bottom: 2 }}
                    />
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#book"
            className="hidden md:inline-block rounded-full bg-brass px-6 py-3.5 font-body text-s14 font-semibold text-ink transition-[filter,box-shadow] duration-200 hover:brightness-[1.08] hover:shadow-[0_0_32px_rgba(224,163,64,0.35)]"
          >
            Reserve Your Spot
          </a>
          {/* Mobile hamburger */}
          <button
            ref={triggerRef}
            className="md:hidden rounded-full border border-bone/[0.08] p-3"
            style={{ background: "rgba(18,24,38,0.72)" }}
            aria-label="Open menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(true)}
          >
            <svg width="18" height="12" viewBox="0 0 18 12" fill="none" aria-hidden>
              <path d="M0 1h18M0 6h18M0 11h18" stroke="#F2EFE8" strokeWidth="1.5" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile sheet */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            ref={sheetRef}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-y-0 right-0 z-50 flex w-full max-w-sm flex-col bg-slate2 p-8"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
          >
            <button
              className="self-end p-2 text-mute hover:text-bone"
              aria-label="Close menu"
              onClick={() => {
                setMenuOpen(false);
                triggerRef.current?.focus();
              }}
            >
              <svg width="16" height="16" viewBox="0 0 12 12" fill="none" aria-hidden>
                <path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </button>
            <nav aria-label="Mobile" className="mt-8 flex-1">
              <ul className="space-y-6">
                {LINKS.map((l, i) => (
                  <motion.li
                    key={l.href}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.08 + i * 0.04, duration: 0.4 }}
                  >
                    <a
                      href={l.href}
                      onClick={() => setMenuOpen(false)}
                      className="font-display text-s28 font-semibold text-bone"
                    >
                      {l.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </nav>
            <a
              href="#book"
              onClick={() => setMenuOpen(false)}
              className="rounded-full bg-brass px-6 py-4 text-center font-body text-s16 font-semibold text-ink"
            >
              Reserve Your Spot
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
