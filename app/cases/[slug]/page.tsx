import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CaseStudyView from "@/components/cases/CaseStudyView";
import UFFooter from "@/components/uf/UFFooter";
import { CASE_STUDIES, getCaseBySlug } from "@/lib/cases";
import JsonLd from "@/components/seo/JsonLd";
import { SEO, SITE_URL, absoluteUrl, breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return CASE_STUDIES.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const study = getCaseBySlug(params.slug);
  if (!study) return { title: "Case Study — Million Dollar Funnel™" };
  return pageMetadata({
    path: `/cases/${study.slug}`,
    title: `${study.title} — Million Dollar Funnel™`,
    description: study.summary,
  });
}

export default function CaseStudyPage({ params }: Props) {
  const study = getCaseBySlug(params.slug);
  if (!study) notFound();

  const path = `/cases/${study.slug}`;
  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: study.title,
    description: study.summary,
    about: study.niche,
    url: absoluteUrl(path),
    mainEntityOfPage: absoluteUrl(path),
    image: absoluteUrl(SEO.ogImage),
    author: { "@id": `${SITE_URL}/#organization` },
    publisher: { "@id": `${SITE_URL}/#organization` },
  };

  return (
    <>
      <JsonLd data={article} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Case Studies", path: "/cases" },
          { name: study.title, path },
        ])}
      />
      <CaseStudyView study={study} />
      <UFFooter />
    </>
  );
}
