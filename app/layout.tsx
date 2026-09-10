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
      { url: "/favicon.png", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="mdf-booting" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/favicon.png" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function () {
                try {
                  if (sessionStorage.getItem('mdf-intro-seen') === '1' || window.location.pathname !== '/') {
                    document.documentElement.classList.remove('mdf-booting');
                  }
                } catch (e) {}

                // Patch DOM removeChild and insertBefore to prevent React crash when GSAP or extensions alter DOM
                if (typeof Node !== 'undefined' && Node.prototype) {
                  const origRemove = Node.prototype.removeChild;
                  Node.prototype.removeChild = function (child) {
                    try {
                      if (child && child.parentNode !== this) {
                        if (child.parentNode) {
                          return child.parentNode.removeChild(child);
                        }
                        return child;
                      }
                      return origRemove.call(this, child);
                    } catch (e) {
                      return child;
                    }
                  };

                  const origInsert = Node.prototype.insertBefore;
                  Node.prototype.insertBefore = function (newNode, refNode) {
                    try {
                      if (refNode && refNode.parentNode !== this) {
                        if (refNode.parentNode) {
                          return refNode.parentNode.insertBefore(newNode, refNode);
                        }
                        return this.appendChild(newNode);
                      }
                      return origInsert.call(this, newNode, refNode);
                    } catch (e) {
                      try {
                        return this.appendChild(newNode);
                      } catch (e2) {
                        return newNode;
                      }
                    }
                  };
                }

                window.addEventListener('error', function(e) {
                  if (e.filename && e.filename.indexOf('chrome-extension://') !== -1) {
                    e.stopImmediatePropagation();
                    e.preventDefault();
                  }
                  if (e.message && (e.message.indexOf("removeChild") !== -1 || e.message.indexOf("insertBefore") !== -1)) {
                    e.stopImmediatePropagation();
                    e.preventDefault();
                  }
                }, true);

                window.addEventListener('unhandledrejection', function(e) {
                  if (e.reason && (e.reason.stack || '').indexOf('chrome-extension://') !== -1) {
                    e.stopImmediatePropagation();
                    e.preventDefault();
                  }
                  if (e.reason && (String(e.reason).indexOf("removeChild") !== -1 || String(e.reason).indexOf("insertBefore") !== -1)) {
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
