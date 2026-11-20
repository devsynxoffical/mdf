import Link from "next/link";
import UFFooter from "@/components/uf/UFFooter";
import ContourBG from "@/components/uf/ContourBG";
import type { Industry } from "@/lib/industries";

/** Short handover page for keywords owned by a sister site (noindexed). */
export default function PartnerTeaser({ ind }: { ind: Industry }) {
  const p = ind.partner!;
  return (
    <>
      <div className="bg-[#020926] text-white">
        <section className="relative overflow-hidden pb-24 pt-32 md:pt-40">
          <ContourBG tone="dark" />
          <div className="ind-wrap relative">
            <p className="uf-eyebrow text-sky">{ind.name} lead generation</p>
            <h1 className="mt-5 max-w-[820px] font-sans text-[clamp(32px,4.4vw,54px)] font-extrabold leading-[1.08] tracking-[-0.03em]">
              {ind.name} leads are handled by our sister brand, {p.site}
            </h1>
            <p className="mt-6 max-w-[640px] font-sans text-[17px] leading-[1.7] text-slate-300">{p.blurb}</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a href={p.url} className="mdf-cta-btn" rel="noopener">
                Visit {p.site} <span aria-hidden>↗</span>
              </a>
              <Link href="/lead-generation" className="mdf-ghost-btn">
                See the industries we serve
              </Link>
            </div>
          </div>
        </section>
      </div>
      <UFFooter />
    </>
  );
}
