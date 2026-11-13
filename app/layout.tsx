import type { Metadata } from "next";
import "./globals.css";
import ScrollProvider from "@/components/providers/ScrollProvider";
import MinimalNav from "@/components/MinimalNav";
import Grain from "@/components/uf/Grain";
import SoundToggle from "@/components/audio/SoundToggle";
import StartScreen from "@/components/uf/StartScreen";
import JsonLd from "@/components/seo/JsonLd";
import { SEO, SITE_URL, siteJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Million Dollar Funnel™ — Predictable High-Ticket Client Acquisition",
    template: "%s",
  },
  description:
    "We build you a predictable high-ticket client acquisition system with the Million Dollar Funnel™ — without raising ad spend, hiring setters, or touching the tech yourself.",
  applicationName: SEO.name,
  keywords: SEO.keywords,
  authors: [{ name: SEO.name, url: SITE_URL }],
  creator: SEO.name,
  publisher: SEO.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: SEO.name,
    title: "Million Dollar Funnel™ — Predictable High-Ticket Client Acquisition",
    description: SEO.description,
    images: [{ url: SEO.ogImage, width: 1200, height: 630, alt: SEO.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Million Dollar Funnel™ — Predictable High-Ticket Client Acquisition",
    description: SEO.description,
    images: [SEO.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  category: "business",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.png", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: "/favicon.png",
  },
  manifest: "/site.webmanifest",
  verification: {
    google: "31uRlYDrv59uI7OGYd-uiu9t8uP9w0Acz5UMCMwfj9I",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/favicon.png" />
        <link rel="alternate" type="text/plain" href="/llms.txt" title="LLM summary" />
        <JsonLd data={siteJsonLd()} />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function () {
                try {
                  document.documentElement.classList.remove('mdf-booting');
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
