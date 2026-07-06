import { useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Initializes Lenis smooth scrolling and drives it from GSAP's ticker.
 * Also syncs Lenis's scroll events into ScrollTrigger.update — without
 * this, GSAP ScrollTrigger pins can desync from Lenis and feel "stuck"
 * until the user forces a resync by dragging the scrollbar directly.
 */
export function useLenis() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 0.7,
      easing: (t: number) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
      wheelMultiplier: 1.2,
      touchMultiplier: 1.6,
    });

    lenisRef.current = lenis;
    document.documentElement.classList.add("lenis");

    // Critical: keeps ScrollTrigger's pinning in sync with Lenis's
    // virtual scroll position every frame.
    lenis.on("scroll", ScrollTrigger.update);

    function raf(time: number) {
      lenis.raf(time);
    }

    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
      lenisRef.current = null;
      document.documentElement.classList.remove("lenis");
    };
  }, []);

  return lenisRef;
}