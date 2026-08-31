import type { Metadata } from "next";
import FaqPage from "@/components/pages/FaqPage";
import UFFooter from "@/components/uf/UFFooter";

export const metadata: Metadata = {
  title: "FAQ — Million Dollar Funnel™",
  description:
    "Frequently asked questions about the Million Dollar Funnel™ system, what’s included, and how we work.",
};

export default function Page() {
  return (
    <>
      <FaqPage />
      <UFFooter />
    </>
  );
}
