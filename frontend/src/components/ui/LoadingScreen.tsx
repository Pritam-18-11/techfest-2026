import { AnimatePresence, motion } from "framer-motion";
import { useLoading } from "@/context/LoadingContext";

/**
 * Full-screen boot sequence: rotating hex-mark, live progress readout,
 * and a scanning signal line. Unmounts (with an exit fade) once
 * LoadingContext reports isReady.
 */
export function LoadingScreen() {
  const { progress, isReady } = useLoading();

  return (
    <AnimatePresence>
      {!isReady && (
        <motion.div
          key="loading-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
          className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-void-base"
        >
          <div className="relative flex flex-col items-center gap-8">
            <div className="relative h-28 w-28">
              <motion.svg
                viewBox="0 0 100 100"
                className="h-28 w-28"
                animate={{ rotate: 360 }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
              >
                <polygon
                  points="50,4 90,27 90,73 50,96 10,73 10,27"
                  fill="none"
                  stroke="url(#loadingGradient)"
                  strokeWidth="1.5"
                />
                <defs>
                  <linearGradient id="loadingGradient" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#3EF2E0" />
                    <stop offset="100%" stopColor="#7B4DFF" />
                  </linearGradient>
                </defs>
              </motion.svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-mono text-xs tracking-widest2 text-signal-cyan">
                  TF
                </span>
              </div>
            </div>

            <div className="flex flex-col items-center gap-3">
              <p className="font-mono text-4xl font-light tabular-nums text-mist">
                {String(progress).padStart(3, "0")}
                <span className="text-signal-cyan">%</span>
              </p>
              <p className="font-mono text-[10px] uppercase tracking-widest2 text-mist/50">
                Initializing TechFest 2026
              </p>
            </div>

            <div className="h-px w-64 overflow-hidden bg-white/10">
              <motion.div
                className="h-full bg-gradient-to-r from-signal-blue via-signal-cyan to-signal-magenta"
                style={{ width: `${progress}%` }}
                transition={{ ease: "easeOut" }}
              />
            </div>
          </div>

          <motion.div
            className="pointer-events-none absolute inset-x-0 h-px bg-signal-cyan/40"
            animate={{ top: ["0%", "100%"] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "linear" }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
