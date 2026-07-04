import { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import { Starfield } from "./Starfield";
import { Nebula } from "./Nebula";
import { ParticleLogo } from "./ParticleLogo";
import { CameraRig } from "./CameraRig";

type SpaceSceneProps = {
  showLogo?: boolean;
  logoBurst?: boolean;
  onLogoFormed?: () => void;
  interactive?: boolean;
};

/**
 * The Scene 1 "Deep Space" environment: layered starfields, drifting
 * nebula clouds, and (on the landing screen) the particle wordmark.
 * Rendered inside a single shared Canvas so it stays performant.
 */
export function SpaceScene({
  showLogo = false,
  logoBurst = false,
  onLogoFormed,
  interactive = true,
}: SpaceSceneProps) {
  const [dpr] = useState<[number, number]>([1, 2]);

  return (
    <Canvas
      dpr={dpr}
      gl={{ antialias: false, powerPreference: "high-performance" }}
      camera={{ position: [0, 0, 8], fov: 55, near: 0.1, far: 200 }}
      className="!absolute inset-0"
    >
      <color attach="background" args={["#02040f"]} />
      <fog attach="fog" args={["#02040f", 20, 90]} />
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={0.6} color="#3EF2E0" />

      <Suspense fallback={null}>
        <Starfield count={2200} radius={70} layer={1} />
        <Starfield count={900} radius={45} layer={2} />
        <Starfield count={400} radius={30} layer={2.6} />
        <Nebula />
        {showLogo && (
          <ParticleLogo burst={logoBurst} onFormed={onLogoFormed} />
        )}
        {interactive && <CameraRig />}
        <EffectComposer multisampling={0}>
          <Bloom
            intensity={0.9}
            luminanceThreshold={0.15}
            luminanceSmoothing={0.4}
            mipmapBlur
          />
          <Vignette eskil={false} offset={0.15} darkness={0.9} />
        </EffectComposer>
      </Suspense>
    </Canvas>
  );
}
