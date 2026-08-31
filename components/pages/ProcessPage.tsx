"use client";

import ContourBG from "@/components/uf/ContourBG";
import Reveal from "@/components/uf/Reveal";
import Magnetic from "@/components/uf/Magnetic";
import ResultsLogos from "@/components/uf/ResultsLogos";
import PagePhotos from "@/components/pages/PagePhotos";
import { PROCESS_STEPS, SERVICES } from "@/lib/site";
import { PROCESS_VISUALS, PROOF_SHOTS } from "@/lib/media";

export default function ProcessPage() {
  return (
    <div className="bg-[#020926] text-white">
      {/* Hero */}
      <section className="relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-20">
        <ContourBG tone="dark" />
        <div className="relative mx-auto max-w-[1180px] px-4 sm:px-6 md:px-14">
          <p className="uf-eyebrow text-sky">( Process ) — Start to finish</p>
          <h1 className="mt-5 max-w-[12ch] font-sans text-[clamp(40px,6vw,84px)] font-extrabold leading-[1.02] tracking-tight">
            <Reveal as="span">
              <span className="block">How We</span>
            </Reveal>
            <Reveal as="span" delay={90}>
              <span className="block text-sky">Build It.</span>
            </Reveal>
          </h1>
          <p className="mt-6 max-w-[52ch] font-sans text-[17px] leading-[1.7] text-slate-400">
            Five steps from offer clarity to compounding traffic — the same architecture behind
            every Million Dollar Funnel™ install. No mystery. No “we’ll figure it out in ads.”
          </p>

          <div className="mt-12 grid gap-4 sm:grid-cols-3">
            {[
              ["3–4 wks", "Typical time to live traffic"],
              ["5 steps", "Clear build sequence"],
              ["Weekly", "Optimization after launch"],
            ].map(([v, l]) => (
              <div
                key={l}
                className="rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-5"
              >
                <p className="font-serif text-[28px] italic text-sky">{v}</p>
                <p className="mt-1 font-sans text-[13px] text-slate-400">{l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Steps with images */}
      <section className="relative overflow-hidden pb-20 md:pb-28">
        <div className="relative mx-auto max-w-[1180px] px-4 sm:px-6 md:px-14">
          <ol className="space-y-0">
            {PROCESS_STEPS.map((step, i) => {
              const visual = PROCESS_VISUALS[i];
              const flip = i % 2 === 1;
              return (
                <li
                  key={step.num}
                  className="grid items-center gap-6 border-t border-white/10 py-10 sm:gap-8 sm:py-14 lg:grid-cols-2 lg:gap-14"
                >
                  <div className={flip ? "lg:order-2" : undefined}>
                    <span className="font-serif text-[48px] italic leading-none text-sky">
                      {step.num}
                    </span>
                    <h2 className="mt-3 font-sans text-[clamp(26px,3.2vw,38px)] font-extrabold tracking-tight">
                      {step.title}
                    </h2>
                    <p className="mt-4 max-w-[54ch] font-sans text-[17px] leading-[1.7] text-slate-300">
                      {step.body}
                    </p>
                    <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                      {step.details.map((d) => (
                        <li
                          key={d}
                          className="flex items-start gap-3 font-sans text-[14px] leading-snug text-slate-400"
                        >
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-sky" />
                          {d}
                        </li>
                      ))}
                    </ul>
                    {i === PROCESS_STEPS.length - 1 && (
                      <Magnetic strength={0.2}>
                        <a href="/book" className="btn-gold mt-10 inline-flex">
                          Book the call
                        </a>
                      </Magnetic>
                    )}
                  </div>

                  {visual && (
                    <figure
                      className={`relative aspect-[16/11] overflow-hidden rounded-2xl border border-white/12 bg-[#04103A] sm:rounded-[28px] ${
                        flip ? "lg:order-1" : ""
                      }`}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={visual.src}
                        alt={visual.label}
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />
                      <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-5 pb-5 pt-16">
                        <p className="font-sans text-[11px] font-bold uppercase tracking-[0.14em] text-sky">
                          {visual.label}
                        </p>
                        <p className="mt-1 font-sans text-[15px] font-semibold text-white">
                          {visual.caption}
                        </p>
                      </figcaption>
                    </figure>
                  )}
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* Proof receipts */}
      <section className="relative overflow-hidden border-y border-white/10 bg-[#04103A]/40 py-16 md:py-20">
        <div className="relative mx-auto max-w-[1180px] px-4 sm:px-6 md:px-14">
          <p className="uf-eyebrow text-sky">Live receipts from real installs</p>
          <h2 className="mt-4 max-w-[18ch] font-sans text-[clamp(26px,3.2vw,40px)] font-extrabold tracking-tight">
            What the machine looks like in the wild
          </h2>
          <PagePhotos items={PROOF_SHOTS} layout="strip" className="mt-10" tone="dark" />
          <a
            href="/#workproof"
            className="mt-6 inline-flex font-sans text-[12px] font-bold uppercase tracking-[0.14em] text-sky hover:underline"
          >
            Browse all work proof →
          </a>
        </div>
      </section>

      {/* Results + logos */}
      <section className="relative overflow-hidden bg-[#020926] py-20 md:py-24">
        <ContourBG tone="dark" />
        <div className="relative px-4 sm:px-6 md:px-14">
          <ResultsLogos tone="dark" />
        </div>
      </section>

      {/* Stack */}
      <section className="relative overflow-hidden bg-[#F3F7FD] py-24 text-[#070B1E] md:py-32">
        <ContourBG tone="light" />
        <div className="relative mx-auto max-w-[1100px] px-4 sm:px-6 md:px-14">
          <p className="uf-eyebrow text-cobalt">What we build</p>
          <h2 className="mt-4 max-w-[16ch] font-sans text-[clamp(28px,3.6vw,48px)] font-extrabold tracking-tight">
            The system stack inside every install
          </h2>
          <p className="mt-5 max-w-[48ch] font-sans text-[16px] leading-[1.65] text-slate-600">
            Each piece exists so leads don’t die between the click and the calendar. You get the
            full machine — not a landing page and a hope.
          </p>
          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s, i) => (
              <div key={s.title} className="border-t border-blue-200 pt-5">
                <p className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-cobalt">
                  0{i + 1}
                </p>
                <h3 className="mt-2 font-sans text-[18px] font-bold text-[#070B1E]">{s.title}</h3>
                <p className="mt-2 font-sans text-[14px] leading-[1.65] text-slate-600">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative border-t border-white/10 bg-[#020926] py-20">
        <div className="mx-auto flex max-w-[1100px] flex-col items-start gap-6 px-4 sm:px-6 sm:gap-8 md:flex-row md:items-center md:justify-between md:px-14">
          <div>
            <p className="font-sans text-[clamp(24px,3vw,40px)] font-extrabold tracking-tight">
              Ready to map your path?
            </p>
            <p className="mt-2 font-sans text-[15px] text-slate-400">
              We’ll show you exactly where step 01 starts for your offer.
            </p>
          </div>
          <Magnetic>
            <a href="/book" className="btn-gold">
              Book a strategy call
            </a>
          </Magnetic>
        </div>
      </section>
    </div>
  );
}
