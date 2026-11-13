import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import AboutPage from "@/components/pages/AboutPage";
import UFFooter from "@/components/uf/UFFooter";

export const metadata: Metadata = pageMetadata({
  path: "/about",
  title: "About — Million Dollar Funnel™",
  description:
    "Gaurav Kapoor — Founder of Million Dollar Funnel™. $50M+ Facebook ad spend. 500+ businesses scaled.",
});

export default function Page() {
  return (
    <>
      <AboutPage />
      <UFFooter />
    </>
  );
}
