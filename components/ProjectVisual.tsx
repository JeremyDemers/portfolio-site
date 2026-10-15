import Image from "next/image";
import type { Project } from "@/lib/projects";

export function ProjectVisual({
  variant,
  cover,
  compact = false,
}: {
  variant: Project["visual"];
  cover?: Project["cover"];
  compact?: boolean;
}) {
  const image =
    cover ??
    (variant === "lle"
      ? {
          src: "/images/lle-analysis-processing.webp",
          alt: "LLE analysis interface with annotated vial detections",
        }
      : variant === "twin"
        ? {
            src: "/images/projects/digital-twin/chat-desktop.webp",
            alt: "Digital Twin conversation interface with suggested questions",
          }
        : undefined);
  if (variant === "finance" && !cover)
    return (
      <div
        className="project-media finance-diagram"
        role="img"
        aria-label="Financial Advisor architecture: Next.js interface, asynchronous analysis agents, and AWS data services"
      >
        <span>MULTI-AGENT ARCHITECTURE</span>
        <strong>
          One workflow.
          <br />
          Five perspectives.
        </strong>
        <div>
          <span>Planner</span>
          <span>Reporter</span>
          <span>Charter</span>
          <span>Retirement</span>
          <span>Tagger</span>
        </div>
        <small>Next.js · FastAPI · Amazon Bedrock</small>
      </div>
    );
  if (image)
    return (
      <div
        className={`project-media media-${variant} ${compact ? "compact" : ""}`}
      >
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 600px"
          style={{ objectFit: image.fit ?? "contain" }}
        />
      </div>
    );
  if (variant === "api")
    return (
      <div
        className="project-media api-art"
        role="img"
        aria-label="Empower API architecture: Oracle data through an ASP.NET Core service to documented endpoints"
      >
        <span>DATA → SERVICE → APPLICATION</span>
        <div>
          <b>Oracle</b>
          <i aria-hidden="true">→</i>
          <b>
            ASP.NET
            <br />
            Core API
          </b>
          <i aria-hidden="true">→</i>
          <b>OpenAPI</b>
        </div>
        <small>Enterprise data, connected.</small>
      </div>
    );
  return (
    <div className="project-media neutral-art">
      <strong>
        {variant === "photo"
          ? "PhotoBlaze"
          : variant === "pizza"
            ? "TalaZaki Pizza"
            : variant === "tetris"
              ? "Tetris"
              : variant === "shatter"
                ? "Neon Shatter"
                : "Project preview"}
      </strong>
      <span>Explore the project →</span>
    </div>
  );
}
