import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import { SITE_URL, absoluteUrl, breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import MDFIphoneDuoPortfolio from "@/components/portfolio/MDFIphoneDuoPortfolio";
import FunnelsPage from "@/components/pages/FunnelsPage";
import { FUNNEL_DESIGNS } from "@/lib/funnels";
import UFFooter from "@/components/uf/UFFooter";

export const metadata: Metadata = pageMetadata({
  path: "/funnels",
  title: "Funnel Designs: 8 Live Client Funnels We Built | MDF™",
  description:
    "Eight live funnel designs we built for mortgage, insurance, security, invention, B2B and event offers, with the strategy and tech stack behind each.",
});

export default function Page() {
  return (
    <main className="min-h-screen bg-[#050508] text-white pt-16">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Funnel Designs",
          url: absoluteUrl("/funnels"),
          isPartOf: { "@id": `${SITE_URL}/#website` },
          about: { "@id": `${SITE_URL}/#organization` },
          hasPart: FUNNEL_DESIGNS.map((f) => ({ "@type": "CreativeWork", name: f.name, description: f.body })),
        }}
      />
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Funnel Designs", path: "/funnels" }])} />
      <MDFIphoneDuoPortfolio />
      <FunnelsPage />
      <UFFooter />
    </main>
  );
}
