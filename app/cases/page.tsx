import type { Metadata } from "next";
import MDFCaseStudiesHub from "@/components/cases/MDFCaseStudiesHub";
import UFFooter from "@/components/uf/UFFooter";

export const metadata: Metadata = {
  title: "251+ Verified Case Studies — Million Dollar Funnel™",
  description:
    "Explore 251+ verified client acquisitions across Lead Generation and eCommerce — real dashboards, video proofs, ROAS metrics, and system breakdowns.",
};

export default function CasesPage() {
  return (
    <main className="min-h-screen bg-[#050508] text-white pt-16">
      <MDFCaseStudiesHub />
      <UFFooter />
    </main>
  );
}
