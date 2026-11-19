import type { Metadata } from "next";
import { notFound } from "next/navigation";
import RichLanding from "@/components/leads/RichLanding";
import { INDUSTRIES, getIndustry } from "@/lib/industries";
import { pageMetadata } from "@/lib/seo";

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return INDUSTRIES.map((i) => ({ slug: i.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const ind = getIndustry(params.slug);
  if (!ind) return {};
  return pageMetadata({ path: `/lead-generation/${ind.slug}`, title: ind.metaTitle, description: ind.metaDescription });
}

export default function IndustryPage({ params }: Props) {
  const ind = getIndustry(params.slug);
  if (!ind) notFound();
  const path = `/lead-generation/${ind.slug}`;
  const others = INDUSTRIES.filter((o) => o.slug !== ind.slug).map((o) => `/lead-generation/${o.slug}`);
  const related = Array.from(new Set([...ind.related, ...others])).slice(0, 6);
  return <RichLanding d={ind} path={path} parent={{ name: "Lead Generation", path: "/lead-generation" }} related={related} serviceName={`${ind.name} lead generation`} formHeading={`Get your free ${ind.name.toLowerCase()} lead plan`} />;
}
