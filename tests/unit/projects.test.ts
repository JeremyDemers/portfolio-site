import { describe, expect, it } from "vitest";
import {
  caseStudies,
  games,
  getProject,
  projects,
  featuredProjects,
} from "@/lib/projects";

describe("project catalog", () => {
  it("keeps project slugs unique", () => {
    const slugs = projects.map((project) => project.slug);

    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("uses routable internal hrefs and source repositories", () => {
    for (const project of projects) {
      expect(project.href).toMatch(/^\/(projects|games|digital-twin)\//);
      if (project.source)
        expect(project.source).toMatch(
          /^https:\/\/github\.com\/JeremyDemers\//,
        );
      expect(project.highlights.length).toBeGreaterThan(0);
      if (project.privacy !== "private-source") {
        expect(project.architecture.length).toBeGreaterThan(0);
        expect(project.tech.length).toBeGreaterThan(0);
      }
    }
  });

  it("derives games from game routes", () => {
    expect(games.map((game) => game.slug).sort()).toEqual([
      "neon-shatter",
      "tetris",
    ]);
    expect(games.every((game) => game.href.startsWith("/games/"))).toBe(true);
  });

  it("derives case studies from project routes", () => {
    expect(caseStudies.map((project) => project.slug).sort()).toEqual([
      "empower-api",
      "financial-advisor",
      "lle-analysis",
      "photo-blaze",
      "talazaki-pizza",
    ]);
    expect(
      caseStudies.every((project) => project.href.startsWith("/projects/")),
    ).toBe(true);
  });

  it("protects private sources and preserves featured order", () => {
    expect(featuredProjects.map((project) => project.slug)).toEqual([
      "photo-blaze",
      "talazaki-pizza",
      "digital-twin",
      "financial-advisor",
      "lle-analysis",
      "empower-api",
    ]);
    for (const slug of ["photo-blaze", "talazaki-pizza"]) {
      expect(getProject(slug)?.source).toBeUndefined();
      expect(getProject(slug)?.liveUrl).toMatch(/^https:\/\//);
    }
  });

  it("finds projects by slug", () => {
    expect(getProject("digital-twin")?.href).toBe("/digital-twin/");
    expect(getProject("missing-project")).toBeUndefined();
  });
});
