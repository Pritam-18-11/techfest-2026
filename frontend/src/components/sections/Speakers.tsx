import { useState } from "react";
import { motion } from "framer-motion";
import { SPEAKERS } from "@/lib/speakersData";

export function Speakers() {
  const [active, setActive] = useState(0);
  const count = SPEAKERS.length;
  const angleStep = 360 / count;

  return (
    <section id="speakers" className="relative mx-auto max-w-6xl px-6 py-28">
      <div className="mb-16 text-center">
        <p className="font-mono text-[11px] uppercase tracking-widest2 text-signal-cyan">
          Voices of the Future
        </p>
        <h2 className="mt-3 font-display text-4xl font-bold uppercase text-mist md:text-5xl">
          Speakers
        </h2>
      </div>

      <div
        className="relative mx-auto h-[380px] max-w-xl"
        style={{ perspective: 1400 }}
      >
        <motion.div
          className="relative h-full w-full"
          style={{ transformStyle: "preserve-3d" }}
          animate={{ rotateY: -active * angleStep }}
          transition={{ type: "spring", stiffness: 60, damping: 16 }}
        >
          {SPEAKERS.map((speaker, i) => (
            <div
              key={speaker.name}
              className="absolute left-1/2 top-1/2 w-64 -translate-x-1/2 -translate-y-1/2"
              style={{
                transform: `rotateY(${i * angleStep}deg) translateZ(260px)`,
              }}
            >
              <div
                data-cursor="hover"
                className="glass-strong flex h-72 flex-col items-center justify-center rounded-2xl p-6 text-center shadow-glow"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-signal-gradient font-display text-xl font-bold text-void-base">
                  {speaker.name
                    .split(" ")
                    .map((n) => n[0])
                    .slice(0, 2)
                    .join("")}
                </div>
                <p className="mt-4 font-display text-lg font-bold text-mist">
                  {speaker.name}
                </p>
                <p className="mt-1 font-mono text-[11px] text-signal-cyan">
                  {speaker.role}
                </p>
                <p className="font-mono text-[11px] text-mist/40">{speaker.org}</p>
                <p className="mt-3 font-body text-xs text-mist/55">{speaker.topic}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      <div className="mt-10 flex justify-center gap-2">
        {SPEAKERS.map((_, i) => (
          <button
            key={i}
            data-cursor="hover"
            onClick={() => setActive(i)}
            aria-label={`Show speaker ${i + 1}`}
            className="h-1.5 rounded-full transition-all duration-300"
            style={{
              width: i === active ? 24 : 8,
              backgroundColor: i === active ? "#3EF2E0" : "rgba(234,240,255,0.2)",
            }}
          />
        ))}
      </div>
    </section>
  );
}