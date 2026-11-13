import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import LegalPage from "@/components/pages/LegalPage";
import UFFooter from "@/components/uf/UFFooter";

export const metadata: Metadata = pageMetadata({
  path: "/income-disclosure",
  title: "Income Disclosure — Million Dollar Funnel™",
  description:
    "Income and results disclosure for Million Dollar Funnel™: client results are not typical and depend on offer, market and execution.",
});

export default function Page() {
  return (
    <>
      <LegalPage title="Income Disclosure" eyebrow="( Legal ) — Earnings">
        <p>
          Any earnings, revenue, ROAS, or sales figures shown on Million Dollar Funnel™ sites —
          including case studies such as 13,630 LTO sales, $847,307 revenue, and 3.32 ROAS —
          reflect specific client results under specific conditions.
        </p>
        <h2>No earnings guarantee</h2>
        <p>
          These figures are not typical, average, or promised outcomes. Your results will vary
          based on niche, offer, budget, creative, compliance, and how fully you implement the
          system.
        </p>
        <h2>Business opportunity claims</h2>
        <p>
          We sell services that help acquire clients. We do not promise passive income or
          franchise-style returns. Past performance is not a reliable indicator of future results.
        </p>
      </LegalPage>
      <UFFooter />
    </>
  );
}
