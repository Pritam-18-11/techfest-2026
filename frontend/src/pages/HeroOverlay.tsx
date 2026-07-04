import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { SITE } from "@/lib/siteConfig";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
};

export function HeroOverlay() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center"
    >
      <motion.span
        variants={item}
        className="glass mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 font-mono text-[11px] uppercase tracking-widest2 text-signal-cyan"
      >
        <span className="h-1.5 w-1.5 animate-pulse-slow rounded-full bg-signal-cyan" />
        {SITE.dates} · {SITE.venue}
      </motion.span>

      <motion.h1
        variants={item}
        className="max-w-4xl font-display text-5xl font-black uppercase leading-[1.05] tracking-tight text-mist sm:text-6xl md:text-8xl"
      >
        The Future
        <br />
        <span className="text-gradient">Begins Here</span>
      </motion.h1>

      <motion.p
        variants={item}
        className="mt-6 max-w-lg font-body text-base text-mist/60 md:text-lg"
      >
        Three days. One festival. Where AI, robotics, and human ambition
        collide — welcome to {SITE.name}.
      </motion.p>

      <motion.div variants={item} className="mt-10 flex flex-col gap-4 sm:flex-row">
        <Link
          to="/register"
          data-cursor="hover"
          className="group relative overflow-hidden rounded-full bg-signal-gradient px-8 py-3.5 font-mono text-xs uppercase tracking-widest2 text-void-base shadow-glow transition-transform hover:scale-105"
        >
          Register Now
        </Link>
        <Link
          to="/events"
          data-cursor="hover"
          className="rounded-full border border-white/15 px-8 py-3.5 font-mono text-xs uppercase tracking-widest2 text-mist/80 transition-colors hover:border-signal-cyan hover:text-signal-cyan"
        >
          Explore Events
        </Link>
      </motion.div>

      <motion.div
        variants={item}
        className="absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2"
      >
        <span className="font-mono text-[10px] uppercase tracking-widest2 text-mist/40">
          Scroll to travel
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="h-8 w-px bg-gradient-to-b from-signal-cyan to-transparent"
        />
      </motion.div>
    </motion.div>
  );
}
