import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ContentShell, { Callout, ContentFaq, FeatureGrid, HeroActions, LinkCards, SectionHeading } from "@/components/content/ContentShell";
import RichText, { slugId } from "@/components/content/RichText";
import JsonLd from "@/components/seo/JsonLd";
import UFFooter from "@/components/uf/UFFooter";
import { SERVICE_PAGES, getServiceBySlug } from "@/lib/services";
import { pageCard } from "@/lib/pageCards";
import LeadSection from "@/components/leads/LeadSection";
import RichLanding from "@/components/leads/RichLanding";
import { SERVICE_LANDINGS, getServiceLanding } from "@/lib/serviceLandings";
import { SITE_URL, absoluteUrl, breadcrumbJsonLd, faqJsonLd, pageMetadata } from "@/lib/seo";

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return [...SERVICE_PAGES.map((s) => ({ slug: s.slug })), ...SERVICE_LANDINGS.map((s) => ({ slug: s.slug }))];
}

export function generateMetadata({ params }: Props): Metadata {
  const rich = getServiceLanding(params.slug);
  if (rich) return pageMetadata({ path: `/services/${rich.slug}`, title: rich.metaTitle, description: rich.metaDescription });
  const s = getServiceBySlug(params.slug);
  if (!s) return {};
  return pageMetadata({ path: `/services/${s.slug}`, title: s.metaTitle, description: s.metaDescription });
}

export default function ServicePage({ params }: Props) {
  const rich = getServiceLanding(params.slug);
  if (rich) {
    const others = [...SERVICE_LANDINGS.filter((o) => o.slug !== rich.slug).map((o) => `/services/${o.slug}`), ...SERVICE_PAGES.map((o) => `/services/${o.slug}`)];
    const related = Array.from(new Set([...rich.related, ...others])).slice(0, 6);
    return <RichLanding d={rich} path={`/services/${rich.slug}`} parent={{ name: "Services", path: "/services" }} related={related} serviceName={rich.name} formHeading="Get your free plan" />;
  }
  const s = getServiceBySlug(params.slug);
  if (!s) notFound();
  const path = `/services/${s.slug}`;
  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: s.name, href: path },
  ];
  const toc = [
    ...s.sections.map((sec) => ({ id: slugId(sec.heading), label: sec.heading })),
    ...(s.comparison ? [{ id: slugId(s.comparison.heading), label: s.comparison.heading }] : []),
    { id: "faq", label: "FAQ" },
    { id: "related", label: "Related" },
  ];
  const otherServices = [...SERVICE_LANDINGS.map((o) => ({ slug: o.slug })), ...SERVICE_PAGES].filter((o) => o.slug !== s.slug).map((o) => `/services/${o.slug}`);
  const relatedHrefs = Array.from(new Set([...s.related.map((r) => r.href), ...otherServices])).slice(0, 6);

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
      <ContentShell
        eyebrow={s.eyebrow}
        title={s.h1}
        intro={s.intro}
        crumbs={crumbs}
        stats={s.stats}
        toc={toc}
        actions={<HeroActions secondaryHref="/work-proof" secondaryLabel="See verified results" />}
      >
        {s.sections.map((sec) => {
          const id = slugId(sec.heading);
          const body = sec.body.map((p) => (
            <p key={p.slice(0, 40)}>
              <RichText text={p} />
            </p>
          ));
          return (
            <section key={sec.heading}>
              <SectionHeading id={id}>{sec.heading}</SectionHeading>
              {sec.kind === "proof" ? (
                <Callout label="Proof from real client accounts">
                  {body}
                  {sec.bullets && (
                    <ul>
                      {sec.bullets.map((b) => (
                        <li key={b}>{b}</li>
                      ))}
                    </ul>
                  )}
                </Callout>
              ) : (
                <>
                  {body}
                  {sec.bullets && <FeatureGrid items={sec.bullets} />}
                </>
              )}
            </section>
          );
        })}

        {s.comparison && (
          <section>
            <SectionHeading id={slugId(s.comparison.heading)}>{s.comparison.heading}</SectionHeading>
            {s.comparison.intro && <p>{s.comparison.intro}</p>}
            <div className="content-table">
              <table>
                <thead>
                  <tr>
                    {s.comparison.columns.map((c, i) => (
                      <th key={i} scope="col">
                        {c}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {s.comparison.rows.map((r) => (
                    <tr key={r[0]}>
                      <th scope="row">{r[0]}</th>
                      <td>{r[1]}</td>
                      <td>{r[2]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        <ContentFaq items={s.faq} />

        <LinkCards id="related" heading="Related services, guides and proof" items={relatedHrefs.map((h) => pageCard(h))} />

        <LeadSection
          source={path}
          heading="Ready to have this built for your offer?"
          body="Send a few details and we will reply with what we would build, how long it takes and what it should cost."
        />
      </ContentShell>
      <UFFooter />
    </>
  );
}
