import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import JsonLd from "@/components/seo/JsonLd";
import UFFooter from "@/components/uf/UFFooter";
import ContourBG from "@/components/uf/ContourBG";
import LeadForm from "@/components/leads/LeadForm";
import LeadCalculator from "@/components/leads/LeadCalculator";
import ProcessTabs from "@/components/leads/ProcessTabs";
import ReceiptGallery from "@/components/leads/ReceiptGallery";
import { Band, CompareTable, ProblemCards, Showcase, StickyLeadBar } from "@/components/leads/IndustryBlocks";
import { ContentFaq, LinkCards } from "@/components/content/ContentShell";
import { INDUSTRIES, getIndustry } from "@/lib/industries";
import { pageCard } from "@/lib/pageCards";
import { SITE_URL, absoluteUrl, breadcrumbJsonLd, faqJsonLd, pageMetadata } from "@/lib/seo";

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return INDUSTRIES.map((i) => ({ slug: i.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const ind = getIndustry(params.slug);
  if (!ind) return {};
  return pageMetadata({ path: `/lead-generation/${ind.slug}`, title: ind.metaTitle, description: ind.metaDescription });
}

export default function IndustryPage({ params }: Props) {
  const ind = getIndustry(params.slug);
  if (!ind) notFound();
  const path = `/lead-generation/${ind.slug}`;
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Lead Generation", path: "/lead-generation" },
    { name: ind.name, path },
  ];
  const others = INDUSTRIES.filter((o) => o.slug !== ind.slug).map((o) => `/lead-generation/${o.slug}`);
  const related = Array.from(new Set([...ind.related, ...others])).slice(0, 6);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: `${ind.name} lead generation`,
          serviceType: ind.keyword,
          description: ind.metaDescription,
          url: absoluteUrl(path),
          provider: { "@id": `${SITE_URL}/#organization` },
          areaServed: ["United States", "United Kingdom", "Canada", "Australia"],
        }}
      />
      <JsonLd data={faqJsonLd(ind.faq)} />
      <JsonLd data={breadcrumbJsonLd(crumbs)} />

      <div className="bg-[#020926] text-white">
        {/* Hero with the lead form above the fold */}
        <header className="relative overflow-hidden border-b border-white/10 pb-14 pt-28 md:pb-20 md:pt-36">
          <ContourBG tone="dark" />
          <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_10%_0%,rgba(18,84,236,0.32),transparent_55%),radial-gradient(ellipse_at_95%_90%,rgba(56,189,248,0.14),transparent_50%)]" />
          <div className="ind-wrap relative grid items-start gap-12 lg:grid-cols-[minmax(0,1fr)_440px] lg:gap-14">
            <div>
              <nav aria-label="Breadcrumb" className="mb-7 font-mono text-[11px] uppercase tracking-[0.14em] text-slate-500">
                <ol className="flex flex-wrap items-center gap-2">
                  <li>
                    <Link href="/" className="hover:text-sky">Home</Link>
                  </li>
                  <li className="text-slate-600">/</li>
                  <li>
                    <Link href="/lead-generation" className="hover:text-sky">Lead Generation</Link>
                  </li>
                  <li className="text-slate-600">/</li>
                  <li className="text-slate-400" aria-current="page">{ind.name}</li>
                </ol>
              </nav>
              <p className="uf-eyebrow text-sky">{ind.eyebrow}</p>
              <h1 className="mt-5 font-sans text-[clamp(34px,4.6vw,60px)] font-extrabold leading-[1.05] tracking-[-0.035em]">{ind.h1}</h1>
              <p className="mt-6 max-w-[620px] font-sans text-[17px] leading-[1.7] text-slate-300 md:text-[18.5px]">{ind.intro}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#proof" className="mdf-ghost-btn">See the receipts ↓</a>
                <a href="#calculator" className="mdf-ghost-btn">Estimate your pipeline ↓</a>
              </div>
              <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-4">
                {ind.stats.map((s) => (
                  <div key={s.label} className="bg-[#050f30] p-4">
                    <dt className="sr-only">{s.label}</dt>
                    <dd className="font-sans text-[22px] font-extrabold tracking-tight text-white">{s.value}</dd>
                    <dd className="mt-1 font-mono text-[10px] uppercase leading-snug tracking-[0.1em] text-slate-400">{s.label}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <LeadForm source={path} industry={ind.name} heading={`Get your free ${ind.name.toLowerCase()} lead plan`} />
          </div>
        </header>

        <Band id="proof" eyebrow="Verified receipts" title={`Real ${ind.name.toLowerCase()} results from client accounts`} intro={ind.receiptsIntro}>
          <ReceiptGallery receipts={ind.receipts} />
        </Band>

        <Band id="problems" tone="b" eyebrow="Why it usually fails" title={`Why most ${ind.keyword} disappoints`}>
          <ProblemCards items={ind.problems} />
        </Band>

        <Band id="system" eyebrow="The system" title={`How we build your ${ind.name.toLowerCase()} lead machine`} intro="Four parts, built and run as one system. Click through each step.">
          <ProcessTabs steps={ind.steps} />
        </Band>

        <Band id="funnel" tone="b" eyebrow="Built by us" title="What your funnel looks like">
          <Showcase {...ind.showcase} />
        </Band>

        <Band id="calculator" eyebrow="Interactive" title="Estimate your monthly pipeline" intro="Move the sliders to match your business. Every result is calculated from your inputs.">
          <LeadCalculator {...ind.calculator} />
        </Band>

        {ind.comparison && (
          <Band id="compare" tone="b" eyebrow="Compare" title={ind.comparison.heading} intro={ind.comparison.intro}>
            <CompareTable columns={ind.comparison.columns} rows={ind.comparison.rows} />
          </Band>
        )}

        <Band id="faq-band" eyebrow="FAQ" title={`${ind.name} lead generation questions`}>
          <div className="content-prose max-w-[880px]">
            <ContentFaq items={ind.faq} id="faq" bare />
          </div>
        </Band>

        <Band id="related-band" tone="b" eyebrow="Keep exploring" title="Related services, industries and proof">
          <div className="content-prose">
            <LinkCards items={related.map((h) => pageCard(h))} />
          </div>
        </Band>

        <section className="ind-band ind-band-a" aria-labelledby="final-h">
          <div className="ind-wrap grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_440px]">
            <div>
              <p className="uf-eyebrow text-sky">Next step</p>
              <h2 id="final-h" className="ind-h2">Want this running for your {ind.name.toLowerCase()} business?</h2>
              <p className="ind-intro">
                Send us a few details. We will reply with the offer, funnel and follow-up we would build, and a realistic cost-per-lead range for your market.
              </p>
              <p className="mt-5 font-sans text-[14.5px] text-slate-400">
                Prefer a call? <Link href="/book" className="rt-link">Book a 15–20 minute strategy session</Link>.
              </p>
            </div>
            <LeadForm id="lead-bottom" source={`${path}#bottom`} industry={ind.name} heading="Get your free lead plan" compact />
          </div>
        </section>
      </div>
      <StickyLeadBar />
      <UFFooter />
    </>
  );
}
