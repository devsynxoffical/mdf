import type { Metadata } from "next";
import ReactDOM from "react-dom";
import JsonLd from "@/components/seo/JsonLd";
import { faqJsonLd, pageMetadata } from "@/lib/seo";
import { FAQS_DATA } from "@/lib/homeFaq";
import StartScreen from "@/components/uf/StartScreen";
import UFHero from "@/components/uf/UFHero";
import MDFIphoneDuoPortfolio from "@/components/portfolio/MDFIphoneDuoPortfolio";
import MDFCaseStudiesHub from "@/components/cases/MDFCaseStudiesHub";
import UFStatement from "@/components/uf/UFStatement";
import MDFServicesSection from "@/components/ftp/MDFServicesSection";
import MDFWhoSection from "@/components/ftp/MDFWhoSection";
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
  title: "Million Dollar Funnels™ | High-Ticket Sales Funnel Agency",
  description:
    "Million Dollar Funnels builds done-for-you sales funnels, CRM automation, SMS/email follow-up and AI appointment setting for coaches, consultants and agencies.",
});

export default function Home() {
  // Hero still (LCP element) is fetched first; the 3D scene loads on interaction.
  ReactDOM.preload("/models/resn/diamond-poster.webp", { as: "image", fetchPriority: "high" });
  return (
    <div id="top">
      <JsonLd data={faqJsonLd(FAQS_DATA)} />
      {/* Opening loader: homepage only, so inner pages render their content immediately */}
      <StartScreen />
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
