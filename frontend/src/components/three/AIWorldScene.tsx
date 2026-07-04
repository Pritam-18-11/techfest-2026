import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useMousePosition } from "@/hooks/useMousePosition";
import { lerp } from "@/lib/utils";

const BRAIN_VERTEX = /* glsl */ `
  uniform float uTime;
  varying vec3 vNormal;
  varying float vDisplace;

  float hash(vec3 p) { return fract(sin(dot(p, vec3(12.9898,78.233,45.164))) * 43758.5453); }

  void main() {
    vNormal = normal;
    float n = hash(floor(position * 3.0 + uTime * 0.3));
    float displace = sin(position.x * 3.0 + uTime) * 0.15
                    + sin(position.y * 4.0 - uTime * 1.3) * 0.12
                    + n * 0.05;
    vDisplace = displace;
    vec3 newPosition = position + normal * displace;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
  }
`;

const BRAIN_FRAGMENT = /* glsl */ `
  precision mediump float;
  varying vec3 vNormal;
  varying float vDisplace;

  void main() {
    float fresnel = pow(1.0 - max(dot(normalize(vNormal), vec3(0.0, 0.0, 1.0)), 0.0), 1.8);
    vec3 base = mix(vec3(0.18, 0.3, 0.95), vec3(0.48, 0.3, 1.0), vDisplace + 0.5);
    vec3 color = base + fresnel * vec3(0.24, 0.95, 0.88);
    gl_FragColor = vec4(color, 0.55 + fresnel * 0.4);
  }
`;

const NODE_COUNT = 60;

function useNeuralLines() {
  return useMemo(() => {
    const nodes: THREE.Vector3[] = [];
    for (let i = 0; i < NODE_COUNT; i++) {
      const r = 5.5 + Math.random() * 1.2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      nodes.push(
        new THREE.Vector3(
          r * Math.sin(phi) * Math.cos(theta),
          r * Math.sin(phi) * Math.sin(theta),
          r * Math.cos(phi)
        )
      );
    }
    const positions: number[] = [];
    for (let i = 0; i < nodes.length; i++) {
      const next = nodes[(i + 7) % nodes.length];
      positions.push(nodes[i].x, nodes[i].y, nodes[i].z, next.x, next.y, next.z);
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.BufferAttribute(new Float32Array(positions), 3)
    );
    return geometry;
  }, []);
}

export function AIWorldScene() {
  const groupRef = useRef<THREE.Group>(null);
  const brainRef = useRef<THREE.Mesh>(null);
  const uniforms = useRef({ uTime: { value: 0 } });
  const pointer = useMousePosition();
  const targetRotation = useRef({ x: 0, y: 0 });

  const neuralGeometry = useNeuralLines();

  useFrame((state, delta) => {
    uniforms.current.uTime.value = state.clock.getElapsedTime();

    targetRotation.current.y = lerp(targetRotation.current.y, pointer.x * 0.6, 0.04);
    targetRotation.current.x = lerp(targetRotation.current.x, -pointer.y * 0.4, 0.04);

    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.08 + targetRotation.current.y * 0.01;
      groupRef.current.rotation.x = targetRotation.current.x;
    }
    if (brainRef.current) {
      brainRef.current.rotation.y += delta * 0.15;
    }
  });

  return (
    <group position={[0, 0, -110]}>
      <group ref={groupRef}>
        <mesh ref={brainRef}>
          <icosahedronGeometry args={[5, 5]} />
          <shaderMaterial
            vertexShader={BRAIN_VERTEX}
            fragmentShader={BRAIN_FRAGMENT}
            uniforms={uniforms.current}
            transparent
            wireframe
          />
        </mesh>

        <lineSegments geometry={neuralGeometry}>
          <lineBasicMaterial color="#3EF2E0" transparent opacity={0.35} />
        </lineSegments>

        {Array.from({ length: NODE_COUNT }).map((_, i) => {
          const r = 5.5 + Math.random() * 1.2;
          const theta = (i / NODE_COUNT) * Math.PI * 2 * 3.1;
          const phi = Math.acos(2 * ((i * 0.618) % 1) - 1);
          return (
            <mesh
              key={i}
              position={[
                r * Math.sin(phi) * Math.cos(theta),
                r * Math.sin(phi) * Math.sin(theta),
                r * Math.cos(phi),
              ]}
            >
              <sphereGeometry args={[0.05, 6, 6]} />
              <meshBasicMaterial color="#FF3ECF" />
            </mesh>
          );
        })}
      </group>

      <pointLight position={[0, 0, 6]} intensity={2} color="#7B4DFF" />
      <pointLight position={[8, 4, -4]} intensity={1.2} color="#3EF2E0" />
      <ambientLight intensity={0.2} />
    </group>
  );
}