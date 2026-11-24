import type { Metadata } from "next";
import Link from "next/link";
import ContentShell, { Callout, ContentCta, ContentFaq, HeroActions, LinkCards, SectionHeading } from "@/components/content/ContentShell";
import JsonLd from "@/components/seo/JsonLd";
import UFFooter from "@/components/uf/UFFooter";
import { SERVICE_PAGES } from "@/lib/services";
import { BLOG_POSTS } from "@/lib/blog";
import { WORK_PROOF } from "@/lib/workproof";
import { pageCard } from "@/lib/pageCards";
import { ACTIVE_INDUSTRIES as INDUSTRIES } from "@/lib/industries";
import { SERVICE_LANDINGS } from "@/lib/serviceLandings";
import { CATALOG_GROUPS, SERVICE_CATALOG } from "@/lib/serviceCatalog";
import { breadcrumbJsonLd, faqJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  path: "/services",
  title: "Sales Funnel Agency Services: Funnels, CRM & AI Follow-Up",
  description:
    "30 done-for-you services: sales funnels, Meta Ads, industry lead generation, GoHighLevel CRM, SMS and email automation and AI appointment setting.",
});

const FAQ = [
  {
    q: "How much does a sales funnel cost?",
    a: "Our published funnel packages are $1,497 for Design Only (strategy and design), $2,497 for Design + Copy Build (launch-ready pages and copy) and $4,997 for the Full AC Funnel Suite (full build, integrations, follow-up emails and 30 days of post-launch support). Ad spend and software are paid separately."
  },
  {
    q: "What does a sales funnel agency do?",
    a: "A sales funnel agency plans, writes, designs and builds the path a prospect takes from an ad or post to a sale or booked call, and connects it to checkout, calendar, CRM and email and SMS follow-up, with tracking on every step.",
  },
  {
    q: "Which types of sales funnels do you build?",
    a: "VSL, webinar, application, low-ticket, landing page and lead generation funnels, plus the follow-up and CRM behind them. The right type depends on your offer, price and buyer.",
  },
  {
    q: "How long does it take to launch a funnel?",
    a: "Most installs are live on real traffic in three to four weeks. The biggest factor is how clear the offer is before the build starts.",
  },
  {
    q: "Do I own the funnel and the data?",
    a: "Yes. We build in your own accounts, usually GoHighLevel or ClickFunnels, so the pages, automations, ad account and CRM data stay with you.",
  },
  {
    q: "Do you also run the ads?",
    a: "We can run Meta Ads that send traffic into the funnel, judged on cost per lead and per booked call. Many clients start with the funnel and follow-up, then add traffic.",
  },
  {
    q: "Do sales funnels work?",
    a: "Yes, when the offer is clear and every step is followed up and measured. One done-for-you funnel we built sold 13,630 times, with $847,307 in revenue at a 3.32 return on ad spend.",
  },
];

const STEPS = [
  ["Map the offer", "Who it is for, what it promises and the one action it must cause."],
  ["Architect the path", "The prospect journey, qualification gates and tracking plan."],
  ["Build the pages", "Landing, VSL, application or checkout, mobile-first."],
  ["Wire the follow-up", "A2P-compliant SMS, email, voicemail and AI + human handoff."],
  ["Launch and compound", "Live on real traffic, measured daily and improved weekly."],
];

export default function ServicesPage() {
  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
  ];
  const toc = [
    { id: "featured", label: "Featured services" },
    { id: "industries", label: "By industry" },
    { id: "everything", label: "All 30 services" },
    { id: "process", label: "How an install works" },
    { id: "case-result", label: "Case result" },
    { id: "faq", label: "FAQ" },
    { id: "proof", label: "Proof" },
    { id: "guides", label: "Guides" },
  ];
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs.map((c) => ({ name: c.name, path: c.href })))} />
      <JsonLd data={faqJsonLd(FAQ)} />
      <ContentShell
        eyebrow="( Services ) · What we build"
        title="Sales Funnel Agency Services for High-Ticket Businesses"
        intro="We are a done-for-you sales funnel agency. We build the whole client acquisition system (the funnel, the follow-up and the CRM), then launch it on real traffic and keep improving it. You never touch the tech."
        crumbs={crumbs}
        toc={toc}
        actions={<HeroActions secondaryHref="/funnels" secondaryLabel="See funnels we built" />}
        stats={[
          { value: String(SERVICE_CATALOG.length), label: "Services in one team" },
          { value: "3–4 wks", label: "Typical time to launch" },
          { value: String(WORK_PROOF.length), label: "Verified receipts" },
          { value: "$1.52M", label: "Largest case study" },
        ]}
      >
        <LinkCards
          id="featured"
          heading="Featured services"
          items={[...SERVICE_LANDINGS.map((s) => `/services/${s.slug}`), ...SERVICE_PAGES.map((s) => `/services/${s.slug}`)].map((h) => pageCard(h))}
        />

        <LinkCards id="industries" heading="Lead generation by industry" items={INDUSTRIES.map((i) => pageCard(`/lead-generation/${i.slug}`))} />

        <section>
          <SectionHeading id="everything">All 30 services we deliver</SectionHeading>
          <p>Every install is scoped to your offer, and most combine several of these. Click a service to see how we deliver it.</p>
          {CATALOG_GROUPS.map((g) => (
            <div key={g} className="catalog-group">
              <h3>{g}</h3>
              <div className="catalog-grid">
                {SERVICE_CATALOG.filter((c) => c.group === g).map((c) => (
                  <Link key={c.name} href={c.href} className="catalog-card">
                    <span className="catalog-name">{c.name}</span>
                    <span className="catalog-desc">{c.desc}</span>
                    <span className="catalog-go" aria-hidden>
                      Learn more ↗
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </section>

        <section>
          <SectionHeading id="process">How an install works</SectionHeading>
          <ol>
            {STEPS.map(([t, d]) => (
              <li key={t}>
                <strong>{t}:</strong> {d}
              </li>
            ))}
          </ol>
          <p>Most installs are live on real traffic in three to four weeks.</p>
        </section>

        <section>
          <SectionHeading id="case-result">A real result from a sales funnel we built</SectionHeading>
          <Callout label="Case result">
            <p>
              A coaching client was chasing high-ticket sales with no front end that worked. We rebuilt the backend and tracking around a
              low-ticket funnel with automated follow-up: <strong>13,630 low-ticket sales and $847,307 in revenue at a 3.32 return on ad spend</strong>.
              Read the <Link href="/cases/coaching-lto" className="rt-link">coaching case study</Link>, or see the{" "}
              <Link href="/cases/1-52m-case-study" className="rt-link">$1.52M VSL case study</Link>.
            </p>
          </Callout>
          <p className="mt-6">
            <Link href="/book" className="mdf-cta-btn">Book a strategy call <span aria-hidden>↗</span></Link>
          </p>
        </section>

        <ContentFaq items={FAQ} />

        <LinkCards id="proof" heading="Proof" items={["/work-proof", "/cases/1-52m-case-study", "/cases/coaching-lto", "/funnels"].map((h) => pageCard(h))} />

        <LinkCards id="guides" heading="Guides" items={BLOG_POSTS.map((p) => pageCard(`/blog/${p.slug}`))} />

        <ContentCta
          heading="Not sure which funnel you need?"
          body="Book a 15–20 minute strategy call. We look at your offer and current setup and recommend the shortest path to predictable booked calls."
        />
      </ContentShell>
      <UFFooter />
    </>
  );
}
