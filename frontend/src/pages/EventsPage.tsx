import { PageHero } from "@/components/ui/PageHero";
import { HackathonSpotlight } from "@/components/sections/HackathonSpotlight";
import { EventsGrid } from "@/components/sections/EventsGrid";

export function EventsPage() {
  return (
    <main className="min-h-screen bg-void-base">
      <PageHero
        eyebrow="Competitions & Hackathon"
        title="Events"
        description="8 flagship competitions across AI, robotics, security, and entrepreneurship."
      />
      <HackathonSpotlight />
      <EventsGrid />
    </main>
  );
}