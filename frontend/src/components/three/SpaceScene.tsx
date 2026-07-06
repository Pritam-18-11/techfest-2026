import { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Starfield } from "./Starfield";
import { Nebula } from "./Nebula";
import { ParticleLogo } from "./ParticleLogo";
import { CameraRig } from "./CameraRig";

type SpaceSceneProps = {
  showLogo?: boolean;
  logoBurst?: boolean;
  onLogoFormed?: () => void;
  interactive?: boolean;
  frameloop?: "always" | "demand" | "never";
};

export function SpaceScene({
  showLogo = false,
  logoBurst = false,
  onLogoFormed,
  interactive = true,
  frameloop = "always",
}: SpaceSceneProps) {
  const [dpr] = useState<[number, number]>([1, 1.25]);

  return (
    <Canvas
      frameloop={frameloop}
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
        <Starfield count={1000} radius={70} layer={1} />
        <Starfield count={450} radius={45} layer={2} />
        <Starfield count={200} radius={30} layer={2.6} />
        <Nebula />
        {showLogo && (
          <ParticleLogo burst={logoBurst} onFormed={onLogoFormed} />
        )}
        {interactive && <CameraRig />}
      </Suspense>
    </Canvas>
  );
}