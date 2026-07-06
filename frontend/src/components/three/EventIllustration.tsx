import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function EventIllustration({ color = "#3EF2E0" }: { color?: string }) {
  return (
    <div className="aspect-square w-full overflow-hidden rounded-2xl">
      <Canvas
        dpr={[1, 1.25]}
        gl={{ antialias: false }}
        camera={{ position: [0, 0, 6], fov: 45 }}
      >
        <color attach="background" args={["#02040f"]} />
        <Suspense fallback={null}>
          <IllustrationMesh color={color} />
        </Suspense>
      </Canvas>
    </div>
  );
}

function IllustrationMesh({ color }: { color: string }) {
  const coreRef = useRef<THREE.Mesh>(null);
  const shellRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (coreRef.current) {
      coreRef.current.rotation.x += delta * 0.3;
      coreRef.current.rotation.y += delta * 0.4;
    }
    if (shellRef.current) {
      shellRef.current.rotation.y -= delta * 0.15;
      const pulse = 1 + Math.sin(state.clock.getElapsedTime() * 1.4) * 0.04;
      shellRef.current.scale.setScalar(pulse);
    }
  });

  return (
    <group>
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[1.4, 1]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.8}
          wireframe
        />
      </mesh>
      <mesh ref={shellRef}>
        <icosahedronGeometry args={[2.1, 0]} />
        <meshBasicMaterial color={color} wireframe transparent opacity={0.25} />
      </mesh>
      <pointLight position={[3, 2, 4]} intensity={1.5} color={color} />
      <ambientLight intensity={0.3} />
    </group>
  );
}