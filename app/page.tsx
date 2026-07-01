import Link from "next/link";
import { ArrowDownRight, Cloud, Code2, Gamepad2, Sparkles } from "lucide-react";
import { ProjectVisual } from "@/components/ProjectVisual";
import { projects } from "@/lib/projects";

const capabilities = [
  { icon: Code2, title: "Full-stack product work", text: "Type-safe interfaces, Python and C# APIs, authentication, persistence, and the details that turn code into a product." },
  { icon: Cloud, title: "Serverless AWS systems", text: "Lambda, API Gateway, S3, CloudFront, DynamoDB, Bedrock, IAM, Route 53, and infrastructure managed with Terraform." },
  { icon: Gamepad2, title: "Interactive engineering", text: "Responsive game loops, canvas rendering, keyboard and touch input, audio, animation, and careful interface feedback." },
];

export default function Home() {
  return (
    <main>
      <section className="hero shell">
        <div className="hero-copy">
          <div className="availability"><span /> Open to programming opportunities</div>
          <p className="eyebrow">Full-stack developer · AWS builder · Creative technologist</p>
          <h1>I build software people can <em>experience.</em></h1>
          <p className="hero-lede">
            I&apos;m Jeremy Demers—a developer building interactive web applications,
            computer-vision systems, generative AI experiences, and serverless systems on AWS.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#work">Explore my work <ArrowDownRight size={17} /></a>
            <a className="button button-secondary" href="https://github.com/JeremyDemers" target="_blank" rel="noreferrer noopener">View GitHub <span aria-hidden="true">↗</span></a>
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
            <p className="console-output status-line"><span /> ready to build<span className="cursor">_</span></p>
          </div>
        </div>
      </section>

      <section className="work-section shell" id="work">
        <div className="section-heading">
          <div>
            <p className="section-kicker">Selected work</p>
            <h2>Projects made to be used.</h2>
          </div>
          <p>Each project explores a different edge of modern engineering—from real-time interaction and laboratory computer vision to data APIs and cloud-native AI.</p>
        </div>

        <div className="project-grid">
          {projects.map((project, index) => (
            <article className={`project-card project-card-${project.visual}`} key={project.slug}>
              <ProjectVisual variant={project.visual} compact />
              <div className="project-card-copy">
                <div className="project-number">0{index + 1} / {project.eyebrow}</div>
                <h3>{project.name}</h3>
                <p>{project.summary}</p>
                <div className="tag-list">
                  {project.tech.slice(0, 4).map((technology) => <span key={technology}>{technology}</span>)}
                </div>
                <div className="project-links">
                  {project.external ? (
                    <a className="project-link" href={project.href} target="_blank" rel="noreferrer noopener">
                      View source <span aria-hidden="true">↗</span>
                    </a>
                  ) : (
                    <Link className="project-link" href={project.href}>View project <span aria-hidden="true">↗</span></Link>
                  )}
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

      <section className="about-section shell">
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
    </main>
  );
}
