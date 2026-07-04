import { motion } from "framer-motion";
import { WORKSHOPS } from "@/lib/workshopsData";

const LEVEL_COLOR: Record<string, string> = {
  Beginner: "#3EF2E0",
  Intermediate: "#2E6FFF",
  Advanced: "#FF3ECF",
};

export function Workshops() {
  return (
    <section id="workshops" className="relative mx-auto max-w-6xl px-6 py-28">
      <div className="mb-14 text-center">
        <p className="font-mono text-[11px] uppercase tracking-widest2 text-signal-cyan">
          Hands-On Learning
        </p>
        <h2 className="mt-3 font-display text-4xl font-bold uppercase text-mist md:text-5xl">
          Workshops
        </h2>
        <p className="mx-auto mt-3 max-w-xl font-body text-sm text-mist/50">
          Small-group sessions led by mentors from our partner labs and companies.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {WORKSHOPS.map((workshop, i) => (
          <motion.div
            key={workshop.slug}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: (i % 3) * 0.08 }}
            className="glass flex h-full flex-col rounded-2xl p-6"
          >
            <span
              className="inline-block w-fit rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-widest2"
              style={{
                color: LEVEL_COLOR[workshop.level],
                border: `1px solid ${LEVEL_COLOR[workshop.level]}55`,
              }}
            >
              {workshop.level}
            </span>
            <h3 className="mt-4 font-display text-lg font-bold text-mist">
              {workshop.title}
            </h3>
            <p className="mt-2 flex-1 font-body text-sm text-mist/55">
              {workshop.description}
            </p>
            <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4 font-mono text-[11px] text-mist/45">
              <span>{workshop.mentor}</span>
              <span>{workshop.duration}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}