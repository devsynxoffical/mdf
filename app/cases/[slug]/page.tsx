import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CaseStudyView from "@/components/cases/CaseStudyView";
import UFFooter from "@/components/uf/UFFooter";
import { CASE_STUDIES, getCaseBySlug } from "@/lib/cases";
import JsonLd from "@/components/seo/JsonLd";
import { SEO, SITE_URL, absoluteUrl, breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

type Props = { params: { slug: string } };

/** Search-facing titles/descriptions (the on-page headline stays as written). */
const CASE_SEO: Record<string, { title: string; description: string }> = {
  "1-52m-case-study": {
    title: "High-Ticket VSL Funnel Case Study: $1.52M in 19 Months",
    description:
      "How a VSL-led funnel and automated backend scaled one offer to $1,520,000 in 19 months: the funnel architecture, follow-up and tracking behind it.",
  },
  "coaching-lto": {
    title: "Coaching Low-Ticket Funnel Case Study: 13,630 Sales, 3.32 ROAS",
    description:
      "How we rebuilt a coaching client's backend and tracking and turned chaotic ad spend into 13,630 low-ticket sales, $847,307 in revenue and 3.32 ROAS.",
  },
};

export function generateStaticParams() {
  return CASE_STUDIES.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const study = getCaseBySlug(params.slug);
  if (!study) return { title: "Case Study — Million Dollar Funnel™" };
  const seo = CASE_SEO[study.slug];
  return pageMetadata({
    path: `/cases/${study.slug}`,
    title: seo?.title ?? `${study.title} — Million Dollar Funnel™`,
    description: seo?.description ?? study.summary,
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
