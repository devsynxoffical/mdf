import type { Metadata } from "next";
import AboutPage from "@/components/pages/AboutPage";
import UFFooter from "@/components/uf/UFFooter";

export const metadata: Metadata = {
  title: "About — Million Dollar Funnel™",
  description:
    "Gaurav Kapoor — Founder of Million Dollar Funnel™. $35M+ Facebook ad spend. 500+ businesses scaled.",
};

export default function Page() {
  return (
    <>
      <AboutPage />
      <UFFooter />
    </>
  );
}
