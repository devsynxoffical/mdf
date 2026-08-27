import type { Metadata } from "next";
import PortfolioGrid from "@/components/portfolio/PortfolioGrid";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Portfolio — Million Dollar Funnel™",
  description:
    "Every ad creative from the Million Dollar Funnel™ system — roofing, solar, HVAC, finance, MVA law, SaaS and more. Filter by niche and watch them run.",
};

export default function PortfolioPage() {
  return (
    <>
      <PortfolioGrid />
      <Footer />
    </>
  );
}
