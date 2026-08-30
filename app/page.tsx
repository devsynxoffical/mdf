import UFHero from "@/components/uf/UFHero";
import UFStatement from "@/components/uf/UFStatement";
import UFLeaks from "@/components/uf/UFLeaks";
import UFHeadcount from "@/components/uf/UFHeadcount";
import UFProof from "@/components/uf/UFProof";
import UFOpinions from "@/components/uf/UFOpinions";
import UFProcess from "@/components/uf/UFProcess";
import UFQuestions from "@/components/uf/UFQuestions";
import UFCrystal from "@/components/uf/UFCrystal";
import LusionAstronautSection from "@/components/uf/LusionAstronautSection";
import UFDoor from "@/components/uf/UFDoor";
import UFSquareMarquee from "@/components/uf/UFSquareMarquee";
import UFFooter from "@/components/uf/UFFooter";

export default function Home() {
  return (
    <div id="top">
      <UFHero />
      <UFStatement />
      <UFCrystal />
      <UFLeaks />
      <UFHeadcount />
      <UFProof />
      <UFOpinions />
      <UFProcess />
      <UFQuestions />
      <LusionAstronautSection />
      <UFDoor />
      <UFSquareMarquee />
      <UFFooter />
    </div>
  );
}
