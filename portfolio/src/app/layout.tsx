import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";
import "./hero.css";
import "./contacts.css";
import "./portfolio.css";
import "./footer-glow.css";
import "./squircle-fixes.css";
import "./switch-transition.css";
import "./agency.css";
import "./liquid-glass.css";
import "./dark-mode.css";
import "./gallery.css";
import "./case-study.css";
import { PageSplash } from "@/components/PageSplash";

export const metadata: Metadata = {
  title: "Paolo Pirruccio — Designer & Web Studio",
  description: "Portfolio personale e studio indipendente di web design e sviluppo.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8f8f8" },
    { media: "(prefers-color-scheme: dark)", color: "#111111" },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="it"><head><link rel="preload" href="/fonts/inter-latin-400-600.woff2" as="font" type="font/woff2" crossOrigin="anonymous"/><link rel="preload" href="/fonts/instrument-serif-latin-400.woff2" as="font" type="font/woff2" crossOrigin="anonymous"/><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"/></head><body><PageSplash/>{children}<Script type="module" src="https://static.cloudflareinsights.com/beacon.min.js" data-cf-beacon='{"token":"2ab35730e3314c2687c22fb5f629a86a"}' strategy="lazyOnload" /></body></html>;
}
