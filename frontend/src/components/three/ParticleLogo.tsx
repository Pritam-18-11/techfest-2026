import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import gsap from "gsap";

const VERTEX_SHADER = /* glsl */ `
  uniform float uProgress;   // 0 = scattered chaos, 1 = formed logo
  uniform float uBurst;      // 0 = intact, 1 = fully exploded outward
  uniform float uTime;
  uniform float uPixelRatio;

  attribute vec3 aTarget;
  attribute vec3 aScatter;
  attribute float aRandom;

  varying float vRandom;

  void main() {
    vRandom = aRandom;

    vec3 formed = mix(aScatter, aTarget, uProgress);

    // gentle idle float once formed
    float wobble = sin(uTime * 0.6 + aRandom * 6.2831) * 0.03 * uProgress;
    formed.y += wobble;

    // burst: fling particles outward along their own direction from center
    vec3 burstDir = normalize(aTarget + 0.0001) * (6.0 + aRandom * 10.0);
    vec3 finalPos = mix(formed, aTarget + burstDir, uBurst);

    vec4 mvPosition = modelViewMatrix * vec4(finalPos, 1.0);
    gl_PointSize = (2.2 + aRandom * 2.2) * uPixelRatio * (1.0 - uBurst * 0.4);
    gl_PointSize *= (300.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const FRAGMENT_SHADER = /* glsl */ `
  precision mediump float;
  varying float vRandom;
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  uniform float uBurst;

  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float d = length(uv);
    float alpha = smoothstep(0.5, 0.0, d);
    vec3 color = mix(uColorA, uColorB, vRandom);
    gl_FragColor = vec4(color, alpha * (1.0 - uBurst * 0.6));
  }
`;

/** Samples visible pixels of text rendered to an offscreen canvas. */
function sampleTextPositions(text: string, count: number) {
  const canvas = document.createElement("canvas");
  const width = 1024;
  const height = 256;
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = "#fff";
  ctx.font = "700 120px Orbitron, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text, width / 2, height / 2);

  const data = ctx.getImageData(0, 0, width, height).data;
  const candidates: { x: number; y: number }[] = [];
  for (let y = 0; y < height; y += 2) {
    for (let x = 0; x < width; x += 2) {
      const alpha = data[(y * width + x) * 4 + 3];
      if (alpha > 128) candidates.push({ x, y });
    }
  }

  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const p = candidates.length
      ? candidates[Math.floor(Math.random() * candidates.length)]
      : { x: width / 2, y: height / 2 };
    const worldX = (p.x / width - 0.5) * 16;
    const worldY = -(p.y / height - 0.5) * 4;
    const worldZ = (Math.random() - 0.5) * 0.6;
    positions[i * 3] = worldX;
    positions[i * 3 + 1] = worldY;
    positions[i * 3 + 2] = worldZ;
  }
  return positions;
}

type ParticleLogoProps = {
  text?: string;
  count?: number;
  /** Fires once the forming animation completes. */
  onFormed?: () => void;
  /** External trigger (0-1 driven by parent) to explode the logo apart. */
  burst?: boolean;
};

export function ParticleLogo({
  text = "TECHFEST 2026",
  count = 9000,
  onFormed,
  burst = false,
}: ParticleLogoProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const { targetPositions, scatterPositions, randoms } = useMemo(() => {
    const target = sampleTextPositions(text, count);
    const scatter = new Float32Array(count * 3);
    const rand = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const radius = 18 + Math.random() * 14;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      scatter[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      scatter[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      scatter[i * 3 + 2] = radius * Math.cos(phi) - 10;
      rand[i] = Math.random();
    }
    return { targetPositions: target, scatterPositions: scatter, randoms: rand };
  }, [text, count]);

  const uniforms = useMemo(
    () => ({
      uProgress: { value: 0 },
      uBurst: { value: 0 },
      uTime: { value: 0 },
      uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
      uColorA: { value: new THREE.Color("#3EF2E0") },
      uColorB: { value: new THREE.Color("#7B4DFF") },
    }),
    []
  );

  useEffect(() => {
    const tl = gsap.timeline({
      delay: 0.4,
      onComplete: () => onFormed?.(),
    });
    tl.to(uniforms.uProgress, {
      value: 1,
      duration: 2.4,
      ease: "power3.out",
    });
    return () => {
      tl.kill();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    gsap.to(uniforms.uBurst, {
      value: burst ? 1 : 0,
      duration: 1.6,
      ease: "power2.in",
    });
  }, [burst, uniforms.uBurst]);

  useFrame((state) => {
    uniforms.uTime.value = state.clock.getElapsedTime();
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={targetPositions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-aTarget"
          count={count}
          array={targetPositions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-aScatter"
          count={count}
          array={scatterPositions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-aRandom"
          count={count}
          array={randoms}
          itemSize={1}
        />
      </bufferGeometry>
      <shaderMaterial
        ref={materialRef}
        vertexShader={VERTEX_SHADER}
        fragmentShader={FRAGMENT_SHADER}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
