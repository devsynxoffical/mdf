import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import JsonLd from "@/components/seo/JsonLd";
import UFFooter from "@/components/uf/UFFooter";
import ContourBG from "@/components/uf/ContourBG";
import LeadForm from "@/components/leads/LeadForm";
import LeadCalculator from "@/components/leads/LeadCalculator";
import { Band, ProblemCards, StickyLeadBar } from "@/components/leads/IndustryBlocks";
import ProcessTabs from "@/components/leads/ProcessTabs";
import { ContentFaq } from "@/components/content/ContentShell";
import { ACTIVE_INDUSTRIES as INDUSTRIES } from "@/lib/industries";
import { CPL_SUMMARY, usd } from "@/lib/benchmarks";
import { SITE_URL, absoluteUrl, breadcrumbJsonLd, faqJsonLd, pageMetadata } from "@/lib/seo";

const PATH = "/lead-generation";

export const metadata: Metadata = pageMetadata({
  path: PATH,
  title: "Lead Generation Funnels Built for Your Industry",
  description:
    "Lead generation funnels built for your industry, from ad to booked call. One funnel brought 10,172 mortgage leads in one month. See how they work.",
});

const MORE = [
  { niche: "Wealth management", figure: "1,308 leads", detail: "28-day total stated on the post, $14.67 per phone-verified lead", src: "/workprof/wp-025.webp" },
  { niche: "Agency webinar", figure: "1,018 sign-ups", detail: "$4.50 per webinar registration on $4,582 ad spend", src: "/workprof/wp-004.webp" },
];

const STEPS = [
  {
    title: "Offer & targeting",
    body: "Every lead generation funnel starts with an offer people in your market actually want, such as a free inspection, a quote, a consultation or a prepaid first visit, shown to the right audience in your service area.",
    points: ["Offer built for your market", "Audience and service-area targeting", "Ad creative and copy tested per angle"],
  },
  {
    title: "Qualifying funnel",
    body: "A short, mobile-first funnel collects the details your team needs, such as job type, budget, timeline and photos, so unqualified enquiries are filtered before they reach you.",
    points: ["Questions you choose", "Disqualification paths", "Instant confirmation page"],
  },
  {
    title: "Instant follow-up",
    body: "New leads get a text and email within seconds, with a booking link. Missed calls get a text back. Reminders reduce no-shows.",
    points: ["Speed-to-lead SMS and email", "Calendar booking", "Reminders and no-show recovery"],
  },
  {
    title: "Pipeline & reporting",
    body: "Every lead lands in a CRM pipeline tied to the ad that produced it, so you can see cost per lead, cost per appointment and revenue per campaign.",
    points: ["CRM pipeline", "Source tracking per campaign", "Weekly numbers you can check yourself"],
  },
];

const OWN = [
  { title: "Your pages and forms", body: "The pages and forms are yours." },
  { title: "Your automations and data", body: "The automations and data are yours." },
  { title: "It keeps running", body: "If you stop working with us, the funnel keeps running in your own accounts." },
];

const FAQ = [
  { q: "What is a lead generation funnel?", a: "It is a series of steps that turns visitors into leads: an ad, a landing page with one offer, a short form and automated follow-up." },
  { q: "How do I create a lead generation funnel?", a: "Choose one offer, build a focused landing page, add a short form, set up instant follow-up and booking, then drive traffic and test." },
  { q: "Is lead generation top of the funnel?", a: "Lead generation spans the top and middle of the funnel. It starts with attracting attention and ends when a visitor becomes a contact you can follow up with." },
  { q: "What makes a good lead funnel?", a: "A clear offer, a fast mobile page, a short form, proof, a strong call to action and follow-up within minutes." },
  { q: "Which industries do lead generation funnels work for?", a: "Mortgage, home services, healthcare, coaching, legal and B2B services all use them, with offers and questions adapted to each industry." },
];

