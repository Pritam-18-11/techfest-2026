export const SITE = {
  name: "TechFest 2026",
  tagline: "The Future Begins Here",
  dates: "13–15 February 2026",
  venue: "Indian Institute of Technology",
  registrationOpensISO: "2025-11-01T00:00:00+05:30",
  eventStartISO: "2026-02-13T09:00:00+05:30",
};

export type NavItem = {
  label: string;
  href: string;
};

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Events", href: "/events" },
  { label: "Competitions", href: "/events" },
  { label: "Workshops", href: "/workshops" },
  { label: "Hackathon", href: "/events/hackfusion-2026" },
  { label: "Speakers", href: "/speakers" },
  { label: "Sponsors", href: "/sponsors" },
  { label: "Gallery", href: "/gallery" },
  { label: "FAQs", href: "/faqs" },
  { label: "Contact", href: "/contact" },
];