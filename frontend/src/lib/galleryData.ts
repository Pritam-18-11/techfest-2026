export type GalleryTile = {
  id?: string;
  caption: string;
  year: string;
  gradient: string;
};

export const GALLERY_TILES: GalleryTile[] = [
  { id: "g1", caption: "Opening Ceremony, Main Stage", year: "2025", gradient: "from-signal-blue to-signal-purple" },
  { id: "g2", caption: "HackFusion — Overnight Build Floor", year: "2025", gradient: "from-signal-purple to-signal-magenta" },
  { id: "g3", caption: "RoboWars Grand Final", year: "2025", gradient: "from-signal-magenta to-signal-cyan" },
  { id: "g4", caption: "Keynote: Scaling Foundation Models", year: "2024", gradient: "from-signal-cyan to-signal-blue" },
  { id: "g5", caption: "Drone Racing Championship", year: "2024", gradient: "from-signal-blue to-signal-magenta" },
  { id: "g6", caption: "Startup Pitch Arena Finals", year: "2024", gradient: "from-signal-purple to-signal-blue" },
  { id: "g7", caption: "Cyber Shield CTF War Room", year: "2023", gradient: "from-signal-magenta to-signal-purple" },
  { id: "g8", caption: "Closing Fireworks", year: "2023", gradient: "from-signal-cyan to-signal-purple" },
];