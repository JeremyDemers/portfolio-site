import Link from "next/link";
import type { Project } from "@/lib/projects";
import { ProjectVisual } from "@/components/ProjectVisual";

export function ProjectDetail({ project }: { project: Project }) {
  return (
    <main>
      <section className="project-hero shell">
        <div className="project-hero-copy">
          <Link className="back-link" href="/#work">← All projects</Link>
          <p className="eyebrow">{project.eyebrow}</p>
          <h1>{project.name}</h1>
          <p className="project-lede">{project.description}</p>
          <div className="hero-actions">
            <a className="button button-primary" href={project.source} target="_blank" rel="noreferrer">
              Explore the source <span aria-hidden="true">↗</span>
            </a>
            <Link className="button button-secondary" href="/#work">More work</Link>
          </div>
        </div>
        <ProjectVisual variant={project.visual} />
      </section>

      <section className="project-body shell">
        <div className="detail-block">
          <p className="section-kicker">What it demonstrates</p>
          <h2>Engineering that reaches beyond the demo.</h2>
          <ul className="highlight-list">
            {project.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
          </ul>
        </div>
        <aside className="project-sidebar">
          <div>
            <p className="sidebar-label">Technology</p>
            <div className="tag-list">
              {project.tech.map((technology) => <span key={technology}>{technology}</span>)}
            </div>
          </div>
          <div>
            <p className="sidebar-label">Architecture</p>
            <ol className="architecture-list">
              {project.architecture.map((layer, index) => (
                <li key={layer}><span>0{index + 1}</span>{layer}</li>
              ))}
            </ol>
          </div>
        </aside>
      </section>
    </main>
  );
}

