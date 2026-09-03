"use client";

import Link from "next/link";
import ContourBG from "@/components/uf/ContourBG";
import Reveal from "@/components/uf/Reveal";
import Magnetic from "@/components/uf/Magnetic";
import FunnelDetailCard from "@/components/funnels/FunnelDetailCard";
import { FUNNEL_DESIGNS } from "@/lib/funnels";

export default function FunnelsPage() {
  return (
    <>
      {/* Hero */}
      <section className="uf-light relative overflow-hidden bg-gradient-to-b from-[#EBF2FC] via-[#F5F8FD] to-[#F5F7FB] pb-16 pt-[22vh] text-[#070B1E] sm:pb-20">
        <ContourBG tone="light" />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_0%,rgba(18,84,236,0.12),transparent_50%)]"
        />

        <div className="relative mx-auto max-w-[1100px] px-4 sm:px-6 md:px-10 lg:px-14">
          <p className="uf-eyebrow tracking-[0.18em] text-cobalt">( Funnels ) — Proven designs</p>
          <h1 className="mt-6 max-w-[18ch]">
            <Reveal as="span">
              <span className="block font-sans text-[clamp(36px,5.5vw,64px)] font-extrabold leading-[1.04] tracking-[-0.03em] text-[#070B1E]">
                The results we bring
              </span>
            </Reveal>
            <Reveal as="span" delay={90}>
              <span className="mt-1 block font-sans text-[clamp(36px,5.5vw,64px)] font-extrabold leading-[1.04] tracking-[-0.03em] text-cobalt">
                are proven through our funnel designs.
              </span>
            </Reveal>
          </h1>
          <p className="mt-6 max-w-[48ch] font-sans text-[16px] leading-[1.65] text-slate-600 sm:text-[17px]">
            Eight live client architectures — hover any screen to scroll the full build,
            or click to inspect every page in high definition.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4 border-t border-[#070B1E]/10 pt-8">
            <div>
              <p className="font-serif text-[clamp(32px,4vw,44px)] italic leading-none text-[#070B1E]">
                {FUNNEL_DESIGNS.length}
              </p>
              <p className="mt-2 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-cobalt">
                Full funnel builds
              </p>
            </div>
            <div className="hidden h-12 w-px bg-[#070B1E]/10 sm:block" />
            <p className="max-w-[36ch] font-sans text-[14px] leading-relaxed text-slate-500">
              Mortgage, security, insurance, B2B, lead gen, events, and the Million Dollar Funnel™
              core — each mapped from ad click to booked call.
            </p>
          </div>
        </div>
      </section>

      {/* Index rail */}
      <section className="sticky top-[72px] z-20 border-b border-[#070B1E]/10 bg-[#F5F7FB]/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1100px] gap-1 overflow-x-auto px-4 py-3 sm:px-6 md:px-10 lg:px-14">
          {FUNNEL_DESIGNS.map((f) => (
            <a
              key={f.id}
              href={`#${f.id}`}
              className="shrink-0 rounded-full border border-transparent px-3 py-1.5 font-mono text-[10px] font-semibold uppercase tracking-[0.1em] text-slate-500 transition hover:border-cobalt/20 hover:bg-white hover:text-cobalt"
            >
              {f.num} · {f.name.split(" ")[0]}
            </a>
          ))}
        </div>
      </section>

      {/* All funnels */}
      <section className="relative bg-[#F5F7FB] pb-[14vh] pt-12 sm:pt-16">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_20%,rgba(56,189,248,0.06),transparent_45%)]"
        />
        <div className="relative mx-auto max-w-[1100px] space-y-10 px-4 sm:space-y-12 sm:px-6 md:px-10 lg:px-14">
          {FUNNEL_DESIGNS.map((funnel, i) => (
            <FunnelDetailCard key={funnel.id} funnel={funnel} index={i} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-[#070B1E]/10 bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-[640px] px-4 text-center sm:px-6">
          <p className="uf-eyebrow justify-center text-cobalt">Next step</p>
          <h2 className="mt-4 font-sans text-[clamp(28px,4vw,40px)] font-extrabold tracking-[-0.03em] text-[#070B1E]">
            Want a funnel built like these?
          </h2>
          <p className="mt-4 font-sans text-[16px] leading-relaxed text-slate-600">
            Book a strategy call — we&apos;ll map your offer, path, and whether Million Dollar
            Funnel™ is the right fit.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Magnetic strength={0.16}>
              <Link href="/book" className="uf-pill">
                Book a strategy call
              </Link>
            </Magnetic>
            <Link
              href="/#funnels"
              className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500 transition hover:text-cobalt"
            >
              ← Back to homepage
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
