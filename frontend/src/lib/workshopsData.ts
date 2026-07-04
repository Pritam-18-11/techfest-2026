export type Workshop = {
  slug: string;
  title: string;
  mentor: string;
  duration: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  description: string;
};

export const WORKSHOPS: Workshop[] = [
  {
    slug: "prompt-engineering-production-llms",
    title: "Prompt Engineering for Production LLMs",
    mentor: "AI Research Team",
    duration: "2 hours",
    level: "Intermediate",
    description: "Hands-on techniques for building reliable, evaluable LLM-powered features.",
  },
  {
    slug: "intro-to-ros2-robotics",
    title: "Intro to ROS2 for Robotics",
    mentor: "Robotics Lab",
    duration: "3 hours",
    level: "Beginner",
    description: "Set up a ROS2 workspace and drive a simulated robot from scratch.",
  },
  {
    slug: "building-with-quantum-simulators",
    title: "Building with Quantum Simulators",
    mentor: "Quantum Computing Guild",
    duration: "2.5 hours",
    level: "Advanced",
    description: "Write and run your first quantum circuits on an open-source simulator.",
  },
  {
    slug: "cybersecurity-red-team-basics",
    title: "Red Team Basics: Think Like an Attacker",
    mentor: "Cyber Shield Crew",
    duration: "2 hours",
    level: "Beginner",
    description: "A practical walkthrough of reconnaissance, exploitation, and reporting.",
  },
  {
    slug: "pitching-your-startup-in-90-seconds",
    title: "Pitching Your Startup in 90 Seconds",
    mentor: "Entrepreneurship Cell",
    duration: "1.5 hours",
    level: "Beginner",
    description: "Structure, rehearse, and tighten a pitch that lands with investors.",
  },
  {
    slug: "generative-3d-for-product-design",
    title: "Generative 3D for Product Design",
    mentor: "Design Guild",
    duration: "2 hours",
    level: "Intermediate",
    description: "Use generative tools to rapidly prototype physical product concepts.",
  },
];