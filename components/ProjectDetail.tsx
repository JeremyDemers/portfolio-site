import Image from "next/image";
import Link from "next/link";
import { caseStudies, type Project } from "@/lib/projects";
import { ProjectVisual } from "@/components/ProjectVisual";

export function ProjectDetail({ project }: { project: Project }) {
  return (
    <main className="case-study">
      <section className="case-hero shell">
        <Link className="back-link" href="/#work">
          ← Back to work
        </Link>
        <p className="eyebrow">{project.eyebrow}</p>
        <h1>{project.name}</h1>
        <p className="project-lede">{project.summary}</p>
        <div className="hero-actions">
          {project.liveUrl && (
            <a
              className="button button-primary"
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Visit live site ↗
            </a>
          )}
          {project.source && project.privacy !== "private-source" && (
            <a
              className="button button-primary"
              href={project.source}
              target="_blank"
              rel="noopener noreferrer"
            >
              Explore the source ↗
            </a>
          )}
          {project.video && (
            <a
              className="button button-secondary"
              href={project.video}
              target="_blank"
              rel="noopener noreferrer"
            >
              Watch the demo ↗
            </a>
          )}
        </div>
        <ProjectVisual variant={project.visual} cover={project.cover} />
      </section>
      <section className="case-body shell">
        <div className="case-prose">
          <div>
            <p className="section-kicker">Overview</p>
            <h2>
              {project.slug === "photo-blaze"
                ? "Making room for creativity."
                : project.slug === "talazaki-pizza"
                  ? "A local restaurant, online."
                  : "From problem to working system."}
            </h2>
            <p>{project.description}</p>
          </div>
          {project.sections?.map((section) => (
            <section key={section.heading}>
              <h2>{section.heading}</h2>
              <p>{section.body}</p>
            </section>
          ))}
          {project.highlights.length > 0 && (
            <section>
              <h2>Inside the project</h2>
              <ul className="highlight-list">
                {project.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            </section>
          )}
        </div>
        <aside className="case-sidebar">
          <p className="section-kicker">Project details</p>
          <div>
            <p className="sidebar-label">Focus</p>
            <p>{project.eyebrow}</p>
          </div>
          {project.tech.length > 0 && (
            <div>
              <p className="sidebar-label">Technology</p>
              <div className="tag-list">
                {project.tech.map((tech) => (
                  <span key={tech}>{tech}</span>
                ))}
              </div>
            </div>
          )}
          {project.privacy === "private-source" && (
            <div>
              <p className="sidebar-label">Source</p>
              <p>Private repository</p>
            </div>
          )}
          {project.architecture.length > 0 && (
            <div>
              <p className="sidebar-label">Architecture</p>
              <ol className="architecture-list">
                {project.architecture.map((layer, index) => (
                  <li key={layer}>
                    <span>0{index + 1}</span>
                    {layer}
                  </li>
                ))}
              </ol>
            </div>
          )}
        </aside>
      </section>
      {project.gallery && (
        <section className="case-gallery shell">
          <p className="section-kicker">A closer look</p>
          <div>
            {project.gallery.map((item) => (
              <figure key={item.src}>
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={390}
                  height={844}
                  sizes="(max-width: 639px) 100vw, 390px"
                />
                <figcaption>{item.alt}</figcaption>
              </figure>
            ))}
          </div>
        </section>
      )}
      <nav className="related-work shell" aria-label="Other projects">
        <p className="section-kicker">Keep exploring</p>
        {caseStudies
          .filter((other) => other.slug !== project.slug)
          .slice(0, 2)
          .map((other) => (
            <Link href={other.href} key={other.slug}>
              {other.name} <span aria-hidden="true">↗</span>
            </Link>
          ))}
      </nav>
    </main>
  );
}
