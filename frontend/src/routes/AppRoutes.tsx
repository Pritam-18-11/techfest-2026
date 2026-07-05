import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { Home } from "@/pages/Home";
import { RouteLoader } from "@/components/ui/RouteLoader";

// Code-split every route below Home so the initial bundle only pays
// for the landing experience; each of these becomes its own chunk
// (paired with the three-vendor/motion-vendor chunks from vite.config.ts).
const AboutPage = lazy(() => import("@/pages/AboutPage").then((m) => ({ default: m.AboutPage })));
const EventsPage = lazy(() => import("@/pages/EventsPage").then((m) => ({ default: m.EventsPage })));
const EventDetailPage = lazy(() =>
  import("@/pages/EventDetailPage").then((m) => ({ default: m.EventDetailPage }))
);
const WorkshopsPage = lazy(() =>
  import("@/pages/WorkshopsPage").then((m) => ({ default: m.WorkshopsPage }))
);
const SpeakersPage = lazy(() =>
  import("@/pages/SpeakersPage").then((m) => ({ default: m.SpeakersPage }))
);
const SponsorsPage = lazy(() =>
  import("@/pages/SponsorsPage").then((m) => ({ default: m.SponsorsPage }))
);
const GalleryPage = lazy(() => import("@/pages/GalleryPage").then((m) => ({ default: m.GalleryPage })));
const FAQsPage = lazy(() => import("@/pages/FAQsPage").then((m) => ({ default: m.FAQsPage })));
const RegisterPage = lazy(() =>
  import("@/pages/RegisterPage").then((m) => ({ default: m.RegisterPage }))
);
const ContactPage = lazy(() => import("@/pages/ContactPage").then((m) => ({ default: m.ContactPage })));
const NotFound = lazy(() => import("@/pages/NotFound").then((m) => ({ default: m.NotFound })));

export function AppRoutes() {
  return (
    <Suspense fallback={<RouteLoader />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/events/:slug" element={<EventDetailPage />} />
        <Route path="/workshops" element={<WorkshopsPage />} />
        <Route path="/speakers" element={<SpeakersPage />} />
        <Route path="/sponsors" element={<SponsorsPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/faqs" element={<FAQsPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}