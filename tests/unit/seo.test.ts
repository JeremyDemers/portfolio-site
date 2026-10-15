import { describe, expect, it } from "vitest";
import { getProject } from "@/lib/projects";
import {
  DEFAULT_DESCRIPTION,
  DEFAULT_TITLE,
  SITE_URL,
  absoluteUrl,
  breadcrumbStructuredData,
  homepageStructuredData,
  projectMetadata,
  projectPageStructuredData,
} from "@/lib/seo";

describe("absoluteUrl", () => {
  it("builds canonical URLs from relative paths", () => {
    expect(absoluteUrl("/digital-twin/")).toBe(`${SITE_URL}/digital-twin/`);
    expect(absoluteUrl("games/tetris/")).toBe(`${SITE_URL}/games/tetris/`);
  });
});

describe("projectMetadata", () => {
  it("adds recruiter-focused metadata for the Digital Twin page", () => {
    const project = getProject("digital-twin");
    expect(project).toBeDefined();

    const metadata = projectMetadata(project!);

    expect(metadata.title).toBe("Digital Twin for Recruiters");
    expect(metadata.description).toContain("AWS, AI, Python, C#");
    expect(metadata.alternates).toEqual({
      canonical: `${SITE_URL}/digital-twin/`,
    });
    expect(metadata.openGraph).toMatchObject({
      url: `${SITE_URL}/digital-twin/`,
      siteName: "Jeremy Demers",
    });
  });
});

describe("structured data", () => {
  it("associates public repositories with source-code entities only", () => {
    const graph = projectPageStructuredData(getProject("tetris")!)["@graph"];
    const source = graph.find(node => node["@type"] === "SoftwareSourceCode");
    expect(source).toMatchObject({ codeRepository: getProject("tetris")!.source });
    expect(graph[0]).not.toHaveProperty("codeRepository");
    for (const slug of ["photo-blaze", "talazaki-pizza"]) {
      const privateGraph = projectPageStructuredData(getProject(slug)!)["@graph"];
      expect(JSON.stringify(privateGraph)).not.toContain("codeRepository");
      expect(privateGraph[0]).toMatchObject({ url: getProject(slug)!.liveUrl });
    }
  });
  it("omits private repository URLs and unsupported free offers", () => {
    for (const slug of ["photo-blaze", "talazaki-pizza"]) {
      const graph = projectPageStructuredData(getProject(slug)!)["@graph"];
      expect(graph[0]).not.toHaveProperty("codeRepository");
      expect(graph[0]).not.toHaveProperty("offers");
      expect(graph[0]).not.toHaveProperty("isAccessibleForFree");
    }
    expect(JSON.stringify(homepageStructuredData)).not.toMatch(
      /consult|#services|"Service"/i,
    );
  });
  it("builds ordered breadcrumbs with absolute item URLs", () => {
    expect(
      breadcrumbStructuredData([
        { name: "Home", href: "/" },
        { name: "Games", href: "/#work" },
        { name: "Tetris", href: "/games/tetris/" },
      ]),
    ).toEqual({
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: `${SITE_URL}/`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Games",
          item: `${SITE_URL}/#work`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Tetris",
          item: `${SITE_URL}/games/tetris/`,
        },
      ],
    });
  });

  it("emits game schema and breadcrumb graph for game pages", () => {
    const project = getProject("tetris");
    expect(project).toBeDefined();

    const structuredData = projectPageStructuredData(project!) as {
      "@graph": Array<Record<string, unknown>>;
    };

    expect(structuredData["@graph"][0]).toMatchObject({
      "@type": ["VideoGame", "WebApplication"],
      name: "Tetris",
      url: `${SITE_URL}/games/tetris/`,
      isAccessibleForFree: true,
    });
    expect(structuredData["@graph"][1]).toMatchObject({
      "@type": "BreadcrumbList",
      itemListElement: expect.arrayContaining([
        expect.objectContaining({ name: "Games", item: `${SITE_URL}/#work` }),
      ]),
    });
  });

  it("keeps homepage schema aligned with the professional identity", () => {
    expect(homepageStructuredData).toMatchObject({
      "@context": "https://schema.org",
      "@graph": expect.arrayContaining([
        expect.objectContaining({
          "@type": "WebSite",
          name: "Jeremy Demers",
          description: DEFAULT_DESCRIPTION,
        }),
        expect.objectContaining({
          "@type": "ProfilePage",
          name: DEFAULT_TITLE,
        }),
        expect.objectContaining({
          "@type": "Person",
          jobTitle: "Software Engineer",
        }),
      ]),
    });
  });
});
