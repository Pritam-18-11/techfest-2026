import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type LoadingContextValue = {
  progress: number;
  isReady: boolean;
  hasEntered: boolean;
  enterExperience: () => void;
};

const LoadingContext = createContext<LoadingContextValue | null>(null);

const BOOT_DURATION_MS = 2200;

/**
 * Simple timed boot sequence: progress animates 0 -> 100 over
 * BOOT_DURATION_MS, then isReady flips true. This guarantees the
 * loading screen always resolves, regardless of whether any
 * component registers async work.
 */
export function LoadingProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [hasEntered, setHasEntered] = useState(false);

  useEffect(() => {
    const start = performance.now();
    let frame: number;

    function tick(now: number) {
      const elapsed = now - start;
      const pct = Math.min(100, Math.round((elapsed / BOOT_DURATION_MS) * 100));
      setProgress(pct);

      if (pct >= 100) {
        setIsReady(true);
        return;
      }
      frame = requestAnimationFrame(tick);
    }

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  const enterExperience = () => setHasEntered(true);

  const value = useMemo(
    () => ({ progress, isReady, hasEntered, enterExperience }),
    [progress, isReady, hasEntered]
  );

  return (
    <LoadingContext.Provider value={value}>{children}</LoadingContext.Provider>
  );
}

export function useLoading() {
  const ctx = useContext(LoadingContext);
  if (!ctx) throw new Error("useLoading must be used within LoadingProvider");
  return ctx;
}