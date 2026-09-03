"use client";

import ContourBG from "@/components/uf/ContourBG";
import Reveal from "@/components/uf/Reveal";
import Magnetic from "@/components/uf/Magnetic";
import ResultsLogos from "@/components/uf/ResultsLogos";
import PagePhotos from "@/components/pages/PagePhotos";
import { ABOUT_PRINCIPLES, ABOUT_TIMELINE } from "@/lib/site";
import { ABOUT_GALLERY, ABOUT_PEOPLE } from "@/lib/media";

const STATS = [
  { value: "500+", label: "Businesses scaled" },
  { value: "1,500+", label: "Clients served" },
  { value: "100+", label: "Founders mentored" },
  { value: "$50M+", label: "Facebook ad spend" },
];

export default function AboutPage() {
  return (
    <div className="bg-[#020926] text-white">
      {/* Hero */}
      <section className="relative overflow-hidden pt-28 pb-20 md:pt-36 md:pb-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_0%,rgba(18,84,236,0.3),transparent_50%)]" />
        <ContourBG tone="dark" />
        <div className="relative mx-auto max-w-[1180px] px-4 sm:px-6 md:px-14">
          <p className="uf-eyebrow text-sky">( About ) — The operator</p>
          <h1 className="mt-5 max-w-[16ch] font-sans text-[clamp(40px,5.5vw,72px)] font-extrabold leading-[1.05] tracking-tight">
            <Reveal as="span">
              <span className="block">This Is How We</span>
            </Reveal>
            <Reveal as="span" delay={90}>
              <span className="block text-sky">Make It Happen</span>
            </Reveal>
          </h1>

          <div className="mt-14 grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:items-start lg:gap-14">
            <div>
              <p className="font-sans text-[28px] font-extrabold tracking-tight md:text-[34px]">
                Gaurav Kapoor
              </p>
              <p className="mt-2 font-sans text-[14px] font-semibold uppercase tracking-[0.14em] text-sky">
                Founder · Million Dollar Funnel™
              </p>
              <div className="mt-8 space-y-5 font-sans text-[16px] leading-[1.75] text-slate-300 md:text-[17px]">
                <p>
                  Big 4 Market Scaling Expert across the US, UK, Canada, and Australia — focused
                  on tight niches where offer clarity and backend systems decide who scales.
                </p>
                <p>
                  Over 11 years and $50M+ in Facebook ad spend, he watched the same pattern
                  repeat: founders chase high-ticket hype while their low-ticket front end can’t
                  sell consistently, tracking is broken, and follow-up leaks revenue on every
                  campaign.
                </p>
                <p>
                  Million Dollar Funnel™ is the answer — a high-converting backend built for
                  scale: architecture, automation, CRM, and ads working as one predictable
                  machine. No guesswork. No tech on your plate.
                </p>
              </div>
              <Magnetic strength={0.2}>
                <a href="/book" className="btn-gold mt-10 inline-flex">
                  Book a strategy call
                </a>
              </Magnetic>
            </div>

            <div>
              <PagePhotos
                items={ABOUT_GALLERY.slice(0, 3).map((g, i) => ({
                  ...g,
                  label: i === 0 ? "Real sessions" : undefined,
                  caption: i === 0 ? "Founders and operators in the work." : undefined,
                }))}
                layout="featured"
                tone="dark"
              />
              <div className="mt-4 grid grid-cols-2 gap-3 sm:gap-4">
                {STATS.map((s) => (
                  <div
                    key={s.label}
                    className="rounded-2xl border border-white/10 bg-white/[0.04] px-3 py-5 sm:px-5 sm:py-6"
                  >
                    <p className="font-serif text-[clamp(24px,7vw,40px)] italic leading-none text-white">
                      {s.value}
                    </p>
                    <p className="mt-2 font-sans text-[10px] font-semibold uppercase tracking-[0.1em] text-slate-400 sm:text-[11px] sm:tracking-[0.12em]">
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Culture gallery */}
      <section className="relative overflow-hidden border-y border-white/10 py-16 md:py-20">
        <div className="relative mx-auto max-w-[1180px] px-4 sm:px-6 md:px-14">
          <p className="uf-eyebrow text-sky">( In the frame )</p>
          <h2 className="mt-4 max-w-[18ch] font-sans text-[clamp(26px,3.2vw,40px)] font-extrabold tracking-tight">
            Operators we build beside
          </h2>
          <PagePhotos items={ABOUT_GALLERY} layout="mosaic" className="mt-10" tone="dark" />
        </div>
      </section>

      {/* Results + logos */}
      <section className="relative overflow-hidden bg-[#020926] py-20 md:py-24">
        <ContourBG tone="dark" />
        <div className="relative px-4 sm:px-6 md:px-14">
          <ResultsLogos tone="dark" />
        </div>
      </section>

      {/* Principles */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#1254EC] to-[#0B3BB3] py-24 text-white md:py-28">
        <ContourBG tone="cobalt" />
        <div className="relative mx-auto max-w-[1100px] px-4 sm:px-6 md:px-14">
          <p className="uf-eyebrow text-blue-100">( Principles )</p>
          <h2 className="mt-4 max-w-[16ch] font-sans text-[clamp(28px,3.8vw,48px)] font-extrabold tracking-tight">
            What we refuse to compromise
          </h2>
          <div className="mt-14 grid gap-8 sm:grid-cols-2">
            {ABOUT_PRINCIPLES.map((p, i) => (
              <div key={p.title} className="border-t border-white/25 pt-6">
                <p className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-sky">
                  0{i + 1}
                </p>
                <h3 className="mt-3 font-sans text-[22px] font-bold">{p.title}</h3>
                <p className="mt-3 font-sans text-[15px] leading-[1.65] text-blue-50/85">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* People + timeline */}
      <section className="relative overflow-hidden bg-[#F3F7FD] py-24 text-[#070B1E] md:py-32">
        <ContourBG tone="light" />
        <div className="relative mx-auto max-w-[1180px] px-4 sm:px-6 md:px-14">
          <p className="uf-eyebrow text-cobalt">( Clients in frame )</p>
          <h2 className="mt-4 font-sans text-[clamp(28px,3.6vw,48px)] font-extrabold tracking-tight">
            Operators we build beside
          </h2>
          <PagePhotos items={ABOUT_PEOPLE} layout="strip" className="mt-10" tone="light" />

          <p className="uf-eyebrow mt-20 text-cobalt">( Track record )</p>
          <h2 className="mt-4 font-sans text-[clamp(28px,3.6vw,48px)] font-extrabold tracking-tight">
            Built in the trenches — not in theory
          </h2>
          <div className="mt-14 space-y-0">
            {ABOUT_TIMELINE.map((t) => (
              <div
                key={t.label}
                className="grid gap-3 border-t border-blue-200/80 py-8 md:grid-cols-[140px_160px_1fr] md:items-baseline md:gap-8"
              >
                <p className="font-serif text-[32px] italic text-cobalt">{t.year}</p>
                <p className="font-sans text-[14px] font-bold uppercase tracking-[0.12em] text-[#070B1E]">
                  {t.label}
                </p>
                <p className="font-sans text-[15px] leading-[1.65] text-slate-600">{t.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 flex flex-wrap gap-4">
            <Magnetic strength={0.2}>
              <a href="/cases/coaching-lto" className="btn-gold inline-flex">
                See a full case study
              </a>
            </Magnetic>
            <a
              href="/book"
              className="inline-flex items-center justify-center rounded-full border border-cobalt/30 px-7 py-3.5 font-sans text-[12px] font-bold uppercase tracking-[0.14em] text-cobalt transition hover:bg-cobalt hover:text-white"
            >
              Book a call
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
