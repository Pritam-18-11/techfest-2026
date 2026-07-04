import { Router } from "express";
import { body, param } from "express-validator";
import {
  listSponsors,
  createSponsor,
  updateSponsor,
  deleteSponsor,
} from "../controllers/sponsor.controller.js";
import { handleValidation } from "../middleware/handleValidation.js";
import { requireAdmin } from "../middleware/requireAdmin.js";

const router = Router();

const sponsorBody = [
  body("name").trim().notEmpty().withMessage("Sponsor name is required."),
  body("tier").isIn(["Title", "Platinum", "Gold", "Silver"]).withMessage("Invalid tier."),
];

router.get("/", listSponsors);
router.post("/", requireAdmin, sponsorBody, handleValidation, createSponsor);
router.put(
  "/:id",
  requireAdmin,
  param("id").isMongoId(),
  handleValidation,
  updateSponsor
);
router.delete(
  "/:id",
  requireAdmin,
  param("id").isMongoId(),
  handleValidation,
  deleteSponsor
);

export default router;