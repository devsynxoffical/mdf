import type { Metadata } from "next";
import FunnelsPage from "@/components/pages/FunnelsPage";
import UFFooter from "@/components/uf/UFFooter";

export const metadata: Metadata = {
  title: "Funnel Designs — Million Dollar Funnel™",
  description:
    "Funnel Systems builds, the six-layer Million Dollar Funnel™ System, and full client architectures — from ad click to booked call.",
};

export default function Page() {
  return (
    <>
      <FunnelsPage />
      <UFFooter />
    </>
  );
}
