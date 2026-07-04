import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

/**
 * Replaces the native cursor with a glowing dot + lagging ring.
 * The ring scales up and the dot merges into it whenever the pointer
 * enters an element flagged with data-cursor="hover" (buttons, links,
 * cards), giving a "magnetic" affordance without any layout shift.
 */
export function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [supportsFinePointer, setSupportsFinePointer] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(hover: hover) and (pointer: fine)");
    setSupportsFinePointer(mql.matches);
    if (!mql.matches) return;

    document.body.classList.add("custom-cursor-active");

    const ring = { x: 0, y: 0 };
    let raf = 0;

    function handleMove(e: PointerEvent) {
      setIsVisible(true);
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
      ring.x = e.clientX;
      ring.y = e.clientY;

      const target = e.target as HTMLElement;
      setIsHovering(Boolean(target.closest('[data-cursor="hover"]')));
    }

    function loop() {
      if (ringRef.current) {
        const current = ringRef.current.dataset;
        const prevX = Number(current.x || ring.x);
        const prevY = Number(current.y || ring.y);
        const nextX = prevX + (ring.x - prevX) * 0.18;
        const nextY = prevY + (ring.y - prevY) * 0.18;
        ringRef.current.dataset.x = String(nextX);
        ringRef.current.dataset.y = String(nextY);
        ringRef.current.style.transform = `translate3d(${nextX}px, ${nextY}px, 0)`;
      }
      raf = requestAnimationFrame(loop);
    }
    raf = requestAnimationFrame(loop);

    function handleLeaveWindow() {
      setIsVisible(false);
    }

    window.addEventListener("pointermove", handleMove, { passive: true });
    window.addEventListener("pointerleave", handleLeaveWindow);

    return () => {
      document.body.classList.remove("custom-cursor-active");
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerleave", handleLeaveWindow);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (!supportsFinePointer) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[9999]"
      style={{ opacity: isVisible ? 1 : 0, transition: "opacity 0.3s" }}
      aria-hidden
    >
      <div
        ref={dotRef}
        className="absolute left-0 top-0 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-signal-cyan shadow-glow"
      />
      <motion.div
        ref={ringRef}
        className="absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full border border-signal-cyan/70"
        animate={{
          width: isHovering ? 64 : 32,
          height: isHovering ? 64 : 32,
          borderColor: isHovering ? "rgba(255,62,207,0.8)" : "rgba(62,242,224,0.7)",
          backgroundColor: isHovering ? "rgba(255,62,207,0.08)" : "rgba(62,242,224,0.04)",
        }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      />
    </div>
  );
}
