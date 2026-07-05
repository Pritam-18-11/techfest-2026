import { Link } from "react-router-dom";
import { SITE } from "@/lib/siteConfig";

/**
 * Rendered instead of the full SpaceScene + scroll journey when WebGL
 * is unavailable or the user prefers reduced motion. Keeps the same
 * information hierarchy (badge, headline, CTAs) as HeroOverlay so the
 * page's meaning doesn't change — only the motion does.
 */
export function StaticHeroFallback() {
  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-void-base px-6 text-center">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(46,111,255,0.18),transparent_60%)]" />

      <span className="glass mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 font-mono text-[11px] uppercase tracking-widest2 text-signal-cyan">
        <span className="h-1.5 w-1.5 rounded-full bg-signal-cyan" />
        {SITE.dates} · {SITE.venue}
      </span>

      <h1 className="max-w-4xl font-display text-5xl font-black uppercase leading-[1.05] tracking-tight text-mist sm:text-6xl md:text-7xl">
        The Future
        <br />
        <span className="text-gradient">Begins Here</span>
      </h1>

      <p className="mt-6 max-w-lg font-body text-base text-mist/60 md:text-lg">
        Three days. One festival. Where AI, robotics, and human ambition
        collide — welcome to {SITE.name}.
      </p>

      <div className="mt-10 flex flex-col gap-4 sm:flex-row">
        <Link
          to="/register"
          className="rounded-full bg-signal-gradient px-8 py-3.5 font-mono text-xs uppercase tracking-widest2 text-void-base shadow-glow transition-transform hover:scale-105"
        >
          Register Now
        </Link>
        <Link
          to="/events"
          className="rounded-full border border-white/15 px-8 py-3.5 font-mono text-xs uppercase tracking-widest2 text-mist/80 transition-colors hover:border-signal-cyan hover:text-signal-cyan"
        >
          Explore Events
        </Link>
      </div>

      <p className="mt-12 max-w-sm font-mono text-[10px] uppercase tracking-widest2 text-mist/30">
        Showing the lightweight experience — your browser or motion
        settings skipped the animated version.
      </p>
    </div>
  );
}