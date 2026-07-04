import { motion } from "framer-motion";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description?: string;
};

export function PageHero({ eyebrow, title, description }: PageHeroProps) {
  return (
    <div className="relative overflow-hidden pb-20 pt-40 text-center">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-signal-blue/10 blur-3xl" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative mx-auto max-w-2xl px-6"
      >
        <p className="font-mono text-[11px] uppercase tracking-widest2 text-signal-cyan">
          {eyebrow}
        </p>
        <h1 className="mt-4 font-display text-5xl font-black uppercase text-mist md:text-7xl">
          {title}
        </h1>
        {description && (
          <p className="mx-auto mt-5 max-w-lg font-body text-sm text-mist/55 md:text-base">
            {description}
          </p>
        )}
      </motion.div>
    </div>
  );
}