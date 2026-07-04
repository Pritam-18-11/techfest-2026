import { SPONSORS as STATIC_SPONSORS, type Sponsor } from "@/lib/sponsorsData";
import { useFetchWithFallback } from "@/hooks/useFetchWithFallback";

const TIER_ORDER: Array<Sponsor["tier"]> = ["Title", "Platinum", "Gold", "Silver"];

function SponsorMark({ name, size = "text-base" }: { name: string; size?: string }) {
  return (
    <div
      data-cursor="hover"
      className={`glass flex shrink-0 items-center justify-center rounded-xl px-8 py-5 font-display font-bold text-mist/70 transition-colors hover:text-signal-cyan ${size}`}
    >
      {name}
    </div>
  );
}

export function Sponsors() {
  const { data: sponsors, isLoading } = useFetchWithFallback<Sponsor>(
    "/sponsors",
    STATIC_SPONSORS
  );

  const byTier = TIER_ORDER.map((tier) => ({
    tier,
    items: sponsors.filter((s) => s.tier === tier),
  })).filter((g) => g.items.length > 0);

  const marqueeItems = [...sponsors, ...sponsors];

  return (
    <section id="sponsors" className="relative py-28">
      <div className="mx-auto max-w-6xl px-6 text-center">
        <p className="font-mono text-[11px] uppercase tracking-widest2 text-signal-cyan">
          Powered By
        </p>
        <h2 className="mt-3 font-display text-4xl font-bold uppercase text-mist md:text-5xl">
          Sponsors
        </h2>
      </div>

      {isLoading ? (
        <div className="mx-auto mt-14 flex max-w-6xl flex-wrap justify-center gap-4 px-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-16 w-40 animate-pulse rounded-xl bg-white/5" />
          ))}
        </div>
      ) : (
        <div className="mx-auto mt-14 max-w-6xl space-y-10 px-6">
          {byTier.map((group) => (
            <div key={group.tier}>
              <p className="mb-4 text-center font-mono text-[11px] uppercase tracking-widest2 text-mist/40">
                {group.tier} Sponsors
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                {group.items.map((s) => (
                  <SponsorMark
                    key={s.name}
                    name={s.name}
                    size={group.tier === "Title" ? "text-2xl" : "text-base"}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="relative mt-16 overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-void-base to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-void-base to-transparent" />
        <div className="animate-marquee flex w-max gap-4">
          {marqueeItems.map((s, i) => (
            <SponsorMark key={`${s.name}-${i}`} name={s.name} />
          ))}
        </div>
      </div>
    </section>
  );
}