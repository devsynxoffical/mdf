import type { Metadata } from "next";
import { redirect } from "next/navigation";
import CasesIndex from "@/components/cases/CasesIndex";
import UFFooter from "@/components/uf/UFFooter";
import { CASE_STUDIES } from "@/lib/cases";

export const metadata: Metadata = {
  title: "Case Studies — Million Dollar Funnel™",
  description:
    "Real Million Dollar Funnel™ builds — coaching LTO scale-ups, tracking rebuilds, and revenue systems with proof.",
};

export default function CasesPage() {
  // With a single case, skip the index and open the full VSL page.
  if (CASE_STUDIES.length === 1) {
    redirect(`/cases/${CASE_STUDIES[0].slug}`);
  }

  return (
    <>
      <CasesIndex />
      <UFFooter />
    </>
  );
}
