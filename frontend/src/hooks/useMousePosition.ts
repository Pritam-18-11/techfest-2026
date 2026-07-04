import { useEffect, useState } from "react";

export type NormalizedPointer = {
  x: number; // -1 to 1, left to right
  y: number; // -1 to 1, top to bottom
  clientX: number;
  clientY: number;
};

/**
 * Tracks pointer position both in raw pixels and normalized (-1..1)
 * device coordinates, which is what R3F cameras want.
 */
export function useMousePosition() {
  const [pointer, setPointer] = useState<NormalizedPointer>({
    x: 0,
    y: 0,
    clientX: 0,
    clientY: 0,
  });

  useEffect(() => {
    function handleMove(e: PointerEvent) {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -((e.clientY / window.innerHeight) * 2 - 1);
      setPointer({ x, y, clientX: e.clientX, clientY: e.clientY });
      document.documentElement.style.setProperty("--cursor-x", `${e.clientX}px`);
      document.documentElement.style.setProperty("--cursor-y", `${e.clientY}px`);
    }

    window.addEventListener("pointermove", handleMove, { passive: true });
    return () => window.removeEventListener("pointermove", handleMove);
  }, []);

  return pointer;
}
