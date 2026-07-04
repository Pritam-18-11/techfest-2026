import { PageHero } from "@/components/ui/PageHero";
import { Gallery as GallerySection } from "@/components/sections/Gallery";

export function GalleryPage() {
  return (
    <main className="min-h-screen bg-void-base">
      <PageHero
        eyebrow="Moments From Past Editions"
        title="Gallery"
        description="Designed tiles, loaded live from our database — swap in real event photography once available."
      />
      <GallerySection />
    </main>
  );
}