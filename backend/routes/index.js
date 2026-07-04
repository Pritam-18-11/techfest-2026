import { Router } from "express";
import healthRoutes from "./health.routes.js";
import eventRoutes from "./event.routes.js";
import registrationRoutes from "./registration.routes.js";
import galleryRoutes from "./gallery.routes.js";
import sponsorRoutes from "./sponsor.routes.js";
import contactRoutes from "./contact.routes.js";
import newsletterRoutes from "./newsletter.routes.js";

const router = Router();

router.use("/health", healthRoutes);
router.use("/events", eventRoutes);
router.use("/registrations", registrationRoutes);
router.use("/gallery", galleryRoutes);
router.use("/sponsors", sponsorRoutes);
router.use("/contact", contactRoutes);
router.use("/newsletter", newsletterRoutes);

export default router;