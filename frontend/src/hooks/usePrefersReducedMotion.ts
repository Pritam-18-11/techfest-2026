import { useEffect, useState } from "react";

/**
 * Tracks the `prefers-reduced-motion` media query. Used to skip the
 * cinematic scroll-jacked journey and heavy camera animation for users
 * who've asked their OS to reduce motion — the CSS in globals.css
 * already shortens transitions, but the 3D journey needs an explicit
 * JS-level bypass since it's driven by GSAP/R3F, not CSS.
 */
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mql.matches);

    function handleChange(e: MediaQueryListEvent) {
      setReduced(e.matches);
    }

    mql.addEventListener("change", handleChange);
    return () => mql.removeEventListener("change", handleChange);
  }, []);

  return reduced;
}