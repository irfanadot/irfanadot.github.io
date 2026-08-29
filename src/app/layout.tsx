import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import { portfolio } from "@/data/portfolio";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(portfolio.site.domain),
  title: portfolio.site.title,
  description: portfolio.site.description,
  alternates: { canonical: "/" },
  authors: [{ name: portfolio.site.name, url: portfolio.site.domain }],
  creator: portfolio.site.name,
  openGraph: {
    type: "profile",
    url: "/",
    title: portfolio.site.title,
    description: portfolio.site.description,
    siteName: portfolio.site.name,
    locale: "en_US",
    images: [{ url: portfolio.assets.ogImage, width: 1200, height: 630, alt: portfolio.site.title }],
  },
  twitter: {
    card: "summary_large_image",
    title: portfolio.site.title,
    description: portfolio.site.description,
    images: [portfolio.assets.ogImage],
  },
  icons: { icon: portfolio.assets.favicon },
  category: "technology",
};

export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: "#f6f5f1",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={geist.variable}>
      <body>{children}</body>
    </html>
  );
}
