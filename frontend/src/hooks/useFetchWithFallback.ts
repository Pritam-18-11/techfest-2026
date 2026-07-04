import { useEffect, useState } from "react";
import { api } from "@/lib/api";

/**
 * Fetches a public list endpoint once on mount. On failure, silently
 * falls back to the provided static data so sections never render
 * empty just because the backend isn't reachable in this environment.
 */
export function useFetchWithFallback<T>(path: string, fallback: T[]) {
  const [data, setData] = useState<T[]>(fallback);
  const [isLoading, setIsLoading] = useState(true);
  const [isFallback, setIsFallback] = useState(false);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const res = await api.get<T[]>(path);
        if (!cancelled) {
          setData(res.data.length ? res.data : fallback);
          setIsFallback(res.data.length === 0);
        }
      } catch {
        if (!cancelled) {
          setData(fallback);
          setIsFallback(true);
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path]);

  return { data, isLoading, isFallback };
}