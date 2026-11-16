import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { CASE_STUDIES } from "@/lib/cases";
import MDFCaseStudiesHub from "@/components/cases/MDFCaseStudiesHub";
import UFFooter from "@/components/uf/UFFooter";

export const metadata: Metadata = pageMetadata({
  path: "/cases",
  title: "Funnel Case Studies: Lead Gen & eCommerce Results | MDF™",
  description:
    "Case studies from Million Dollar Funnel™ client installs, including $1.52M generated in 19 months and 13,630 low-ticket sales at 3.32 ROAS for a coaching offer.",
});

export default function CasesPage() {
  return (
    <main className="min-h-screen bg-[#050508] text-white pt-16">
      <MDFCaseStudiesHub standalone />

      {/* Full case-study breakdowns */}
      <section className="mx-auto max-w-[1100px] px-4 pb-24 sm:px-6 md:px-14">
        <p className="uf-eyebrow text-sky">( Breakdowns ) — Full case studies</p>
        <h2 className="mt-4 font-sans text-[clamp(26px,3.4vw,40px)] font-extrabold tracking-tight">
          How the results were built
        </h2>
        <p className="mt-4 max-w-[62ch] font-sans text-[15.5px] leading-[1.75] text-slate-400">
          Each breakdown walks through the starting point, the funnel and follow-up we installed, and the numbers that
          followed — so you can see exactly what changed, not just the headline figure.
        </p>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {CASE_STUDIES.map((c) => (
            <Link
              key={c.slug}
              href={`/cases/${c.slug}`}
              className="group block rounded-[24px] border border-white/10 bg-gradient-to-br from-[#0B1A45] to-[#050B1E] p-7 transition hover:border-sky/40"
            >
              <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-sky">{c.niche}</span>
              <span className="mt-3 block font-sans text-[21px] font-bold leading-snug text-white">{c.title}</span>
              <span className="mt-3 block font-sans text-[14.5px] leading-relaxed text-slate-400">{c.summary}</span>
              <span className="mt-5 flex flex-wrap gap-2">
                {c.metrics.slice(0, 3).map((m) => (
                  <span key={m.label} className="rounded-full border border-white/10 px-3 py-1 font-sans text-[12px] text-slate-300">
                    <b className="text-white">{m.value}</b> {m.label}
                  </span>
                ))}
              </span>
              <span className="mt-5 block font-mono text-[11px] uppercase tracking-[0.12em] text-sky group-hover:text-white">
                Read the breakdown ↗
              </span>
            </Link>
          ))}
        </div>
        <p className="mt-8 font-sans text-[14.5px] text-slate-400">
          Want the raw numbers? See the{" "}
          <Link href="/work-proof" className="text-sky underline">
            verified ad-account and CRM receipts
          </Link>{" "}
          or the{" "}
          <Link href="/services" className="text-sky underline">
            services behind these results
          </Link>
          .
        </p>
      </section>
      <UFFooter />
    </main>
  );
}
