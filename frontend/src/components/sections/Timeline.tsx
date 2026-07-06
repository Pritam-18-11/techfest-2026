import { useState } from "react";
import { motion } from "framer-motion";

const DAYS = [
  {
    label: "Day 1 · Aug 14",
    theme: "Ignition",
    items: [
      { time: "09:00", title: "Opening Ceremony & Keynote" },
      { time: "11:00", title: "AI Innovation Challenge Kickoff" },
      { time: "15:00", title: "CodeStorm Contest" },
      { time: "18:00", title: "HackFusion 2026 Opens" },
    ],
  },
  {
    label: "Day 2 · Aug 15",
    theme: "Momentum",
    items: [
      { time: "10:00", title: "RoboWars Qualifiers" },
      { time: "10:00", title: "Cyber Shield CTF" },
      { time: "13:00", title: "Drone Racing Championship" },
      { time: "19:00", title: "Speaker Series: Founders Night" },
    ],
  },
  {
    label: "Day 3 · Aug 16",
    theme: "Finale",
    items: [
      { time: "09:00", title: "Future Mobility Challenge" },
      { time: "10:00", title: "HackFusion Demos & Judging" },
      { time: "11:00", title: "Startup Pitch Arena" },
      { time: "20:00", title: "Closing Ceremony & Fireworks" },
    ],
  },
];

export function Timeline() {
  const [activeDay, setActiveDay] = useState(0);

  return (
    <section id="timeline" className="relative mx-auto max-w-4xl px-6 py-28">
      <div className="mb-12 text-center">
        <p className="font-mono text-[11px] uppercase tracking-widest2 text-signal-cyan">
          Three Days
        </p>
        <h2 className="mt-3 font-display text-4xl font-bold uppercase text-mist md:text-5xl">
          Full Schedule
        </h2>
      </div>

      <div className="mb-10 flex justify-center gap-2">
        {DAYS.map((day, i) => (
          <button
            key={day.label}
            data-cursor="hover"
            onClick={() => setActiveDay(i)}
            className={`rounded-full px-5 py-2 font-mono text-[11px] uppercase tracking-widest2 transition-all ${
              activeDay === i
                ? "bg-signal-gradient text-void-base"
                : "glass text-mist/60 hover:text-mist"
            }`}
          >
            {day.label}
          </button>
        ))}
      </div>

      <motion.div
        key={activeDay}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <p className="mb-6 text-center font-display text-lg font-bold uppercase tracking-widest2 text-signal-magenta">
          {DAYS[activeDay].theme}
        </p>
        <div className="space-y-3">
          {DAYS[activeDay].items.map((item) => (
            <div
              key={item.title}
              className="glass flex items-center gap-6 rounded-xl px-6 py-4"
            >
              <span className="font-mono text-sm text-signal-cyan">{item.time}</span>
              <span className="font-body text-sm text-mist/80">{item.title}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}