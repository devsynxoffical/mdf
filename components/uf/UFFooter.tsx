"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { CASE_STUDIES } from "@/lib/cases";
import { SITE } from "@/lib/site";
import { ROUTES, sectionHref, SECTIONS } from "@/lib/routes";
import Magnetic from "@/components/uf/Magnetic";
import { playTick } from "@/components/audio/SoundToggle";

const casesHref =
  CASE_STUDIES.length === 1
    ? `/cases/${CASE_STUDIES[0].slug}`
    : ROUTES.cases;

const casesLabel =
  CASE_STUDIES.length === 1 ? CASE_STUDIES[0].navLabel : "Cases";

type FooterLinkItem = {
  label: string;
  href: string;
  badge?: string;
  highlight?: boolean;
};

const EXPLORE_LINKS: FooterLinkItem[] = [
  { label: "Home", href: ROUTES.home },
  { label: casesLabel, href: casesHref, badge: "New" },
  { label: "Verified Receipts", href: ROUTES.workProof, badge: "41+" },
  { label: "Funnel Architectures", href: ROUTES.funnels },
  { label: "The 6-Layer System", href: sectionHref(SECTIONS.system) },
];

const COMPANY_LINKS: FooterLinkItem[] = [
  { label: "About Mission", href: ROUTES.about },
  { label: "Frequently Asked Questions", href: ROUTES.faq },
  { label: "Book a Strategy Call", href: ROUTES.book, highlight: true },
];

const LEGAL_LINKS = [
  { label: "Terms of Service", href: ROUTES.terms },
  { label: "Privacy Policy", href: ROUTES.privacy },
  { label: "Income Disclosure", href: "/income-disclosure" },
  { label: "DMCA Compliance", href: "/dmca" },
] as const;

