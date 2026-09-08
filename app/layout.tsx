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
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.ico",
    apple: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="mdf-booting" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function () {
                try { sessionStorage.removeItem('mdf-intro-seen'); } catch (e) {}

                // Patch DOM removeChild to prevent React crash when extensions or translations alter text nodes
                if (typeof Node !== 'undefined' && Node.prototype) {
                  const origRemove = Node.prototype.removeChild;
                  Node.prototype.removeChild = function (child) {
                    if (child && child.parentNode !== this) {
                      if (child.parentNode) {
                        return child.parentNode.removeChild(child);
                      }
                      return child;
                    }
                    return origRemove.call(this, child);
                  };

                  const origInsert = Node.prototype.insertBefore;
                  Node.prototype.insertBefore = function (newNode, refNode) {
                    if (refNode && refNode.parentNode !== this) {
                      if (refNode.parentNode) {
                        return refNode.parentNode.insertBefore(newNode, refNode);
                      }
                      return newNode;
                    }
                    return origInsert.call(this, newNode, refNode);
                  };
                }

                window.addEventListener('error', function(e) {
                  if (e.filename && e.filename.indexOf('chrome-extension://') !== -1) {
                    e.stopImmediatePropagation();
                    e.preventDefault();
                  }
                  if (e.message && e.message.indexOf("Failed to execute 'removeChild' on 'Node'") !== -1) {
                    e.stopImmediatePropagation();
                    e.preventDefault();
                  }
                }, true);

                window.addEventListener('unhandledrejection', function(e) {
                  if (e.reason && (e.reason.stack || '').indexOf('chrome-extension://') !== -1) {
                    e.stopImmediatePropagation();
                    e.preventDefault();
                  }
                  if (e.reason && String(e.reason).indexOf("removeChild") !== -1) {
                    e.stopImmediatePropagation();
                    e.preventDefault();
                  }
                }, true);
              })();
            `,
          }}
        />
      </head>
      <body className="bg-[#000000] font-sans text-white selection:bg-[#1254EC]/40 selection:text-white" suppressHydrationWarning>
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
