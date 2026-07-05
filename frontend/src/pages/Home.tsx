import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SpaceScene } from "@/components/three/SpaceScene";
import { JourneyScroll } from "@/components/three/JourneyScroll";
import { CanvasErrorBoundary } from "@/components/three/CanvasErrorBoundary";
import { StaticHeroFallback } from "@/components/ui/StaticHeroFallback";
import { HeroOverlay } from "./HeroOverlay";
import { useLoading } from "@/context/LoadingContext";
import { useWebGLSupport } from "@/hooks/useWebGLSupport";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useDocumentHead } from "@/hooks/useDocumentHead";
import { About } from "@/components/sections/About";
import { HackathonSpotlight } from "@/components/sections/HackathonSpotlight";
import { EventsGrid } from "@/components/sections/EventsGrid";
import { Workshops } from "@/components/sections/Workshops";
import { Speakers } from "@/components/sections/Speakers";
import { Sponsors } from "@/components/sections/Sponsors";
import { Gallery } from "@/components/sections/Gallery";
import { Timeline } from "@/components/sections/Timeline";
import { Countdown } from "@/components/sections/Countdown";

type IntroStage = "forming" | "formed" | "bursting" | "revealed";

const CONTENT_SECTIONS = (
  <div className="relative bg-void-base">
    <About />
    <HackathonSpotlight />
    <EventsGrid />
    <Workshops />
    <Speakers />
    <Sponsors />
    <Gallery />
    <Timeline />
    <Countdown />
  </div>
);

export function Home() {
  useDocumentHead({
    title: "TechFest 2026 — The Future Begins Here",
    description:
      "TechFest 2026: three days of hackathons, robotics, AI, quantum computing and more. 13-15 February 2026 at IIT.",
    path: "/",
  });

  const { isReady } = useLoading();
  const [stage, setStage] = useState<IntroStage>("forming");
  const supportsWebGL = useWebGLSupport();
  const prefersReducedMotion = usePrefersReducedMotion();

  // Skip the cinematic 3D experience entirely for unsupported browsers
  // or when the user has asked their OS to reduce motion.
  const useLightExperience = supportsWebGL === false || prefersReducedMotion;

  // Lock scroll until the intro sequence hands off to the hero
  // (only relevant for the full cinematic experience).
  useEffect(() => {
    if (useLightExperience) {
      document.body.style.overflow = "";
      return;
    }
    document.body.style.overflow = stage === "revealed" ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [stage, useLightExperience]);

  function handleLogoFormed() {
    setStage("formed");
    window.setTimeout(() => setStage("bursting"), 900);
    window.setTimeout(() => setStage("revealed"), 2500);
  }

  if (useLightExperience) {
    return (
      <div className="relative w-full">
        <StaticHeroFallback />
        {CONTENT_SECTIONS}
      </div>
    );
  }

  return (
    <div className="relative w-full">
      <CanvasErrorBoundary fallback={<StaticHeroFallback />}>
        <div className="relative h-screen w-full overflow-hidden">
          <SpaceScene
            showLogo={isReady}
            logoBurst={stage === "bursting" || stage === "revealed"}
            onLogoFormed={handleLogoFormed}
            interactive
          />

          <div className="vignette" />

          <AnimatePresence>
            {stage === "revealed" && (
              <motion.div
                key="hero"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.4, ease: "easeOut" }}
                className="absolute inset-0"
              >
                <HeroOverlay />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Scenes 2-7: the pinned scroll journey through Earth, Future City,
            AI World, Quantum Computing, Robotics Lab and the Main Arena. */}
        <JourneyScroll />
      </CanvasErrorBoundary>

      {/* Main content sections, revealed with standard scroll (no pin)
          once the cinematic journey hands off. */}
      {CONTENT_SECTIONS}
    </div>
  );
}