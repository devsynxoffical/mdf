"use client";

import { useState } from "react";
import ContourBG from "@/components/uf/ContourBG";
import Reveal from "@/components/uf/Reveal";
import Magnetic from "@/components/uf/Magnetic";
import ResultsLogos from "@/components/uf/ResultsLogos";
import PagePhotos from "@/components/pages/PagePhotos";
import { SITE_FAQ } from "@/lib/site";
import { FAQ_VISUALS } from "@/lib/media";

const CATEGORIES = [
  {
    title: "Fit & scope",
    items: SITE_FAQ.slice(0, 3),
  },
  {
    title: "Ads, platforms & timing",
    items: SITE_FAQ.slice(3, 6),
  },
  {
    title: "Offers, calls & expectations",
    items: SITE_FAQ.slice(6),
  },
];

export default function FaqPage() {
  const [open, setOpen] = useState<string | null>("0-0");

  return (
    <div className="bg-gradient-to-b from-white via-[#F3F7FD] to-[#EBF2FC] text-[#070B1E]">
      <section className="relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-20">
        <ContourBG tone="light" />
        <div className="relative mx-auto max-w-[1100px] px-4 sm:px-6 md:px-14">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-end lg:gap-16">
            <div>
              <p className="uf-eyebrow text-cobalt">( FAQ )</p>
              <h1 className="mt-5 font-sans text-[clamp(36px,5vw,64px)] font-extrabold leading-[1.05] tracking-tight">
                <Reveal as="span">
                  <span className="block">Before You</span>
                </Reveal>
                <Reveal as="span" delay={90}>
                  <span className="block text-cobalt">Book.</span>
                </Reveal>
              </h1>
            </div>
            <p className="max-w-[42ch] font-sans text-[16px] leading-[1.7] text-slate-600 lg:pb-2">
              Straight answers on who we help, what’s included, ads, platforms, timing, and what
              a strategy call actually covers — so you show up clear.
            </p>
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            {[
              ["10 questions", "Covered below"],
              ["15–20 min", "Strategy call length"],
              ["3–4 weeks", "Typical go-live"],
            ].map(([v, l]) => (
              <div
                key={l}
                className="rounded-full border border-blue-200 bg-white px-5 py-2.5 shadow-sm"
              >
                <span className="font-sans text-[13px] font-bold text-cobalt">{v}</span>
                <span className="ml-2 font-sans text-[13px] text-slate-500">{l}</span>
              </div>
            ))}
          </div>

          <PagePhotos items={FAQ_VISUALS} layout="mosaic" className="mt-12" tone="light" />
          <p className="mt-4 font-sans text-[13px] text-slate-500">
            From what’s included to how ads book calls — the visuals match the questions below.
          </p>
        </div>
      </section>

      <section className="relative pb-24 md:pb-32">
        <div className="relative mx-auto max-w-[1100px] px-4 sm:px-6 md:px-14">
          <div className="space-y-14">
            {CATEGORIES.map((cat, ci) => (
              <div key={cat.title}>
                <h2 className="font-sans text-[13px] font-bold uppercase tracking-[0.16em] text-cobalt">
                  {cat.title}
                </h2>
                <div className="mt-4">
                  {cat.items.map((item, i) => {
                    const id = `${ci}-${i}`;
                    const isOpen = open === id;
                    const n = ci * 3 + i + 1;
                    return (
                      <div key={item.q} className="border-b border-blue-200/60">
                        <button
                          type="button"
                          className="group flex w-full items-start justify-between gap-4 py-5 text-left sm:gap-8 sm:py-6"
                          aria-expanded={isOpen}
                          onClick={() => setOpen(isOpen ? null : id)}
                        >
                          <span className="flex min-w-0 gap-3 sm:gap-5">
                            <span className="tnum mt-1 shrink-0 font-sans text-[13px] font-bold text-cobalt">
                              {String(n).padStart(2, "0")}
                            </span>
                            <span
                              className={`font-sans text-[16px] font-semibold leading-[1.4] md:text-[18px] ${
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
                            <p className="pb-5 pl-8 pr-2 font-sans text-[15px] leading-[1.7] text-slate-600 sm:pb-6 sm:pl-10 sm:pr-4 md:pl-12 md:text-[16px]">
                              {item.a}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 rounded-2xl bg-[#020926] px-5 py-8 text-white sm:rounded-[28px] sm:px-8 sm:py-10 md:flex md:items-center md:justify-between md:px-12 md:py-12">
            <div>
              <p className="font-sans text-[clamp(22px,2.8vw,32px)] font-extrabold tracking-tight">
                Still have a question?
              </p>
              <p className="mt-2 font-sans text-[15px] text-slate-400">
                Bring it to the strategy call — we’ll answer it live.
              </p>
            </div>
            <Magnetic strength={0.2}>
              <a href="/book" className="btn-gold mt-6 inline-flex md:mt-0">
                Book a Call
              </a>
            </Magnetic>
          </div>

          <div className="mt-20">
            <ResultsLogos tone="light" />
          </div>
        </div>
      </section>
    </div>
  );
}
