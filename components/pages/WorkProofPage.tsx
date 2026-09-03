import Link from "next/link";
import Magnetic from "@/components/uf/Magnetic";
import UFWorkProofGrid from "@/components/uf/UFWorkProofGrid";
import UFLeaks from "@/components/uf/UFLeaks";
import UFProof from "@/components/uf/UFProof";
import UFOpinions from "@/components/uf/UFOpinions";
import UFQuestions from "@/components/uf/UFQuestions";
import { WORK_PROOF } from "@/lib/workproof";
import { ROUTES } from "@/lib/routes";

/**
 * Work Proof — receipts grid, then Funnel Systems / System / Second Opinions.
 */
export default function WorkProofPage() {
  return (
    <>
      <section className="uf-dark relative overflow-hidden border-b border-white/10 bg-black pb-10 pt-[22vh] text-white sm:pb-12">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_0%,rgba(18,84,236,0.22),transparent_55%)]"
        />

        <div className="relative z-10 mx-auto max-w-[1180px] px-4 sm:px-6 md:px-10 lg:px-14">
          <p className="uf-eyebrow tracking-[0.18em] text-sky">
            ( Work Proof ) — Live receipts
          </p>
          <h1 className="mt-6 font-sans text-[clamp(36px,5.5vw,64px)] font-extrabold leading-[1.08] tracking-[-0.03em] text-white">
            <span className="block">Results you can</span>
            <span className="block text-sky">audit.</span>
          </h1>
          <p className="mt-6 max-w-[52ch] font-sans text-[16px] leading-[1.7] text-white/60 sm:text-[17px]">
            {WORK_PROOF.length} client screenshots — Meta Ads, CRM dashboards, and scale
            runs. Browse a set, then tap See more for the rest.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href="#results"
              className="inline-flex h-11 items-center bg-white px-5 font-sans text-[13px] font-bold text-[#020926] transition hover:bg-sky"
            >
              View receipts
            </a>
            <a
              href="#funnels"
              className="inline-flex h-11 items-center border border-white/25 px-5 font-sans text-[13px] font-bold text-white transition hover:border-sky hover:text-sky"
            >
              Funnel Systems
            </a>
            <Link
              href={ROUTES.book}
              className="inline-flex h-11 items-center border border-white/25 px-5 font-sans text-[13px] font-bold text-white transition hover:border-sky hover:text-sky"
            >
              Book a call
            </Link>
          </div>
        </div>
      </section>

      <UFWorkProofGrid
        items={WORK_PROOF}
        showFilters
        hideAllLink
        compactHeader
        initialCount={8}
        pageSize={8}
        eyebrow={`( Work Proof ) — ${WORK_PROOF.length} receipts`}
      />

      <UFLeaks />
      <UFProof />
      <UFOpinions />
      <UFQuestions />

      <section className="border-t border-white/10 bg-[#020926] py-16 text-white sm:py-20">
        <div className="mx-auto max-w-[640px] px-4 text-center sm:px-6">
          <p className="uf-eyebrow justify-center text-sky">Next step</p>
          <h2 className="mt-4 font-sans text-[clamp(28px,4vw,40px)] font-extrabold tracking-[-0.03em]">
            Want results like these?
          </h2>
          <p className="mt-4 font-sans text-[16px] leading-relaxed text-white/55">
            Book a strategy call — we&apos;ll review your offer, funnel, and whether Million
            Dollar Funnel™ fits.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Magnetic strength={0.16}>
              <Link href={ROUTES.book} className="uf-pill">
                Book a strategy call
              </Link>
            </Magnetic>
            <Link
              href={ROUTES.home}
              className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-white/40 transition hover:text-sky"
            >
              ← Back to homepage
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
