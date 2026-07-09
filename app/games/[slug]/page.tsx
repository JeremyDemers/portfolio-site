import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GameExperience } from "@/components/games/GameExperience";
import { games, getProject } from "@/lib/projects";
import { projectMetadata, projectPageStructuredData } from "@/lib/seo";

export function generateStaticParams() {
  return games.map((game) => ({ slug: game.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  return project ? projectMetadata(project) : {};
}

export default async function GamePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project || !project.href.startsWith("/games/")) notFound();
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectPageStructuredData(project)) }}
      />
      <GameExperience project={project} />
    </>
  );
}
