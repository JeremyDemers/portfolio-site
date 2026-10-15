import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  ArrowRight,
  Cloud,
  Code2,
  Database,
  ScanLine,
  Layers3,
  Mail,
  Linkedin,
} from "lucide-react";
import { ProjectVisual } from "@/components/ProjectVisual";
import { featuredProjects, games, type Project } from "@/lib/projects";
import { homepageStructuredData } from "@/lib/seo";

const capabilities = [
  {
    icon: Code2,
    title: "Full-stack systems",
    text: "From React interfaces to Python and C# APIs, with authentication, persistence and thoughtful interaction design.",
  },
  {
    icon: ScanLine,
    title: "AI & computer vision",
    text: "Grounded AI experiences, multi-agent workflows, and PyTorch and OpenCV tools for laboratory imaging.",
  },
  {
    icon: Database,
    title: "Enterprise integration",
    text: "Service layers that connect scientific and operational data, with documented APIs and structured reporting.",
  },
  {
    icon: Cloud,
    title: "Cloud & automation",
    text: "Serverless AWS applications, asynchronous workflows, and repeatable infrastructure managed with Terraform.",
  },
];

function WorkCard({ project, index }: { project: Project; index: number }) {
  return (
    <article
      className={`work-card ${index < 3 ? "work-feature" : ""} ${project.slug === "digital-twin" ? "work-twin" : ""}`}
    >
      <Link
        className="work-image-link"
        href={project.href}
        aria-label={`Explore ${project.name}`}
      >
        <ProjectVisual variant={project.visual} cover={project.cover} compact />
      </Link>
      <div className="work-copy">
        <p className="work-category">
          <span>0{index + 1}</span> {project.eyebrow}
        </p>
        <h3>
          <Link href={project.href}>{project.name}</Link>
        </h3>
        <p>{project.summary}</p>
        {project.slug === "digital-twin" && (
          <p className="twin-editorial">
            A real AI experience, grounded in curated professional context.
            Next.js → API Gateway → FastAPI on Lambda → Amazon Bedrock, with S3
            session history. An AI representation, not the person.
          </p>
        )}
        {project.tech.length > 0 && (
          <div className="tag-list">
            {project.tech.slice(0, 4).map((tech) => (
              <span key={tech}>{tech}</span>
            ))}
          </div>
        )}
        <div className="work-links">
          <Link
            className={
              project.slug === "digital-twin"
                ? "button button-primary"
                : "text-link"
            }
            href={project.href}
          >
            {project.slug === "digital-twin"
              ? "Talk to my Digital Twin"
              : "View case study"}
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
              Live site <ArrowUpRight size={15} aria-hidden="true" />
            </a>
          )}
          {project.source && project.privacy !== "private-source" && (
            <a href={project.source} target="_blank" rel="noopener noreferrer">
              Source <ArrowUpRight size={15} aria-hidden="true" />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

export default function Home() {
  return (
    <main className="portfolio-home">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(homepageStructuredData),
        }}
      />
      <section className="portfolio-hero shell">
        <div>
          <p className="eyebrow">Full-stack software engineer</p>
          <h1>
            Engineering thoughtful software for the <span>real world.</span>
          </h1>
          <p className="portfolio-lede">
            I design and build web applications, enterprise integrations,
            computer-vision systems, and AI-powered tools—from architecture to
            working product.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#work">
              Explore projects <ArrowRight size={17} aria-hidden="true" />
            </a>
            <a className="button button-secondary" href="#experience">
              Experience
            </a>
          </div>
          <p className="hero-specialties">
            Full-stack development <span>·</span> Applied AI <span>·</span>{" "}
            Computer vision <span>·</span> Cloud
          </p>
        </div>
        <div
          className="systems-art"
          aria-label="Engineering across interfaces, applications, data and cloud infrastructure"
        >
          <div className="systems-caption">
            <span>From idea to implementation</span>
            <span aria-hidden="true">01 — 04</span>
          </div>
          <div className="system-node">
            <Code2 aria-hidden="true" />
            <div>
              <small>01 / EXPERIENCE</small>
              <strong>Thoughtful interfaces</strong>
              <span>Web applications · Interaction</span>
            </div>
          </div>
          <div className="system-connector" aria-hidden="true" />
          <div className="system-node system-center">
            <Layers3 aria-hidden="true" />
            <div>
              <small>02 / APPLICATION</small>
              <strong>Useful software.</strong>
              <span>Clear architecture. Connected systems.</span>
            </div>
          </div>
          <div className="system-branches" aria-hidden="true" />
          <div className="system-bottom">
            <div className="system-node">
              <Database aria-hidden="true" />
              <div>
                <small>03 / INTELLIGENCE</small>
                <strong>Data & AI</strong>
              </div>
            </div>
            <div className="system-node">
              <Cloud aria-hidden="true" />
              <div>
                <small>04 / FOUNDATION</small>
                <strong>Cloud & APIs</strong>
              </div>
            </div>
          </div>
          <Link className="meet-twin" href="/digital-twin/">
            Explore the thinking. Meet my Digital Twin{" "}
            <ArrowUpRight size={15} aria-hidden="true" />
          </Link>
        </div>
      </section>
      <section className="selected-work shell" id="work">
        <div className="section-heading">
          <div>
            <p className="section-kicker">Selected work</p>
            <h2>Ideas, engineered.</h2>
          </div>
          <p>
            Independent products and engineering projects across creative
            software, AI, and enterprise systems.
          </p>
        </div>
        <div className="work-grid">
          {featuredProjects.map((project, index) => (
            <WorkCard key={project.slug} project={project} index={index} />
          ))}
        </div>
        <div className="experiments">
          <div>
            <p className="section-kicker">Experiments & interactive work</p>
            <h3>A little room to play.</h3>
          </div>
          <div className="experiment-links">
            {games.map((game) => (
              <Link key={game.slug} href={game.href}>
                <span className="experiment-thumbnail">
                  <Image
                    src={`/images/projects/${game.slug}/gameplay.webp`}
                    alt={
                      game.slug === "tetris"
                        ? "Tetris gameplay with colorful stacked blocks"
                        : "Neon Shatter gameplay with glowing bricks, ball and paddle"
                    }
                    fill
                    sizes="88px"
                  />
                </span>
                <span>
                  {game.name}
                  <small>
                    {game.slug === "tetris"
                      ? "The classic, built for the browser"
                      : "Canvas, physics & arcade feedback"}
                  </small>
                </span>
                <ArrowUpRight aria-hidden="true" />
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="experience-section shell" id="experience">
        <div>
          <p className="section-kicker">Selected professional experience</p>
          <h2>Built in real-world environments.</h2>
          <p className="section-intro">
            Enterprise software, scientific workflows, and the everyday work of
            connecting systems.
          </p>
        </div>
        <div className="experience-list">
          <article>
            <span>01</span>
            <div>
              <h3>Pfizer</h3>
              <p>Full-stack web development & process automation</p>
            </div>
          </article>
          <article>
            <span>02</span>
            <div>
              <h3>Eurofins</h3>
              <p>Full-stack web development & process automation</p>
            </div>
          </article>
          <article>
            <span>03</span>
            <div>
              <h3>MEDITECH</h3>
              <p>Enterprise software development</p>
            </div>
          </article>
        </div>
      </section>
      <section className="expertise-section">
        <div className="shell">
          <div className="section-heading">
            <div>
              <p className="section-kicker">Technical depth</p>
              <h2>Thinking across the stack.</h2>
            </div>
          </div>
          <div className="expertise-grid">
            {capabilities.map(({ icon: Icon, title, text }) => (
              <article key={title}>
                <Icon size={24} aria-hidden="true" />
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="profile-section shell" id="about">
        <p className="section-kicker">A little about me</p>
        <div>
          <h2>
            Curious by nature.
            <br />
            Practical by design.
          </h2>
          <p>
            I’m a software engineer who enjoys solving difficult problems across
            the full stack—from user experience and APIs to computer vision,
            data integration, and cloud infrastructure.
          </p>
          <p>
            My work spans enterprise environments and independently developed
            products. I care about clear architecture, useful documentation, and
            software that feels considered when someone uses it.
          </p>
          <a
            className="text-link"
            href="https://github.com/JeremyDemers"
            target="_blank"
            rel="noopener noreferrer"
          >
            See how I build on GitHub{" "}
            <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </div>
      </section>
      <section className="connect-section" id="contact">
        <div className="shell">
          <p className="section-kicker">Let’s connect</p>
          <h2>
            Interested in the work?
            <br />
            <span>Let’s start a conversation.</span>
          </h2>
          <p>
            For engineering opportunities, professional connections, or a
            conversation about the work.
          </p>
          <div className="hero-actions">
            <a
              className="button button-primary"
              href="mailto:JeremySD99@gmail.com"
            >
              <Mail size={17} aria-hidden="true" />
              Email me
            </a>
            <a
              className="button button-secondary"
              href="https://www.linkedin.com/in/jeremy-demers/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin size={17} aria-hidden="true" />
              LinkedIn
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
