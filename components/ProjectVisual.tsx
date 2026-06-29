import type { Project } from "@/lib/projects";

export function ProjectVisual({ variant, compact = false }: { variant: Project["visual"]; compact?: boolean }) {
  if (variant === "tetris") {
    return (
      <div className={`project-visual visual-tetris ${compact ? "compact" : ""}`} aria-hidden="true">
        <div className="tetris-grid">
          {Array.from({ length: 40 }, (_, index) => <span key={index} />)}
        </div>
        <div className="tetromino tetromino-one"><i /><i /><i /><i /></div>
        <div className="tetromino tetromino-two"><i /><i /><i /><i /></div>
        <div className="visual-label">LINES / 024</div>
      </div>
    );
  }

  if (variant === "shatter") {
    return (
      <div className={`project-visual visual-shatter ${compact ? "compact" : ""}`} aria-hidden="true">
        <div className="brick-field">
          {Array.from({ length: 24 }, (_, index) => <i key={index} />)}
        </div>
        <span className="shatter-ball" />
        <span className="shatter-paddle" />
        <div className="visual-label">SECTOR / 07</div>
      </div>
    );
  }

  return (
    <div className={`project-visual visual-twin ${compact ? "compact" : ""}`} aria-hidden="true">
      <div className="twin-orbit orbit-one" />
      <div className="twin-orbit orbit-two" />
      <div className="twin-core">JD</div>
      <div className="message message-one">What does Jeremy build?</div>
      <div className="message message-two">Useful software with a playful edge.</div>
      <div className="visual-label">BEDROCK / ONLINE</div>
    </div>
  );
}

