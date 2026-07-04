import { useEffect, useRef, useState } from "react";
import { motion, useInView, animate } from "framer-motion";

const STATS = [
  { label: "Attendees", value: 12000, suffix: "+" },
  { label: "Events", value: 40, suffix: "+" },
  { label: "Prize Pool", value: 25, prefix: "₹", suffix: "L+" },
  { label: "Speakers", value: 60, suffix: "+" },
];

const TIMELINE = [
  { year: "2019", title: "First Edition", detail: "A single-day hackathon with 400 attendees." },
  { year: "2021", title: "Going Hybrid", detail: "Expanded to a 3-day festival, 3,000+ participants." },
  { year: "2023", title: "National Recognition", detail: "Featured among India's top student-run tech festivals." },
  { year: "2026", title: "TechFest 2026", detail: "The largest, most ambitious edition yet." },
];

function Counter({ value, prefix = "", suffix = "" }: { value: number; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration: 1.8,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value]);

  return (
    <p ref={ref} className="font-display text-4xl font-black text-gradient md:text-5xl">
      {prefix}
      {display.toLocaleString("en-IN")}
      {suffix}
    </p>
  );
}

export function About() {
  return (
    <section id="about" className="relative mx-auto max-w-6xl px-6 py-28">
      <div className="grid gap-16 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="font-mono text-[11px] uppercase tracking-widest2 text-signal-cyan">
            About TechFest
          </p>
          <h2 className="mt-3 font-display text-4xl font-bold uppercase text-mist md:text-5xl">
            Where Ambition Meets Engineering
          </h2>
          <p className="mt-6 font-body text-base leading-relaxed text-mist/60">
            TechFest is the Institute's annual celebration of technology,
            entrepreneurship, and raw student ambition. Every February,
            thousands of builders, researchers, and founders descend on campus
            for three days of hackathons, competitions, workshops, and talks
            from the people shaping what comes next.
          </p>
          <p className="mt-4 font-body text-base leading-relaxed text-mist/60">
            Our mission is simple: give students a stage large enough for
            their biggest ideas, and the deadline pressure to actually finish
            them. Our vision is to make TechFest the launchpad where the next
            generation of technical founders and engineers gets its start.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-2 gap-6"
        >
          {STATS.map((stat) => (
            <div key={stat.label} className="glass rounded-2xl p-6">
              <Counter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
              <p className="mt-2 font-mono text-[11px] uppercase tracking-widest2 text-mist/40">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>

      <div className="mt-24">
        <p className="mb-10 text-center font-mono text-[11px] uppercase tracking-widest2 text-mist/40">
          Our Journey
        </p>
        <div className="relative mx-auto max-w-3xl">
          <div className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-signal-cyan via-signal-purple to-signal-magenta md:left-1/2" />
          {TIMELINE.map((item, i) => (
            <motion.div
              key={item.year}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className={`relative mb-10 flex items-start gap-6 md:w-1/2 ${
                i % 2 === 0 ? "md:pr-10" : "md:ml-auto md:pl-10"
              }`}
            >
              <span className="absolute -left-[3px] top-1 h-2.5 w-2.5 rounded-full bg-signal-cyan shadow-glow md:left-auto" />
              <div className="glass ml-8 rounded-xl p-5 md:ml-0">
                <p className="font-mono text-xs text-signal-cyan">{item.year}</p>
                <p className="mt-1 font-display text-lg font-bold text-mist">{item.title}</p>
                <p className="mt-1 font-body text-sm text-mist/50">{item.detail}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}