import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { getEventBySlug } from "@/lib/eventsData";

export function HackathonSpotlight() {
  const event = getEventBySlug("hackfusion-2026");
  if (!event) return null;

  return (
    <section className="relative mx-auto max-w-6xl px-6 py-28">
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="glass-strong relative overflow-hidden rounded-3xl p-10 md:p-16"
      >
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-signal-blue/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-signal-magenta/20 blur-3xl" />

        <div className="relative grid gap-10 md:grid-cols-[1.2fr_1fr] md:items-center">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-widest2 text-signal-cyan">
              The Flagship Hackathon
            </p>
            <h2 className="mt-3 font-display text-4xl font-black uppercase leading-tight text-mist md:text-6xl">
              {event.title}
            </h2>
            <p className="mt-5 max-w-lg font-body text-base text-mist/60">
              {event.description[0]}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to={`/events/${event.slug}`}
                data-cursor="hover"
                className="rounded-full bg-signal-gradient px-7 py-3 font-mono text-xs uppercase tracking-widest2 text-void-base shadow-glow-blue transition-transform hover:scale-105"
              >
                View Full Details
              </Link>
              <Link
                to="/register"
                data-cursor="hover"
                className="rounded-full border border-white/15 px-7 py-3 font-mono text-xs uppercase tracking-widest2 text-mist/80 transition-colors hover:border-signal-cyan hover:text-signal-cyan"
              >
                Register Team
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Stat label="Duration" value="36 Hrs" />
            <Stat label="Prize Pool" value={event.prizePool} />
            <Stat label="Team Size" value={event.teamSize} />
            <Stat label="Venue" value={event.venue} small />
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function Stat({ label, value, small }: { label: string; value: string; small?: boolean }) {
  return (
    <div className="glass rounded-2xl p-5">
      <p className={`font-display font-bold text-mist ${small ? "text-base" : "text-2xl"}`}>
        {value}
      </p>
      <p className="mt-1 font-mono text-[10px] uppercase tracking-widest2 text-mist/40">
        {label}
      </p>
    </div>
  );
}