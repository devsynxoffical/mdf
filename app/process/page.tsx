import type { Metadata } from "next";
import ProcessPage from "@/components/pages/ProcessPage";
import UFFooter from "@/components/uf/UFFooter";

export const metadata: Metadata = {
  title: "Process — Million Dollar Funnel™",
  description:
    "How we build the Million Dollar Funnel™ — from offer mapping to launch and compounding.",
};

export default function Page() {
  return (
    <>
      <ProcessPage />
      <UFFooter />
    </>
  );
}
