import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import { SITE_URL, absoluteUrl, breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import BookCallPage from "@/components/pages/BookCallPage";
import UFFooter from "@/components/uf/UFFooter";

export const metadata: Metadata = pageMetadata({
  path: "/book",
  title: "Book a Funnel Strategy Call | Million Dollar Funnel™",
  description:
    "Book a 15–20 minute strategy call. We review your offer, funnel and follow-up, show where revenue is leaking and tell you whether we are the right fit.",
});

export default function BookPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          name: "Book a Strategy Call",
          url: absoluteUrl("/book"),
          isPartOf: { "@id": `${SITE_URL}/#website` },
          about: { "@id": `${SITE_URL}/#organization` },
        }}
      />
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Book a Strategy Call", path: "/book" }])} />
      <BookCallPage />
      <UFFooter />
    </>
  );
}
