import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GameExperience } from "@/components/games/GameExperience";
import { games, getProject } from "@/lib/projects";

export function generateStaticParams() {
  return games.map((game) => ({ slug: game.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  return project ? { title: project.name, description: project.summary } : {};
}

export default async function GamePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project || project.slug === "digital-twin") notFound();
  return <GameExperience project={project} />;
}
