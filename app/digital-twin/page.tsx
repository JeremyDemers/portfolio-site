import type { Metadata } from "next";
import { DigitalTwinExperience } from "@/components/twin/DigitalTwinExperience";
import { getProject } from "@/lib/projects";
import { projectMetadata, projectPageStructuredData } from "@/lib/seo";

const project = getProject("digital-twin")!;

export const metadata: Metadata = projectMetadata(project);

export default function DigitalTwinPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectPageStructuredData(project)) }}
      />
      <DigitalTwinExperience />
    </>
  );
}
