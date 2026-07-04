export type Speaker = {
  name: string;
  role: string;
  org: string;
  topic: string;
};

export const SPEAKERS: Speaker[] = [
  { name: "Dr. Ananya Rao", role: "Director of AI Research", org: "Vertex Labs", topic: "Scaling Reasoning in Foundation Models" },
  { name: "Kabir Mehta", role: "Founding Engineer", org: "Orbital Robotics", topic: "Building Robots That Ship" },
  { name: "Sarah Lin", role: "Partner", org: "Northstar Ventures", topic: "What Investors Look for in Deep Tech" },
  { name: "Rohan Verma", role: "Security Lead", org: "CipherGrid", topic: "The Attacker's Mindset" },
  { name: "Dr. Emily Chen", role: "Quantum Research Scientist", org: "QubitWorks", topic: "Quantum Advantage, Practically Speaking" },
  { name: "Aditya Kulkarni", role: "CTO", org: "SkyRoute Mobility", topic: "Autonomy at City Scale" },
];