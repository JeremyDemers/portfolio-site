import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import "./globals.css";

const geist = Geist({ variable: "--font-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://jeremysdemers.com"),
  title: {
    default: "Jeremy Demers | Full-stack developer",
    template: "%s | Jeremy Demers",
  },
  description:
    "Full-stack developer building interactive applications, generative AI experiences, and serverless systems on AWS.",
  openGraph: {
    title: "Jeremy Demers | Full-stack developer",
    description: "Interactive applications, generative AI, and serverless systems on AWS.",
    url: "https://jeremysdemers.com",
    siteName: "Jeremy Demers",
    type: "website",
    images: [
      {
        url: "/images/portfolio-site-social-preview.jpg",
        width: 1280,
        height: 640,
        alt: "Jeremy Demers — full-stack developer, AWS builder, and creative technologist",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jeremy Demers | Full-stack developer",
    description: "Interactive applications, generative AI, and serverless systems on AWS.",
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
      </body>
    </html>
  );
}
