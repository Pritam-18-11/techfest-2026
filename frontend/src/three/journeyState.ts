/**
 * Journey scroll state. Written to by the GSAP ScrollTrigger onUpdate
 * callback in JourneyScroll, read every frame inside useFrame hooks
 * across the journey scenes. Deliberately NOT React state — writing
 * this 60x/sec through setState would blow the frame budget.
 */
export const journeyState = {
  /** 0 -> 1 progress through the entire pinned scroll journey. */
  progress: 0,
  /** Smoothed progress, eased toward `progress` each frame. */
  smoothProgress: 0,
  /** Rate of change of progress, used to drive warp-speed streak intensity. */
  velocity: 0,
};

let lastProgress = 0;
let lastTime = performance.now();

export function setJourneyProgress(p: number) {
  const now = performance.now();
  const dt = Math.max((now - lastTime) / 1000, 1 / 120);
  journeyState.velocity = Math.abs(p - lastProgress) / dt;
  journeyState.progress = p;
  lastProgress = p;
  lastTime = now;
}