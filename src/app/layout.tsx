import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Archivo, Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import IntroProvider from "@/components/IntroProvider";
import Cursor from "@/components/Cursor";
import ScrollFx from "@/components/ScrollFx";
import { LangProvider } from "@/components/LangProvider";
import { content, site } from "@/content/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  axes: ["wdth"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: {
    default: `${site.firstName} ${site.lastName} — Portfolio`,
    template: `%s — ${site.firstName} ${site.lastName}`,
  },
  description: `${content.de.role} — Portfolio von ${site.firstName} ${site.lastName}`,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="de"
      className={`${geistSans.variable} ${geistMono.variable} ${archivo.variable} ${instrumentSerif.variable} antialiased`}
    >
      <body>
        <SmoothScroll>
          <ScrollFx />
          <LangProvider>
            <IntroProvider>
              <Navbar />
              {children}
            </IntroProvider>
          </LangProvider>
        </SmoothScroll>
        <Cursor />
        <Analytics />
      </body>
    </html>
  );
}
