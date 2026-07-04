import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import * as THREE from "three";
import { JourneyCameraRig } from "./JourneyCameraRig";
import { WarpStreaks } from "./WarpStreaks";
import { Starfield } from "./Starfield";
import { EarthScene } from "./EarthScene";
import { FutureCityScene } from "./FutureCityScene";
import { AIWorldScene } from "./AIWorldScene";
import { QuantumScene } from "./QuantumScene";
import { RoboticsScene } from "./RoboticsScene";
import { ArenaScene } from "./ArenaScene";
import { JOURNEY_SCENES } from "@/three/journeyScenes";
import { journeyState } from "@/three/journeyState";

/**
 * Wraps a scene group and fades it in/out (via a cloned-material
 * opacity trick would be expensive per-mesh, so instead we toggle
 * visibility based on distance from the current camera-path Z — cheap,
 * avoids ever rendering more than ~2 scenes' worth of draw calls).
 */
function FadeGate({ band, children }: { band: [number, number]; children: React.ReactNode }) {
  const groupRef = useRef<THREE.Group>(null);
  const margin = 0.08;

  useFrame(() => {
    if (!groupRef.current) return;
    const p = journeyState.smoothProgress;
    const active = p > band[0] - margin && p < band[1] + margin;
    groupRef.current.visible = active;
  });

  return <group ref={groupRef}>{children}</group>;
}

export function JourneyCanvas() {
  return (
    <Canvas
      dpr={[1, 1.75]}
      gl={{ antialias: false, powerPreference: "high-performance" }}
      camera={{ position: [0, 0, 8], fov: 55, near: 0.1, far: 260 }}
      className="!absolute inset-0"
    >
      <color attach="background" args={["#02040f"]} />
      <fog attach="fog" args={["#02040f", 20, 140]} />

      <Suspense fallback={null}>
        <Starfield count={1500} radius={140} layer={1} />

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

        <EffectComposer multisampling={0}>
          <Bloom intensity={0.85} luminanceThreshold={0.18} luminanceSmoothing={0.4} mipmapBlur />
          <Vignette eskil={false} offset={0.15} darkness={0.85} />
        </EffectComposer>
      </Suspense>
    </Canvas>
  );
}