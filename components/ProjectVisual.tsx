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

  if (variant === "api") {
    return (
      <div className={`project-visual visual-api ${compact ? "compact" : ""}`} aria-hidden="true">
        <div className="api-window">
          <div className="api-window-bar"><i /><i /><i /><span>/api/EmpowerData</span></div>
          <div className="api-endpoint"><b>GET</b><code>/data-by-result-id</code><span>200</span></div>
          <div className="api-endpoint"><b>GET</b><code>/instruments-in-use</code><span>200</span></div>
          <div className="api-endpoint"><b>GET</b><code>/data-by-time-range</code><span>200</span></div>
        </div>
        <div className="api-pipeline">
          <span>EMPOWER 3</span><i>→</i><span>ASP.NET 8</span><i>→</i><span>JSON</span>
        </div>
        <div className="visual-label">C# / ORACLE</div>
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
