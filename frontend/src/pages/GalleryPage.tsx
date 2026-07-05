import { PageHero } from "@/components/ui/PageHero";
import { Gallery as GallerySection } from "@/components/sections/Gallery";
import { useDocumentHead } from "@/hooks/useDocumentHead";

export function GalleryPage() {
  useDocumentHead({
    title: "Gallery",
    description: "Moments from past editions of TechFest.",
    path: "/gallery",
  });

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