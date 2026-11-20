import type { Metadata } from "next";
import { notFound } from "next/navigation";
import RichLanding from "@/components/leads/RichLanding";
import { ACTIVE_INDUSTRIES, INDUSTRIES, getIndustry } from "@/lib/industries";
import PartnerTeaser from "@/components/leads/PartnerTeaser";
import { pageMetadata } from "@/lib/seo";

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return INDUSTRIES.map((i) => ({ slug: i.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const ind = getIndustry(params.slug);
  if (!ind) return {};
  const meta = pageMetadata({ path: `/lead-generation/${ind.slug}`, title: ind.metaTitle, description: ind.metaDescription });
  // Keyword owned by a sister site: keep the URL for visitors and links, but out of Google's index.
  return ind.partner ? { ...meta, robots: { index: false, follow: true } } : meta;
}

export default function IndustryPage({ params }: Props) {
  const ind = getIndustry(params.slug);
  if (!ind) notFound();
  if (ind.partner) return <PartnerTeaser ind={ind} />;
  const path = `/lead-generation/${ind.slug}`;
  const others = ACTIVE_INDUSTRIES.filter((o) => o.slug !== ind.slug).map((o) => `/lead-generation/${o.slug}`);
  const related = Array.from(new Set([...ind.related, ...others])).slice(0, 6);
  return <RichLanding d={ind} path={path} parent={{ name: "Lead Generation", path: "/lead-generation" }} related={related} serviceName={`${ind.name} lead generation`} formHeading={`Get your free ${ind.name === ind.name.toUpperCase() ? ind.name : ind.name.toLowerCase()} lead plan`} />;
}
