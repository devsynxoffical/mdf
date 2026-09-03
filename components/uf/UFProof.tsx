"use client";

import Link from "next/link";
import ContourBG from "./ContourBG";
import Reveal from "./Reveal";
import Magnetic from "./Magnetic";
import ProofExpandList from "@/components/workproof/ProofExpandList";
import {
  getWorkProofFeatured,
  WORK_PROOF_DETAILED,
} from "@/lib/workproof";

/**
 * ( 04 ) Client results — expandable colored rows (homepage preview).
 * Full detailed ledger lives on /work-proof.
 */
export default function UFProof() {
  const featured = getWorkProofFeatured();

  return (
    <section
      id="proof"
      className="uf-dark relative overflow-hidden bg-[#020926] py-[12vh] text-white"
    >
      <ContourBG tone="dark" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_0%,rgba(18,84,236,0.14),transparent_50%)]"
      />

      <div className="relative mx-auto max-w-[1180px] px-4 sm:px-6 md:px-10 lg:px-14">
        <div className="max-w-[720px]">
          <p className="uf-eyebrow tracking-[0.18em] text-sky">( 04 ) — Client Results</p>
          <h2 className="mt-4">
            <Reveal as="span">
              <span className="block font-sans text-[clamp(34px,5.2vw,56px)] font-extrabold leading-[1.05] tracking-[-0.03em] text-white">
                Numbers from funnels
              </span>
            </Reveal>
            <Reveal as="span" delay={90}>
              <span className="mt-1 block font-sans text-[clamp(34px,5.2vw,56px)] font-extrabold leading-[1.05] tracking-[-0.03em] text-sky">
                that actually run.
              </span>
            </Reveal>
          </h2>
          <p className="mt-5 max-w-[48ch] font-sans text-[16px] leading-[1.65] text-slate-400 sm:text-[17px]">
            Mortgage, home services, direct response, and high-ticket — live Meta and CRM
            receipts from Million Dollar Funnel™ installs we built and still optimize.
          </p>
        </div>

        <div className="mt-16 sm:mt-20">
          <ProofExpandList
            items={featured}
            expandLink={{ href: "/work-proof", label: "View all proof" }}
          />
        </div>

        <div className="mt-14 flex flex-col items-center gap-4 border-t border-white/10 pt-12 sm:mt-16">
          <p className="max-w-[42ch] text-center font-sans text-[15px] leading-relaxed text-slate-400">
            Six highlights — {WORK_PROOF_DETAILED.length} live receipts in the full ledger.
          </p>
          <Magnetic strength={0.14}>
            <Link
              href="/work-proof"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-7 py-3.5 font-sans text-[12px] font-bold uppercase tracking-[0.12em] text-white backdrop-blur-sm transition hover:border-sky/40 hover:bg-white/10 sm:px-9 sm:text-[13px]"
            >
              View all work proof
              <span aria-hidden>→</span>
            </Link>
          </Magnetic>
        </div>
      </div>
    </section>
  );
}
