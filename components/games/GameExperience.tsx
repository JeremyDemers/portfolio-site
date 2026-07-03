import Link from "next/link";
import { Github, Info } from "lucide-react";
import type { Project } from "@/lib/projects";
import { ShadowSurface } from "./ShadowSurface";
import { TetrisGame } from "./tetris/TetrisGame";
import { NeonShatterGame } from "./neon-shatter/NeonShatterGame";

export function GameExperience({ project }: { project: Project }) {
  const isTetris = project.slug === "tetris";

  return (
    <main className="integrated-game-page">
      <section className="game-page-banner shell">
        <div className="game-page-copy">
          <Link href="/#work" className="game-breadcrumb">Arcade / {project.name}</Link>
          <h1>{project.name}</h1>
          <p>{project.summary}</p>
        </div>
        <div className="game-page-actions">
          <p><Info size={15} aria-hidden="true" /> Play locally in your browser. Accounts and leaderboards connect when the Arcade API is online.</p>
          <a href={project.source} target="_blank" rel="noreferrer"><Github size={16} aria-hidden="true" /> Source code</a>
        </div>
      </section>

      <ShadowSurface
        label={`${project.name} playable application`}
        stylesheet={isTetris ? "/game-styles/tetris.css" : "/game-styles/neon-shatter.css"}
        className={`game-host-${project.slug}`}
      >
        {isTetris ? <TetrisGame /> : <NeonShatterGame />}
      </ShadowSurface>
    </main>
  );
}
