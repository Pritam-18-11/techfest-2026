import { motion } from "framer-motion";
import { Link } from "react-router-dom";

type ComingSoonProps = {
  title: string;
  phase: string;
  description: string;
};

/**
 * Placeholder route shell for sections scheduled in later build phases
 * (About, Events, Speakers, etc). Not meant to be the final page —
 * Phase 2/3 replace this with the full section per the build plan.
 */
export function ComingSoon({ title, phase, description }: ComingSoonProps) {
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center bg-void-base px-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className="font-mono text-[11px] uppercase tracking-widest2 text-signal-cyan">
          {phase}
        </p>
        <h1 className="mt-4 font-display text-4xl font-bold uppercase text-mist md:text-6xl">
          {title}
        </h1>
        <p className="mx-auto mt-4 max-w-md font-body text-sm text-mist/50">
          {description}
        </p>
        <Link
          to="/"
          data-cursor="hover"
          className="mt-8 inline-block rounded-full border border-white/15 px-6 py-3 font-mono text-xs uppercase tracking-widest2 text-mist/80 transition-colors hover:border-signal-cyan hover:text-signal-cyan"
        >
          Return to Orbit
        </Link>
      </motion.div>
    </main>
  );
}
