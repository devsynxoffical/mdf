import Hero from "@/components/sections/Hero";
import StatsBar from "@/components/sections/StatsBar";
import BigNumber from "@/components/sections/BigNumber";
import Pillars from "@/components/sections/Pillars";
import LogoMarquee from "@/components/sections/LogoMarquee";
import CaseStudy from "@/components/sections/CaseStudy";
import Gallery from "@/components/sections/Gallery";
import Testimonials from "@/components/sections/Testimonials";
import Founder from "@/components/sections/Founder";
import FAQ from "@/components/sections/FAQ";
import FinalCTA from "@/components/sections/FinalCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Hero />
      <StatsBar />
      <BigNumber />
      <Pillars />
      <LogoMarquee />
      <CaseStudy />
      <Gallery />
      <Testimonials />
      <Founder />
      <FAQ />
      <FinalCTA />
      <Footer />
    </>
  );
}
