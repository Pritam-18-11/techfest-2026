import { Router } from "express";
import healthRoutes from "./health.routes.js";

const router = Router();

router.use("/health", healthRoutes);

// Phase 3 additions (scaffolded now, implemented then):
// router.use("/events", eventRoutes);
// router.use("/registrations", registrationRoutes);
// router.use("/gallery", galleryRoutes);
// router.use("/sponsors", sponsorRoutes);
// router.use("/contact", contactRoutes);
// router.use("/newsletter", newsletterRoutes);

export default router;
