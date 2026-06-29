export type Project = {
  slug: "tetris" | "neon-shatter" | "digital-twin";
  name: string;
  eyebrow: string;
  summary: string;
  description: string;
  href: string;
  source: string;
  visual: "tetris" | "shatter" | "twin";
  tech: string[];
  highlights: string[];
  architecture: string[];
};

export const projects: Project[] = [
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
];

export const games = projects.filter((project) => project.slug !== "digital-twin");

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

