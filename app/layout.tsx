import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { SITE_URL } from "@/lib/seo";
import "./globals.css";

const GOOGLE_ANALYTICS_ID = "G-S1NM72K1Q4";

const geist = Geist({ variable: "--font-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Jeremy Demers | Full-stack & AI engineer",
    template: "%s | Jeremy Demers",
  },
  description:
    "Full-stack and AI engineer building multi-agent platforms, computer-vision systems, interactive applications, and serverless products on AWS.",
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: "Jeremy Demers | Full-stack & AI engineer",
    description: "Multi-agent AI, computer vision, interactive applications, and serverless systems on AWS.",
    url: SITE_URL,
    siteName: "Jeremy Demers",
    type: "website",
    images: [
      {
        url: "/images/portfolio-site-social-preview.jpg",
        width: 1280,
        height: 640,
        alt: "Jeremy Demers, full-stack and AI engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jeremy Demers | Full-stack & AI engineer",
    description: "Multi-agent AI, computer vision, interactive applications, and serverless systems on AWS.",
    images: ["/images/portfolio-site-social-preview.jpg"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable}`}>
      <body id="top">
        <a className="skip-link" href="#main-content">Skip to content</a>
        <SiteHeader />
        <div id="main-content">{children}</div>
        <SiteFooter />
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ANALYTICS_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GOOGLE_ANALYTICS_ID}');
          `}
        </Script>
      </body>
    </html>
  );
}
