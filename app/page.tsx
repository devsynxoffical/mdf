import UFHero from "@/components/uf/UFHero";
import UFStatement from "@/components/uf/UFStatement";
import UFLeaks from "@/components/uf/UFLeaks";
import UFHeadcount from "@/components/uf/UFHeadcount";
import UFProof from "@/components/uf/UFProof";
import UFOpinions from "@/components/uf/UFOpinions";
import UFBuilt from "@/components/uf/UFBuilt";
import UFProcess from "@/components/uf/UFProcess";
import UFQuestions from "@/components/uf/UFQuestions";
import UFDoor from "@/components/uf/UFDoor";
import UFFooter from "@/components/uf/UFFooter";

export default function Home() {
  return (
    <div id="top">
      <UFHero />
      <UFStatement />
      <UFLeaks />
      <UFHeadcount />
      <UFProof />
      <UFOpinions />
      <UFBuilt />
      <UFProcess />
      <UFQuestions />
      <UFDoor />
      <UFFooter />
    </div>
  );
}
