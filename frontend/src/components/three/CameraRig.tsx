import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { useMousePosition } from "@/hooks/useMousePosition";
import { lerp } from "@/lib/utils";

type CameraRigProps = {
  intensity?: number;
  baseZ?: number;
};

/**
 * Smoothly eases the camera toward the pointer position, giving the
 * space scene a "looking around the cockpit" feeling without any
 * jarring snaps.
 */
export function CameraRig({ intensity = 1.2, baseZ = 8 }: CameraRigProps) {
  const { camera } = useThree();
  const pointer = useMousePosition();
  const current = useRef(new THREE.Vector2(0, 0));

  useFrame(() => {
    current.current.x = lerp(current.current.x, pointer.x, 0.03);
    current.current.y = lerp(current.current.y, pointer.y, 0.03);

    camera.position.x = current.current.x * intensity;
    camera.position.y = current.current.y * intensity * 0.6;
    camera.position.z = baseZ;
    camera.lookAt(0, 0, -10);
  });

  return null;
}
