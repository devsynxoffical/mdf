import UFHero from "@/components/uf/UFHero";
import MDFIphoneDuoPortfolio from "@/components/portfolio/MDFIphoneDuoPortfolio";
import MDFCaseStudiesHub from "@/components/cases/MDFCaseStudiesHub";
import UFStatement from "@/components/uf/UFStatement";
import UFHeadcount from "@/components/uf/UFHeadcount";
import UFProof from "@/components/uf/UFProof";
import UFWorkProofGrid from "@/components/uf/UFWorkProofGrid";
import UFOpinions from "@/components/uf/UFOpinions";
import UFPricing from "@/components/uf/UFPricing";
import UFProcess from "@/components/uf/UFProcess";
import UFQuestions from "@/components/uf/UFQuestions";
import UFCrystal from "@/components/uf/UFCrystal";
import LusionAstronautSection from "@/components/uf/LusionAstronautSection";
import UFSquareMarquee from "@/components/uf/UFSquareMarquee";
import UFFooter from "@/components/uf/UFFooter";

export default function Home() {
  return (
    <div id="top">
      {/* User's Original Opening Hero with 3D Resn Diamond & Infinite Headline */}
      <UFHero />

      {/* Statement & 3D Crystal */}
      <UFStatement />
      <UFCrystal />

      {/* Funnels Portfolio in iPhone Duo 3D Layout */}
      <div id="funnels">
        <MDFIphoneDuoPortfolio />
      </div>

      {/* Headcount Proof */}
      <UFHeadcount />
      <UFProof />
      <UFWorkProofGrid />

      {/* 251+ Case Studies Hub (Lead Gen & eCommerce) */}
      <MDFCaseStudiesHub />

      {/* Process & Proof Sections */}
      <UFProcess />
      <UFOpinions />
      <UFPricing />
      <UFQuestions />
      <LusionAstronautSection />
      <UFSquareMarquee />
      <UFFooter />
    </div>
  );
}
