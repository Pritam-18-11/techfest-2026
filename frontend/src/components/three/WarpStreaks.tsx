import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { journeyState } from "@/three/journeyState";

const STREAK_COUNT = 120;

export function WarpStreaks() {
  const { camera } = useThree();
  const groupRef = useRef<THREE.Group>(null);
  const materialRef = useRef<THREE.LineBasicMaterial>(null);

  const geometry = useMemo(() => {
    const positions = new Float32Array(STREAK_COUNT * 2 * 3);
    for (let i = 0; i < STREAK_COUNT; i++) {
      const radius = 4 + Math.random() * 30;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = -10 - Math.random() * 20;

      positions[i * 6] = x;
      positions[i * 6 + 1] = y;
      positions[i * 6 + 2] = z;
      positions[i * 6 + 3] = x;
      positions[i * 6 + 4] = y;
      positions[i * 6 + 5] = z + 1;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geo;
  }, []);

  useFrame(() => {
    if (!groupRef.current || !materialRef.current) return;
    const v = Math.min(journeyState.velocity * 40, 1);
    groupRef.current.scale.z = 1 + v * 18;
    materialRef.current.opacity = v * 0.8;
    groupRef.current.position.copy(camera.position);
    groupRef.current.quaternion.copy(camera.quaternion);
  });

  return (
    <group ref={groupRef}>
      <lineSegments geometry={geometry}>
        <lineBasicMaterial
          ref={materialRef}
          color="#3EF2E0"
          transparent
          opacity={0}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>
    </group>
  );
}