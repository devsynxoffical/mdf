import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import WorkProofPage from "@/components/pages/WorkProofPage";
import UFFooter from "@/components/uf/UFFooter";
import CplBenchmarks from "@/components/content/CplBenchmarks";

export const metadata: Metadata = pageMetadata({
  path: "/work-proof",
  title: "Verified Funnel Results: Ad & CRM Receipts | MDF™",
  description:
    "40 real Meta Ads and CRM receipts from client installs, plus cost-per-lead benchmarks by niche — from $4.34 webinar leads to $26.93 legal leads.",
});

export default function Page() {
  return (
    <>
      <WorkProofPage />
      <CplBenchmarks />
      <UFFooter />
    </>
  );
}
