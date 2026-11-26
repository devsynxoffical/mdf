import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import { SITE_URL, absoluteUrl, breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import AboutPage from "@/components/pages/AboutPage";
import UFFooter from "@/components/uf/UFFooter";

export const metadata: Metadata = pageMetadata({
  path: "/about",
  title: "About Million Dollar Funnel™: The Team Behind the System",
  description:
    "Meet the team behind Million Dollar Funnel™: 11 years in paid media, $50M+ in Facebook ad spend managed and 500+ service businesses scaled.",
});

export default function Page() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          name: "About Million Dollar Funnel™",
          url: absoluteUrl("/about"),
          isPartOf: { "@id": `${SITE_URL}/#website` },
          about: { "@id": `${SITE_URL}/#organization` },
          mainEntity: { "@id": `${SITE_URL}/#organization` },
        }}
      />
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "About Million Dollar Funnel™", path: "/about" }])} />
      <AboutPage />
      <UFFooter />
    </>
  );
}
