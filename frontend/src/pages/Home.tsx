import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SpaceScene } from "@/components/three/SpaceScene";
import { JourneyScroll } from "@/components/three/JourneyScroll";
import { HeroOverlay } from "./HeroOverlay";
import { useLoading } from "@/context/LoadingContext";
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

export function Home() {
  const { isReady } = useLoading();
  const [stage, setStage] = useState<IntroStage>("forming");

  // Lock scroll until the intro sequence hands off to the hero.
  useEffect(() => {
    document.body.style.overflow = stage === "revealed" ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [stage]);

  function handleLogoFormed() {
    setStage("formed");
    window.setTimeout(() => setStage("bursting"), 900);
    window.setTimeout(() => setStage("revealed"), 2500);
  }

  return (
    <div className="relative w-full">
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

      {/* Main content sections, revealed with standard scroll (no pin)
          once the cinematic journey hands off. */}
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
    </div>
  );
}