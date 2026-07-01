export type Project = {
  slug: "tetris" | "neon-shatter" | "digital-twin" | "lle-analysis" | "empower-api" | "financial-advisor";
  name: string;
  eyebrow: string;
  summary: string;
  description: string;
  href: string;
  source: string;
  video?: string;
  visual: "tetris" | "shatter" | "twin" | "lle" | "api" | "finance";
  external?: boolean;
  tech: string[];
  highlights: string[];
  architecture: string[];
};

export const projects: Project[] = [
  {
    slug: "financial-advisor",
    name: "jd Financial Advisor",
    eyebrow: "Multi-agent financial intelligence",
    summary:
      "A production-oriented financial planning platform where five specialized AI agents collaborate on portfolio reports, charts, classification, and retirement projections.",
    description:
      "jd Financial Advisor combines a Next.js product interface with FastAPI services and a five-agent analysis workflow. AWS Lambda, SQS, Aurora Serverless, S3 vector search, SageMaker embeddings, and Amazon Bedrock support asynchronous planning with authenticated, per-user portfolio data.",
    href: "https://github.com/JeremyDemers/jd_financial_advisor",
    source: "https://github.com/JeremyDemers/jd_financial_advisor",
    visual: "finance",
    external: true,
    tech: ["Next.js", "FastAPI", "Amazon Bedrock", "AWS Lambda", "Aurora", "Terraform"],
    highlights: [
      "Five specialized agents orchestrate portfolio analysis, reporting, charting, classification, and retirement planning",
      "Asynchronous analysis jobs run through AWS Lambda and SQS",
      "Aurora Serverless and Clerk provide persistent, per-user portfolio data",
      "S3 vector search, SageMaker embeddings, and CloudWatch support retrieval and observability",
    ],
    architecture: [
      "Next.js, CloudFront, and Clerk authentication",
      "API Gateway, FastAPI Lambda, SQS, and five analysis agents",
      "Amazon Bedrock, SageMaker, S3 Vectors, and Aurora Serverless",
    ],
  },
  {
    slug: "tetris",
    name: "Tetris",
    eyebrow: "Full-stack arcade game",
    summary:
      "A polished browser game with responsive controls, player accounts, score persistence, and competitive leaderboards.",
    description:
      "This is a complete implementation of modern Tetris wrapped in a product-style experience. It combines a carefully tuned React game loop with authentication, automatic score submission, player statistics, and keyboard and touch controls.",
    href: "/games/tetris/",
    source: "https://github.com/JeremyDemers/arcade/tree/main/tetris",
    visual: "tetris",
    tech: ["Next.js", "React", "TypeScript", "FastAPI", "Python", "Google Identity"],
    highlights: [
      "Hold queue, ghost piece, next-piece preview, and seven-bag generation",
      "Keyboard, pointer, and mobile-friendly on-screen controls",
      "Automatic score submission with top-ten and personal statistics",
      "Google authentication with server-side identity verification",
    ],
    architecture: ["Next.js game client", "FastAPI application API", "Shared arcade identity and score data"],
  },
  {
    slug: "neon-shatter",
    name: "Neon Shatter",
    eyebrow: "Canvas game engineering",
    summary:
      "A neon brick-breaker with escalating sectors, combo scoring, touch controls, accounts, and leaderboards.",
    description:
      "Neon Shatter is an original arcade experience built around responsive canvas rendering and a deliberately tactile game feel. Reinforced bricks, increasing ball speed, sector progression, and combo scoring create a compact but replayable challenge.",
    href: "/games/neon-shatter/",
    source: "https://github.com/JeremyDemers/arcade/tree/main/neon-shatter",
    visual: "shatter",
    tech: ["Next.js", "Canvas", "TypeScript", "FastAPI", "Web Audio", "Touch input"],
    highlights: [
      "Responsive canvas gameplay across desktop and mobile displays",
      "Sector progression, reinforced bricks, combos, and increasing speed",
      "Procedural visual effects and Web Audio feedback",
      "Shared account, leaderboard, and personal-statistics experience",
    ],
    architecture: ["React interface and canvas engine", "FastAPI application API", "Shared arcade identity and score data"],
  },
  {
    slug: "digital-twin",
    name: "Digital Twin",
    eyebrow: "Generative AI on AWS",
    summary:
      "A conversational professional twin grounded in curated experience, project history, and communication style.",
    description:
      "The Digital Twin turns professional context into an approachable conversation. A statically exported Next.js client talks to a serverless FastAPI backend, which uses Amazon Bedrock for generation and Amazon S3 for session memory.",
    href: "/digital-twin/",
    source: "https://github.com/JeremyDemers/digital-twin",
    visual: "twin",
    tech: ["Amazon Bedrock", "AWS Lambda", "API Gateway", "Next.js", "FastAPI", "Terraform"],
    highlights: [
      "Grounded responses using curated professional facts and writing style",
      "Persistent conversation sessions with local and AWS storage adapters",
      "Responsive chat interface with Markdown and suggested prompts",
      "Fully described serverless infrastructure managed with Terraform",
    ],
    architecture: ["CloudFront and static Next.js export", "API Gateway and Lambda", "Amazon Bedrock and private S3 memory"],
  },
  {
    slug: "lle-analysis",
    name: "LLE Vial Analysis",
    eyebrow: "Computer vision & lab automation",
    summary:
      "A hardware-integrated vision system that captures extraction vials, identifies liquid layers and menisci, estimates volumes, and generates laboratory reports.",
    description:
      "LLE Vial Analysis combines a custom camera and lighting assembly with a trained PyTorch detector and a Flask control interface. The system follows a 48-position plate workflow, measures liquid-liquid extraction layers, flags unsuitable samples, and turns each run into annotated images, Excel reports, and structured data.",
    href: "https://github.com/JeremyDemers/LLE-Analysis",
    source: "https://github.com/JeremyDemers/LLE-Analysis",
    video: "https://youtu.be/jF45N3MsKkI",
    visual: "lle",
    external: true,
    tech: ["Python", "PyTorch", "OpenCV", "Flask", "Socket.IO", "SQLite"],
    highlights: [
      "Custom-trained object detection for vials, liquid layers, menisci, residue, and rag layers",
      "Motion-aware image capture integrated with a 48-position laboratory workflow",
      "Pixel-to-volume calculations, annotated images, and generated Excel reports",
      "Custom 3D-printed camera mount and controlled lighting for repeatable inspection",
    ],
    architecture: [
      "Camera, lighting, and motion-aware capture",
      "PyTorch detection and OpenCV measurement pipeline",
      "Flask interface, Socket.IO progress, Excel, email, and SQLite outputs",
    ],
  },
  {
    slug: "empower-api",
    name: "Empower API",
    eyebrow: "Enterprise data integration",
    summary:
      "An ASP.NET Core 8 API for querying Waters Empower 3 data stored in Oracle, with schema tracking, documented endpoints, and container deployment.",
    description:
      "Empower API provides a documented service layer over Waters Empower 3 data in Oracle. It combines focused query endpoints with SQLite schema tracking, background services, structured request logging, and a Docker-based runtime.",
    href: "https://github.com/JeremyDemers/Empower-API",
    source: "https://github.com/JeremyDemers/Empower-API",
    visual: "api",
    external: true,
    tech: ["C#", "ASP.NET Core 8", "Oracle", "SQLite", "Docker", "Swagger"],
    highlights: [
      "Purpose-built endpoints for querying Waters Empower 3 data",
      "Oracle data access with SQLite schema metadata",
      "Swagger/OpenAPI documentation and structured Serilog logging",
      "Background services and a multi-stage Docker build",
    ],
    architecture: ["ASP.NET Core API", "Oracle data source and SQLite metadata", "Swagger and Docker runtime"],
  },
];

export const games = projects.filter(
  (project) => project.slug === "tetris" || project.slug === "neon-shatter",
);

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
