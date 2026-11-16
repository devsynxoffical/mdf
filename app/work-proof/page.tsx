import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import WorkProofPage from "@/components/pages/WorkProofPage";
import UFFooter from "@/components/uf/UFFooter";

export const metadata: Metadata = pageMetadata({
  path: "/work-proof",
  title: "Verified Funnel Results: Ad & CRM Receipts | MDF™",
  description:
    "Real Meta Ads and CRM screenshots from Million Dollar Funnel™ installs: cost per lead, lead volume, booked calls and closed revenue you can check yourself.",
});

export default function Page() {
  return (
    <>
      <WorkProofPage />
      <UFFooter />
    </>
  );
}
