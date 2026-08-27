import UFHero from "@/components/uf/UFHero";
import UFStatement from "@/components/uf/UFStatement";
import UFLeaks from "@/components/uf/UFLeaks";
import UFHeadcount from "@/components/uf/UFHeadcount";
import UFOpinions from "@/components/uf/UFOpinions";
import UFBuilt from "@/components/uf/UFBuilt";
import UFProcess from "@/components/uf/UFProcess";
import UFDoor from "@/components/uf/UFDoor";

export default function Home() {
  return (
    <div id="top">
      <UFHero />
      <UFStatement />
      <UFLeaks />
      <UFHeadcount />
      <UFOpinions />
      <UFBuilt />
      <UFProcess />
      <UFDoor />
    </div>
  );
}
