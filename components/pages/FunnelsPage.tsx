"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import ContourBG from "@/components/uf/ContourBG";
import Reveal from "@/components/uf/Reveal";
import Magnetic from "@/components/uf/Magnetic";
import { playTick } from "@/components/audio/SoundToggle";
import FunnelDetailCard from "@/components/funnels/FunnelDetailCard";
import { FUNNEL_DESIGNS } from "@/lib/funnels";
import { ROUTES } from "@/lib/routes";

const CATEGORIES = [
  "All Builds",
  "Mortgage & Finance",
  "High-Ticket Security",
  "Coaching & Info",
  "Insurance CRM",
  "B2B & Agencies",
] as const;

export default function FunnelsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All Builds");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFunnels = useMemo(() => {
    return FUNNEL_DESIGNS.filter((funnel) => {
      const matchesSearch =
        searchQuery === "" ||
        funnel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        funnel.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        funnel.body.toLowerCase().includes(searchQuery.toLowerCase()) ||
        funnel.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        funnel.stack.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));

      if (!matchesSearch) return false;

      if (selectedCategory === "All Builds") return true;
      if (selectedCategory === "Mortgage & Finance") {
        return funnel.category.toLowerCase().includes("mortgage") || funnel.id.includes("mortgage");
      }
      if (selectedCategory === "High-Ticket Security") {
        return funnel.category.toLowerCase().includes("security") || funnel.id.includes("rowan");
      }
      if (selectedCategory === "Coaching & Info") {
        return (
          funnel.category.toLowerCase().includes("summit") ||
          funnel.category.toLowerCase().includes("invention") ||
          funnel.id.includes("summit") ||
          funnel.id.includes("invention")
        );
      }
      if (selectedCategory === "Insurance CRM") {
        return funnel.category.toLowerCase().includes("insurance") || funnel.category.toLowerCase().includes("policy");
      }
      if (selectedCategory === "B2B & Agencies") {
        return (
          funnel.category.toLowerCase().includes("b2b") ||
          funnel.category.toLowerCase().includes("lead gen") ||
          funnel.category.toLowerCase().includes("standard") ||
          funnel.id.includes("scale") ||
          funnel.id.includes("mdf")
        );
      }
      return true;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="bg-[#020926] text-white">
      {/* ─── 1. HERO SECTION ─── */}
      <section className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28 border-b border-white/10">
        <ContourBG tone="dark" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(18,84,236,0.4),transparent_70%)]" />
        <div className="pointer-events-none absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 h-[450px] w-[700px] bg-gradient-to-tr from-sky/15 via-blue-600/10 to-purple-600/10 blur-[120px]" />

        <div className="relative mx-auto max-w-[1240px] px-4 sm:px-6 md:px-10 lg:px-14">
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2.5 rounded-full border border-sky/30 bg-sky/10 px-4 py-1.5 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-sky" />
            </span>
            <span className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-sky">
              Architecture Directory · Bespoke Funnel Installs
            </span>
          </div>

          <div className="mt-8 grid gap-10 lg:grid-cols-[1.25fr_0.75fr] lg:items-end">
            <div>
              <h1 className="font-sans text-[clamp(40px,6vw,72px)] font-extrabold leading-[1.04] tracking-[-0.035em] text-white">
                <Reveal as="span">
                  <span className="block">Custom Funnel Systems.</span>
                </Reveal>
                <Reveal as="span" delay={90}>
                  <span className="block bg-gradient-to-r from-sky via-[#93C5FD] to-amber-300 bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(56,189,248,0.3)]">
                    Engineered to Convert.
                  </span>
                </Reveal>
              </h1>
              <p className="mt-6 max-w-[56ch] font-sans text-[16.5px] leading-[1.75] text-slate-300 sm:text-[18px]">
                Every funnel here is an end-to-end client acquisition machinery — from qualifying VSLs and high-intent landing architecture to automated CRM pipelines and booked calendar slots.
              </p>
            </div>

            {/* Quick Metrics Glass Pods */}
            <div className="grid grid-cols-3 gap-3 rounded-2xl border border-white/15 bg-gradient-to-b from-white/[0.08] via-white/[0.03] to-white/[0.01] p-4 sm:p-6 shadow-[0_20px_50px_rgba(0,0,0,0.6)] backdrop-blur-xl">
              <div className="text-center sm:text-left">
                <p className="font-sans text-[clamp(32px,4vw,44px)] font-black leading-none text-white">
                  {FUNNEL_DESIGNS.length}
                </p>
                <p className="mt-2 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-sky">
                  Flagship Builds
                </p>
              </div>
              <div className="border-x border-white/10 px-3 text-center sm:text-left">
                <p className="font-sans text-[clamp(32px,4vw,44px)] font-black leading-none text-amber-300">
                  100%
                </p>
                <p className="mt-2 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-amber-300/90">
                  Custom Code
                </p>
              </div>
              <div className="text-center sm:text-left pl-1">
                <p className="font-sans text-[clamp(32px,4vw,44px)] font-black leading-none text-emerald-400">
                  Zero
                </p>
                <p className="mt-2 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-emerald-400/90">
                  Templates
                </p>
              </div>
            </div>
          </div>

          {/* ─── Search & Category Filters Bar ─── */}
          <div className="mt-12 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between border-t border-white/10 pt-8">
            {/* Category Tabs */}
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => {
                      playTick();
                      setSelectedCategory(cat);
                    }}
                    className={`rounded-full px-4 py-2 font-mono text-[11px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                      isActive
                        ? "bg-sky text-[#020926] shadow-[0_0_20px_rgba(56,189,248,0.4)]"
                        : "bg-white/[0.06] text-slate-300 hover:bg-white/15 hover:text-white border border-white/10"
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

            {/* Search Input */}
            <div className="relative min-w-[240px] sm:w-[280px]">
              <input
                type="text"
                placeholder="Search niche or tech stack..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-full border border-white/15 bg-white/[0.06] px-4 py-2 pl-9 font-sans text-[13px] text-white placeholder-slate-400 outline-none transition focus:border-sky focus:bg-white/[0.1]"
              />
              <span className="absolute left-3 top-2.5 text-slate-400 text-xs">
                🔍
              </span>
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-2 font-mono text-[11px] text-slate-400 hover:text-white"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ─── 2. FUNNEL SHOWCASE GRID ─── */}
      <section className="relative py-16 sm:py-24">
        <ContourBG tone="dark" />
        <div className="relative mx-auto max-w-[1240px] px-4 sm:px-6 md:px-10 lg:px-14">
          {filteredFunnels.length === 0 ? (
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-12 text-center">
              <p className="font-sans text-[18px] text-slate-300">
                No funnels match &ldquo;{searchQuery}&rdquo;.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All Builds");
                }}
                className="mt-4 text-sky hover:underline font-mono text-xs uppercase font-bold"
              >
                Reset filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-7 sm:gap-8 lg:gap-10 items-stretch">
              {filteredFunnels.map((funnel, i) => (
                <FunnelDetailCard key={funnel.id} funnel={funnel} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ─── 3. STRATEGY CALL CTA ─── */}
      <section className="relative border-t border-white/10 bg-[#030B2E] py-20 sm:py-28 overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(18,84,236,0.25),transparent_60%)]" />
        <div className="relative mx-auto max-w-[720px] px-4 text-center sm:px-6">
          <p className="uf-eyebrow justify-center text-sky">Next Step</p>
          <h2 className="mt-4 font-sans text-[clamp(30px,4.5vw,48px)] font-extrabold tracking-[-0.03em] text-white leading-tight">
            Want a Custom Funnel Built Like These for Your Business?
          </h2>
          <p className="mt-4 font-sans text-[16px] sm:text-[17.5px] leading-relaxed text-slate-300">
            Book a 1-on-1 strategy call with our team. We’ll review your offer, map your conversion flow, and engineer your acquisition architecture.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <Magnetic strength={0.2}>
              <Link
                href={ROUTES.book}
                onClick={() => playTick()}
                className="btn-gold shadow-[0_12px_40px_rgba(234,179,8,0.35)]"
              >
                Book a Strategy Call →
              </Link>
            </Magnetic>
            <Link
              href={ROUTES.home}
              className="rounded-full border border-white/15 bg-white/5 px-6 py-3 font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-slate-300 transition hover:bg-white/10 hover:text-white"
            >
              ← Back to Homepage
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
