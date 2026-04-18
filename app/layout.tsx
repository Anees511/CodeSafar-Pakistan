import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import Script from "next/script";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { getAbsoluteUrl, siteConfig } from "@/lib/utils";

import "../styles/globals.css";
import "highlight.js/styles/github-dark.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-heading",
  display: "swap",
});

const gaId = process.env.NEXT_PUBLIC_GA4_ID ?? "";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  alternates: {
    canonical: getAbsoluteUrl("/"),
  },
  keywords: [
    "Pakistan",
    "coding for students",
    "programming tutorials",
    "freelancing",
    "tech career",
    "JavaScript",
    "Node.js",
  ],
  openGraph: {
    title: `${siteConfig.name} | ${siteConfig.tagline}`,
    description: siteConfig.description,
    url: getAbsoluteUrl("/"),
    siteName: siteConfig.name,
    type: "website",
    locale: "en_PK",
    images: [
      {
        url: getAbsoluteUrl("/images/og-default.png"),
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: [getAbsoluteUrl("/images/og-default.png")],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${poppins.variable} min-h-screen bg-background font-body text-textPrimary antialiased dark:bg-slate-950 dark:text-slate-100`}
      >
        <Script id="theme-init" strategy="beforeInteractive">{`
          (function () {
            try {
              var stored = localStorage.getItem('theme');
              var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
              var useDark = stored ? stored === 'dark' : prefersDark;
              if (useDark) {
                document.documentElement.classList.add('dark');
              } else {
                document.documentElement.classList.remove('dark');
              }
            } catch (error) {
              document.documentElement.classList.remove('dark');
            }
          })();
        `}</Script>

        <Header />
        <main>{children}</main>
        <Footer />

        {gaId && gaId !== "G-XXXXXXXXXX" && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="ga4" strategy="afterInteractive">{`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gaId}');
            `}</Script>
          </>
        )}
      </body>
    </html>
  );
}
