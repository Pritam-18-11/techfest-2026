import { Routes, Route } from "react-router-dom";
import { Home } from "@/pages/Home";
import { AboutPage } from "@/pages/AboutPage";
import { EventsPage } from "@/pages/EventsPage";
import { EventDetailPage } from "@/pages/EventDetailPage";
import { WorkshopsPage } from "@/pages/WorkshopsPage";
import { SpeakersPage } from "@/pages/SpeakersPage";
import { SponsorsPage } from "@/pages/SponsorsPage";
import { GalleryPage } from "@/pages/GalleryPage";
import { FAQsPage } from "@/pages/FAQsPage";
import { RegisterPage } from "@/pages/RegisterPage";
import { ContactPage } from "@/pages/ContactPage";
import { NotFound } from "@/pages/NotFound";

export function AppRoutes() {
  return (
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
  );
}