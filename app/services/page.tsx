import type { Metadata } from "next";
import Link from "next/link";
import ContentShell, { ContentCta, FeatureGrid, HeroActions, LinkCards, SectionHeading } from "@/components/content/ContentShell";
import JsonLd from "@/components/seo/JsonLd";
import UFFooter from "@/components/uf/UFFooter";
import { SERVICE_PAGES } from "@/lib/services";
import { BLOG_POSTS } from "@/lib/blog";
import { WORK_PROOF } from "@/lib/workproof";
import { pageCard } from "@/lib/pageCards";
import { INDUSTRIES } from "@/lib/industries";
import { SEO_SERVICES, breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  path: "/services",
  title: "Sales Funnel Agency Services: Funnels, CRM & AI Follow-Up",
  description:
    "Done-for-you sales funnel services: VSL, application and low-ticket funnels, GoHighLevel CRM, SMS and email automation and AI appointment setting.",
});

const PAGE_FOR: Record<string, string> = {
  "VSL Funnels": "/services/vsl-funnels",
  "AI Calling Agent": "/services/ai-appointment-setter",
  "CRM Automation": "/services/gohighlevel-agency",
  "Low-Ticket Funnels": "/services/low-ticket-funnels",
  "Webinar Funnels": "/services/webinar-funnels",
};

const STEPS = [
  ["Map the offer", "Who it is for, what it promises and the one action it must cause."],
  ["Architect the path", "The prospect journey, qualification gates and tracking plan."],
  ["Build the pages", "Landing, VSL, application or checkout — mobile-first."],
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
    { id: "everything", label: "Everything we build" },
    { id: "process", label: "How an install works" },
    { id: "proof", label: "Proof" },
    { id: "guides", label: "Guides" },
  ];
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs.map((c) => ({ name: c.name, path: c.href })))} />
      <ContentShell
        eyebrow="( Services ) — What we build"
        title="Sales Funnel Agency Services for High-Ticket Businesses"
        intro="We are a done-for-you sales funnel agency. We build the whole client acquisition system — the funnel, the follow-up and the CRM — then launch it on real traffic and keep improving it. You never touch the tech."
        crumbs={crumbs}
        toc={toc}
        actions={<HeroActions secondaryHref="/funnels" secondaryLabel="See funnels we built" />}
        stats={[
          { value: String(SEO_SERVICES.length), label: "Services in one team" },
          { value: "3–4 wks", label: "Typical time to launch" },
          { value: String(WORK_PROOF.length), label: "Verified receipts" },
          { value: "$1.52M", label: "Largest case study" },
        ]}
      >
        <LinkCards id="featured" heading="Featured services" items={SERVICE_PAGES.map((s) => pageCard(`/services/${s.slug}`))} />

        <LinkCards id="industries" heading="Lead generation by industry" items={INDUSTRIES.map((i) => pageCard(`/lead-generation/${i.slug}`))} />

        <section>
          <SectionHeading id="everything">Everything we build</SectionHeading>
          <p>Every install is scoped to your offer. Most combine several of these:</p>
          <FeatureGrid
            items={SEO_SERVICES.map((s) => (
              <span key={s.name}>
                {PAGE_FOR[s.name] ? (
                  <Link href={PAGE_FOR[s.name]} className="rt-link font-semibold">
                    {s.name}
                  </Link>
                ) : (
                  <strong>{s.name}</strong>
                )}
                {" — "}
                {s.description}
              </span>
            ))}
          />
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
