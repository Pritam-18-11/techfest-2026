import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { GALLERY_TILES, type GalleryTile } from "@/lib/galleryData";

export function Gallery() {
  const [selected, setSelected] = useState<GalleryTile | null>(null);

  return (
    <section id="gallery" className="relative mx-auto max-w-6xl px-6 py-28">
      <div className="mb-14 text-center">
        <p className="font-mono text-[11px] uppercase tracking-widest2 text-signal-cyan">
          Past Editions
        </p>
        <h2 className="mt-3 font-display text-4xl font-bold uppercase text-mist md:text-5xl">
          Gallery
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {GALLERY_TILES.map((tile, i) => (
          <motion.button
            key={tile.id}
            data-cursor="hover"
            onClick={() => setSelected(tile)}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: (i % 4) * 0.06 }}
            whileHover={{ scale: 1.03, y: -4 }}
            className={`group relative aspect-square overflow-hidden rounded-xl bg-gradient-to-br ${tile.gradient} ${
              i % 5 === 0 ? "row-span-2 aspect-auto" : ""
            }`}
          >
            <div className="absolute inset-0 bg-void-base/30 transition-opacity group-hover:bg-void-base/10" />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-void-base/90 to-transparent p-3 text-left">
              <p className="font-mono text-[10px] text-mist/70">{tile.year}</p>
              <p className="font-body text-xs font-medium text-mist">{tile.caption}</p>
            </div>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-void-base/90 p-6 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className={`aspect-video w-full max-w-2xl rounded-2xl bg-gradient-to-br ${selected.gradient} p-8 flex flex-col justify-end`}
            >
              <p className="font-mono text-xs text-mist/70">{selected.year}</p>
              <p className="mt-1 font-display text-2xl font-bold text-mist">
                {selected.caption}
              </p>
              <button
                data-cursor="hover"
                onClick={() => setSelected(null)}
                className="mt-6 w-fit rounded-full border border-white/20 px-5 py-2 font-mono text-[11px] uppercase tracking-widest2 text-mist"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}