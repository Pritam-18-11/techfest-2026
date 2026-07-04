import { useEffect, useState } from "react";
import { api, ApiRequestError } from "@/lib/api";
import { EVENTS as STATIC_EVENTS, type EventDetail } from "@/lib/eventsData";

type UseEventsOptions = {
  search?: string;
  category?: string;
};

type UseEventsResult = {
  events: EventDetail[];
  isLoading: boolean;
  error: string | null;
  /** True when live data couldn't be reached and static content is shown instead. */
  isFallback: boolean;
};

function filterStatic(search?: string, category?: string): EventDetail[] {
  return STATIC_EVENTS.filter((event) => {
    const matchesCategory = !category || category === "All" || event.category === category;
    const matchesSearch =
      !search ||
      event.title.toLowerCase().includes(search.toLowerCase()) ||
      event.tagline.toLowerCase().includes(search.toLowerCase()) ||
      event.category.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });
}

/**
 * Fetches events from GET /api/events, debounced against search input.
 * If the API call fails (backend not running, network error), falls
 * back to filtering the statically bundled event data so the page
 * never breaks in a frontend-only preview.
 */
export function useEvents({ search, category }: UseEventsOptions = {}): UseEventsResult {
  const [events, setEvents] = useState<EventDetail[]>(() => filterStatic(search, category));
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isFallback, setIsFallback] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const timeout = window.setTimeout(async () => {
      setIsLoading(true);
      setError(null);
      try {
        const params = new URLSearchParams();
        if (search) params.set("search", search);
        if (category && category !== "All") params.set("category", category);
        const query = params.toString();
        const res = await api.get<EventDetail[]>(`/events${query ? `?${query}` : ""}`);
        if (!cancelled) {
          setEvents(res.data);
          setIsFallback(false);
        }
      } catch (err) {
        if (!cancelled) {
          setEvents(filterStatic(search, category));
          setIsFallback(true);
          setError(err instanceof ApiRequestError ? err.message : "Couldn't reach the server.");
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }, 250);

    return () => {
      cancelled = true;
      window.clearTimeout(timeout);
    };
  }, [search, category]);

  return { events, isLoading, error, isFallback };
}