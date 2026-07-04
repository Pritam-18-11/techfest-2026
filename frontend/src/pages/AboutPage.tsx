import { PageHero } from "@/components/ui/PageHero";
import { About as AboutSection } from "@/components/sections/About";

export function AboutPage() {
  return (
    <main className="min-h-screen bg-void-base">
      <PageHero
        eyebrow="Since 2019"
        title="About TechFest"
        description="Three days. One festival. Where AI, robotics, and human ambition collide."
      />
      <AboutSection />
    </main>
  );
}