import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { getEventBySlug, getRelatedEvents, ACCENT_HEX } from "@/lib/eventsData";
import { EventIllustration } from "@/components/three/EventIllustration";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { useDocumentHead } from "@/hooks/useDocumentHead";
import { NotFound } from "./NotFound";

export function EventDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const event = slug ? getEventBySlug(slug) : undefined;

  useDocumentHead({
    title: event ? event.title : "Event Not Found",
    description: event?.tagline,
    path: event ? `/events/${event.slug}` : undefined,
  });

  if (!event) return <NotFound />;

  const accent = ACCENT_HEX[event.accent];
  const related = getRelatedEvents(event.slug);

  return (
    <main className="min-h-screen bg-void-base">
      {/* Hero Banner */}
      <div className="relative overflow-hidden pb-16 pt-36">
        <div
          className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[820px] -translate-x-1/2 rounded-full opacity-20 blur-3xl"
          style={{ background: accent }}
        />
        <div className="relative mx-auto max-w-6xl px-6">
          <Link
            to="/events"
            data-cursor="hover"
            className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest2 text-mist/50 transition-colors hover:text-signal-cyan"
          >
            ← Back to Events
          </Link>

          <div className="mt-8 grid gap-10 md:grid-cols-[1.3fr_1fr] md:items-center">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <p
                className="font-mono text-[11px] uppercase tracking-widest2"
                style={{ color: accent }}
              >
                {event.category}
              </p>
              <h1 className="mt-3 font-display text-4xl font-black uppercase leading-tight text-mist md:text-6xl">
                {event.title}
              </h1>
              <p className="mt-4 max-w-lg font-body text-base text-mist/60">
                {event.tagline}
              </p>
              <Link
                to={`/register?event=${event.slug}`}
                data-cursor="hover"
                className="mt-8 inline-block rounded-full px-8 py-3.5 font-mono text-xs uppercase tracking-widest2 text-void-base transition-transform hover:scale-105"
                style={{ background: `linear-gradient(120deg, ${accent}, #EAF0FF)` }}
              >
                Register for This Event
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            >
              <EventIllustration color={accent} />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Key facts */}
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <Fact label="Date" value={event.date} />
          <Fact label="Venue" value={event.venue} />
          <Fact label="Team Size" value={event.teamSize} />
          <Fact label="Prize Pool" value={event.prizePool} accent={accent} />
        </div>
      </div>

      {/* Description + Eligibility */}
      <div className="mx-auto mt-20 grid max-w-6xl gap-16 px-6 md:grid-cols-[1.4fr_1fr]">
        <div>
          <SectionHeading>Overview</SectionHeading>
          <div className="space-y-4">
            {event.description.map((para, i) => (
              <p key={i} className="font-body text-sm leading-relaxed text-mist/60">
                {para}
              </p>
            ))}
          </div>

          <SectionHeading className="mt-14">Rules</SectionHeading>
          <ul className="space-y-3">
            {event.rules.map((rule, i) => (
              <li key={i} className="flex gap-3 font-body text-sm text-mist/60">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: accent }} />
                {rule}
              </li>
            ))}
          </ul>
        </div>

        <div className="glass h-fit rounded-2xl p-6">
          <SectionHeading className="mt-0">Eligibility & Fees</SectionHeading>
          <p className="font-body text-sm text-mist/60">{event.eligibility}</p>
          <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
            <span className="font-mono text-[11px] uppercase tracking-widest2 text-mist/40">
              Registration Fee
            </span>
            <span className="font-display text-sm font-bold text-mist">
              {event.registrationFee}
            </span>
          </div>
        </div>
      </div>

      {/* Schedule */}
      <div className="mx-auto mt-20 max-w-6xl px-6">
        <SectionHeading>Schedule</SectionHeading>
        <div className="space-y-3">
          {event.schedule.map((item) => (
            <div key={item.title} className="glass flex flex-col gap-1 rounded-xl px-6 py-4 sm:flex-row sm:items-center sm:gap-6">
              <span className="w-32 shrink-0 font-mono text-xs" style={{ color: accent }}>
                {item.time}
              </span>
              <div>
                <p className="font-body text-sm font-medium text-mist">{item.title}</p>
                <p className="font-body text-xs text-mist/45">{item.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQs */}
      <div className="mx-auto mt-20 max-w-3xl px-6">
        <SectionHeading>FAQs</SectionHeading>
        <FAQAccordion items={event.faqs} />
      </div>

      {/* Related events */}
      <div className="mx-auto mt-20 max-w-6xl px-6 pb-28">
        <SectionHeading>Related Events</SectionHeading>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {related.map((r) => (
            <Link
              key={r.slug}
              to={`/events/${r.slug}`}
              data-cursor="hover"
              className="glass rounded-xl p-5 transition-transform hover:-translate-y-1"
            >
              <p
                className="font-mono text-[10px] uppercase tracking-widest2"
                style={{ color: ACCENT_HEX[r.accent] }}
              >
                {r.category}
              </p>
              <p className="mt-2 font-display text-base font-bold text-mist">{r.title}</p>
            </Link>
          ))}
        </div>

        <Link
          to="/events"
          data-cursor="hover"
          className="mt-10 inline-block rounded-full border border-white/15 px-6 py-3 font-mono text-xs uppercase tracking-widest2 text-mist/80 transition-colors hover:border-signal-cyan hover:text-signal-cyan"
        >
          ← Back to All Events
        </Link>
      </div>
    </main>
  );
}

function Fact({ label, value, accent }: { label: string; value: string; accent?: string }) {
  return (
    <div className="glass rounded-xl p-5">
      <p className="font-display text-base font-bold" style={{ color: accent ?? "#EAF0FF" }}>
        {value}
      </p>
      <p className="mt-1 font-mono text-[10px] uppercase tracking-widest2 text-mist/40">
        {label}
      </p>
    </div>
  );
}

function SectionHeading({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <h2 className={`mb-6 font-display text-2xl font-bold uppercase text-mist ${className}`}>
      {children}
    </h2>
  );
}