import type { Metadata } from "next";
import { DigitalTwinExperience } from "@/components/twin/DigitalTwinExperience";
import { getProject } from "@/lib/projects";

const project = getProject("digital-twin")!;

export const metadata: Metadata = {
  title: project.name,
  description: project.summary,
};

export default function DigitalTwinPage() {
  return <DigitalTwinExperience />;
}
