import type { Metadata } from "next";
import type { Project } from "@/lib/projects";

export const SITE_URL = "https://jeremysdemers.com";
export const SITE_NAME = "Jeremy Demers";
export const PERSON_NAME = "Jeremy Demers";
export const DEFAULT_TITLE = "Jeremy Demers | Software & AI Consulting";
export const DEFAULT_DESCRIPTION =
  "Software and AI consultant building full-stack applications, multi-agent platforms, computer-vision systems, and serverless products on AWS.";

export const DEFAULT_SOCIAL_IMAGE = {
  url: "/images/portfolio-site-social-preview.jpg",
  width: 1280,
  height: 640,
  alt: "Jeremy Demers, full-stack and AI engineer",
};

export function absoluteUrl(path = "/") {
  return new URL(path, `${SITE_URL}/`).toString();
}

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

const projectMetadataOverrides: Partial<
  Record<Project["slug"], { title: string; description: string }>
> = {
  "financial-advisor": {
    title: "jd Financial Advisor AI Platform",
    description:
      "Multi-agent financial planning platform by Jeremy Demers using Next.js, FastAPI, AWS Lambda, Aurora, S3 vectors, SageMaker, and Amazon Bedrock.",
  },
  tetris: {
    title: "Tetris Browser Game",
    description:
      "Play Jeremy Demers' polished browser Tetris game with responsive controls, accounts, score persistence, and competitive leaderboards.",
  },
  "neon-shatter": {
    title: "Neon Shatter Browser Game",
    description:
      "Play Neon Shatter, Jeremy Demers' canvas arcade game with sector progression, combo scoring, touch controls, accounts, and leaderboards.",
  },
  "digital-twin": {
    title: "Digital Twin for Recruiters",
    description:
      "Talk with Jeremy Demers' Digital Twin to learn about his AWS, AI, Python, C#, full-stack engineering, and product implementation experience.",
  },
  "lle-analysis": {
    title: "LLE Vial Analysis Computer Vision",
    description:
      "Computer-vision laboratory automation case study by Jeremy Demers for vial capture, liquid-layer detection, volume estimates, and reports.",
  },
  "empower-api": {
    title: "Empower API Case Study",
    description:
      "ASP.NET Core 8 and Oracle API case study by Jeremy Demers for querying Waters Empower 3 data with schema tracking and container deployment.",
  },
};

function projectKeywords(project: Project) {
  return [
    project.name,
    project.eyebrow,
    "Jeremy Demers",
    "software consultant",
    "AI consultant",
    ...project.tech,
  ];
}

export function projectMetadata(project: Project): Metadata {
  const canonicalUrl = absoluteUrl(project.href);
  const override = projectMetadataOverrides[project.slug];
  const title = override?.title ?? project.name;
  const description = override?.description ?? project.summary;
  const socialTitle = `${title} | ${PERSON_NAME}`;
  const socialImage = projectSocialImages[project.slug] ?? DEFAULT_SOCIAL_IMAGE;

  return {
    title,
    description,
    keywords: projectKeywords(project),
    authors: [{ name: PERSON_NAME, url: absoluteUrl("/") }],
    creator: PERSON_NAME,
    publisher: PERSON_NAME,
    category: project.eyebrow,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: socialTitle,
      description,
      url: canonicalUrl,
      siteName: SITE_NAME,
      type: "website",
      images: [socialImage],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [socialImage.url],
    },
  };
}

function softwareApplicationNode(project: Project) {
  const isGame = project.slug === "tetris" || project.slug === "neon-shatter";
  const socialImage = projectSocialImages[project.slug] ?? DEFAULT_SOCIAL_IMAGE;

  return {
    "@type": isGame ? ["VideoGame", "WebApplication"] : "SoftwareApplication",
    "@id": `${absoluteUrl(project.href)}#software`,
    name: project.name,
    description: project.summary,
    url: absoluteUrl(project.href),
    image: absoluteUrl(socialImage.url),
    applicationCategory: applicationCategories[project.slug],
    operatingSystem: operatingSystems[project.slug],
    isAccessibleForFree: true,
    codeRepository: project.source,
    author: {
      "@type": "Person",
      "@id": `${SITE_URL}/#jeremy-demers`,
      name: PERSON_NAME,
      url: absoluteUrl("/"),
    },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };
}

