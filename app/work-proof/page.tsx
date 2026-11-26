import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import { SITE_URL, absoluteUrl, breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import WorkProofPage from "@/components/pages/WorkProofPage";
import UFFooter from "@/components/uf/UFFooter";
import CplBenchmarks from "@/components/content/CplBenchmarks";

export const metadata: Metadata = pageMetadata({
  path: "/work-proof",
  title: "Verified Funnel Results: Ad & CRM Receipts | MDF™",
  description:
    "40 real Meta Ads and CRM receipts from client accounts, plus cost per lead benchmarks by niche, from $4.34 webinar leads to $26.93 legal leads.",
});

export default function Page() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Work Proof",
          url: absoluteUrl("/work-proof"),
          isPartOf: { "@id": `${SITE_URL}/#website` },
          about: { "@id": `${SITE_URL}/#organization` },
        }}
      />
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Work Proof", path: "/work-proof" }])} />
      <WorkProofPage />
      <CplBenchmarks />
      <UFFooter />
    </>
  );
}
