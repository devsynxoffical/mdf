import type { Metadata } from "next";
import "./globals.css";
import ScrollProvider from "@/components/providers/ScrollProvider";
import MinimalNav from "@/components/MinimalNav";
import Grain from "@/components/uf/Grain";
import SoundToggle from "@/components/audio/SoundToggle";

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
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.addEventListener('error', function(e) {
                if (e.filename && e.filename.indexOf('chrome-extension://') !== -1) {
                  e.stopImmediatePropagation();
                  e.preventDefault();
                }
              }, true);
              window.addEventListener('unhandledrejection', function(e) {
                if (e.reason && (e.reason.stack || '').indexOf('chrome-extension://') !== -1) {
                  e.stopImmediatePropagation();
                  e.preventDefault();
                }
              }, true);
            `,
          }}
        />
      </head>
      <body className="bg-[#000000] font-sans text-white selection:bg-[#1254EC]/40 selection:text-white">
        <ScrollProvider>
          <Grain />
          <MinimalNav />
          <main className="relative">{children}</main>
          <SoundToggle />
        </ScrollProvider>
      </body>
    </html>
  );
}
