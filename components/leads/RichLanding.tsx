import Link from "next/link";
import JsonLd from "@/components/seo/JsonLd";
import UFFooter from "@/components/uf/UFFooter";
import ContourBG from "@/components/uf/ContourBG";
import LeadForm from "@/components/leads/LeadForm";
import LeadCalculator from "@/components/leads/LeadCalculator";
import ProcessTabs from "@/components/leads/ProcessTabs";
import ReceiptGallery from "@/components/leads/ReceiptGallery";
import { Band, CompareTable, ProblemCards, Showcase, StickyLeadBar } from "@/components/leads/IndustryBlocks";
import { ContentFaq, LinkCards } from "@/components/content/ContentShell";
import type { Landing } from "@/lib/industries";
import { pageCard } from "@/lib/pageCards";
import { SITE_URL, absoluteUrl, breadcrumbJsonLd, faqJsonLd } from "@/lib/seo";

/**
 * Rich landing page: lead form above the fold, receipts, problems, interactive
 * process, funnel preview, calculator, comparison, FAQ, related links, closing form.
 */
export default function RichLanding({
  d,
  path,
  parent,
  related,
  serviceName,
  formHeading,
}: {
  d: Landing;
  path: string;
  parent: { name: string; path: string };
  related: string[];
  serviceName: string;
  formHeading: string;
}) {
  const crumbs = [{ name: "Home", path: "/" }, parent, { name: d.name, path }];
  const label = serviceName.toLowerCase();
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: serviceName,
          serviceType: d.keyword,
          description: d.metaDescription,
          url: absoluteUrl(path),
          provider: { "@id": `${SITE_URL}/#organization` },
          areaServed: ["United States", "United Kingdom", "Canada", "Australia"],
        }}
      />
      <JsonLd data={faqJsonLd(d.faq)} />
      <JsonLd data={breadcrumbJsonLd(crumbs)} />

      <div className="bg-[#020926] text-white">
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
                    <Link href={parent.path} className="hover:text-sky">{parent.name}</Link>
                  </li>
                  <li className="text-slate-600">/</li>
                  <li className="text-slate-400" aria-current="page">{d.name}</li>
                </ol>
              </nav>
              <p className="uf-eyebrow text-sky">{d.eyebrow}</p>
              <h1 className="mt-5 font-sans text-[clamp(34px,4.6vw,60px)] font-extrabold leading-[1.05] tracking-[-0.035em]">{d.h1}</h1>
              <p className="mt-6 max-w-[620px] font-sans text-[17px] leading-[1.7] text-slate-300 md:text-[18.5px]">{d.intro}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                {d.receipts && d.receipts.length > 0 && <a href="#proof" className="mdf-ghost-btn">See the receipts ↓</a>}
                <a href="#system" className="mdf-ghost-btn">How it works ↓</a>
              </div>
              <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-4">
                {d.stats.map((s) => (
                  <div key={s.label} className="bg-[#050f30] p-4">
                    <dt className="sr-only">{s.label}</dt>
                    <dd className="font-sans text-[22px] font-extrabold tracking-tight text-white">{s.value}</dd>
                    <dd className="mt-1 font-mono text-[10px] uppercase leading-snug tracking-[0.1em] text-slate-400">{s.label}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <LeadForm source={path} industry={d.name} heading={formHeading} />
          </div>
        </header>

        {d.receipts && d.receipts.length > 0 && (
          <Band id="proof" eyebrow="Verified receipts" title={`Real results from client accounts`} intro={d.receiptsIntro}>
            <ReceiptGallery receipts={d.receipts} />
          </Band>
        )}

        {d.caseResult && (
          <section className="ind-band ind-band-a" aria-labelledby="case-h">
            <div className="ind-wrap">
              <div className="case-result">
                <div>
                  <p className="uf-eyebrow text-sky">{d.caseResult.eyebrow}</p>
                  <h2 id="case-h" className="ind-h2 !mt-3">{d.caseResult.title}</h2>
                  <p className="ind-intro">{d.caseResult.body}</p>
                  <div className="mt-7 flex flex-wrap gap-3">
                    <a href="#lead" className="mdf-cta-btn">Get results like this <span aria-hidden>→</span></a>
                    <Link href={d.caseResult.href} className="mdf-ghost-btn">{d.caseResult.linkLabel} ↗</Link>
                  </div>
                </div>
                <dl className="case-metrics">
                  {d.caseResult.metrics.map((m) => (
                    <div key={m.label}>
                      <dt className="sr-only">{m.label}</dt>
                      <dd className="case-metric-value">{m.value}</dd>
                      <dd className="case-metric-label">{m.label}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </section>
        )}

        <Band id="problems" tone="b" eyebrow="Why it usually fails" title={d.problemsTitle ?? `Why most ${d.keyword} disappoints`}>
          <ProblemCards items={d.problems} />
        </Band>

        <Band id="system" eyebrow="The system" title={`How we deliver ${label}`} intro="Built and run as one system. Click through each step.">
          <ProcessTabs steps={d.steps} />
        </Band>

        {d.showcase && (
          <Band id="funnel" tone="b" eyebrow="Built by us" title="What it looks like">
            <Showcase {...d.showcase} />
          </Band>
        )}

        <Band id="calculator" eyebrow="Interactive" title="Estimate your monthly pipeline" intro="Move the sliders to match your business. Every result is calculated from your inputs.">
          <LeadCalculator {...d.calculator} />
        </Band>

        {d.comparison && (
          <Band id="compare" tone="b" eyebrow="Compare" title={d.comparison.heading} intro={d.comparison.intro}>
            <CompareTable columns={d.comparison.columns} rows={d.comparison.rows} />
          </Band>
        )}

        <Band id="faq-band" eyebrow="FAQ" title={`${serviceName} questions`}>
          <div className="content-prose max-w-[880px]">
            <ContentFaq items={d.faq} id="faq" bare />
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
              <h2 id="final-h" className="ind-h2">Want {label} running for your business?</h2>
              <p className="ind-intro">
                Send us a few details. We will reply with what we would build, how long it takes and a realistic cost range for your market.
              </p>
              <p className="mt-5 font-sans text-[14.5px] text-slate-400">
                Prefer a call? <Link href="/book" className="rt-link">Book a 15–20 minute strategy session</Link>.
              </p>
            </div>
            <LeadForm id="lead-bottom" source={`${path}#bottom`} industry={d.name} heading="Get your free plan" compact />
          </div>
        </section>
      </div>
      <StickyLeadBar label="Get my free plan" />
      <UFFooter />
    </>
  );
}
