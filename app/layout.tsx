import type { Metadata } from "next";
import "./globals.css";
import ScrollProvider from "@/components/providers/ScrollProvider";
import MinimalNav from "@/components/MinimalNav";
import Grain from "@/components/uf/Grain";

export const metadata: Metadata = {
  title: "Million Dollar Funnel™ — Predictable High-Ticket Client Acquisition",
  description:
    "We build you a predictable high-ticket client acquisition system with the Million Dollar Funnel™ — without raising ad spend, hiring setters, or touching the tech yourself.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="bg-ink text-bone">
        <ScrollProvider>
          <Grain />
          <MinimalNav />
          <main className="relative">{children}</main>
        </ScrollProvider>
      </body>
    </html>
  );
}
