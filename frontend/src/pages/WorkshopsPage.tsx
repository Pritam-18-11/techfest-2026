import { PageHero } from "@/components/ui/PageHero";
import { Workshops as WorkshopsSection } from "@/components/sections/Workshops";

export function WorkshopsPage() {
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