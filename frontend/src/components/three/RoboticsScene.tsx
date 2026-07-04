import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function RoboticMetal({ color = "#1A2036" }: { color?: string }) {
  return (
    <meshStandardMaterial color={color} metalness={0.85} roughness={0.25} />
  );
}

function Humanoid() {
  const groupRef = useRef<THREE.Group>(null);
  const leftArmRef = useRef<THREE.Group>(null);
  const rightArmRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) groupRef.current.position.y = -2 + Math.sin(t * 1.2) * 0.08;
    if (leftArmRef.current) leftArmRef.current.rotation.x = Math.sin(t * 1.2) * 0.3;
    if (rightArmRef.current) rightArmRef.current.rotation.x = -Math.sin(t * 1.2) * 0.3;
    if (headRef.current) headRef.current.rotation.y = Math.sin(t * 0.5) * 0.5;
  });

  return (
    <group ref={groupRef} position={[-6, -2, 6]}>
      {/* torso */}
      <mesh position={[0, 2.2, 0]}>
        <boxGeometry args={[1.2, 1.6, 0.7]} />
        <RoboticMetal />
      </mesh>
      {/* head */}
      <mesh ref={headRef} position={[0, 3.3, 0]}>
        <boxGeometry args={[0.6, 0.6, 0.6]} />
        <RoboticMetal color="#2E6FFF" />
      </mesh>
      <mesh position={[0, 3.3, 0.31]}>
        <planeGeometry args={[0.35, 0.15]} />
        <meshBasicMaterial color="#3EF2E0" />
      </mesh>
      {/* arms */}
      <group ref={leftArmRef} position={[-0.75, 2.7, 0]}>
        <mesh position={[0, -0.6, 0]}>
          <boxGeometry args={[0.28, 1.2, 0.28]} />
          <RoboticMetal />
        </mesh>
      </group>
      <group ref={rightArmRef} position={[0.75, 2.7, 0]}>
        <mesh position={[0, -0.6, 0]}>
          <boxGeometry args={[0.28, 1.2, 0.28]} />
          <RoboticMetal />
        </mesh>
      </group>
      {/* legs */}
      <mesh position={[-0.32, 0.6, 0]}>
        <boxGeometry args={[0.32, 1.6, 0.32]} />
        <RoboticMetal />
      </mesh>
      <mesh position={[0.32, 0.6, 0]}>
        <boxGeometry args={[0.32, 1.6, 0.32]} />
        <RoboticMetal />
      </mesh>
    </group>
  );
}

function RobotArm() {
  const baseRotRef = useRef<THREE.Group>(null);
  const armRef = useRef<THREE.Group>(null);
  const forearmRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (baseRotRef.current) baseRotRef.current.rotation.y = Math.sin(t * 0.4) * 0.9;
    if (armRef.current) armRef.current.rotation.z = Math.sin(t * 0.6) * 0.35 - 0.2;
    if (forearmRef.current) forearmRef.current.rotation.z = Math.cos(t * 0.8) * 0.5;
  });

  return (
    <group position={[7, -3.5, 4]}>
      <mesh position={[0, 0.2, 0]}>
        <cylinderGeometry args={[0.9, 1.1, 0.4, 16]} />
        <RoboticMetal color="#0B0F24" />
      </mesh>
      <group ref={baseRotRef} position={[0, 0.4, 0]}>
        <group ref={armRef}>
          <mesh position={[0, 1.2, 0]}>
            <boxGeometry args={[0.4, 2.4, 0.4]} />
            <RoboticMetal color="#2E6FFF" />
          </mesh>
          <group ref={forearmRef} position={[0, 2.4, 0]}>
            <mesh position={[0, 1, 0]}>
              <boxGeometry args={[0.3, 2, 0.3]} />
              <RoboticMetal color="#7B4DFF" />
            </mesh>
            <mesh position={[0, 2.1, 0]}>
              <coneGeometry args={[0.22, 0.5, 8]} />
              <meshBasicMaterial color="#FF3ECF" />
            </mesh>
          </group>
        </group>
      </group>
    </group>
  );
}

function LaserScanner() {
  const beamRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (beamRef.current) {
      beamRef.current.position.x = Math.sin(t * 1.5) * 5;
    }
  });

  return (
    <mesh ref={beamRef} position={[0, -1, -4]} rotation={[Math.PI / 2, 0, 0]}>
      <planeGeometry args={[0.03, 6]} />
      <meshBasicMaterial color="#FF3ECF" transparent opacity={0.8} />
    </mesh>
  );
}

function Conveyor() {
  const stripesRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (!stripesRef.current) return;
    stripesRef.current.children.forEach((child) => {
      child.position.z += delta * 3;
      if (child.position.z > 8) child.position.z = -8;
    });
  });

  return (
    <group position={[0, -4, 2]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[3, 16]} />
        <meshStandardMaterial color="#0B0F24" metalness={0.6} roughness={0.4} />
      </mesh>
      <group ref={stripesRef}>
        {Array.from({ length: 8 }).map((_, i) => (
          <mesh key={i} position={[0, 0.01, -8 + i * 2]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[3, 0.1]} />
            <meshBasicMaterial color="#3EF2E0" transparent opacity={0.5} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

export function RoboticsScene() {
  return (
    <group position={[0, 0, -190]}>
      <Humanoid />
      <RobotArm />
      <LaserScanner />
      <Conveyor />
      <ambientLight intensity={0.25} />
      <pointLight position={[0, 6, 6]} intensity={1.4} color="#3EF2E0" />
      <pointLight position={[-6, 4, 4]} intensity={1} color="#2E6FFF" />
      <pointLight position={[7, 2, 6]} intensity={1} color="#FF3ECF" />
    </group>
  );
}