export function softwareApplicationStructuredData(project: Project) {
  return {
    "@context": "https://schema.org",
    ...softwareApplicationNode(project),
  };
}

export function breadcrumbStructuredData(items: Array<{ name: string; href: string }>) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.href),
    })),
  };
}

export function projectPageStructuredData(project: Project) {
  const section =
    project.href.startsWith("/games/")
      ? { name: "Games", href: "/#work" }
      : project.href.startsWith("/projects/")
        ? { name: "Projects", href: "/#work" }
        : undefined;
  const breadcrumbItems = [
    { name: "Home", href: "/" },
    ...(section ? [section] : []),
    { name: project.name, href: project.href },
  ];

  return {
    "@context": "https://schema.org",
    "@graph": [
      softwareApplicationNode(project),
      breadcrumbStructuredData(breadcrumbItems),
    ],
  };
}

const websiteStructuredData = {
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: absoluteUrl("/"),
  name: SITE_NAME,
  description: DEFAULT_DESCRIPTION,
  inLanguage: "en-US",
  publisher: {
    "@id": `${SITE_URL}/#jeremy-demers`,
  },
};

const personStructuredData = {
  "@type": "Person",
  "@id": `${SITE_URL}/#jeremy-demers`,
  name: PERSON_NAME,
  url: absoluteUrl("/"),
  email: "mailto:JeremySD99@gmail.com",
  jobTitle: "Software and AI consultant",
  description:
    "Software and AI consultant building multi-agent AI platforms, computer-vision systems, interactive applications, and serverless products on AWS.",
  sameAs: [
    "https://github.com/JeremyDemers",
    "https://www.linkedin.com/in/jeremy-demers/",
  ],
  knowsAbout: [
    "Software consulting",
    "AI consulting",
    "Full-stack development",
    "Multi-agent artificial intelligence",
    "Computer vision",
    "Serverless AWS architecture",
    "Interactive web applications",
  ],
};

const profilePageStructuredData = {
  "@type": "ProfilePage",
  "@id": `${SITE_URL}/#profile-page`,
  url: absoluteUrl("/"),
  name: DEFAULT_TITLE,
  description:
    "Portfolio and consulting site for Jeremy Demers, a software and AI consultant building full-stack applications, AI workflows, and serverless AWS systems.",
  mainEntity: {
    "@id": `${SITE_URL}/#jeremy-demers`,
  },
};

export const consultingServiceStructuredData = {
  "@type": "Service",
  "@id": `${SITE_URL}/#software-ai-consulting`,
  name: "Jeremy S. Demers — Software / AI Consulting",
  url: `${SITE_URL}/#services`,
  description:
    "Remote-first software and AI consulting for full-stack applications, applied AI prototypes, cloud architecture, automation, and serverless AWS systems.",
  provider: {
    "@id": `${SITE_URL}/#jeremy-demers`,
  },
  areaServed: {
    "@type": "Country",
    name: "United States",
  },
  availableChannel: {
    "@type": "ServiceChannel",
    serviceUrl: `${SITE_URL}/#contact`,
    availableLanguage: "English",
  },
  serviceType: [
    "Software consulting",
    "AI consulting",
    "Full-stack web application development",
    "Serverless AWS architecture",
    "Applied AI and automation prototyping",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Software and AI consulting services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Software / AI consulting",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Full-stack implementation",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Cloud architecture and automation",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Applied AI and interactive prototypes",
        },
      },
    ],
  },
};

export const homepageStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    websiteStructuredData,
    profilePageStructuredData,
    personStructuredData,
    consultingServiceStructuredData,
  ],
};

export const profileStructuredData = homepageStructuredData;
