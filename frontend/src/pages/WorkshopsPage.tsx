import { PageHero } from "@/components/ui/PageHero";
import { Workshops as WorkshopsSection } from "@/components/sections/Workshops";
import { useDocumentHead } from "@/hooks/useDocumentHead";

export function WorkshopsPage() {
  useDocumentHead({
    title: "Workshops",
    description: "Hands-on TechFest 2026 workshops across AI, robotics, and quantum computing.",
    path: "/workshops",
  });

  return (
    <main className="min-h-screen bg-void-base">
      <PageHero
        eyebrow="Learn By Building"
        title="Workshops"
        description="Hands-on sessions across AI, robotics, and quantum computing, led by industry mentors."
      />
      <WorkshopsSection />
    </main>
  );
}