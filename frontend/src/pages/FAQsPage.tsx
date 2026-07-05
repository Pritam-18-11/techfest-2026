import { PageHero } from "@/components/ui/PageHero";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { GENERAL_FAQS } from "@/lib/faqData";
import { useDocumentHead } from "@/hooks/useDocumentHead";

export function FAQsPage() {
  useDocumentHead({
    title: "FAQs",
    description: "Frequently asked questions about attending and competing at TechFest 2026.",
    path: "/faqs",
  });

  return (
    <main className="min-h-screen bg-void-base">
      <PageHero
        eyebrow="Need Help?"
        title="FAQs"
        description="Everything you need to know before you arrive."
      />
      <div className="mx-auto max-w-3xl px-6 pb-28">
        <FAQAccordion items={GENERAL_FAQS} />
      </div>
    </main>
  );
}