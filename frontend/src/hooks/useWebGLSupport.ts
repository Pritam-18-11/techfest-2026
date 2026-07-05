import { useEffect, useState } from "react";

function detectWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
}

/**
 * Returns whether the browser supports WebGL. `null` while unknown
 * (first render, avoids a server/client mismatch flash), then a
 * stable boolean. Used to gate the 3D experience behind a graceful
 * static fallback.
 */
export function useWebGLSupport(): boolean | null {
  const [supported, setSupported] = useState<boolean | null>(null);

  useEffect(() => {
    setSupported(detectWebGL());
  }, []);

  return supported;
}