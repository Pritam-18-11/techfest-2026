import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const RING_COUNT = 4;
const ELECTRONS_PER_RING = 3;

export function QuantumScene() {
  const coreRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const gridRef = useRef<THREE.Mesh>(null);

  const rings = useMemo(
    () =>
      Array.from({ length: RING_COUNT }, (_, i) => ({
        radius: 3.5 + i * 1.3,
        tilt: (i / RING_COUNT) * Math.PI,
        speed: 0.25 + i * 0.12,
        color: [ "#3EF2E0", "#7B4DFF", "#FF3ECF", "#2E6FFF" ][i % 4],
      })),
    []
  );

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    if (coreRef.current) {
      coreRef.current.rotation.y += delta * 0.4;
      coreRef.current.rotation.x += delta * 0.2;
      const pulse = 1 + Math.sin(t * 2) * 0.06;
      coreRef.current.scale.setScalar(pulse);
    }
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.03;
    if (gridRef.current) {
      (gridRef.current.material as THREE.MeshBasicMaterial).opacity =
        0.12 + Math.sin(t * 0.8) * 0.04;
    }
  });

  return (
    <group position={[0, 0, -150]}>
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[1.6, 2]} />
        <meshStandardMaterial
          color="#EAF0FF"
          emissive="#3EF2E0"
          emissiveIntensity={1.4}
          roughness={0.1}
          metalness={0.4}
        />
      </mesh>
      <pointLight position={[0, 0, 0]} intensity={3} color="#3EF2E0" distance={20} />

      <group ref={groupRef}>
        {rings.map((ring, i) => (
          <ElectronRing key={i} {...ring} />
        ))}
      </group>

      <mesh
        ref={gridRef}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -8, 0]}
      >
        <planeGeometry args={[80, 80, 40, 40]} />
        <meshBasicMaterial color="#2E6FFF" wireframe transparent opacity={0.15} />
      </mesh>

      <ambientLight intensity={0.15} />
    </group>
  );
}

function ElectronRing({
  radius,
  tilt,
  speed,
  color,
}: {
  radius: number;
  tilt: number;
  speed: number;
  color: string;
}) {
  const ringGroupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (ringGroupRef.current) ringGroupRef.current.rotation.z += delta * speed;
  });

  return (
    <group rotation={[tilt, tilt * 0.5, 0]}>
      <mesh>
        <torusGeometry args={[radius, 0.015, 8, 100]} />
        <meshBasicMaterial color={color} transparent opacity={0.4} />
      </mesh>
      <group ref={ringGroupRef}>
        {Array.from({ length: ELECTRONS_PER_RING }).map((_, i) => {
          const angle = (i / ELECTRONS_PER_RING) * Math.PI * 2;
          return (
            <mesh key={i} position={[Math.cos(angle) * radius, Math.sin(angle) * radius, 0]}>
              <sphereGeometry args={[0.12, 12, 12]} />
              <meshBasicMaterial color={color} />
            </mesh>
          );
        })}
      </group>
    </group>
  );
}