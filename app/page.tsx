import Link from "next/link";
import { ArrowDownRight, Cloud, Code2, Gamepad2, Github, Linkedin, Mail, Sparkles } from "lucide-react";
import { ProjectVisual } from "@/components/ProjectVisual";
import { projects } from "@/lib/projects";
import { homepageStructuredData } from "@/lib/seo";

const capabilities = [
  { icon: Code2, title: "Full-stack product work", text: "Type-safe interfaces, Python and C# APIs, authentication, persistence, and the details that turn code into a product." },
  { icon: Cloud, title: "Serverless AWS systems", text: "Lambda, API Gateway, S3, CloudFront, DynamoDB, Bedrock, IAM, Route 53, and infrastructure managed with Terraform." },
  { icon: Gamepad2, title: "Interactive engineering", text: "Responsive game loops, canvas rendering, keyboard and touch input, audio, animation, and careful interface feedback." },
];

const consultingServices = [
  {
    icon: Sparkles,
    title: "Software / AI consulting",
    text: "Clarify the problem, choose a practical path, and turn early ideas into scoped technical plans or working prototypes.",
  },
  {
    icon: Code2,
    title: "Full-stack implementation",
    text: "Build usable web applications, APIs, dashboards, authentication flows, data models, and the glue that connects them.",
  },
  {
    icon: Cloud,
    title: "Cloud architecture & automation",
    text: "Design serverless AWS systems, infrastructure-as-code, deployment pipelines, and integrations that are maintainable after launch.",
  },
  {
    icon: Gamepad2,
    title: "Applied AI & interactive prototypes",
    text: "Prototype multi-agent workflows, computer-vision tools, automation helpers, and interfaces that make complex systems easier to use.",
  },
];

const projectPriority = ["financial-advisor", "lle-analysis", "digital-twin", "empower-api", "tetris", "neon-shatter"];
const featuredProjects = [...projects].sort(
  (first, second) => projectPriority.indexOf(first.slug) - projectPriority.indexOf(second.slug),
);

