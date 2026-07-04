import { motion } from "framer-motion";

export function SuccessCheck({ message }: { message: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center gap-4 py-10 text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.1 }}
        className="flex h-16 w-16 items-center justify-center rounded-full bg-signal-gradient shadow-glow"
      >
        <motion.svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5, delay: 0.35, ease: "easeOut" }}
        >
          <motion.path
            d="M4 12.5L9.5 18L20 6"
            stroke="#02040f"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </motion.svg>
      </motion.div>
      <p className="max-w-sm font-body text-sm text-mist/70">{message}</p>
    </motion.div>
  );
}

export function ErrorBanner({ message }: { message: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-xl border border-signal-magenta/30 bg-signal-magenta/10 px-4 py-3 font-body text-sm text-mist/80"
    >
      {message}
    </motion.div>
  );
}