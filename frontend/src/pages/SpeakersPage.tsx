import { PageHero } from "@/components/ui/PageHero";
import { Speakers as SpeakersSection } from "@/components/sections/Speakers";

export function SpeakersPage() {
  return (
    <main className="min-h-screen bg-void-base">
      <PageHero
        eyebrow="Meet The Lineup"
        title="Speakers"
        description="Founders, researchers, and engineers shaping what comes next."
      />
      <SpeakersSection />
    </main>
  );
}