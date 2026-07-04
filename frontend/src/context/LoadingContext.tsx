import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

type LoadingContextValue = {
  progress: number;
  isReady: boolean;
  hasEntered: boolean;
  registerTask: () => () => void;
  enterExperience: () => void;
};

const LoadingContext = createContext<LoadingContextValue | null>(null);

/**
 * Coordinates the boot sequence: components (font loads, texture loads,
 * the space-scene GPU warmup) register a "task" on mount and resolve it
 * when ready. Progress is derived from resolved / total tasks so the
 * loading screen reflects real work instead of a fake timer.
 */
export function LoadingProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [hasEntered, setHasEntered] = useState(false);

  const totalTasks = useRef(0);
  const resolvedTasks = useRef(0);
  const minimumTimerDone = useRef(false);

  const recompute = useCallback(() => {
    const total = Math.max(totalTasks.current, 1);
    const pct = Math.min(100, Math.round((resolvedTasks.current / total) * 100));
    setProgress(pct);
    if (pct >= 100 && minimumTimerDone.current) {
      setIsReady(true);
    }
  }, []);

  const registerTask = useCallback(() => {
    totalTasks.current += 1;
    let resolved = false;
    return () => {
      if (resolved) return;
      resolved = true;
      resolvedTasks.current += 1;
      recompute();
    };
  }, [recompute]);

  // Guarantees the cinematic intro is felt even on a fast connection.
  useMemo(() => {
    window.setTimeout(() => {
      minimumTimerDone.current = true;
      recompute();
    }, 2200);
  }, [recompute]);

  const enterExperience = useCallback(() => setHasEntered(true), []);

  const value = useMemo(
    () => ({ progress, isReady, hasEntered, registerTask, enterExperience }),
    [progress, isReady, hasEntered, registerTask, enterExperience]
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
