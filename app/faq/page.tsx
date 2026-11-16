import type { Metadata } from "next";
import { breadcrumbJsonLd, faqJsonLd, pageMetadata } from "@/lib/seo";
import { SITE_FAQ } from "@/lib/site";
import JsonLd from "@/components/seo/JsonLd";
import FaqPage from "@/components/pages/FaqPage";
import UFFooter from "@/components/uf/UFFooter";

export const metadata: Metadata = pageMetadata({
  path: "/faq",
  title: "Sales Funnel Agency FAQ: Scope, Timelines & Fit | MDF™",
  description:
    "Answers to the questions we hear most: what a Million Dollar Funnel™ install includes, how long it takes, who it suits and how we work with your team.",
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
