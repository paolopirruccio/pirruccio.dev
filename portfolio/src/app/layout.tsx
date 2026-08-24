import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "Paolo Pirruccio — Designer & Web Studio",
  description: "Portfolio personale e studio indipendente di web design e sviluppo.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="it"><head><link rel="preconnect" href="https://fonts.googleapis.com"/><link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/><link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@400;500;600&display=swap" rel="stylesheet"/><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"/></head><body>{children}</body></html>;
}
