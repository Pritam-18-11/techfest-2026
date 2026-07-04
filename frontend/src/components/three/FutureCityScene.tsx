import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const BUILDING_COUNT = 90;
const TRAFFIC_COUNT = 40;
const DRONE_COUNT = 14;

function useBuildingLayout() {
  return useMemo(() => {
    const items: { position: [number, number, number]; height: number; hue: number }[] = [];
    for (let i = 0; i < BUILDING_COUNT; i++) {
      const side = i % 2 === 0 ? -1 : 1;
      const x = side * (10 + Math.random() * 22);
      const z = -Math.random() * 90;
      const height = 6 + Math.random() * 26;
      items.push({ position: [x, height / 2 - 6, z], height, hue: Math.random() });
    }
    return items;
  }, []);
}

export function FutureCityScene() {
  const buildings = useBuildingLayout();
  const buildingRef = useRef<THREE.InstancedMesh>(null);
  const edgeRef = useRef<THREE.InstancedMesh>(null);
  const trafficRef = useRef<THREE.InstancedMesh>(null);
  const droneRef = useRef<THREE.InstancedMesh>(null);

  const dummy = useMemo(() => new THREE.Object3D(), []);
  const color = useMemo(() => new THREE.Color(), []);

  const trafficSeeds = useMemo(
    () =>
      Array.from({ length: TRAFFIC_COUNT }, () => ({
        z: -Math.random() * 90,
        x: (Math.random() > 0.5 ? 1 : -1) * (4 + Math.random() * 3),
        speed: 6 + Math.random() * 10,
        y: 1 + Math.random() * 3,
      })),
    []
  );

  const droneSeeds = useMemo(
    () =>
      Array.from({ length: DRONE_COUNT }, () => ({
        x: (Math.random() - 0.5) * 40,
        y: 4 + Math.random() * 14,
        z: -Math.random() * 90,
        phase: Math.random() * Math.PI * 2,
      })),
    []
  );

  // Static instance transforms + colors, set once.
  useMemo(() => {
    if (!buildingRef.current || !edgeRef.current) return;
    buildings.forEach((b, i) => {
      dummy.position.set(...b.position);
      dummy.scale.set(3 + Math.random() * 1.5, b.height, 3 + Math.random() * 1.5);
      dummy.updateMatrix();
      buildingRef.current!.setMatrixAt(i, dummy.matrix);
      edgeRef.current!.setMatrixAt(i, dummy.matrix);

      color.setHSL(0.55 + b.hue * 0.35, 0.8, 0.55);
      buildingRef.current!.setColorAt(i, color);
    });
    buildingRef.current.instanceMatrix.needsUpdate = true;
    edgeRef.current.instanceMatrix.needsUpdate = true;
    if (buildingRef.current.instanceColor) buildingRef.current.instanceColor.needsUpdate = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [buildings]);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();

    if (trafficRef.current) {
      trafficSeeds.forEach((car, i) => {
        car.z += delta * car.speed;
        if (car.z > 10) car.z = -90;
        dummy.position.set(car.x, car.y, car.z);
        dummy.scale.set(0.3, 0.2, 0.7);
        dummy.updateMatrix();
        trafficRef.current!.setMatrixAt(i, dummy.matrix);
      });
      trafficRef.current.instanceMatrix.needsUpdate = true;
    }

    if (droneRef.current) {
      droneSeeds.forEach((drone, i) => {
        const y = drone.y + Math.sin(t * 0.6 + drone.phase) * 0.8;
        dummy.position.set(drone.x, y, drone.z);
        dummy.scale.setScalar(0.35);
        dummy.updateMatrix();
        droneRef.current!.setMatrixAt(i, dummy.matrix);
      });
      droneRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <group position={[0, -4, -70]}>
      {/* Road */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -6, -40]}>
        <planeGeometry args={[16, 130]} />
        <meshStandardMaterial color="#050816" roughness={0.4} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -5.98, -40]}>
        <planeGeometry args={[0.15, 130]} />
        <meshBasicMaterial color="#3EF2E0" transparent opacity={0.6} />
      </mesh>

      <instancedMesh ref={buildingRef} args={[undefined, undefined, BUILDING_COUNT]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          color="#0B0F24"
          emissive="#2E6FFF"
          emissiveIntensity={0.35}
          roughness={0.3}
          metalness={0.6}
        />
      </instancedMesh>

      <instancedMesh ref={edgeRef} args={[undefined, undefined, BUILDING_COUNT]}>
        <boxGeometry args={[1.002, 1.002, 1.002]} />
        <meshBasicMaterial color="#3EF2E0" wireframe transparent opacity={0.15} />
      </instancedMesh>

      <instancedMesh ref={trafficRef} args={[undefined, undefined, TRAFFIC_COUNT]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial color="#FF3ECF" />
      </instancedMesh>

      <instancedMesh ref={droneRef} args={[undefined, undefined, DRONE_COUNT]}>
        <octahedronGeometry args={[1, 0]} />
        <meshBasicMaterial color="#7B4DFF" />
      </instancedMesh>

      {/* Billboards */}
      {[-16, 18].map((x, i) => (
        <mesh key={i} position={[x, 12, -30 - i * 20]} rotation={[0, i === 0 ? 0.5 : -0.5, 0]}>
          <planeGeometry args={[7, 4]} />
          <meshBasicMaterial
            color={i === 0 ? "#3EF2E0" : "#FF3ECF"}
            transparent
            opacity={0.35}
          />
        </mesh>
      ))}

      <ambientLight intensity={0.25} />
      <pointLight position={[0, 20, -20]} intensity={1} color="#2E6FFF" />
    </group>
  );
}