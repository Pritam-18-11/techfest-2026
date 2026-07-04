export type JourneySceneId =
  | "earth"
  | "city"
  | "ai"
  | "quantum"
  | "robotics"
  | "arena";

export type JourneySceneDef = {
  id: JourneySceneId;
  label: string;
  /** Camera Z position (world units, negative = further from viewer) when this scene is "in focus". */
  z: number;
  /** Progress band [start, end] (0-1) during which this scene is the active one. */
  band: [number, number];
};

// 6 scenes, evenly spaced along the pinned scroll journey.
export const JOURNEY_SCENES: JourneySceneDef[] = [
  { id: "earth", label: "Earth Atmosphere", z: -30, band: [0.0, 0.166] },
  { id: "city", label: "Future Tech City", z: -70, band: [0.166, 0.333] },
  { id: "ai", label: "AI World", z: -110, band: [0.333, 0.5] },
  { id: "quantum", label: "Quantum Computing", z: -150, band: [0.5, 0.666] },
  { id: "robotics", label: "Robotics Lab", z: -190, band: [0.666, 0.833] },
  { id: "arena", label: "TechFest Main Arena", z: -230, band: [0.833, 1.0] },
];

export const JOURNEY_START_Z = 8;
export const JOURNEY_END_Z = JOURNEY_SCENES[JOURNEY_SCENES.length - 1].z - 10;

/** Number of viewport-heights of scroll distance per scene (controls pacing). */
export const VH_PER_SCENE = 220;