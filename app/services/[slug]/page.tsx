import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ContentShell, { ContentCta, ContentFaq } from "@/components/content/ContentShell";
import JsonLd from "@/components/seo/JsonLd";
import UFFooter from "@/components/uf/UFFooter";
import { SERVICE_PAGES, getServiceBySlug } from "@/lib/services";
import { SITE_URL, absoluteUrl, breadcrumbJsonLd, faqJsonLd, pageMetadata } from "@/lib/seo";

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return SERVICE_PAGES.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const s = getServiceBySlug(params.slug);
  if (!s) return {};
  return pageMetadata({ path: `/services/${s.slug}`, title: s.metaTitle, description: s.metaDescription });
}

export default function ServicePage({ params }: Props) {
  const s = getServiceBySlug(params.slug);
  if (!s) notFound();
  const path = `/services/${s.slug}`;
  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: s.name, href: path },
  ];

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: s.name,
          serviceType: s.name,
          description: s.metaDescription,
          url: absoluteUrl(path),
          provider: { "@id": `${SITE_URL}/#organization` },
          areaServed: ["United States", "United Kingdom", "Canada", "Australia"],
        }}
      />
      <JsonLd data={faqJsonLd(s.faq)} />
      <JsonLd data={breadcrumbJsonLd(crumbs.map((c) => ({ name: c.name, path: c.href })))} />
      <ContentShell eyebrow={s.eyebrow} title={s.h1} intro={s.intro} crumbs={crumbs}>
        {s.sections.map((sec) => (
          <section key={sec.heading}>
            <h2>{sec.heading}</h2>
            {sec.body.map((p) => (
              <p key={p.slice(0, 40)} className="mt-4">
                {p}
              </p>
            ))}
            {sec.bullets && (
              <ul className="mt-4">
                {sec.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            )}
          </section>
        ))}
        {s.comparison && (
          <section>
            <h2>{s.comparison.heading}</h2>
            {s.comparison.intro && <p className="mt-4">{s.comparison.intro}</p>}
            <div className="mt-5 overflow-x-auto rounded-2xl border border-white/10">
              <table className="w-full min-w-[520px] border-collapse text-left text-[14.5px]">
                <thead className="bg-white/[0.04] font-mono text-[11px] uppercase tracking-[0.12em] text-slate-400">
                  <tr>
                    {s.comparison.columns.map((c, i) => (
                      <th key={i} scope="col" className="px-4 py-3">
                        {c}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {s.comparison.rows.map((r) => (
                    <tr key={r[0]} className="border-t border-white/5">
                      <th scope="row" className="px-4 py-3 font-semibold text-white">
                        {r[0]}
                      </th>
                      <td className="px-4 py-3">{r[1]}</td>
                      <td className="px-4 py-3">{r[2]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}
        <ContentFaq items={s.faq} />
        <h2>Related</h2>
        <ul>
          {s.related.map((r) => (
            <li key={r.href}>
              <Link href={r.href}>{r.label}</Link>
            </li>
          ))}
          <li>
            <Link href="/services">All services</Link>
          </li>
        </ul>
        <ContentCta
          heading={`Want a ${s.name.toLowerCase()} built for your offer?`}
          body="Book a 15–20 minute strategy call. We review your offer, current funnel and follow-up, and tell you plainly whether we can help."
        />
      </ContentShell>
      <UFFooter />
    </>
  );
}
