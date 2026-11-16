import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
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
      <AboutPage />
      <UFFooter />
    </>
  );
}
