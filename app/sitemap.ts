import type { MetadataRoute } from "next";
import { projects } from "@/lib/projects";
import { absoluteUrl } from "@/lib/seo";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: absoluteUrl("/"), changeFrequency: "monthly", priority: 1 },
    ...projects.map((project) => ({
      url: absoluteUrl(project.href),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
