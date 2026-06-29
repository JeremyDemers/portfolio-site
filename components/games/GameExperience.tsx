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
        <div>
          <Link href="/#work" className="game-breadcrumb">Arcade / {project.name}</Link>
          <p><Info size={15} /> Play works locally in your browser. Accounts and leaderboards connect when the Arcade API is online.</p>
        </div>
        <a href={project.source} target="_blank" rel="noreferrer"><Github size={16} /> Source code</a>
      </section>

      <ShadowSurface
        label={`${project.name} playable application`}
        stylesheet={isTetris ? "/game-styles/tetris.css" : "/game-styles/neon-shatter.css"}
      >
        {isTetris ? <TetrisGame /> : <NeonShatterGame />}
      </ShadowSurface>
    </main>
  );
}

