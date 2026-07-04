import { useMemo, useState } from "react";
import { PageHero } from "@/components/ui/PageHero";
import { HackathonSpotlight } from "@/components/sections/HackathonSpotlight";
import { EventsGrid } from "@/components/sections/EventsGrid";
import { EVENTS as STATIC_EVENTS } from "@/lib/eventsData";
import { useEvents } from "@/hooks/useEvents";

export function EventsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(STATIC_EVENTS.map((e) => e.category)))],
    []
  );

  const { events, isLoading, isFallback } = useEvents({ search, category });

  return (
    <main className="min-h-screen bg-void-base">
      <PageHero
        eyebrow="Competitions & Hackathon"
        title="Events"
        description="8 flagship competitions across AI, robotics, security, and entrepreneurship."
      />
      <HackathonSpotlight />

      <div className="mx-auto max-w-6xl px-6">
        <div className="glass mb-4 flex flex-col gap-3 rounded-2xl p-4 sm:flex-row sm:items-center">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search events…"
            className="input sm:flex-1"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="input sm:w-56"
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        {isLoading && (
          <p className="mb-4 font-mono text-[11px] uppercase tracking-widest2 text-mist/40">
            Searching…
          </p>
        )}
        {isFallback && !isLoading && (
          <p className="mb-4 font-mono text-[11px] uppercase tracking-widest2 text-mist/30">
            Showing cached event data — live server unreachable.
          </p>
        )}
      </div>

      <EventsGrid events={events} />
    </main>
  );
}