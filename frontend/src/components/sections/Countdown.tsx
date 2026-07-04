import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { SITE } from "@/lib/siteConfig";

function getTimeLeft() {
  const diff = new Date(SITE.eventStartISO).getTime() - Date.now();
  const clamped = Math.max(diff, 0);
  return {
    days: Math.floor(clamped / 86400000),
    hours: Math.floor((clamped / 3600000) % 24),
    minutes: Math.floor((clamped / 60000) % 60),
    seconds: Math.floor((clamped / 1000) % 60),
  };
}

const UNITS: Array<{ key: keyof ReturnType<typeof getTimeLeft>; label: string }> = [
  { key: "days", label: "Days" },
  { key: "hours", label: "Hours" },
  { key: "minutes", label: "Minutes" },
  { key: "seconds", label: "Seconds" },
];

export function Countdown() {
  const [time, setTime] = useState(getTimeLeft());

  useEffect(() => {
    const interval = window.setInterval(() => setTime(getTimeLeft()), 1000);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <section className="relative overflow-hidden py-32">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-signal-cyan/10" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2 animate-spin-slow rounded-full border border-signal-purple/15" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[220px] w-[220px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-signal-magenta/20" />

      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <p className="font-mono text-[11px] uppercase tracking-widest2 text-signal-cyan">
          The Countdown Has Begun
        </p>
        <h2 className="mt-3 font-display text-3xl font-bold uppercase text-mist md:text-4xl">
          Until The Future Begins
        </h2>

        <div className="mt-12 grid grid-cols-4 gap-3 md:gap-6">
          {UNITS.map((unit) => (
            <div key={unit.key} className="glass-strong relative rounded-2xl py-6 shadow-glow">
              <motion.p
                key={time[unit.key]}
                initial={{ opacity: 0.4, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="font-mono text-4xl font-bold tabular-nums text-mist md:text-6xl"
              >
                {String(time[unit.key]).padStart(2, "0")}
              </motion.p>
              <p className="mt-2 font-mono text-[10px] uppercase tracking-widest2 text-mist/40">
                {unit.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}