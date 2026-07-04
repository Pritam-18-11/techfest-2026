import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const EARTH_VERTEX = /* glsl */ `
  varying vec3 vNormal;
  varying vec2 vUv;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const EARTH_FRAGMENT = /* glsl */ `
  precision mediump float;
  varying vec3 vNormal;
  varying vec2 vUv;
  uniform float uTime;

  // Cheap value noise for continent-like blotches.
  float hash(vec2 p) { return fract(sin(dot(p, vec2(41.3, 289.1))) * 43758.5453); }
  float noise(vec2 p) {
    vec2 i = floor(p); vec2 f = fract(p);
    float a = hash(i), b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0)), d = hash(i + vec2(1.0, 1.0));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
  }

  void main() {
    vec2 uv = vUv * vec2(6.0, 3.0) + vec2(uTime * 0.015, 0.0);
    float land = smoothstep(0.52, 0.56, noise(uv) + noise(uv * 2.3) * 0.4);
    vec3 ocean = vec3(0.02, 0.15, 0.45);
    vec3 continent = vec3(0.05, 0.35, 0.28);
    vec3 base = mix(ocean, continent, land);

    float fresnel = pow(1.0 - max(dot(vNormal, vec3(0.0, 0.0, 1.0)), 0.0), 2.5);
    vec3 rim = mix(vec3(0.18, 0.45, 1.0), vec3(0.24, 0.9, 0.85), fresnel);
    vec3 color = base + rim * fresnel * 0.9;

    gl_FragColor = vec4(color, 1.0);
  }
`;

export function EarthScene() {
  const earthRef = useRef<THREE.Mesh>(null);
  const cloudsRef = useRef<THREE.Mesh>(null);
  const auroraRef = useRef<THREE.Group>(null);
  const uniforms = useRef({ uTime: { value: 0 } });

  useFrame((state, delta) => {
    uniforms.current.uTime.value = state.clock.getElapsedTime();
    if (earthRef.current) earthRef.current.rotation.y += delta * 0.05;
    if (cloudsRef.current) cloudsRef.current.rotation.y += delta * 0.07;
    if (auroraRef.current) {
      auroraRef.current.rotation.z = Math.sin(state.clock.getElapsedTime() * 0.1) * 0.15;
    }
  });

  return (
    <group position={[0, -2, -30]}>
      <mesh ref={earthRef}>
        <sphereGeometry args={[9, 64, 64]} />
        <shaderMaterial
          vertexShader={EARTH_VERTEX}
          fragmentShader={EARTH_FRAGMENT}
          uniforms={uniforms.current}
        />
      </mesh>

      <mesh ref={cloudsRef} scale={1.02}>
        <sphereGeometry args={[9, 48, 48]} />
        <meshStandardMaterial
          color="#EAF0FF"
          transparent
          opacity={0.08}
          roughness={1}
          depthWrite={false}
        />
      </mesh>

      <mesh scale={1.12}>
        <sphereGeometry args={[9, 48, 48]} />
        <meshBasicMaterial
          color="#3EF2E0"
          transparent
          opacity={0.06}
          side={THREE.BackSide}
        />
      </mesh>

      <group ref={auroraRef} position={[0, 6, 3]}>
        {[0, 1, 2].map((i) => (
          <mesh key={i} rotation={[Math.PI / 2, 0, i * 0.4]}>
            <torusGeometry args={[10 + i * 0.6, 0.15, 8, 100, Math.PI * 0.6]} />
            <meshBasicMaterial
              color={i % 2 === 0 ? "#7B4DFF" : "#3EF2E0"}
              transparent
              opacity={0.25}
            />
          </mesh>
        ))}
      </group>

      <directionalLight position={[20, 10, 20]} intensity={1.4} color="#FFFFFF" />
    </group>
  );
}