export default function LeadGenerationHub() {
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Lead Generation", path: PATH },
  ];
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Lead generation by industry",
          itemListElement: INDUSTRIES.map((ind, i) => ({ "@type": "ListItem", position: i + 1, url: absoluteUrl(`${PATH}/${ind.slug}`), name: `${ind.name} lead generation` })),
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: "Lead generation",
          serviceType: "Lead generation funnel",
          url: absoluteUrl(PATH),
          provider: { "@id": `${SITE_URL}/#organization` },
        }}
      />
      <JsonLd data={faqJsonLd(FAQ)} />
      <JsonLd data={breadcrumbJsonLd(crumbs)} />

      <div className="bg-[#020926] text-white">
        <header className="relative overflow-hidden border-b border-white/10 pb-14 pt-28 md:pb-20 md:pt-36">
          <ContourBG tone="dark" />
          <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_10%_0%,rgba(18,84,236,0.32),transparent_55%)]" />
          <div className="ind-wrap relative grid items-start gap-12 lg:grid-cols-[minmax(0,1fr)_440px] lg:gap-14">
            <div>
              <nav aria-label="Breadcrumb" className="mb-7 font-mono text-[11px] uppercase tracking-[0.14em] text-slate-500">
                <Link href="/" className="hover:text-sky">Home</Link> <span className="text-slate-600">/</span> <span className="text-slate-400">Lead Generation</span>
              </nav>
              <p className="uf-eyebrow text-sky">Lead generation funnels</p>
              <h1 className="mt-5 font-sans text-[clamp(34px,4.6vw,60px)] font-extrabold leading-[1.05] tracking-[-0.035em]">
                Lead Generation Funnels Built for Your Industry
              </h1>
              <p className="mt-6 max-w-[620px] font-sans text-[17px] leading-[1.7] text-slate-300 md:text-[18.5px]">
                A lead generation funnel is Meta Ads, a qualifying funnel and automated follow-up working as one system, run in your accounts so every lead is exclusive. Pick your industry to see real receipts and how it works.
              </p>
              <dl className="mt-10 grid grid-cols-3 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10">
                <div className="bg-[#050f30] p-4">
                  <dd className="font-sans text-[22px] font-extrabold">{usd(CPL_SUMMARY.median)}</dd>
                  <dd className="mt-1 font-mono text-[10px] uppercase tracking-[0.1em] text-slate-400">Median cost per lead</dd>
                </div>
                <div className="bg-[#050f30] p-4">
                  <dd className="font-sans text-[22px] font-extrabold">40</dd>
                  <dd className="mt-1 font-mono text-[10px] uppercase tracking-[0.1em] text-slate-400">Verified receipts</dd>
                </div>
                <div className="bg-[#050f30] p-4">
                  <dd className="font-sans text-[22px] font-extrabold">100%</dd>
                  <dd className="mt-1 font-mono text-[10px] uppercase tracking-[0.1em] text-slate-400">Exclusive leads</dd>
                </div>
              </dl>
            </div>
            <LeadForm source={PATH} heading="Get your free lead plan" />
          </div>
        </header>

        <section className="ind-band ind-band-b" aria-labelledby="case-h">
          <div className="ind-wrap">
            <div className="case-result">
              <div>
                <p className="uf-eyebrow text-sky">Case result</p>
                <h2 id="case-h" className="ind-h2 !mt-3">10,172 mortgage leads in one month from one lead generation funnel</h2>
                <p className="ind-intro">
                  One offer, one landing page, a short form and instant follow-up brought 10,172 mortgage leads in a single month. The lesson:{" "}
                  <Link href="/services/done-for-you-sales-funnels" className="rt-link">a focused funnel</Link> beats a busy website.
                </p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <a href="#lead" className="mdf-cta-btn">Get results like this <span aria-hidden>→</span></a>
                  <Link href="/lead-generation/mortgage" className="mdf-ghost-btn">See the mortgage system ↗</Link>
                </div>
              </div>
              <dl className="case-metrics">
                {[["10,172", "Leads"], ["$8.06", "Cost per lead"], ["$81,984", "Ad spend"], ["30", "Days"]].map(([v, l]) => (
                  <div key={l}>
                    <dt className="sr-only">{l}</dt>
                    <dd className="case-metric-value">{v}</dd>
                    <dd className="case-metric-label">{l}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        <Band id="industries" eyebrow="Choose your industry" title="Lead generation by industry">
          <p className="ind-intro !mt-0 mb-10">
            <strong className="text-white">How to create a lead generation funnel:</strong> Pick one audience and one offer. Build a{" "}
            <Link href="/services/landing-page-design" className="rt-link">page that explains the offer</Link> in one screen. Ask only the questions you need. Send an instant text and email. Book calls automatically. Then send traffic and improve the step where most people drop off. See how it works for{" "}
            <Link href="/lead-generation/hvac" className="rt-link">HVAC lead generation</Link> and{" "}
            <Link href="/lead-generation/chiropractic" className="rt-link">chiropractic marketing</Link>.
          </p>
          <div className="icards">
            {INDUSTRIES.map((ind) => (
              <Link key={ind.slug} href={`${PATH}/${ind.slug}`} className="icard">
                <span className="icard-img">
                  <Image src={ind.receipts![0].src} alt={ind.hubCard ? `${ind.name} lead generation: home-service receipt` : `${ind.name} lead generation receipt: ${ind.receipts![0].figure}`} fill sizes="(max-width: 768px) 100vw, 560px" className="object-cover object-top" />
                </span>
                <span className="icard-body">
                  <span className="link-card-tag">{ind.name}</span>
                  <span className="icard-title">{ind.name} lead generation</span>
                  <span className="icard-figure">{ind.hubCard?.figure ?? ind.receipts![0].figure}</span>
                  <span className="pcard-body">{ind.hubCard?.detail ?? ind.receipts![0].detail}</span>
                  <span className="link-card-go">See the {ind.name.toLowerCase()} system ↗</span>
                </span>
              </Link>
            ))}
          </div>
        </Band>

        <Band id="how" tone="b" eyebrow="How it works" title="What a lead generation funnel is" intro="A lead generation funnel is the path that turns a stranger into a lead: an ad or search result, a [landing page](/services/landing-page-design) with one offer, a short form, a thank-you step and automated follow-up. Each step is measured and improved.">
          <ProcessTabs steps={STEPS} />
        </Band>

        <Band id="own" eyebrow="Ownership" title="What you own when we build it">
          <ProblemCards items={OWN} />
        </Band>

        <Band id="results" tone="b" eyebrow="Receipts" title="Results by industry, from client accounts" intro="Each row comes from a dated ad-account or CRM screenshot. Open the industry page to inspect the full receipt.">
          <div className="content-table">
            <table>
              <thead>
                <tr>
                  <th scope="col">Industry</th>
                  <th scope="col">Result</th>
                  <th scope="col">Details</th>
                  <th scope="col">Period</th>
                </tr>
              </thead>
              <tbody>
                {INDUSTRIES.flatMap((ind) =>
                  (ind.hubCard ? [] : ind.receipts ?? []).map((r) => (
                    <tr key={r.id}>
                      <th scope="row">
                        <Link href={`${PATH}/${ind.slug}`} className="rt-link">
                          {ind.name}
                        </Link>
                      </th>
                      <td className="text-white">{r.figure}</td>
                      <td>{r.detail}</td>
                      <td className="whitespace-nowrap">{r.period}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </Band>

        <Band id="more" eyebrow="Other industries" title="Also running in these niches" intro="Smaller sets of receipts. Full screenshots are on the work proof page.">
          <div className="pcards">
            {MORE.map((m) => (
              <Link key={m.niche} href="/work-proof" className="pcard group">
                <span className="relative mb-4 block aspect-[16/10] overflow-hidden rounded-xl border border-white/10">
                  <Image src={m.src} alt={`${m.niche} receipt: ${m.figure}`} fill sizes="360px" className="object-cover object-top transition-transform duration-500 group-hover:scale-105" />
                </span>
                <span className="pcard-title block">{m.niche}</span>
                <span className="icard-figure block">{m.figure}</span>
                <span className="pcard-body block">{m.detail}</span>
              </Link>
            ))}
          </div>
        </Band>

        <Band id="calculator" tone="b" eyebrow="Interactive" title="Estimate your monthly pipeline" intro="Move the sliders to match your business. Results are calculated only from your inputs.">
          <LeadCalculator
            defaults={{ budget: 3000, cpl: 13.5, book: 25, close: 15, value: 3000 }}
            note="Cost per lead defaults to the $13.50 median of our published receipts. The other values are example inputs, so replace them with yours."
          />
        </Band>

        <Band id="faq-band" eyebrow="FAQ" title="Lead generation questions">
          <div className="content-prose max-w-[880px]">
            <ContentFaq items={FAQ} bare />
          </div>
        </Band>
      </div>
      <StickyLeadBar />
      <UFFooter />
    </>
  );
}
