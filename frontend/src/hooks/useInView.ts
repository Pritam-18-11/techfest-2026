import { useEffect, useRef, useState } from "react";

/**
 * Tracks whether a DOM node is currently in (or near) the viewport.
 * Used to pause expensive R3F canvases (frameloop="never") the
 * moment they scroll off-screen, instead of rendering forever in
 * the background — this was the single biggest cause of site-wide lag.
 */
export function useInView<T extends HTMLElement>(options?: IntersectionObserverInit) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(true);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(([entry]) => {
      setInView(entry.isIntersecting);
    }, options);

    observer.observe(node);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { ref, inView };
}