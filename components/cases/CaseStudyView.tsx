"use client";

import { useCallback, useState } from "react";
import ContourBG from "@/components/uf/ContourBG";
import Reveal from "@/components/uf/Reveal";
import Magnetic from "@/components/uf/Magnetic";
import VslPlayer from "@/components/cases/VslPlayer";
import UFOpinions from "@/components/uf/UFOpinions";
import UFProof from "@/components/uf/UFProof";
import UFLeaks from "@/components/uf/UFLeaks";
import type { CaseStudy } from "@/lib/cases";
import { CASE_STUDIES } from "@/lib/cases";

export default function CaseStudyView({ study }: { study: CaseStudy }) {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [watched, setWatched] = useState(0);
  const showSticky = watched >= 12;

  const onProgress = useCallback((pct: number) => {
    setWatched((prev) => Math.max(prev, pct));
  }, []);

  return (
    <div className={`bg-[#020926] text-white ${showSticky ? "pb-20" : ""}`}>
      {/* HERO VSL */}
      <section className="relative overflow-hidden pt-24 pb-14 sm:pt-28 sm:pb-16 md:pt-32 md:pb-20">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(18,84,236,0.38),transparent_55%)]" />
        <ContourBG tone="dark" />

        <div className="relative mx-auto max-w-[1100px] px-4 sm:px-6 md:px-14">
          <a
            href={CASE_STUDIES.length > 1 ? "/cases" : "/"}
            className="inline-flex items-center gap-2 font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-sky/90 transition-colors hover:text-white"
          >
            <span aria-hidden>←</span>{" "}
            {CASE_STUDIES.length > 1 ? "All Cases" : "Home"}
          </a>

          <div className="mt-8 text-center">
            <p className="uf-eyebrow justify-center text-sky">{study.navLabel}</p>
            <h1 className="mx-auto mt-5 max-w-[18ch] font-sans text-[clamp(32px,5vw,60px)] font-extrabold leading-[1.06] tracking-tight text-white">
              <Reveal as="span">
                <span className="block">{study.title}</span>
              </Reveal>
            </h1>
            <p className="mx-auto mt-5 max-w-[34ch] font-serif text-[clamp(18px,2.2vw,26px)] italic text-blue-100/90">
              {study.subtitle}
            </p>
          </div>

          <div className="relative mt-10 -mx-6 md:mx-0">
            <div className="pointer-events-none absolute -inset-4 rounded-[36px] bg-[radial-gradient(ellipse_at_center,rgba(18,84,236,0.35),transparent_70%)] blur-2xl md:-inset-8" />
            <div className="relative">
              <VslPlayer src={study.videoUrl} onProgress={onProgress} autoPlay />
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-white/15 bg-white/10 sm:grid-cols-3">
            {study.metrics.map((m) => (
              <div
                key={m.label}
                className="bg-[#04103A]/90 px-6 py-7 text-center backdrop-blur-md sm:py-8"
              >
                <p className="font-serif text-[clamp(34px,4.2vw,48px)] italic leading-none tracking-tight text-white">
                  {m.value}
                </p>
                <p className="mt-3 font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-sky">
                  {m.label}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-6 text-center font-sans text-[14px] text-slate-400">
            <span className="font-semibold text-white">$255,130</span> spent →{" "}
            <span className="font-semibold text-sky">$847,307</span> revenue collected · ROAS{" "}
            <span className="font-semibold text-white">3.32</span>
          </p>

          <div className="mt-8 flex justify-center">
            <Magnetic strength={0.2}>
              <a href="/book" className="btn-gold">
                Get My Million-Dollar Funnel
              </a>
            </Magnetic>
          </div>
        </div>
      </section>

      {/* PROBLEM */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#1254EC] via-[#104FE3] to-[#0B3BB3] py-24 text-white md:py-32">
        <ContourBG tone="cobalt" />
        <div className="relative mx-auto max-w-[1100px] px-4 sm:px-6 md:px-14">
          <p className="uf-eyebrow text-blue-100">( 01 ) — The Situation</p>
          <h2 className="mt-6 max-w-[22ch] font-sans text-[clamp(28px,4vw,52px)] font-extrabold leading-[1.12] tracking-tight">
            {study.problemLead}
          </h2>
          <div className="mt-10 max-w-[62ch] space-y-5 font-sans text-[17px] leading-[1.7] text-blue-50/90 md:text-[19px]">
            {study.problemBody.map((p) => (
              <p key={p.slice(0, 40)}>{p}</p>
            ))}
          </div>

          <div className="mt-16 border-t border-white/20 pt-12">
            <p className="font-sans text-[13px] font-bold uppercase tracking-[0.16em] text-sky">
              That’s Exactly Where We Jumped In.
            </p>
            <p className="mt-4 max-w-[48ch] font-sans text-[clamp(22px,2.8vw,34px)] font-semibold leading-[1.25] text-white">
              {study.jumpIn}
            </p>
          </div>
        </div>
      </section>

      {/* BEFORE / AFTER */}
      <section className="relative overflow-hidden bg-[#F3F7FD] py-24 text-[#070B1E] md:py-32">
        <ContourBG tone="light" />
        <div className="relative mx-auto max-w-[1180px] px-4 sm:px-6 md:px-14">
          <div className="grid gap-16 lg:grid-cols-2 lg:gap-20">
            <div>
              <p className="uf-eyebrow text-cobalt">( 02 ) — Before</p>
              <h2 className="mt-5 font-sans text-[clamp(28px,3.4vw,44px)] font-extrabold leading-[1.1] tracking-tight">
                This Is How He Came To Us
              </h2>
              <ul className="mt-10 space-y-4">
                {study.cameWith.map((item, i) => (
                  <li
                    key={item}
                    className="flex gap-4 border-b border-blue-200/70 pb-4 font-sans text-[16px] leading-[1.5] text-slate-700 md:text-[17px]"
                  >
                    <span className="tnum shrink-0 font-sans text-[13px] font-bold text-cobalt">
                      0{i + 1}
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="uf-eyebrow text-cobalt">( 03 ) — After</p>
              <h2 className="mt-5 font-sans text-[clamp(28px,3.4vw,44px)] font-extrabold leading-[1.1] tracking-tight">
                The Magic Million Dollar Funnel™ System Did
              </h2>
              <ul className="mt-10 space-y-4">
                {study.weDid.map((item, i) => (
                  <li
                    key={item}
                    className="flex gap-4 border-b border-blue-200/70 pb-4 font-sans text-[16px] leading-[1.5] text-slate-700 md:text-[17px]"
                  >
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-cobalt text-white">
                      <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="3">
                        <path d="M5 12l5 5L20 7" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FUNNEL SYSTEMS — same gallery as homepage */}
      <UFLeaks />

      {/* SYSTEM — same Million Dollar Funnel™ layers as homepage */}
      <UFProof />

      {/* TESTIMONIALS — homepage Second Opinions */}
      <UFOpinions />

      {/* FAQ — homepage questions layout */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white via-[#F3F7FD] to-[#EBF2FC] py-24 text-[#070B1E] md:py-32">
        <ContourBG tone="light" />
        <div className="relative mx-auto max-w-[1100px] px-4 sm:px-6 md:px-14">
          <div className="grid gap-12 md:grid-cols-[0.8fr_1.2fr] md:gap-16">
            <div className="md:sticky md:top-28 md:self-start">
              <p className="uf-eyebrow font-sans font-bold tracking-[0.16em] text-cobalt">
                ( 05 ) — The Questions
              </p>
              <h2 className="mt-6 text-[#070B1E]">
                <Reveal as="span">
                  <span className="block font-sans text-[clamp(36px,4.6vw,68px)] font-extrabold leading-[1.05] tracking-tight text-[#070B1E]">
                    Before You
                  </span>
                </Reveal>
                <Reveal as="span" delay={110}>
                  <span className="block font-sans text-[clamp(30px,3.8vw,56px)] font-bold tracking-tight text-cobalt">
                    Book.
                  </span>
                </Reveal>
              </h2>
            </div>

            <div>
              {study.faq.map((item, i) => {
                const isOpen = openFaq === i;
                return (
                  <div key={item.q} className="border-b border-blue-200/60">
                    <button
                      type="button"
                      className="group flex w-full items-start justify-between gap-4 py-5 text-left sm:gap-8 sm:py-6"
                      aria-expanded={isOpen}
                      onClick={() => setOpenFaq(isOpen ? null : i)}
                    >
                      <span className="flex min-w-0 gap-3 sm:gap-5">
                        <span className="tnum mt-1 font-sans text-[13px] font-bold text-cobalt">
                          0{i + 1}
                        </span>
                        <span
                          className={`font-sans text-[16px] font-semibold leading-[1.4] transition-colors md:text-[18px] ${
                            isOpen ? "text-cobalt" : "text-[#070B1E] group-hover:text-cobalt"
                          }`}
                        >
                          {item.q}
                        </span>
                      </span>
                      <span
                        aria-hidden
                        className="relative mt-1.5 h-3 w-3 shrink-0 transition-transform duration-300"
                        style={{ transform: isOpen ? "rotate(135deg)" : "rotate(0deg)" }}
                      >
                        <span className={`absolute left-1/2 top-0 h-3 w-px -translate-x-1/2 ${isOpen ? "bg-cobalt" : "bg-[#070B1E]/60"}`} />
                        <span className={`absolute left-0 top-1/2 h-px w-3 -translate-y-1/2 ${isOpen ? "bg-cobalt" : "bg-[#070B1E]/60"}`} />
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
                        <p className="pb-5 pl-8 pr-2 font-sans text-[15px] leading-[1.65] text-slate-600 sm:pb-6 sm:pl-10 sm:pr-8 md:pl-12 md:text-[16px]">
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

      <section className="relative overflow-hidden border-t border-white/10 bg-[#020926] py-20 md:py-28">
        <div className="relative mx-auto flex max-w-[1100px] flex-col items-start gap-6 px-4 sm:px-6 sm:gap-8 md:flex-row md:items-center md:justify-between md:px-14">
          <div>
            <p className="font-sans text-[clamp(26px,3.4vw,44px)] font-extrabold leading-none tracking-tight text-white">
              Get My Million-Dollar Funnel
            </p>
            <p className="mt-3 font-sans text-[15px] text-slate-400">
              100% Risk-Free. Performance-backed.
            </p>
          </div>
          <Magnetic>
            <a href="/book" className="btn-gold">
              Book the call
            </a>
          </Magnetic>
        </div>
      </section>

      <div
        className={`fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-[#020926]/92 backdrop-blur-xl transition-transform duration-500 ${
          showSticky ? "translate-y-0" : "translate-y-full"
        }`}
        style={{ paddingBottom: "max(0.5rem, env(safe-area-inset-bottom))" }}
      >
        <div className="mx-auto flex max-w-[1100px] items-center justify-between gap-3 px-4 py-3 sm:gap-4 sm:px-6 md:px-14 md:py-3.5">
          <p className="hidden font-sans text-[14px] text-slate-300 sm:block">
            Ready for the same system?
          </p>
          <a
            href="/book"
            className="ml-auto inline-flex w-full items-center justify-center rounded-full bg-[#1254EC] px-6 py-3.5 font-sans text-[12px] font-bold uppercase tracking-[0.14em] text-white shadow-[0_10px_30px_rgba(18,84,236,0.4)] transition hover:bg-[#0B3BB3] sm:w-auto sm:py-3"
          >
            Book a Call
          </a>
        </div>
      </div>
    </div>
  );
}
