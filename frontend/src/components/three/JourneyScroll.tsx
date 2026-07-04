import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { JourneyCanvas } from "@/components/three/JourneyCanvas";
import { JOURNEY_SCENES, VH_PER_SCENE } from "@/three/journeyScenes";
import { setJourneyProgress } from "@/three/journeyState";

gsap.registerPlugin(ScrollTrigger);

/**
 * Renders a tall spacer (VH_PER_SCENE * number of scenes) and pins the
 * JourneyCanvas for its duration. Scroll position within that pinned
 * range drives journeyState.progress via ScrollTrigger's onUpdate,
 * which the camera rig and scene FadeGates read every frame.
 */
export function JourneyScroll() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!wrapperRef.current || !pinRef.current) return;

    const trigger = ScrollTrigger.create({
      trigger: wrapperRef.current,
      start: "top top",
      end: "bottom bottom",
      pin: pinRef.current,
      pinSpacing: false,
      scrub: 0.6,
      onUpdate: (self) => {
        setJourneyProgress(self.progress);
        const idx = JOURNEY_SCENES.findIndex(
          (s) => self.progress >= s.band[0] && self.progress < s.band[1]
        );
        if (idx !== -1) setActiveIndex(idx);
      },
    });

    return () => {
      trigger.kill();
    };
  }, []);

  const totalVh = VH_PER_SCENE * JOURNEY_SCENES.length;

  return (
    <div ref={wrapperRef} style={{ height: `${totalVh}vh` }} className="relative">
      <div ref={pinRef} className="relative h-screen w-full overflow-hidden">
        <JourneyCanvas />

        <div className="pointer-events-none absolute inset-0 flex flex-col justify-between p-6 md:p-10">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] uppercase tracking-widest2 text-mist/40">
              Journey {String(activeIndex + 1).padStart(2, "0")} / {JOURNEY_SCENES.length}
            </span>
            <div className="flex gap-1.5">
              {JOURNEY_SCENES.map((scene, i) => (
                <span
                  key={scene.id}
                  className="h-1 w-6 rounded-full transition-colors duration-500"
                  style={{
                    backgroundColor:
                      i === activeIndex ? "#3EF2E0" : "rgba(234,240,255,0.15)",
                  }}
                />
              ))}
            </div>
          </div>

          <div className="text-center">
            <p className="font-mono text-[11px] uppercase tracking-widest2 text-signal-cyan">
              Scene {activeIndex + 2 < 10 ? `0${activeIndex + 2}` : activeIndex + 2}
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold uppercase text-mist md:text-5xl">
              {JOURNEY_SCENES[activeIndex]?.label}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}