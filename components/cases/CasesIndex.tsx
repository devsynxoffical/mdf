"use client";

import ContourBG from "@/components/uf/ContourBG";
import Reveal from "@/components/uf/Reveal";
import ResultsLogos from "@/components/uf/ResultsLogos";
import { CASE_STUDIES } from "@/lib/cases";

export default function CasesIndex() {
  return (
    <section className="uf-dark relative min-h-screen overflow-hidden pb-[14vh] pt-[22vh]">
      <ContourBG tone="dark" />

      <div className="relative mx-auto max-w-[1180px] px-6 md:px-14">
        <p className="uf-eyebrow text-sky">( Cases ) — Real funnels. Real numbers.</p>
        <h1 className="mt-6 max-w-[14ch] font-sans text-[clamp(40px,6vw,84px)] font-extrabold leading-[1.02] tracking-tight text-white">
          <Reveal as="span">
            <span className="block">Proof You</span>
          </Reveal>
          <Reveal as="span" delay={110}>
            <span className="block text-sky">Can Scale.</span>
          </Reveal>
        </h1>
        <p className="mt-6 max-w-[42ch] font-sans text-[16px] leading-[1.65] text-slate-400">
          Deep dives into Million Dollar Funnel™ builds — the problems, the rebuild, and the
          revenue that followed.
        </p>

        <div className="mt-16 space-y-6">
          {CASE_STUDIES.map((study, i) => (
            <a
              key={study.slug}
              href={`/cases/${study.slug}`}
              className="group block overflow-hidden rounded-[28px] border border-white/12 bg-gradient-to-br from-[#0A1A4A] to-[#04103A] transition duration-300 hover:border-sky/40 hover:shadow-[0_30px_80px_rgba(18,84,236,0.25)]"
            >
              <div className="grid lg:grid-cols-[1.15fr_0.85fr]">
                <div className="p-8 md:p-12">
                  <p className="font-sans text-[11px] font-bold uppercase tracking-[0.16em] text-sky">
                    Case 0{i + 1} · {study.niche}
                  </p>
                  <h2 className="mt-4 max-w-[20ch] font-sans text-[clamp(24px,3vw,36px)] font-extrabold leading-[1.15] tracking-tight text-white transition-colors group-hover:text-sky">
                    {study.title}
                  </h2>
                  <p className="mt-4 max-w-[48ch] font-sans text-[15px] leading-[1.6] text-slate-300">
                    {study.summary}
                  </p>
                  <span className="mt-8 inline-flex items-center gap-2 font-sans text-[12px] font-bold uppercase tracking-[0.16em] text-white">
                    Watch VSL + full breakdown
                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </span>
                </div>

                <div className="relative min-h-[200px] overflow-hidden border-t border-white/10 bg-black/40 lg:min-h-full lg:border-l lg:border-t-0">
                  <video
                    src={study.videoUrl}
                    className="absolute inset-0 h-full w-full object-cover opacity-70 transition duration-500 group-hover:scale-105 group-hover:opacity-90"
                    muted
                    playsInline
                    preload="metadata"
                    loop
                    autoPlay
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#04103A] via-transparent to-transparent" />
                  <div className="relative z-10 flex h-full flex-col justify-end gap-5 p-8 sm:flex-row sm:items-end lg:flex-col lg:items-stretch lg:p-10">
                    {study.metrics.map((m) => (
                      <div key={m.label} className="sm:flex-1">
                        <p className="font-serif text-[clamp(28px,3vw,40px)] italic leading-none text-white drop-shadow">
                          {m.value}
                        </p>
                        <p className="mt-2 font-sans text-[11px] font-semibold uppercase tracking-[0.14em] text-sky">
                          {m.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>

        <div className="mt-24">
          <ResultsLogos tone="dark" logosOnly />
        </div>
      </div>
    </section>
  );
}
