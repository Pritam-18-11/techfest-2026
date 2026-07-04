import { useRef, useState, type MouseEvent } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { EVENTS, ACCENT_HEX, type EventDetail } from "@/lib/eventsData";

function EventCard({ event, index }: { event: EventDetail; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const accent = ACCENT_HEX[event.accent];

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: py * -10, y: px * 12 });
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: (index % 4) * 0.08, ease: [0.16, 1, 0.3, 1] }}
      style={{ perspective: 1000 }}
    >
      <Link to={`/events/${event.slug}`} data-cursor="hover">
        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setTilt({ x: 0, y: 0 })}
          className="glass group relative h-full overflow-hidden rounded-2xl p-6 transition-shadow duration-300"
          style={{
            transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
            transition: "transform 0.15s ease-out",
          }}
        >
          <div
            className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-30"
            style={{ background: accent }}
          />

          <p
            className="font-mono text-[10px] uppercase tracking-widest2"
            style={{ color: accent }}
          >
            {event.category}
          </p>
          <h3 className="mt-3 font-display text-xl font-bold text-mist">
            {event.title}
          </h3>
          <p className="mt-2 line-clamp-2 font-body text-sm text-mist/60">
            {event.tagline}
          </p>

          <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4 font-mono text-[11px] text-mist/50">
            <span>Team {event.teamSize}</span>
            <span style={{ color: accent }}>{event.prizePool}</span>
          </div>

          <div
            className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
            style={{ background: accent }}
          />
        </div>
      </Link>
    </motion.div>
  );
}

export function EventsGrid() {
  return (
    <section id="events" className="relative mx-auto max-w-6xl px-6 py-28">
      <div className="mb-14 text-center">
        <p className="font-mono text-[11px] uppercase tracking-widest2 text-signal-cyan">
          Competitions
        </p>
        <h2 className="mt-3 font-display text-4xl font-bold uppercase text-mist md:text-5xl">
          8 Flagship Events
        </h2>
        <p className="mx-auto mt-3 max-w-xl font-body text-sm text-mist/50">
          From AI to combat robotics — pick your arena and register your team.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {EVENTS.map((event, i) => (
          <EventCard key={event.slug} event={event} index={i} />
        ))}
      </div>
    </section>
  );
}