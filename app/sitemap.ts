import type { MetadataRoute } from "next";
import { projects } from "@/lib/projects";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://jeremysdemers.com";
  return [
    { url: baseUrl, changeFrequency: "monthly", priority: 1 },
    ...projects.map((project) => ({
      url: `${baseUrl}${project.href}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
