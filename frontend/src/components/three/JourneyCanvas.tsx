import { Suspense, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Starfield } from "./Starfield";
import { EarthScene } from "./EarthScene";
import { FutureCityScene } from "./FutureCityScene";
import { AIWorldScene } from "./AIWorldScene";
import { QuantumScene } from "./QuantumScene";
import { RoboticsScene } from "./RoboticsScene";
import { ArenaScene } from "./ArenaScene";
import { JourneyCameraRig } from "./JourneyCameraRig";
import { WarpStreaks } from "./WarpStreaks";
import { JOURNEY_SCENES } from "@/three/journeyScenes";
import { journeyState } from "@/three/journeyState";

function FadeGate({ band, children }: { band: [number, number]; children: React.ReactNode }) {
  const [active, setActive] = useState(false);
  const margin = 0.1;

  useFrame(() => {
    const p = journeyState.smoothProgress;
    const shouldBeActive = p > band[0] - margin && p < band[1] + margin;
    if (shouldBeActive !== active) setActive(shouldBeActive);
  });

  return active ? <>{children}</> : null;
}

type JourneyCanvasProps = {
  frameloop?: "always" | "demand" | "never";
};

export function JourneyCanvas({ frameloop = "always" }: JourneyCanvasProps) {
  return (
    <Canvas
      frameloop={frameloop}
      dpr={[1, 1.25]}
      gl={{ antialias: false, powerPreference: "high-performance" }}
      camera={{ position: [0, 0, 8], fov: 55, near: 0.1, far: 260 }}
      className="!absolute inset-0"
    >
      <color attach="background" args={["#02040f"]} />
      <fog attach="fog" args={["#02040f", 20, 140]} />

      <Suspense fallback={null}>
        <Starfield count={600} radius={140} layer={1} />

        <FadeGate band={JOURNEY_SCENES[0].band}>
          <EarthScene />
        </FadeGate>
        <FadeGate band={JOURNEY_SCENES[1].band}>
          <FutureCityScene />
        </FadeGate>
        <FadeGate band={JOURNEY_SCENES[2].band}>
          <AIWorldScene />
        </FadeGate>
        <FadeGate band={JOURNEY_SCENES[3].band}>
          <QuantumScene />
        </FadeGate>
        <FadeGate band={JOURNEY_SCENES[4].band}>
          <RoboticsScene />
        </FadeGate>
        <FadeGate band={JOURNEY_SCENES[5].band}>
          <ArenaScene />
        </FadeGate>

        <WarpStreaks />
        <JourneyCameraRig />
      </Suspense>
    </Canvas>
  );
}