import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import MDFCaseStudiesHub from "@/components/cases/MDFCaseStudiesHub";
import UFFooter from "@/components/uf/UFFooter";

export const metadata: Metadata = pageMetadata({
  path: "/cases",
  title: "Case Studies — 200+ Live Client Results | Million Dollar Funnel™",
  description:
    "Explore 200+ live client results from Million Dollar Funnel™ across lead generation, booked appointments and eCommerce — real dashboards, ROAS and cost-per-lead numbers.",
});

export default function CasesPage() {
  return (
    <main className="min-h-screen bg-[#050508] text-white pt-16">
      <MDFCaseStudiesHub />
      <UFFooter />
    </main>
  );
}
