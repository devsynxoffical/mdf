import type { Metadata } from "next";
import { breadcrumbJsonLd, faqJsonLd, pageMetadata } from "@/lib/seo";
import { SITE_FAQ } from "@/lib/site";
import JsonLd from "@/components/seo/JsonLd";
import FaqPage from "@/components/pages/FaqPage";
import UFFooter from "@/components/uf/UFFooter";

export const metadata: Metadata = pageMetadata({
  path: "/faq",
  title: "FAQ — Million Dollar Funnel™",
  description:
    "Frequently asked questions about the Million Dollar Funnel™ system, what’s included, and how we work.",
});

export default function Page() {
  return (
    <>
      <JsonLd data={faqJsonLd(SITE_FAQ)} />
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "FAQ", path: "/faq" }])} />
      <FaqPage />
      <UFFooter />
    </>
  );
}
