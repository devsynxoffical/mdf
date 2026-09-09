import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CaseStudyView from "@/components/cases/CaseStudyView";
import UFFooter from "@/components/uf/UFFooter";
import { CASE_STUDIES, getCaseBySlug } from "@/lib/cases";

import MinimalNav from "@/components/MinimalNav";

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return CASE_STUDIES.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const study = getCaseBySlug(params.slug);
  if (!study) return { title: "Case Study — Million Dollar Funnel™" };
  return {
    title: `${study.title} — Million Dollar Funnel™`,
    description: study.summary,
  };
}

export default function CaseStudyPage({ params }: Props) {
  const study = getCaseBySlug(params.slug);
  if (!study) notFound();

  return (
    <>
      <MinimalNav />
      <CaseStudyView study={study} />
      <UFFooter />
    </>
  );
}
