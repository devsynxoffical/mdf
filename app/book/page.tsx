import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import BookCallPage from "@/components/pages/BookCallPage";
import UFFooter from "@/components/uf/UFFooter";

export const metadata: Metadata = pageMetadata({
  path: "/book",
  title: "Book a Call — Million Dollar Funnel™",
  description:
    "Book a strategy call for the Million Dollar Funnel™ system. 100% risk-free. Performance-backed.",
});

export default function BookPage() {
  return (
    <>
      <BookCallPage />
      <UFFooter />
    </>
  );
}