export default function Home() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homepageStructuredData) }}
      />
      <section className="hero shell">
        <div className="hero-copy">
          <div className="availability"><span /> Available for consulting & programming projects</div>
          <h1>I build software people can <em>experience.</em></h1>
          <p className="hero-lede">
            Software and AI consulting for useful products: interactive web applications,
            multi-agent systems, computer-vision tools, and serverless AWS platforms.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#services">Explore services <ArrowDownRight size={17} aria-hidden="true" /></a>
            <a className="button button-secondary" href="#work">View work</a>
          </div>
        </div>
        <div className="hero-console" aria-label="A summary of Jeremy's engineering focus">
          <div className="console-bar"><span /><span /><span /><b>jeremy@portfolio:~</b></div>
          <div className="console-body">
            <p><span className="prompt">$</span> whoami</p>
            <p className="console-output">full_stack_developer</p>
            <p><span className="prompt">$</span> current_focus --list</p>
            <p className="console-output"><i>01</i> serverless systems</p>
            <p className="console-output"><i>02</i> generative AI</p>
            <p className="console-output"><i>03</i> interactive experiences</p>
            <p><span className="prompt">$</span> status</p>
            <p className="console-output status-line"><span /> consulting_available<span className="cursor">_</span></p>
          </div>
        </div>
      </section>

      <section className="services-section shell" id="services">
        <div className="section-heading services-heading">
          <div>
            <p className="section-kicker">Software / AI Consulting</p>
            <h2>Practical help for teams turning ideas into working systems.</h2>
          </div>
          <p>
            I offer remote-first software and AI consulting for clients and teams that need
            thoughtful planning, hands-on implementation, or a prototype that proves an idea is real.
          </p>
        </div>

        <div className="services-panel">
          <div className="services-intro">
            <p className="services-eyebrow">Available for client projects</p>
            <h3>Jeremy S. Demers — Software / AI Consulting</h3>
            <p>
              I work with clients remotely across the United States by appointment, with a focus on
              honest scope, maintainable systems, and practical engineering decisions. The goal is simple:
              real software work that is clear, useful, and durable.
            </p>
            <div className="services-actions">
              <a className="button button-primary" href="#contact">Start a conversation</a>
              <a className="button button-secondary" href="#work">See project proof</a>
            </div>
          </div>

          <div className="service-grid" aria-label="Software and AI consulting services">
            {consultingServices.map(({ icon: Icon, title, text }, index) => (
              <article className="service-card" key={title}>
                <div className="service-card-top">
                  <Icon size={20} aria-hidden="true" />
                  <span>0{index + 1}</span>
                </div>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="work-section shell" id="work">
        <div className="section-heading">
          <div>
            <p className="section-kicker">Selected work</p>
            <h2>Projects made to be used.</h2>
          </div>
          <p>Production-minded work across multi-agent AI, laboratory computer vision, enterprise APIs, and real-time interaction.</p>
        </div>

        <div className="project-grid">
          {featuredProjects.map((project, index) => (
            <article className={`project-card project-card-${project.visual}`} key={project.slug}>
              <ProjectVisual variant={project.visual} compact />
              <div className="project-card-copy">
                <div className="project-number">0{index + 1} / {project.eyebrow}</div>
                <h3>{project.name}</h3>
                <p>{project.summary}</p>
                <p className="project-proof"><strong>Engineering proof</strong>{project.highlights[0]}</p>
                <div className="tag-list">
                  {project.tech.slice(0, 4).map((technology) => <span key={technology}>{technology}</span>)}
                </div>
                <div className="project-links">
                  <Link className="project-link" href={project.href}>View project <span aria-hidden="true">↗</span></Link>
                  <a className="project-link" href={project.source} target="_blank" rel="noreferrer noopener">
                    Source <span aria-hidden="true">↗</span>
                  </a>
                  {project.video && (
                    <a className="project-link" href={project.video} target="_blank" rel="noreferrer noopener">
                      Watch video <span aria-hidden="true">↗</span>
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="capabilities-section">
        <div className="shell">
          <div className="section-heading compact-heading">
            <div><p className="section-kicker">How I work</p><h2>Curious across the stack.</h2></div>
          </div>
          <div className="capability-grid">
            {capabilities.map(({ icon: Icon, title, text }, index) => (
              <article className="capability" key={title}>
                <div className="capability-top"><Icon size={21} /><span>0{index + 1}</span></div>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="about-section shell" id="about">
        <div className="about-signal" aria-hidden="true"><Sparkles /><span>BUILD<br />LEARN<br />REFINE</span></div>
        <div className="about-copy">
          <p className="section-kicker">About</p>
          <h2>I like the seam between rigorous engineering and playful ideas.</h2>
          <p>
            My best work happens when I can understand a system end to end: shaping the interface,
            designing the API, modeling the data, and making deployment repeatable. I care about
            clear code, useful documentation, and software that feels considered when someone uses it.
          </p>
          <a className="text-link" href="https://github.com/JeremyDemers" target="_blank" rel="noreferrer noopener">See how I build on GitHub <span aria-hidden="true">↗</span></a>
        </div>
      </section>

      <section className="contact-section" id="contact">
        <div className="shell contact-inner">
          <div>
            <p className="section-kicker">Contact</p>
            <h2>Have a product idea, AI workflow, or hard problem in mind?</h2>
            <p>
              I&apos;m available for software and AI consulting, project work, and full-stack engineering opportunities.
              Remote-first across the United States; email or LinkedIn are the best ways to reach me.
            </p>
          </div>
          <div className="contact-actions">
            <a className="button button-primary" href="mailto:JeremySD99@gmail.com">
              <Mail size={17} aria-hidden="true" /> Email me
            </a>
            <a className="button button-primary" href="https://www.linkedin.com/in/jeremy-demers/" target="_blank" rel="noreferrer noopener">
              <Linkedin size={17} aria-hidden="true" /> Start a conversation
            </a>
            <a className="button button-secondary" href="https://github.com/JeremyDemers" target="_blank" rel="noreferrer noopener">
              <Github size={17} aria-hidden="true" /> GitHub
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
