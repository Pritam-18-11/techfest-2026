import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const PANEL_COLS = 10;
const PANEL_ROWS = 4;
const DRONE_COUNT = 10;
const FIREWORK_PARTICLES = 150;

function LEDWall() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const color = useMemo(() => new THREE.Color(), []);
  const count = PANEL_COLS * PANEL_ROWS;

  const seeds = useMemo(
    () => Array.from({ length: count }, () => Math.random() * Math.PI * 2),
    [count]
  );

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    let i = 0;
    for (let row = 0; row < PANEL_ROWS; row++) {
      for (let col = 0; col < PANEL_COLS; col++) {
        dummy.position.set((col - PANEL_COLS / 2) * 1.6, row * 1.6, 0);
        dummy.scale.setScalar(1);
        dummy.updateMatrix();
        meshRef.current.setMatrixAt(i, dummy.matrix);

        const pulse = 0.5 + 0.5 * Math.sin(t * 1.4 + seeds[i] + col * 0.3);
        color.setHSL(0.5 + 0.15 * Math.sin(seeds[i]), 0.9, 0.35 + pulse * 0.3);
        meshRef.current.setColorAt(i, color);
        i++;
      }
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor) meshRef.current.instanceColor.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]} position={[0, -3, -20]}>
      <planeGeometry args={[1.4, 1.4]} />
      <meshBasicMaterial toneMapped={false} />
    </instancedMesh>
  );
}

function Spotlights() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    groupRef.current.children.forEach((cone, i) => {
      cone.rotation.z = Math.sin(t * 0.5 + i * 2) * 0.4;
    });
  });

  const colors = ["#3EF2E0", "#7B4DFF", "#FF3ECF", "#2E6FFF"];

  return (
    <group ref={groupRef} position={[0, 10, -8]}>
      {colors.map((c, i) => (
        <mesh key={i} position={[(i - 1.5) * 4, 0, 0]} rotation={[Math.PI, 0, 0]}>
          <coneGeometry args={[1.2, 10, 24, 1, true]} />
          <meshBasicMaterial color={c} transparent opacity={0.12} side={THREE.DoubleSide} />
        </mesh>
      ))}
    </group>
  );
}

function Drones() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const seeds = useMemo(
    () =>
      Array.from({ length: DRONE_COUNT }, () => ({
        x: (Math.random() - 0.5) * 24,
        y: 4 + Math.random() * 6,
        z: -Math.random() * 20,
        phase: Math.random() * Math.PI * 2,
      })),
    []
  );

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    seeds.forEach((d, i) => {
      dummy.position.set(d.x, d.y + Math.sin(t + d.phase) * 0.6, d.z);
      dummy.scale.setScalar(0.25);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, DRONE_COUNT]}>
      <octahedronGeometry args={[1, 0]} />
      <meshBasicMaterial color="#EAF0FF" />
    </instancedMesh>
  );
}

function FireworkBurst() {
  const pointsRef = useRef<THREE.Points>(null);

  const { positions, velocities } = useMemo(() => {
    const pos = new Float32Array(FIREWORK_PARTICLES * 3);
    const vel = new Float32Array(FIREWORK_PARTICLES * 3);
    for (let i = 0; i < FIREWORK_PARTICLES; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const speed = 2 + Math.random() * 4;
      vel[i * 3] = speed * Math.sin(phi) * Math.cos(theta);
      vel[i * 3 + 1] = speed * Math.sin(phi) * Math.sin(theta);
      vel[i * 3 + 2] = speed * Math.cos(phi);
    }
    return { positions: pos, velocities: vel };
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const t = state.clock.getElapsedTime() % 4;
    const arr = pointsRef.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < FIREWORK_PARTICLES; i++) {
      arr[i * 3] = velocities[i * 3] * t;
      arr[i * 3 + 1] = velocities[i * 3 + 1] * t - t * t * 0.8;
      arr[i * 3 + 2] = velocities[i * 3 + 2] * t;
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
    (pointsRef.current.material as THREE.PointsMaterial).opacity = Math.max(0, 1 - t / 4);
  });

  return (
    <points ref={pointsRef} position={[0, 10, -10]}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={FIREWORK_PARTICLES} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.12} color="#FF3ECF" transparent opacity={1} depthWrite={false} />
    </points>
  );
}

export function ArenaScene() {
  return (
    <group position={[0, -2, -230]}>
      <LEDWall />
      <Spotlights />
      <Drones />
      <FireworkBurst />

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -3, -6]}>
        <planeGeometry args={[26, 14]} />
        <meshStandardMaterial color="#0B0F24" metalness={0.7} roughness={0.3} />
      </mesh>

      <ambientLight intensity={0.3} />
      <pointLight position={[0, 8, 0]} intensity={2} color="#3EF2E0" />
    </group>
  );
}