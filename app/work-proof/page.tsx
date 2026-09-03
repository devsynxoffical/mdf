import type { Metadata } from "next";
import WorkProofPage from "@/components/pages/WorkProofPage";
import UFFooter from "@/components/uf/UFFooter";

export const metadata: Metadata = {
  title: "Work Proof — Million Dollar Funnel™",
  description:
    "Live Meta Ads and CRM receipts from Million Dollar Funnel™ installs — cost per lead, closed revenue, and volume you can audit.",
};

export default function Page() {
  return (
    <>
      <WorkProofPage />
      <UFFooter />
    </>
  );
}
