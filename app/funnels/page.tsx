import type { Metadata } from "next";
import FunnelsPage from "@/components/pages/FunnelsPage";
import UFFooter from "@/components/uf/UFFooter";

export const metadata: Metadata = {
  title: "Funnel Designs — Million Dollar Funnel™",
  description:
    "The results we bring are proven through our funnel designs — eight live client architectures from mortgage to high-ticket B2B.",
};

export default function Page() {
  return (
    <>
      <FunnelsPage />
      <UFFooter />
    </>
  );
}
