import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./components/ThemeProvider";
import GoogleAnalytics from "./components/GoogleAnalytics";
import { Suspense } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "AppMarket | Discover & Invest in Emerging Opportunities",
    template: "%s | AppMarket"
  },
  description: "The premier marketplace for discovering, rating, and investing in the next generation of applications, hotels, and educational institutions.",
  keywords: ["investment", "apps", "hospitality", "hotels", "universities", "marketplace", "equity"],
  authors: [{ name: "AppMarket Team" }],
  creator: "AppMarket",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://appmarket.vercel.app/",
    title: "AppMarket | Discover & Invest in Emerging Opportunities",
    description: "The premier marketplace for discovering, rating, and investing in the next generation of applications, hotels, and educational institutions.",
    siteName: "AppMarket",
  },
  twitter: {
    card: "summary_large_image",
    title: "AppMarket | Discover & Invest in Emerging Opportunities",
    description: "The premier marketplace for discovering, rating, and investing in the next generation of applications, hotels, and educational institutions.",
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Suspense fallback={null}>
            <GoogleAnalytics GA_MEASUREMENT_ID={process.env.NEXT_PUBLIC_GA_ID || ""} />
          </Suspense>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
