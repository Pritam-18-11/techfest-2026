import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/** Radial gradient sprite generated on a canvas, used for soft nebula clouds. */
function useGlowTexture(color: string) {
  return useMemo(() => {
    const size = 256;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d")!;
    const gradient = ctx.createRadialGradient(
      size / 2,
      size / 2,
      0,
      size / 2,
      size / 2,
      size / 2
    );
    gradient.addColorStop(0, `${color}55`);
    gradient.addColorStop(0.4, `${color}22`);
    gradient.addColorStop(1, `${color}00`);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);
    const texture = new THREE.CanvasTexture(canvas);
    return texture;
  }, [color]);
}

const NEBULA_CLOUDS = [
  { color: "#2E6FFF", position: [-14, 4, -30] as const, scale: 22 },
  { color: "#7B4DFF", position: [16, -6, -40] as const, scale: 28 },
  { color: "#FF3ECF", position: [-6, -10, -55] as const, scale: 20 },
  { color: "#3EF2E0", position: [10, 10, -48] as const, scale: 18 },
];

export function Nebula() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    groupRef.current.rotation.z = Math.sin(t * 0.02) * 0.05;
  });

  return (
    <group ref={groupRef}>
      {NEBULA_CLOUDS.map((cloud, i) => (
        <NebulaCloud key={i} {...cloud} />
      ))}
    </group>
  );
}

function NebulaCloud({
  color,
  position,
  scale,
}: {
  color: string;
  position: readonly [number, number, number];
  scale: number;
}) {
  const texture = useGlowTexture(color);
  const spriteRef = useRef<THREE.Sprite>(null);

  useFrame((state) => {
    if (!spriteRef.current) return;
    const t = state.clock.getElapsedTime();
    spriteRef.current.material.opacity =
      0.5 + Math.sin(t * 0.15 + position[0]) * 0.15;
  });

  return (
    <sprite ref={spriteRef} position={position} scale={[scale, scale, 1]}>
      <spriteMaterial
        map={texture}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </sprite>
  );
}
