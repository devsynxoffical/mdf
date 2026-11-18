import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import MDFIphoneDuoPortfolio from "@/components/portfolio/MDFIphoneDuoPortfolio";
import FunnelsPage from "@/components/pages/FunnelsPage";
import UFFooter from "@/components/uf/UFFooter";

export const metadata: Metadata = pageMetadata({
  path: "/funnels",
  title: "Sales Funnel Examples: 8 Live Funnels We Built | MDF™",
  description:
    "Eight live sales funnel examples we built for mortgage, insurance, security, invention, B2B and event offers, with the strategy and stack behind each.",
});

export default function Page() {
  return (
    <main className="min-h-screen bg-[#050508] text-white pt-16">
      <MDFIphoneDuoPortfolio />
      <FunnelsPage />
      <UFFooter />
    </main>
  );
}