/* Official brand colors and paths for authentic SVGs */
const OFFICIAL_SOCIALS = [
  {
    name: "Facebook",
    href: "https://facebook.com",
    brandColor: "#1877F2",
    glowColor: "rgba(24, 119, 242, 0.45)",
    icon: (
      <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "https://instagram.com",
    brandColor: "#E4405F",
    glowColor: "rgba(228, 64, 95, 0.45)",
    icon: (
      <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com",
    brandColor: "#0A66C2",
    glowColor: "rgba(10, 102, 194, 0.45)",
    icon: (
      <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
      </svg>
    ),
  },
  {
    name: "X",
    href: "https://x.com",
    brandColor: "#FFFFFF",
    glowColor: "rgba(255, 255, 255, 0.35)",
    icon: (
      <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: "YouTube",
    href: "https://youtube.com",
    brandColor: "#FF0000",
    glowColor: "rgba(255, 0, 0, 0.45)",
    icon: (
      <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
] as const;

export default function UFFooter() {
  const year = new Date().getFullYear();
  const [subscribed, setSubscribed] = useState(false);
  const [emailInput, setEmailInput] = useState("");
  const founderCardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHoveringFounder, setIsHoveringFounder] = useState(false);

  const handleFounderMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!founderCardRef.current) return;
    const rect = founderCardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput) return;
    playTick();
    setSubscribed(true);
    setTimeout(() => {
      setEmailInput("");
      setSubscribed(false);
    }, 4000);
  };

  const scrollToTop = () => {
    playTick();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      id="site-footer"
      className="relative z-20 isolate overflow-hidden bg-[#020514] text-white selection:bg-cyan-500 selection:text-black"
    >
      {/* Dynamic Background Glow Lighting */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(18,84,236,0.18),transparent_65%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-1/4 h-96 w-96 rounded-full bg-cyan-500/10 blur-[140px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 right-1/4 h-96 w-96 rounded-full bg-indigo-500/10 blur-[150px]"
      />

      {/* ─── 1. TOP NEWSLETTER & INNER CIRCLE INTELLIGENCE ─── */}
      <div className="relative mx-auto max-w-[840px] px-5 pb-16 pt-20 text-center sm:px-8 md:pb-24 md:pt-28">
        <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-500/10 px-4 py-1.5 font-mono text-[11px] font-bold text-cyan-300 uppercase tracking-widest shadow-[0_0_20px_rgba(56,189,248,0.2)]">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-ping" />
          The Million Dollar Playbook
        </div>

        <h2 className="mt-5 font-sans text-[clamp(32px,5.2vw,56px)] font-extrabold leading-[1.08] tracking-[-0.035em] text-white">
          Scale your acquisition{" "}
          <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-300 bg-clip-text text-transparent italic font-serif font-normal">
            without leaks.
          </span>
        </h2>
        <p className="mx-auto mt-4 max-w-[54ch] font-sans text-[15px] sm:text-[16.5px] leading-[1.65] text-slate-300">
          Get weekly tactical breakdowns on offer restructuring, high-ticket VSL blueprints, and automated follow-up architecture.
        </p>

        {/* Interactive Newsletter Form */}
        <form
          onSubmit={handleSubscribe}
          className="relative z-10 mx-auto mt-8 flex max-w-[520px] flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:gap-2 sm:rounded-full sm:border sm:border-white/15 sm:bg-white/[0.04] sm:p-1.5 sm:shadow-[0_15px_40px_rgba(0,0,0,0.5)] sm:backdrop-blur-2xl transition-all duration-300 focus-within:border-cyan-400/50 focus-within:shadow-[0_0_30px_rgba(56,189,248,0.25)]"
        >
          <input
            type="email"
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
            required
            autoComplete="email"
            placeholder="Enter your executive email..."
            className="h-12 w-full rounded-full border border-white/20 bg-white/5 px-5 font-sans text-[14.5px] text-white outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-cyan-400 sm:rounded-none sm:border-0 sm:bg-transparent sm:focus:ring-0"
          />
          <button
            type="submit"
            className="group relative flex h-11 shrink-0 items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 px-7 font-sans text-[13.5px] font-bold text-black shadow-lg transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_25px_rgba(56,189,248,0.5)] active:scale-95 cursor-pointer"
          >
            <span>{subscribed ? "Joined!" : "Join The List"}</span>
            <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </button>
        </form>

        <p className="mt-3.5 font-mono text-[11px] text-slate-400">
          🔒 Zero spam. Instant high-ticket breakdowns. 1-click unsubscribe.
        </p>
      </div>

      {/* ─── 2. PROMINENT HIGH-VISIBILITY TYPOGRAPHY BANNER WITH MOVING GRADIENT ─── */}
      <div className="relative w-full select-none border-y border-white/10 bg-gradient-to-b from-white/[0.04] via-white/[0.01] to-transparent py-6 sm:py-10 md:py-12 px-3 sm:px-6 overflow-hidden flex items-center justify-center">
        {/* Luminous Ambient Spotlight */}
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(56,189,248,0.18),transparent_70%)] animate-pulse"
          style={{ animationDuration: "4s" }}
        />

        <div className="mx-auto w-full max-w-[1400px] text-center">
          <h2
            className="select-none font-black tracking-tighter uppercase whitespace-nowrap text-[clamp(2.4rem,7.5vw,7.2rem)] leading-none text-transparent bg-clip-text animate-footer-gradient"
            style={{
              backgroundImage:
                "linear-gradient(90deg, #FFFFFF 0%, #E0F2FE 15%, #38BDF8 30%, #818CF8 50%, #C084FC 68%, #38BDF8 85%, #FFFFFF 100%)",
              filter:
                "drop-shadow(0 0 24px rgba(56, 189, 248, 0.4)) drop-shadow(0 4px 18px rgba(18, 84, 236, 0.5))",
              WebkitTextStroke: "1px rgba(255, 255, 255, 0.2)",
            }}
          >
            MILLION DOLLAR FUNNEL
          </h2>
        </div>
      </div>

      {/* ─── 3. MAIN NAVIGATION & INTERACTIVE FOUNDER CARD ─── */}
      <div className="relative mx-auto max-w-[1240px] px-5 py-14 sm:px-8 md:px-12 md:py-20">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-[1.1fr_390px] lg:gap-16">
          
          {/* LEFT: Navigation Links with Micro-Interactions */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {/* Column 1: Explore */}
            <nav aria-label="Explore">
              <h3 className="mb-5 font-mono text-[12px] font-bold uppercase tracking-[0.18em] text-cyan-400">
                Ecosystem
              </h3>
              <ul className="space-y-3.5">
                {EXPLORE_LINKS.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => playTick()}
                      className="group inline-flex items-center gap-2 font-sans text-[14.5px] text-slate-400 transition-all duration-200 hover:text-white hover:translate-x-1"
                    >
                      <span className="transition-colors group-hover:text-cyan-300">{item.label}</span>
                      {item.badge && (
                        <span className="rounded-md border border-cyan-400/30 bg-cyan-500/10 px-1.5 py-0.5 font-mono text-[9.5px] font-bold text-cyan-300">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Column 2: Company */}
            <nav aria-label="Company">
              <h3 className="mb-5 font-mono text-[12px] font-bold uppercase tracking-[0.18em] text-cyan-400">
                Company
              </h3>
              <ul className="space-y-3.5">
                {COMPANY_LINKS.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => playTick()}
                      className={`group inline-flex items-center gap-1.5 font-sans text-[14.5px] transition-all duration-200 hover:translate-x-1 ${
                        item.highlight
                          ? "font-semibold text-cyan-300 hover:text-white"
                          : "text-slate-400 hover:text-white"
                      }`}
                    >
                      <span className="transition-colors group-hover:text-cyan-300">{item.label}</span>
                      {item.highlight && <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>}
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Official Social Dock with Brand Colors & Magnetic Motion */}
              <div className="mt-8">
                <p className="font-mono text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Direct Channels
                </p>
                <div className="mt-3 flex flex-wrap items-center gap-2.5">
                  {OFFICIAL_SOCIALS.map((s) => (
                    <Magnetic key={s.name} strength={0.25}>
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={s.name}
                        onClick={() => playTick()}
                        className="group relative flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/5 text-slate-300 backdrop-blur-md transition-all duration-300 hover:scale-110"
                        style={
                          {
                            "--hover-color": s.brandColor,
                            "--glow-color": s.glowColor,
                          } as React.CSSProperties
                        }
                      >
                        <span
                          className="transition-colors duration-300 group-hover:text-[var(--hover-color)]"
                          style={{ color: undefined }}
                        >
                          {s.icon}
                        </span>
                        {/* Glowing backdrop spotlight on hover */}
                        <span
                          className="pointer-events-none absolute inset-0 rounded-full opacity-0 blur-sm transition-opacity duration-300 group-hover:opacity-100"
                          style={{ backgroundColor: s.glowColor }}
                        />
                      </a>
                    </Magnetic>
                  ))}
                </div>
              </div>
            </nav>

            {/* Column 3: Legal */}
            <nav aria-label="Legal">
              <h3 className="mb-5 font-mono text-[12px] font-bold uppercase tracking-[0.18em] text-cyan-400">
                Compliance
              </h3>
              <ul className="space-y-3.5">
                {LEGAL_LINKS.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => playTick()}
                      className="group inline-flex items-center gap-1.5 font-sans text-[14.5px] text-slate-400 transition-all duration-200 hover:text-white hover:translate-x-1"
                    >
                      <span className="transition-colors group-hover:text-slate-200">{item.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* RIGHT: Interactive 3D Spotlight Founder Card */}
          <div className="flex flex-col justify-start">
            <div
              ref={founderCardRef}
              onMouseMove={handleFounderMouseMove}
              onMouseEnter={() => setIsHoveringFounder(true)}
              onMouseLeave={() => setIsHoveringFounder(false)}
              className="group relative overflow-hidden rounded-[26px] border border-white/15 bg-gradient-to-b from-white/[0.08] via-white/[0.03] to-[#040c2a]/80 p-6 sm:p-7 shadow-[0_20px_50px_rgba(0,0,0,0.6)] backdrop-blur-2xl transition-all duration-300 hover:border-cyan-400/40 hover:shadow-[0_20px_60px_rgba(18,84,236,0.3)]"
            >
              {/* Dynamic Mouse Spotlight Glow */}
              <div
                className="pointer-events-none absolute inset-0 transition-opacity duration-300"
                style={{
                  opacity: isHoveringFounder ? 1 : 0,
                  background: `radial-gradient(280px circle at ${mousePos.x}px ${mousePos.y}px, rgba(56,189,248,0.18), transparent 70%)`,
                }}
              />

              {/* Ambient top corner orb */}
              <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-cyan-500/15 blur-2xl transition-opacity duration-300 group-hover:opacity-100" />

              {/* Founder Header with Live Status Dot */}
              <div className="relative z-10 flex items-center gap-4">
                <div className="relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/vaishali-kapoor.png"
                    alt="Vaishali Kapoor"
                    className="h-16 w-16 rounded-2xl border border-white/20 object-cover object-top shadow-xl bg-[#171A30] transition-transform duration-500 group-hover:scale-105"
                  />
                  <span
                    className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#020514] p-0.5"
                    title="Active Founder"
                  >
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  </span>
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-sans text-[18px] font-bold tracking-tight text-white group-hover:text-cyan-200 transition-colors">
                      Vaishali Kapoor
                    </h4>
                  </div>
                  <p className="font-mono text-[11.5px] font-bold uppercase tracking-wider text-cyan-400">
                    Founder &amp; Chief Architect
                  </p>
                </div>
              </div>

              {/* Mission Statement */}
              <p className="relative z-10 mt-4 font-sans text-[13.5px] leading-[1.68] text-slate-300">
                “We build Million Dollar Funnel™ to eliminate lead waste and install predictable acquisition machinery for ambitious high-ticket operators.”
              </p>

              {/* Quick Connect Dock with Official Icons */}
              <div className="relative z-10 mt-6 flex items-center justify-between border-t border-white/10 pt-4">
                <div className="flex items-center gap-2">
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                    onClick={() => playTick()}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 transition-all hover:scale-110 hover:border-[#1877F2]/50 hover:bg-[#1877F2]/20 hover:text-[#1877F2]"
                  >
                    <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    onClick={() => playTick()}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 transition-all hover:scale-110 hover:border-[#0A66C2]/50 hover:bg-[#0A66C2]/20 hover:text-[#0A66C2]"
                  >
                    <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </a>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    onClick={() => playTick()}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 transition-all hover:scale-110 hover:border-[#E4405F]/50 hover:bg-[#E4405F]/20 hover:text-[#E4405F]"
                  >
                    <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </a>
                </div>

                <Link
                  href={ROUTES.about}
                  onClick={() => playTick()}
                  className="group inline-flex items-center gap-1.5 font-sans text-[12.5px] font-bold text-white transition hover:text-cyan-300"
                >
                  <span>Our Story</span>
                  <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* ─── 4. BOTTOM BAR: STATUS, COPYRIGHT & BACK TO TOP ─── */}
        <div className="mt-14 flex flex-col items-center justify-between gap-6 border-t border-white/10 pt-8 sm:flex-row sm:gap-4">
          
          {/* Live Operational Status */}
          <div className="flex items-center gap-2.5 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span className="font-mono text-[11px] font-medium text-slate-300">
              Acquisition Engine Operational
            </span>
          </div>

          {/* Copyright & Info */}
          <p className="font-sans text-[13px] text-slate-400 text-center sm:text-left">
            © {year} {SITE.brand}™. All rights reserved.
          </p>

          {/* Back to Top Magnetic Button */}
          <Magnetic strength={0.2}>
            <button
              type="button"
              onClick={scrollToTop}
              className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 font-mono text-[11px] font-bold text-slate-300 backdrop-blur-md transition-all duration-300 hover:border-cyan-400/40 hover:bg-white/10 hover:text-white"
            >
              <span>Back to Top</span>
              <span aria-hidden className="transition-transform duration-300 group-hover:-translate-y-0.5">↑</span>
            </button>
          </Magnetic>
        </div>
      </div>
    </footer>
  );
}
