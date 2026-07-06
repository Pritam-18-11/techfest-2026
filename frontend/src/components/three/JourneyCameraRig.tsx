import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { useMousePosition } from "@/hooks/useMousePosition";
import { lerp } from "@/lib/utils";
import { journeyState } from "@/three/journeyState";
import { JOURNEY_START_Z, JOURNEY_END_Z } from "@/three/journeyScenes";

export function JourneyCameraRig() {
  const { camera } = useThree();
  const pointer = useMousePosition();
  const mouseOffset = useRef(new THREE.Vector2(0, 0));

  useFrame(() => {
    // Ease the raw scroll progress for a cinematic (non-linear) feel.
    journeyState.smoothProgress = lerp(
      journeyState.smoothProgress,
      journeyState.progress,
      0.08
    );

    mouseOffset.current.x = lerp(mouseOffset.current.x, pointer.x, 0.04);
    mouseOffset.current.y = lerp(mouseOffset.current.y, pointer.y, 0.04);

    const z = lerp(JOURNEY_START_Z, JOURNEY_END_Z, journeyState.smoothProgress);
    const sway = Math.sin(journeyState.smoothProgress * Math.PI * 5) * 1.4;

    camera.position.x = sway + mouseOffset.current.x * 1.5;
    camera.position.y = mouseOffset.current.y * 0.8;
    camera.position.z = z;
    camera.lookAt(mouseOffset.current.x * 2, mouseOffset.current.y, z - 12);
    if ("fov" in camera) (camera as THREE.PerspectiveCamera).fov = 55;
    camera.updateProjectionMatrix();
  });

  return null;
}
