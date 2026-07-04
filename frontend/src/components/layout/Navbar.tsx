import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_ITEMS, SITE } from "@/lib/siteConfig";
import { cn } from "@/lib/utils";

const PRIMARY_ITEMS = NAV_ITEMS.filter((item) =>
  ["Home", "About", "Events", "Speakers", "Sponsors", "Gallery", "Contact"].includes(
    item.label
  )
);

export function Navbar() {
  const location = useLocation();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    function onScroll() {
      const y = window.scrollY;
      setScrolled(y > 24);
      setHidden(y > lastY.current && y > 200);
      lastY.current = y;
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      animate={{ y: hidden ? -100 : 0 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <div
        className={cn(
          "mx-auto mt-4 flex max-w-6xl items-center justify-between rounded-full px-6 py-3 transition-all duration-500",
          scrolled ? "glass-strong shadow-glow" : "bg-transparent"
        )}
      >
        <Link
          to="/"
          data-cursor="hover"
          className="font-display text-sm font-bold tracking-widest2 text-mist"
        >
          TECH<span className="text-signal-cyan">FEST</span>
          <span className="ml-1 text-signal-magenta">26</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {PRIMARY_ITEMS.map((item) => {
            const active = location.pathname === item.href;
            return (
              <Link
                key={item.href}
                to={item.href}
                data-cursor="hover"
                className="group relative font-body text-xs uppercase tracking-widest2 text-mist/80 transition-colors hover:text-mist"
              >
                {item.label}
                <span
                  className={cn(
                    "absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-gradient-to-r from-signal-cyan to-signal-magenta transition-transform duration-300 group-hover:scale-x-100",
                    active && "scale-x-100"
                  )}
                />
              </Link>
            );
          })}
        </nav>

        <Link
          to="/register"
          data-cursor="hover"
          className="hidden rounded-full border border-signal-cyan/60 px-5 py-2 font-mono text-[11px] uppercase tracking-widest2 text-signal-cyan transition-all hover:bg-signal-cyan hover:text-void-base hover:shadow-glow md:inline-block"
        >
          Register
        </Link>

        <button
          data-cursor="hover"
          onClick={() => setMenuOpen((v) => !v)}
          className="flex flex-col gap-1.5 md:hidden"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span
            className={cn(
              "h-px w-6 bg-mist transition-transform",
              menuOpen && "translate-y-[3.5px] rotate-45"
            )}
          />
          <span
            className={cn(
              "h-px w-6 bg-mist transition-transform",
              menuOpen && "-translate-y-[3.5px] -rotate-45"
            )}
          />
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="glass-strong mx-4 mt-2 flex flex-col gap-1 rounded-2xl p-4 md:hidden"
          >
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-lg px-3 py-3 font-body text-sm text-mist/80 transition-colors hover:bg-white/5 hover:text-mist"
              >
                {item.label}
              </Link>
            ))}
            <span className="px-3 pt-2 font-mono text-[10px] text-mist/40">
              {SITE.dates}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
