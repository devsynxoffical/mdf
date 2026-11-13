import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import WorkProofPage from "@/components/pages/WorkProofPage";
import UFFooter from "@/components/uf/UFFooter";

export const metadata: Metadata = pageMetadata({
  path: "/work-proof",
  title: "Work Proof — Million Dollar Funnel™",
  description:
    "All live Meta Ads and CRM receipts from Million Dollar Funnel™ installs — cost per lead, closed revenue, and volume you can audit.",
});

export default function Page() {
  return (
    <>
      <WorkProofPage />
      <UFFooter />
    </>
  );
}
