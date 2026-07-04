export type Sponsor = {
  name: string;
  tier: "Title" | "Platinum" | "Gold" | "Silver";
};

export const SPONSORS: Sponsor[] = [
  { name: "Vertex Labs", tier: "Title" },
  { name: "Orbital Robotics", tier: "Platinum" },
  { name: "Northstar Ventures", tier: "Platinum" },
  { name: "CipherGrid", tier: "Gold" },
  { name: "QubitWorks", tier: "Gold" },
  { name: "SkyRoute Mobility", tier: "Gold" },
  { name: "Nimbus Cloud", tier: "Silver" },
  { name: "Forge Studios", tier: "Silver" },
  { name: "Lumen Systems", tier: "Silver" },
  { name: "Atlas Chips", tier: "Silver" },
];