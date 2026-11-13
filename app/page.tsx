import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import { faqJsonLd, pageMetadata } from "@/lib/seo";
import { FAQS_DATA } from "@/lib/homeFaq";
import UFHero from "@/components/uf/UFHero";
import MDFIphoneDuoPortfolio from "@/components/portfolio/MDFIphoneDuoPortfolio";
import MDFCaseStudiesHub from "@/components/cases/MDFCaseStudiesHub";
import UFStatement from "@/components/uf/UFStatement";
import MDFServicesSection from "@/components/ftp/MDFServicesSection";
import MDFWhoSection from "@/components/ftp/MDFWhoSection";
import UFWorkProofGrid from "@/components/uf/UFWorkProofGrid";
import UFOpinions from "@/components/uf/UFOpinions";
import UFPricing from "@/components/uf/UFPricing";
import UFProcess from "@/components/uf/UFProcess";
import MDFFaqSection from "@/components/ftp/MDFFaqSection";
import UFCrystal from "@/components/uf/UFCrystal";
import LusionAstronautSection from "@/components/uf/LusionAstronautSection";
import UFSquareMarquee from "@/components/uf/UFSquareMarquee";
import UFFooter from "@/components/uf/UFFooter";

export const metadata: Metadata = pageMetadata({
  path: "/",
  title: "Million Dollar Funnel™ — Predictable High-Ticket Client Acquisition",
  description:
    "Done-for-you funnels, CRM automation, SMS & email follow-up, AI calling and paid ads for high-ticket service businesses, coaches and agencies. 200+ live client results.",
});

export default function Home() {
  return (
    <div id="top">
      <JsonLd data={faqJsonLd(FAQS_DATA)} />
      {/* User's Original Opening Hero with 3D Resn Diamond & Infinite Headline */}
      <UFHero />

      {/* Statement & 3D Crystal */}
      <UFStatement />
      <UFCrystal />

      {/* Funnels Portfolio in iPhone Duo 3D Layout */}
      <div id="funnels">
        <MDFIphoneDuoPortfolio />
      </div>

      {/* ( 03 ) What we do  ·  ( 04 ) Who we work with */}
      <MDFServicesSection />
      <MDFWhoSection />
      <UFWorkProofGrid />

      {/* 251+ Case Studies Hub (Lead Gen & eCommerce) */}
      <MDFCaseStudiesHub />

      {/* Process & Proof Sections */}
      <UFProcess />
      <UFOpinions />
      <UFPricing />
      <MDFFaqSection />
      <LusionAstronautSection />
      <UFSquareMarquee />
      <UFFooter />
    </div>
  );
}
