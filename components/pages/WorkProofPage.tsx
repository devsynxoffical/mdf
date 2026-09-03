"use client";

import Link from "next/link";
import ContourBG from "@/components/uf/ContourBG";
import Magnetic from "@/components/uf/Magnetic";
import UFQuestions from "@/components/uf/UFQuestions";
import ProofExpandList from "@/components/workproof/ProofExpandList";
import { WORK_PROOF_DETAILED } from "@/lib/workproof";

const HIGHLIGHTS = [
  { value: "$3.75", label: "Cost per lead", sub: "Local services · Meta" },
  { value: "$111K", label: "Won in 31 days", sub: "Home services · CRM" },
  { value: "10,172", label: "Leads generated", sub: "Mortgage · Scale" },
  { value: "$8.06", label: "Average CPL", sub: "High-volume run" },
];

export default function WorkProofPage() {
  return (
    <>
      {/* Hero — dark to match expandable proof structure */}
      <section className="uf-dark relative overflow-hidden bg-[#020926] pb-10 pt-[22vh] text-white sm:pb-12">
        <ContourBG tone="dark" />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_25%_0%,rgba(18,84,236,0.18),transparent_50%)]"
        />

        <div className="relative z-10 mx-auto max-w-[1180px] px-4 sm:px-6 md:px-10 lg:px-14">
          <p className="uf-eyebrow tracking-[0.18em] text-sky">
            ( Work Proof ) — Live receipts
          </p>
          <h1 className="mt-6 max-w-[14ch] sm:max-w-[16ch]">
            <span className="block font-sans text-[clamp(36px,5.5vw,64px)] font-extrabold leading-[1.08] tracking-[-0.03em] text-white">
              Results you can
            </span>
            <span className="mt-1 block font-sans text-[clamp(36px,5.5vw,64px)] font-extrabold leading-[1.08] tracking-[-0.03em] text-sky">
              audit.
            </span>
          </h1>
          <p className="mt-6 max-w-[50ch] font-sans text-[16px] leading-[1.65] text-slate-400 sm:text-[17px]">
            Hover any row to expand the full story — metric, stack, market, and live Meta /
            CRM receipts. Filter by channel. Tap a screenshot to enlarge.
          </p>

          <div className="mt-12 grid grid-cols-2 gap-y-8 border-y border-white/10 py-8 sm:grid-cols-4 sm:gap-0 sm:divide-x sm:divide-white/10">
            {HIGHLIGHTS.map((h) => (
              <div key={h.label} className="sm:px-6 first:sm:pl-0 last:sm:pr-0">
                <p className="font-serif text-[clamp(28px,3.5vw,40px)] italic leading-none tracking-tight text-white">
                  {h.value}
                </p>
                <p className="mt-3 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-sky">
                  {h.label}
                </p>
                <p className="mt-1 font-sans text-[13px] text-slate-500">{h.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Full expandable ledger */}
      <section className="uf-dark relative overflow-hidden bg-[#020926] pb-16 text-white sm:pb-20">
        <div className="relative mx-auto max-w-[1180px] px-4 sm:px-6 md:px-10 lg:px-14">
          <ProofExpandList items={WORK_PROOF_DETAILED} showFilters />
        </div>
      </section>

      {/* FAQ — same layout as homepage */}
      <UFQuestions />

      {/* CTA */}
      <section className="border-t border-white/10 bg-[#04103A] py-16 text-white sm:py-20">
        <div className="mx-auto max-w-[640px] px-4 text-center sm:px-6">
          <p className="uf-eyebrow justify-center text-sky">Next step</p>
          <h2 className="mt-4 font-sans text-[clamp(28px,4vw,40px)] font-extrabold tracking-[-0.03em]">
            Want results like these?
          </h2>
          <p className="mt-4 font-sans text-[16px] leading-relaxed text-slate-400">
            Book a strategy call — we&apos;ll review your offer, funnel, and whether Million
            Dollar Funnel™ fits.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Magnetic strength={0.16}>
              <Link href="/book" className="uf-pill">
                Book a strategy call
              </Link>
            </Magnetic>
            <Link
              href="/#proof"
              className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500 transition hover:text-sky"
            >
              ← Back to homepage
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
