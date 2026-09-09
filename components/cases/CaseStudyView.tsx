"use client";

import { useCallback, useState } from "react";
import ContourBG from "@/components/uf/ContourBG";
import Reveal from "@/components/uf/Reveal";
import Magnetic from "@/components/uf/Magnetic";
import VslPlayer from "@/components/cases/VslPlayer";
import UFOpinions from "@/components/uf/UFOpinions";
import UFProof from "@/components/uf/UFProof";
import UFLeaks from "@/components/uf/UFLeaks";
import { playTick } from "@/components/audio/SoundToggle";
import type { CaseStudy } from "@/lib/cases";
import { CASE_STUDIES } from "@/lib/cases";

export default function CaseStudyView({ study }: { study: CaseStudy }) {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [watched, setWatched] = useState(0);
  const showSticky = watched >= 12;

  const onProgress = useCallback((pct: number) => {
    setWatched((prev) => Math.max(prev, pct));
  }, []);

  const toggleFaq = (i: number) => {
    playTick();
    setOpenFaq((prev) => (prev === i ? null : i));
  };

  return (
    <div className={`bg-[#020926] text-white selection:bg-cyan-500 selection:text-black ${showSticky ? "pb-20" : ""}`}>
      {/* ─── 1. HERO VSL ─── */}
      <section className="relative overflow-hidden pt-24 pb-16 sm:pt-28 sm:pb-20 md:pt-32 md:pb-24">
        {/* Ambient atmospheric radial glows */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(18,84,236,0.38),transparent_60%)]" />
        <div className="pointer-events-none absolute top-1/4 -right-32 h-96 w-96 rounded-full bg-cyan-500/10 blur-[120px]" />
        <ContourBG tone="dark" />

        <div className="relative mx-auto max-w-[1140px] px-4 sm:px-6 md:px-12">
          {/* Back Navigation Breadcrumb */}
          <div className="flex items-center justify-between gap-4">
            <a
              href={CASE_STUDIES.length > 1 ? "/cases" : "/"}
              onClick={() => playTick()}
              className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 font-sans text-[11.5px] font-semibold uppercase tracking-[0.14em] text-slate-300 backdrop-blur-md transition-all duration-300 hover:border-cyan-400/40 hover:bg-white/10 hover:text-white"
            >
              <span aria-hidden className="transition-transform duration-300 group-hover:-translate-x-1">←</span>{" "}
              {CASE_STUDIES.length > 1 ? "All Case Studies" : "Home"}
            </a>

            <span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/25 bg-cyan-500/10 px-3.5 py-1 font-mono text-[11px] font-bold text-cyan-300">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-ping" />
              Verified Case Breakdown
            </span>
          </div>

          {/* Headline & Subtitle */}
          <div className="mt-10 text-center">
            <p className="uf-eyebrow justify-center text-cyan-400 font-mono tracking-[0.2em] text-[12px] uppercase font-semibold">
              {study.niche}
            </p>
            <h1 className="mx-auto mt-4 max-w-[20ch] font-sans text-[clamp(32px,5.2vw,64px)] font-extrabold leading-[1.05] tracking-[-0.035em] text-white">
              <Reveal as="span">
                <span className="block bg-gradient-to-b from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
                  {study.title}
                </span>
              </Reveal>
            </h1>
            <p className="mx-auto mt-4 max-w-[34ch] font-serif text-[clamp(18px,2.4vw,28px)] italic text-cyan-200/90">
              {study.subtitle}
            </p>
          </div>

          {/* VSL Video Player Device Container */}
          <div className="relative mt-12 -mx-4 sm:mx-0">
            <div className="pointer-events-none absolute -inset-4 rounded-[36px] bg-[radial-gradient(ellipse_at_center,rgba(18,84,236,0.35),transparent_70%)] blur-2xl md:-inset-8" />
            <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-white/15 bg-black/70 p-1.5 sm:p-2.5 shadow-[0_25px_70px_rgba(0,0,0,0.7)] backdrop-blur-2xl">
              <VslPlayer src={study.videoUrl} onProgress={onProgress} autoPlay />
            </div>
          </div>

          {/* Key Metrics Bento Grid */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
            {study.metrics.map((m, idx) => (
              <div
                key={m.label}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#050f2e]/80 p-6 sm:p-7 text-center shadow-[0_12px_36px_rgba(0,0,0,0.4)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/40 hover:shadow-[0_16px_45px_rgba(18,84,236,0.25)]"
              >
                <div className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-cyan-500/10 blur-xl transition-opacity duration-300 group-hover:opacity-100" />
                <p className="font-serif text-[clamp(36px,4.5vw,52px)] italic leading-none tracking-tight text-white group-hover:text-cyan-200 transition-colors">
                  {m.value}
                </p>
                <p className="mt-3 font-mono text-[11.5px] font-bold uppercase tracking-[0.18em] text-cyan-400">
                  {m.label}
                </p>
              </div>
            ))}
          </div>

          {/* ROI Metric Badge Pill */}
          <div className="mt-8 flex justify-center">
            <div className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-center font-sans text-[13.5px] sm:text-[14.5px] text-slate-300 backdrop-blur-md shadow-sm">
              <span>
                <strong className="text-white font-semibold">
                  {study.roiBadge?.spendValue || "$255,130"}
                </strong>{" "}
                {study.roiBadge?.spendLabel || "ad spend"}
              </span>
              <span className="text-cyan-400">→</span>
              <span>
                <strong className="text-cyan-300 font-bold">
                  {study.roiBadge?.collectedValue || "$847,307"}
                </strong>{" "}
                {study.roiBadge?.collectedLabel || "collected"}
              </span>
              <span className="text-white/20">|</span>
              <span className="rounded-md bg-emerald-500/15 border border-emerald-400/30 px-2 py-0.5 font-mono text-[11px] font-bold text-emerald-300">
                {study.roiBadge?.roasBadge || "3.32x ROAS"}
              </span>
            </div>
          </div>

          {/* Hero CTA */}
          <div className="mt-8 flex justify-center">
            <Magnetic strength={0.2}>
              <a href="/book" onClick={() => playTick()} className="btn-gold shadow-[0_10px_35px_rgba(234,179,8,0.3)]">
                Get My Million-Dollar Funnel →
              </a>
            </Magnetic>
          </div>
        </div>
      </section>

      {/* ─── 2. THE SITUATION (Dark Atmospheric Narrative) ─── */}
      <section className="relative overflow-hidden border-t border-white/10 bg-gradient-to-b from-[#020926] via-[#041136] to-[#020926] py-20 md:py-28 text-white">
        <ContourBG tone="dark" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_80%_30%,rgba(56,189,248,0.12),transparent_50%)]" />

        <div className="relative mx-auto max-w-[1140px] px-4 sm:px-6 md:px-12">
          <div className="max-w-[800px]">
            <p className="uf-eyebrow tracking-[0.18em] text-cyan-400 font-mono text-[12px] uppercase font-semibold">
              ( 01 ) — The Situation
            </p>
            <h2 className="mt-4 font-sans text-[clamp(28px,4vw,50px)] font-extrabold leading-[1.1] tracking-[-0.03em] text-white">
              {study.problemLead}
            </h2>

            {/* Diagnostic Narrative Cards */}
            <div className="mt-8 space-y-5 rounded-2xl border border-white/10 bg-[#030922]/80 p-6 sm:p-8 backdrop-blur-xl shadow-xl">
              {study.problemBody.map((p, idx) => (
                <p key={idx} className="font-sans text-[16px] sm:text-[17.5px] leading-[1.75] text-slate-300">
                  {p}
                </p>
              ))}
            </div>

            {/* Where We Jumped In Highlight Box */}
            <div className="mt-10 rounded-2xl border-l-4 border-cyan-400 border-y border-r border-cyan-400/20 bg-gradient-to-r from-cyan-950/40 via-[#031338]/60 to-transparent p-6 sm:p-8 shadow-[0_15px_40px_rgba(0,0,0,0.35)] backdrop-blur-md">
              <div className="flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-cyan-400">
                <span className="h-2 w-2 rounded-full bg-cyan-400" />
                <span>The Turning Point</span>
              </div>
              <p className="mt-3 font-sans text-[clamp(19px,2.5vw,28px)] font-bold leading-[1.3] text-white">
                {study.jumpIn}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 3. BEFORE / AFTER (Dark Bento Comparison) ─── */}
      <section className="relative overflow-hidden border-t border-white/10 bg-[#020926] py-20 md:py-28 text-white">
        <ContourBG tone="dark" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(18,84,236,0.18),transparent_60%)]" />

        <div className="relative mx-auto max-w-[1180px] px-4 sm:px-6 md:px-12">
          {/* Section Heading */}
          <div className="text-center max-w-[650px] mx-auto mb-14">
            <p className="uf-eyebrow justify-center tracking-[0.18em] text-cyan-400 font-mono text-[12px] uppercase font-semibold">
              Direct Transformation
            </p>
            <h2 className="mt-3 font-sans text-[clamp(30px,4vw,48px)] font-extrabold tracking-[-0.03em] text-white">
              Before &amp; After MDF Deployment
            </h2>
            <p className="mt-3 font-sans text-[15px] sm:text-[16px] text-slate-400">
              {study.transformationSubtitle || "How eliminating tracking friction and building a hardened backend unlocked scale."}
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2 lg:gap-10">
            {/* 🔴 BEFORE CARD */}
            <div className="relative flex flex-col justify-between rounded-3xl border border-red-500/25 bg-gradient-to-b from-red-950/20 via-[#0a0515]/90 to-[#030617]/90 p-7 sm:p-9 shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-xl">
              <div>
                <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-5">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-red-500/30 bg-red-500/10 px-3 py-1 font-mono text-[11px] font-bold text-red-300">
                    <span className="h-1.5 w-1.5 rounded-full bg-red-400" />
                    {study.beforeCard?.tag || "( 02 ) — Pre-MDF"}
                  </span>
                  <span className="font-mono text-xs font-semibold text-red-400/80 uppercase">
                    {study.beforeCard?.subtitle || "Leaking Funnel"}
                  </span>
                </div>

                <h3 className="mt-6 font-sans text-[22px] sm:text-[26px] font-extrabold text-white">
                  {study.beforeCard?.title || "This Is How He Came To Us"}
                </h3>

                <ul className="mt-8 space-y-4">
                  {study.cameWith.map((item, i) => (
                    <li
                      key={item}
                      className="flex items-start gap-3.5 rounded-xl border border-white/5 bg-white/[0.02] p-4 font-sans text-[15px] sm:text-[15.5px] leading-relaxed text-slate-300"
                    >
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-500/20 text-red-400 font-bold text-xs">
                        ✕
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 pt-5 border-t border-white/10">
                <p className="font-mono text-[11.5px] text-red-400/90 font-medium">
                  {study.beforeCard?.footer || "Result: Inconsistent ad spend & lost conversions."}
                </p>
              </div>
            </div>

            {/* 🟢 AFTER CARD */}
            <div className="relative flex flex-col justify-between rounded-3xl border border-cyan-400/35 bg-gradient-to-b from-cyan-950/30 via-[#04153a]/90 to-[#020926]/90 p-7 sm:p-9 shadow-[0_20px_60px_rgba(18,84,236,0.3)] backdrop-blur-xl">
              <div>
                <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-5">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1 font-mono text-[11px] font-bold text-emerald-300">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    {study.afterCard?.tag || "( 03 ) — Post-MDF"}
                  </span>
                  <span className="font-mono text-xs font-semibold text-cyan-300 uppercase">
                    {study.afterCard?.subtitle || "3.32x Verified ROAS"}
                  </span>
                </div>

                <h3 className="mt-6 font-sans text-[22px] sm:text-[26px] font-extrabold text-white">
                  {study.afterCard?.title || "The Million Dollar Funnel™ System Did"}
                </h3>

                <ul className="mt-8 space-y-4">
                  {study.weDid.map((item, i) => (
                    <li
                      key={item}
                      className="flex items-start gap-3.5 rounded-xl border border-cyan-400/20 bg-cyan-950/20 p-4 font-sans text-[15px] sm:text-[15.5px] leading-relaxed text-slate-200"
                    >
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/25 text-emerald-400 font-bold text-xs">
                        ✓
                      </span>
                      <span className="font-medium text-white">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 pt-5 border-t border-cyan-400/20">
                <p className="font-mono text-[11.5px] text-emerald-300 font-medium">
                  {study.afterCard?.footer || "✓ Revenue Collected at Scale"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 4. SHARED SYSTEM ARCHITECTURE & PROOF ─── */}
      <UFLeaks />
      <UFProof />
      <UFOpinions />

      {/* ─── 5. FAQ (Dark Luxury Glassmorphic Accordion) ─── */}
      <section className="relative overflow-hidden border-t border-white/10 bg-gradient-to-b from-[#020926] via-[#040e32] to-[#020926] py-20 md:py-28 text-white">
        <ContourBG tone="dark" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_40%,rgba(56,189,248,0.1),transparent_50%)]" />

        <div className="relative mx-auto max-w-[1140px] px-4 sm:px-6 md:px-12">
          <div className="grid gap-12 md:grid-cols-[0.85fr_1.15fr] md:gap-16">
            {/* Sticky FAQ Intro */}
            <div className="md:sticky md:top-28 md:self-start">
              <p className="uf-eyebrow font-mono text-[12px] font-bold tracking-[0.18em] text-cyan-400 uppercase">
                ( 05 ) — The Questions
              </p>
              <h2 className="mt-4 leading-tight">
                <Reveal as="span">
                  <span className="block font-sans text-[clamp(34px,4.5vw,56px)] font-extrabold tracking-[-0.035em] text-white">
                    Before You
                  </span>
                </Reveal>
                <Reveal as="span" delay={100}>
                  <span className="block font-sans text-[clamp(30px,3.8vw,50px)] font-bold tracking-[-0.035em] bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-300 bg-clip-text text-transparent">
                    Book a Call.
                  </span>
                </Reveal>
              </h2>
              <p className="mt-4 font-sans text-[15px] sm:text-[16px] leading-[1.65] text-slate-300 max-w-[34ch]">
                Everything you need to know about how the Million Dollar Funnel™ operates, integrates, and scales.
              </p>

              <div className="mt-8 hidden sm:block">
                <Magnetic strength={0.15}>
                  <a
                    href="/book"
                    onClick={() => playTick()}
                    className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3 font-sans text-[13px] font-bold text-white shadow-lg backdrop-blur-md transition hover:bg-white hover:text-black hover:scale-105"
                  >
                    <span>Have other questions? Book a call</span>
                    <span aria-hidden>→</span>
                  </a>
                </Magnetic>
              </div>
            </div>

            {/* Accordion Questions List */}
            <div className="space-y-3">
              {study.faq.map((item, i) => {
                const isOpen = openFaq === i;
                return (
                  <div
                    key={item.q}
                    className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                      isOpen
                        ? "border-cyan-400/40 bg-[#061238]/90 shadow-[0_8px_30px_rgba(18,84,236,0.2)]"
                        : "border-white/10 bg-[#040a24]/60 hover:border-white/25 hover:bg-[#050f2e]/80"
                    }`}
                  >
                    <button
                      type="button"
                      className="group flex w-full items-center justify-between gap-4 p-5 sm:p-6 text-left"
                      aria-expanded={isOpen}
                      onClick={() => toggleFaq(i)}
                    >
                      <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                        <span className="font-mono text-[12px] font-bold text-cyan-400 shrink-0">
                          0{i + 1}
                        </span>
                        <span
                          className={`font-sans text-[16px] sm:text-[17.5px] font-semibold tracking-tight transition-colors ${
                            isOpen ? "text-cyan-300" : "text-white group-hover:text-cyan-200"
                          }`}
                        >
                          {item.q}
                        </span>
                      </div>

                      <span
                        aria-hidden
                        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                          isOpen
                            ? "border-cyan-400 bg-cyan-500/20 text-cyan-300 rotate-45"
                            : "border-white/15 bg-white/5 text-slate-400 group-hover:border-white/30 group-hover:text-white"
                        }`}
                      >
                        +
                      </span>
                    </button>

                    <div
                      className="grid transition-all duration-[420ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
                      style={{
                        gridTemplateRows: isOpen ? "1fr" : "0fr",
                        opacity: isOpen ? 1 : 0,
                      }}
                    >
                      <div className="overflow-hidden">
                        <p className="px-5 pb-6 pt-1 sm:px-6 sm:pb-7 font-sans text-[15px] sm:text-[15.5px] leading-[1.7] text-slate-300 border-t border-white/5">
                          {item.a}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ─── 6. FINAL BOOKING CALLOUT ─── */}
      <section className="relative overflow-hidden border-t border-white/10 bg-[#020926] py-20 md:py-28">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_100%,rgba(18,84,236,0.3),transparent_60%)]" />
        <div className="relative mx-auto flex max-w-[1140px] flex-col items-center text-center px-4 sm:px-6 md:px-12">
          <span className="rounded-full border border-cyan-400/30 bg-cyan-500/10 px-4 py-1.5 font-mono text-[11.5px] font-bold text-cyan-300 uppercase tracking-widest shadow-sm">
            Ready To Scale Your Offer?
          </span>
          <h2 className="mt-4 max-w-[20ch] font-sans text-[clamp(32px,4.5vw,56px)] font-extrabold tracking-[-0.035em] text-white">
            Get Your Million-Dollar Funnel™ Stack Installed
          </h2>
          <p className="mt-4 max-w-[46ch] font-sans text-[16px] sm:text-[17px] text-slate-300 leading-relaxed">
            100% managed execution. Strategy, pages, tracking, AI automations, and CRM built for your offer.
          </p>
          <div className="mt-8">
            <Magnetic strength={0.2}>
              <a href="/book" onClick={() => playTick()} className="btn-gold shadow-[0_12px_40px_rgba(234,179,8,0.35)]">
                Book a Strategy Call →
              </a>
            </Magnetic>
          </div>
        </div>
      </section>

      {/* ─── 7. FLOATING CONVERSION DOCK (Mobile & Desktop) ─── */}
      <div
        className={`fixed inset-x-0 bottom-0 z-40 border-t border-white/15 bg-[#020926]/90 backdrop-blur-2xl transition-transform duration-500 ${
          showSticky ? "translate-y-0" : "translate-y-full"
        }`}
        style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
      >
        <div className="mx-auto flex max-w-[1140px] items-center justify-between gap-4 px-4 py-3 sm:px-6 md:px-12">
          <div className="hidden sm:flex items-center gap-3">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <p className="font-sans text-[14px] font-medium text-slate-200">
              {study.stickyBarText || "Ready to duplicate this infrastructure for your offer?"}
            </p>
          </div>
          <a
            href="/book"
            onClick={() => playTick()}
            className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 px-6 py-3 font-sans text-[13px] font-bold text-white shadow-[0_10px_25px_rgba(18,84,236,0.4)] transition hover:scale-105"
          >
            <span>Book a Strategy Call</span>
            <span aria-hidden>→</span>
          </a>
        </div>
      </div>
    </div>
  );
}

