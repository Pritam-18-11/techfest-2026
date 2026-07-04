import { useState } from "react";
import { Link } from "react-router-dom";
import { NAV_ITEMS, SITE } from "@/lib/siteConfig";

const SOCIALS = [
  { label: "Instagram", href: "https://instagram.com" },
  { label: "X", href: "https://x.com" },
  { label: "LinkedIn", href: "https://linkedin.com" },
  { label: "YouTube", href: "https://youtube.com" },
];

export function Footer() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.includes("@")) return;
    setSubmitted(true);
    setEmail("");
    window.setTimeout(() => setSubmitted(false), 3200);
  }

  return (
    <footer className="relative mt-32 overflow-hidden border-t border-white/5 bg-void-deep pt-20">
      {/* Skyline silhouette */}
      <svg
        viewBox="0 0 1440 180"
        className="pointer-events-none absolute inset-x-0 top-0 h-32 w-full -translate-y-1/2 opacity-40"
        preserveAspectRatio="none"
      >
        <g fill="#0A0E20">
          <rect x="40" y="60" width="60" height="120" />
          <rect x="120" y="30" width="40" height="150" />
          <rect x="180" y="80" width="50" height="100" />
          <rect x="260" y="10" width="34" height="170" />
          <rect x="320" y="50" width="70" height="130" />
          <rect x="420" y="90" width="45" height="90" />
          <rect x="500" y="20" width="38" height="160" />
          <rect x="560" y="70" width="60" height="110" />
          <rect x="650" y="40" width="40" height="140" />
          <rect x="720" y="0" width="30" height="180" />
          <rect x="780" y="60" width="55" height="120" />
          <rect x="860" y="30" width="42" height="150" />
          <rect x="930" y="85" width="50" height="95" />
          <rect x="1010" y="15" width="36" height="165" />
          <rect x="1080" y="55" width="65" height="125" />
          <rect x="1170" y="90" width="44" height="90" />
          <rect x="1240" y="25" width="38" height="155" />
          <rect x="1300" y="65" width="58" height="115" />
          <rect x="1380" y="45" width="40" height="135" />
        </g>
        <g fill="#3EF2E0" opacity="0.5">
          <rect x="58" y="80" width="4" height="4" />
          <rect x="136" y="60" width="4" height="4" />
          <rect x="270" y="40" width="4" height="4" />
          <rect x="440" y="110" width="4" height="4" />
          <rect x="580" y="95" width="4" height="4" />
          <rect x="735" y="30" width="4" height="4" />
          <rect x="880" y="60" width="4" height="4" />
          <rect x="1025" y="45" width="4" height="4" />
          <rect x="1190" y="115" width="4" height="4" />
          <rect x="1320" y="90" width="4" height="4" />
        </g>
      </svg>

      <div className="relative mx-auto max-w-6xl px-6 pb-10">
        <div className="grid gap-12 border-b border-white/5 pb-14 md:grid-cols-[1.3fr_1fr_1fr_1.2fr]">
          <div>
            <p className="font-display text-lg font-bold tracking-widest2 text-mist">
              TECH<span className="text-signal-cyan">FEST</span>
              <span className="text-signal-magenta">26</span>
            </p>
            <p className="mt-4 max-w-xs font-body text-sm leading-relaxed text-mist/60">
              {SITE.tagline}. {SITE.dates} at {SITE.venue}.
            </p>
          </div>

          <div>
            <p className="font-mono text-[11px] uppercase tracking-widest2 text-mist/40">
              Explore
            </p>
            <ul className="mt-4 space-y-2">
              {NAV_ITEMS.slice(0, 6).map((item) => (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className="font-body text-sm text-mist/70 transition-colors hover:text-signal-cyan"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono text-[11px] uppercase tracking-widest2 text-mist/40">
              Connect
            </p>
            <ul className="mt-4 space-y-2">
              {SOCIALS.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className="font-body text-sm text-mist/70 transition-colors hover:text-signal-magenta"
                  >
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono text-[11px] uppercase tracking-widest2 text-mist/40">
              Signal Updates
            </p>
            <form onSubmit={handleSubmit} className="mt-4 flex gap-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@domain.com"
                className="glass w-full rounded-full px-4 py-2 font-body text-sm text-mist placeholder:text-mist/30 focus:outline-none focus:ring-1 focus:ring-signal-cyan"
              />
              <button
                type="submit"
                data-cursor="hover"
                className="shrink-0 rounded-full bg-signal-gradient px-4 py-2 font-mono text-[11px] uppercase tracking-widest2 text-void-base"
              >
                Join
              </button>
            </form>
            <p className="mt-2 h-4 font-mono text-[10px] text-signal-cyan">
              {submitted ? "Transmission received." : ""}
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 pt-8 text-center md:flex-row md:text-left">
          <p className="font-mono text-[11px] text-mist/30">
            © 2026 TechFest. All rights reserved.
          </p>
          <p className="font-mono text-[11px] text-mist/30">
            Built by the Organizing Committee, IIT
          </p>
        </div>
      </div>
    </footer>
  );
}
