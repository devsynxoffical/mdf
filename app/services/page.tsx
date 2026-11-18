import type { Metadata } from "next";
import Link from "next/link";
import ContentShell, { ContentCta } from "@/components/content/ContentShell";
import JsonLd from "@/components/seo/JsonLd";
import UFFooter from "@/components/uf/UFFooter";
import { SERVICE_PAGES } from "@/lib/services";
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

export default function ServicesPage() {
  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
  ];
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs.map((c) => ({ name: c.name, path: c.href })))} />
      <ContentShell
        eyebrow="( Services ) — What we build"
        title="Sales Funnel Agency Services for High-Ticket Businesses"
        intro="We are a done-for-you sales funnel agency. We build the whole client acquisition system — the funnel, the follow-up and the CRM — then launch it on real traffic and keep improving it. You never touch the tech."
        crumbs={crumbs}
      >
        <h2>Featured services</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {SERVICE_PAGES.map((s) => (
            <Link
              key={s.slug}
              href={`/services/${s.slug}`}
              className="rounded-2xl border border-sky/20 bg-white/[0.03] p-5 !no-underline transition hover:border-sky/50 hover:bg-[#1254EC]/10"
            >
              <span className="block font-sans text-[17px] font-bold text-white">{s.name}</span>
              <span className="mt-2 block text-[14px] leading-relaxed text-slate-400">{s.intro.split(". ")[0]}.</span>
              <span className="mt-3 block font-mono text-[11px] uppercase tracking-[0.12em] text-sky">Learn more ↗</span>
            </Link>
          ))}
        </div>

        <h2>Everything we build</h2>
        <p>Every install is scoped to your offer. Most combine several of these:</p>
        <ul>
          {SEO_SERVICES.map((s) => (
            <li key={s.name}>
              {PAGE_FOR[s.name] ? <Link href={PAGE_FOR[s.name]}>{s.name}</Link> : <strong className="text-white">{s.name}</strong>}
              {": "}
              {s.description}
            </li>
          ))}
        </ul>

        <h2>How an install works</h2>
        <ol>
          <li>Map the offer: who it is for, what it promises and the one action it must cause.</li>
          <li>Architect the path: the prospect journey, qualification gates and tracking plan.</li>
          <li>Build the pages: landing, VSL, application or checkout, mobile-first.</li>
          <li>Wire the follow-up: A2P-compliant SMS, email, voicemail and AI + human handoff.</li>
          <li>Launch and compound: live on real traffic, measured daily and improved weekly.</li>
        </ol>
        <p>Most installs are live on real traffic in three to four weeks.</p>

        <h2>Proof</h2>
        <p>
          See the <Link href="/work-proof">verified ad-account and CRM receipts</Link>, the{" "}
          <Link href="/cases/1-52m-case-study">$1.52M in 19 months case study</Link> and{" "}
          <Link href="/funnels">live funnels we have built</Link>.
        </p>

        <ContentCta
          heading="Not sure which funnel you need?"
          body="Book a 15–20 minute strategy call. We look at your offer and current setup and recommend the shortest path to predictable booked calls."
        />
      </ContentShell>
      <UFFooter />
    </>
  );
}
