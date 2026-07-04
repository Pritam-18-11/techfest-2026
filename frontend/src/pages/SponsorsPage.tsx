import { PageHero } from "@/components/ui/PageHero";
import { Sponsors as SponsorsSection } from "@/components/sections/Sponsors";

export function SponsorsPage() {
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