import { PageHero } from "@/components/ui/PageHero";
import { Sponsors as SponsorsSection } from "@/components/sections/Sponsors";
import { useDocumentHead } from "@/hooks/useDocumentHead";

export function SponsorsPage() {
  useDocumentHead({
    title: "Sponsors",
    description: "The partners and sponsors powering TechFest 2026.",
    path: "/sponsors",
  });

  return (
    <main className="min-h-screen bg-void-base">
      <PageHero
        eyebrow="Our Partners"
        title="Sponsors"
        description="The organizations powering TechFest 2026, loaded live from our database."
      />
      <SponsorsSection />
    </main>
  );
}