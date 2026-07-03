import type { Metadata } from "next";
import type { Project } from "@/lib/projects";

export const SITE_URL = "https://jeremysdemers.com";

const DEFAULT_SOCIAL_IMAGE = {
  url: "/images/portfolio-site-social-preview.jpg",
  width: 1280,
  height: 640,
  alt: "Jeremy Demers, full-stack and AI engineer",
};

const projectSocialImages: Partial<Record<Project["slug"], typeof DEFAULT_SOCIAL_IMAGE>> = {
  "financial-advisor": {
    url: "/images/jd-financial-advisor.webp",
    width: 1000,
    height: 563,
    alt: "Multi-agent financial intelligence platform",
  },
  "lle-analysis": {
    url: "/images/lle-analysis-processing.webp",
    width: 1000,
    height: 465,
    alt: "LLE vial computer-vision analysis interface",
  },
};

const applicationCategories: Record<Project["slug"], string> = {
  "financial-advisor": "FinanceApplication",
  tetris: "GameApplication",
  "neon-shatter": "GameApplication",
  "digital-twin": "WebApplication",
  "lle-analysis": "DeveloperApplication",
  "empower-api": "DeveloperApplication",
};

const operatingSystems: Record<Project["slug"], string> = {
  "financial-advisor": "Web browser",
  tetris: "Web browser",
  "neon-shatter": "Web browser",
  "digital-twin": "Web browser",
  "lle-analysis": "Cross-platform",
  "empower-api": "Cross-platform",
};

export function projectMetadata(project: Project): Metadata {
  const canonicalUrl = new URL(project.href, SITE_URL).toString();
  const socialTitle = `${project.name} | Jeremy Demers`;
  const socialImage = projectSocialImages[project.slug] ?? DEFAULT_SOCIAL_IMAGE;

  return {
    title: project.name,
    description: project.summary,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: socialTitle,
      description: project.summary,
      url: canonicalUrl,
      siteName: "Jeremy Demers",
      type: "website",
      images: [socialImage],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description: project.summary,
      images: [socialImage.url],
    },
  };
}

export function softwareApplicationStructuredData(project: Project) {
  const isGame = project.slug === "tetris" || project.slug === "neon-shatter";

  return {
    "@context": "https://schema.org",
    "@type": isGame ? ["VideoGame", "WebApplication"] : "SoftwareApplication",
    name: project.name,
    description: project.summary,
    url: new URL(project.href, SITE_URL).toString(),
    applicationCategory: applicationCategories[project.slug],
    operatingSystem: operatingSystems[project.slug],
    isAccessibleForFree: true,
    codeRepository: project.source,
    author: {
      "@type": "Person",
      "@id": `${SITE_URL}/#jeremy-demers`,
      name: "Jeremy Demers",
      url: `${SITE_URL}/`,
    },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };
}

export const profileStructuredData = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "@id": `${SITE_URL}/#profile-page`,
  url: `${SITE_URL}/`,
  name: "Jeremy Demers | Full-stack and AI engineer",
  mainEntity: {
    "@type": "Person",
    "@id": `${SITE_URL}/#jeremy-demers`,
    name: "Jeremy Demers",
    url: `${SITE_URL}/`,
    jobTitle: "Full-stack and AI engineer",
    description:
      "Developer building multi-agent AI platforms, computer-vision systems, interactive applications, and serverless products on AWS.",
    sameAs: [
      "https://github.com/JeremyDemers",
      "https://www.linkedin.com/in/jeremy-demers/",
    ],
    knowsAbout: [
      "Full-stack development",
      "Multi-agent artificial intelligence",
      "Computer vision",
      "Serverless AWS architecture",
      "Interactive web applications",
    ],
  },
};
