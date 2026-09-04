import type { Metadata } from "next";
import "./globals.css";
import ScrollProvider from "@/components/providers/ScrollProvider";
import MinimalNav from "@/components/MinimalNav";
import Grain from "@/components/uf/Grain";
import SoundToggle from "@/components/audio/SoundToggle";
import StartScreen from "@/components/uf/StartScreen";

export const metadata: Metadata = {
  title: "Million Dollar Funnel™ — Predictable High-Ticket Client Acquisition",
  description:
    "We build you a predictable high-ticket client acquisition system with the Million Dollar Funnel™ — without raising ad spend, hiring setters, or touching the tech yourself.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="mdf-booting">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function () {
                try { sessionStorage.removeItem('mdf-intro-seen'); } catch (e) {}
                // Guard against browser extensions / race conditions that detach
                // nodes before React's reconciler calls removeChild.
                try {
                  var orig = Node.prototype.removeChild;
                  Node.prototype.removeChild = function (child) {
                    if (child && child.parentNode !== this) {
                      return child;
                    }
                    return orig.apply(this, arguments);
                  };
                } catch (e) {}
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
              })();
            `,
          }}
        />
      </head>
      <body className="bg-[#000000] font-sans text-white selection:bg-[#1254EC]/40 selection:text-white">
        <ScrollProvider>
          <StartScreen />
          <Grain />
          <MinimalNav />
          <main className="relative">{children}</main>
          <SoundToggle />
        </ScrollProvider>
      </body>
    </html>
  );
}
