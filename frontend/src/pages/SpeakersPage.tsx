import { PageHero } from "@/components/ui/PageHero";
import { Speakers as SpeakersSection } from "@/components/sections/Speakers";
import { useDocumentHead } from "@/hooks/useDocumentHead";

export function SpeakersPage() {
  useDocumentHead({
    title: "Speakers",
    description: "Meet the founders, researchers and engineers speaking at TechFest 2026.",
    path: "/speakers",
  });

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