import type { Metadata } from "next";
import "./globals.css";
import ScrollProvider from "@/components/providers/ScrollProvider";
import FunnelCanvas from "@/components/canvas/FunnelCanvas";
import Nav from "@/components/Nav";

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
          {/* The one shared canvas — fixed behind everything for the entire scroll */}
          <FunnelCanvas />
          <Nav />
          <main className="relative z-10">{children}</main>
        </ScrollProvider>
      </body>
    </html>
  );
}
