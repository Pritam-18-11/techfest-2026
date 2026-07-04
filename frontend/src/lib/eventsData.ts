export type EventFAQ = { question: string; answer: string };
export type ScheduleItem = { time: string; title: string; detail: string };

export type EventDetail = {
  slug: string;
  title: string;
  tagline: string;
  category: string;
  accent: "blue" | "cyan" | "purple" | "magenta";
  description: string[];
  date: string;
  venue: string;
  teamSize: string;
  eligibility: string;
  prizePool: string;
  rules: string[];
  schedule: ScheduleItem[];
  faqs: EventFAQ[];
  registrationFee: string;
};

export const ACCENT_HEX: Record<EventDetail["accent"], string> = {
  blue: "#2E6FFF",
  cyan: "#3EF2E0",
  purple: "#7B4DFF",
  magenta: "#FF3ECF",
};

export const EVENTS: EventDetail[] = [
  {
    slug: "ai-innovation-challenge",
    title: "AI Innovation Challenge",
    tagline: "Build AI-powered products solving real-world problems.",
    category: "Artificial Intelligence",
    accent: "cyan",
    description: [
      "Teams get 24 hours to design, train, and demo an AI-powered solution to a real-world problem statement released at kickoff.",
      "Judging weighs technical depth, real-world applicability, and the quality of your live demo — not just your slide deck.",
    ],
    date: "13 February 2026, 09:00 IST",
    venue: "Innovation Hall A",
    teamSize: "2–4",
    eligibility: "Open to all undergraduate and postgraduate students.",
    prizePool: "₹3,00,000",
    registrationFee: "₹500 per team",
    rules: [
      "Teams must consist of 2 to 4 members from any institution.",
      "All models and datasets must be built or fine-tuned during the event window.",
      "Pre-trained foundation models may be used as a base, but must be disclosed.",
      "Final submission requires a working demo plus a 5-minute live presentation.",
      "Any use of plagiarized code or datasets results in immediate disqualification.",
    ],
    schedule: [
      { time: "09:00", title: "Kickoff & Problem Statement Reveal", detail: "Rules briefing and dataset release." },
      { time: "11:00", title: "Build Phase Begins", detail: "Mentors available on the innovation floor." },
      { time: "Day 2, 09:00", title: "Submission Deadline", detail: "Repos and demo videos locked." },
      { time: "Day 2, 14:00", title: "Live Finals & Judging", detail: "Top 10 teams present to the panel." },
    ],
    faqs: [
      { question: "Can we use a pre-trained LLM?", answer: "Yes, as long as it's disclosed in your submission and the core problem-solving logic is your own." },
      { question: "Is internet access allowed?", answer: "Yes, full internet access is provided throughout the challenge." },
    ],
  },
  {
    slug: "hackfusion-2026",
    title: "HackFusion 2026",
    tagline: "36-hour hackathon for builders who don't sleep.",
    category: "Hackathon",
    accent: "blue",
    description: [
      "TechFest's flagship hackathon. 36 hours, open themes, and a panel of investors and engineers judging what you ship — not what you pitch.",
      "Free food, mentorship rounds every 6 hours, and a dedicated hardware lab for teams building physical prototypes.",
    ],
    date: "13–15 February 2026",
    venue: "Central Hackathon Arena",
    teamSize: "2–5",
    eligibility: "Open to all students; at least one team member must be currently enrolled.",
    prizePool: "₹5,00,000",
    registrationFee: "₹800 per team",
    rules: [
      "Teams of 2 to 5 members; solo entries are not permitted.",
      "Projects must be started from scratch after the opening ceremony.",
      "Use of open-source libraries and APIs is allowed and encouraged.",
      "Each team gets a 5-minute demo slot in front of judges during finals.",
      "Hardware hacks must be demoed live, not pre-recorded.",
    ],
    schedule: [
      { time: "Day 1, 18:00", title: "Opening Ceremony", detail: "Theme reveal and team check-in." },
      { time: "Day 1, 20:00", title: "Hacking Begins", detail: "36-hour clock starts." },
      { time: "Day 2, 02:00 / 08:00 / 14:00 / 20:00", title: "Mentor Rounds", detail: "Rotating mentors from partner companies." },
      { time: "Day 3, 08:00", title: "Submissions Close", detail: "Code freeze." },
      { time: "Day 3, 10:00", title: "Demos & Judging", detail: "Live demos to the judging panel." },
    ],
    faqs: [
      { question: "Do we need a fully working product?", answer: "A functional prototype is expected — polish matters less than a real, demoable core loop." },
      { question: "Is there a hardware track?", answer: "Yes, a dedicated hardware lab with soldering stations, sensors, and microcontrollers is available." },
    ],
  },
  {
    slug: "robowars",
    title: "RoboWars",
    tagline: "Combat robotics competition. Last bot standing wins.",
    category: "Robotics",
    accent: "magenta",
    description: [
      "Design and build a remote-controlled combat robot to battle it out in the arena. Weight classes and safety rules keep it fair and intense.",
      "This is a build-in-advance event — bring your bot ready to fight.",
    ],
    date: "14 February 2026, 10:00 IST",
    venue: "Combat Arena",
    teamSize: "3–6",
    eligibility: "Open to all students. Bots must pass a mandatory safety inspection.",
    prizePool: "₹2,50,000",
    registrationFee: "₹1,200 per team",
    rules: [
      "Bots must fall within the 15kg weight class unless registered in Heavyweight.",
      "No projectile or flame-based weapons are permitted.",
      "All bots undergo mandatory safety inspection before competing.",
      "Matches are best-of-three, 3 minutes per round.",
      "A bot that is immobilized for 10+ seconds loses the round.",
    ],
    schedule: [
      { time: "08:00", title: "Safety Inspection", detail: "All bots checked before entering the arena." },
      { time: "10:00", title: "Qualifier Rounds", detail: "Round-robin group stage." },
      { time: "15:00", title: "Knockout Bracket", detail: "Single elimination to the final." },
      { time: "18:00", title: "Grand Final", detail: "Championship battle." },
    ],
    faqs: [
      { question: "Can we build our bot on-site?", answer: "No, RoboWars is a build-in-advance event. Bots must arrive competition-ready." },
      { question: "Is there a weight limit?", answer: "Yes, 15kg for the standard class, with a separate Heavyweight bracket for larger bots." },
    ],
  },
  {
    slug: "drone-racing-championship",
    title: "Drone Racing Championship",
    tagline: "FPV drone racing through a neon-lit obstacle course.",
    category: "Aerial Robotics",
    accent: "purple",
    description: [
      "Race custom-built FPV drones through a multi-lap, obstacle-laden neon circuit. Fastest clean lap time wins.",
      "Spectators can watch the live FPV feed from every pilot's onboard camera.",
    ],
    date: "14 February 2026, 13:00 IST",
    venue: "Outdoor Aerial Track",
    teamSize: "1–2",
    eligibility: "Open to all students with a registered, inspected FPV drone.",
    prizePool: "₹1,50,000",
    registrationFee: "₹600 per pilot",
    rules: [
      "Drones must weigh under 500g and pass a pre-race safety check.",
      "Each pilot gets 3 timed qualifying laps; best lap advances.",
      "Gate cuts or missed obstacles add a time penalty.",
      "Finals are a head-to-head elimination bracket.",
    ],
    schedule: [
      { time: "13:00", title: "Safety Check & Track Walk", detail: "Pilots inspect the course." },
      { time: "14:00", title: "Qualifying Laps", detail: "Best lap time determines seeding." },
      { time: "16:30", title: "Elimination Heats", detail: "Head-to-head knockout racing." },
      { time: "18:00", title: "Final Race", detail: "Top 2 pilots race for the title." },
    ],
    faqs: [
      { question: "Can I use my own drone?", answer: "Yes, provided it passes the pre-race weight and safety inspection." },
      { question: "Are FPV goggles provided?", answer: "No, pilots must bring their own goggles and compatible video transmitter." },
    ],
  },
  {
    slug: "codestorm",
    title: "CodeStorm",
    tagline: "Competitive programming challenge, algorithmic warfare.",
    category: "Competitive Programming",
    accent: "cyan",
    description: [
      "A timed, ICPC-style competitive programming contest across data structures, algorithms, and problem solving under pressure.",
      "Leaderboard is live throughout the contest — watch your rank shift in real time.",
    ],
    date: "13 February 2026, 15:00 IST",
    venue: "Programming Lab, Block C",
    teamSize: "1",
    eligibility: "Open to all individual student participants.",
    prizePool: "₹1,00,000",
    registrationFee: "₹200 per participant",
    rules: [
      "Individual participation only, no team submissions.",
      "Contest runs for 3 hours across 8-10 problems of increasing difficulty.",
      "Standard ICPC scoring: most problems solved, tiebreak by penalty time.",
      "Any pre-written code templates must be submitted for review before the contest.",
    ],
    schedule: [
      { time: "15:00", title: "Contest Briefing", detail: "Platform walkthrough and rules." },
      { time: "15:30", title: "Contest Starts", detail: "3-hour timer begins." },
      { time: "18:30", title: "Contest Ends", detail: "Submissions locked, leaderboard freezes." },
      { time: "19:00", title: "Results & Prize Ceremony", detail: "Top 10 announced on stage." },
    ],
    faqs: [
      { question: "Which languages are supported?", answer: "C++, Java, Python, and JavaScript are all supported on the judging platform." },
      { question: "Is there partial scoring?", answer: "Yes, partial test cases passed contribute to partial scoring on most problems." },
    ],
  },
  {
    slug: "cyber-shield",
    title: "Cyber Shield",
    tagline: "Capture-the-flag cybersecurity competition.",
    category: "Cybersecurity",
    accent: "blue",
    description: [
      "A jeopardy-style CTF spanning web exploitation, reverse engineering, cryptography, forensics, and binary exploitation.",
      "Flags are worth more the fewer teams solve them — plan your attack order carefully.",
    ],
    date: "14 February 2026, 10:00 IST",
    venue: "Cyber Lab, Block D",
    teamSize: "2–4",
    eligibility: "Open to all students; prior CTF experience recommended but not required.",
    prizePool: "₹1,50,000",
    registrationFee: "₹400 per team",
    rules: [
      "Teams of 2 to 4 members compete on a shared scoreboard.",
      "Attacking the CTF infrastructure itself (rather than the challenges) is grounds for disqualification.",
      "Flag sharing between teams is strictly prohibited.",
      "Contest runs for 8 hours with challenges released in three waves.",
    ],
    schedule: [
      { time: "10:00", title: "Platform Access Opens", detail: "First wave of challenges released." },
      { time: "13:00", title: "Wave 2 Release", detail: "Mid-difficulty challenges unlocked." },
      { time: "16:00", title: "Wave 3 Release", detail: "Hardest challenges go live." },
      { time: "18:00", title: "CTF Ends", detail: "Scoreboard freezes 30 minutes before close." },
    ],
    faqs: [
      { question: "Do I need prior CTF experience?", answer: "No, challenges span beginner to advanced difficulty across every category." },
      { question: "Can we use automated scanning tools?", answer: "Yes, standard security tools are allowed against the designated challenge infrastructure only." },
    ],
  },
  {
    slug: "future-mobility-challenge",
    title: "Future Mobility Challenge",
    tagline: "Design and pitch autonomous vehicle innovations.",
    category: "Autonomous Systems",
    accent: "purple",
    description: [
      "Teams prototype and demonstrate an autonomous navigation solution on a scaled test track, then pitch the real-world scalability of their approach.",
      "Judged jointly by robotics faculty and mobility-industry partners.",
    ],
    date: "15 February 2026, 09:00 IST",
    venue: "Robotics Track, Outdoor Grounds",
    teamSize: "2–5",
    eligibility: "Open to all engineering students; a working prototype or simulation is required.",
    prizePool: "₹2,00,000",
    registrationFee: "₹700 per team",
    rules: [
      "Prototypes may be physical scaled vehicles or high-fidelity simulations.",
      "Autonomous navigation must be demonstrated live, without manual intervention.",
      "Teams present a 10-minute pitch on real-world scalability after the demo.",
      "Any external remote control during the timed run disqualifies the attempt.",
    ],
    schedule: [
      { time: "09:00", title: "Track Briefing", detail: "Course layout and rules walkthrough." },
      { time: "10:00", title: "Timed Runs", detail: "Each team gets two attempts on the track." },
      { time: "14:00", title: "Pitch Round", detail: "10-minute scalability pitch to judges." },
      { time: "17:00", title: "Results", detail: "Winners announced on the main stage." },
    ],
    faqs: [
      { question: "Is a physical vehicle mandatory?", answer: "No, a high-fidelity simulation demo is accepted if a physical prototype isn't feasible." },
      { question: "What track sensors are provided?", answer: "The track includes standard lane markings and static obstacles; teams bring their own onboard sensors." },
    ],
  },
  {
    slug: "startup-pitch-arena",
    title: "Startup Pitch Arena",
    tagline: "Pitch your startup live to a panel of investors.",
    category: "Entrepreneurship",
    accent: "magenta",
    description: [
      "Bring your startup idea or existing venture and pitch live to a panel of VCs, angel investors, and industry founders.",
      "Winners get direct introductions to the judging panel's investment networks.",
    ],
    date: "15 February 2026, 11:00 IST",
    venue: "Main Auditorium",
    teamSize: "1–4",
    eligibility: "Open to student founders and early-stage teams; idea-stage and existing ventures both welcome.",
    prizePool: "₹4,00,000",
    registrationFee: "₹300 per team",
    rules: [
      "Each team gets 7 minutes to pitch, followed by 5 minutes of Q&A.",
      "Pitches must include a working demo, mockup, or clear proof of concept.",
      "Decks must be submitted 48 hours before the event for judge review.",
      "No pitching of previously funded ventures above seed stage.",
    ],
    schedule: [
      { time: "11:00", title: "Pitch Briefing", detail: "Format and judging criteria explained." },
      { time: "11:30", title: "Preliminary Pitches", detail: "All teams pitch to a first-round panel." },
      { time: "15:00", title: "Finalist Announcement", detail: "Top 8 teams selected." },
      { time: "16:00", title: "Final Pitches", detail: "Live final pitch to the full investor panel." },
    ],
    faqs: [
      { question: "Do we need a registered company?", answer: "No, idea-stage teams are welcome as long as you can demonstrate a proof of concept." },
      { question: "Is the deck submission mandatory?", answer: "Yes, decks are required 48 hours in advance so judges can prepare informed questions." },
    ],
  },
];

export function getEventBySlug(slug: string) {
  return EVENTS.find((e) => e.slug === slug);
}

export function getRelatedEvents(slug: string, count = 3) {
  const others = EVENTS.filter((e) => e.slug !== slug);
  return others.slice(0, count);
}