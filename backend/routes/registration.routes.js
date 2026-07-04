import { Router } from "express";
import { body, param } from "express-validator";
import {
  createRegistration,
  listRegistrations,
  getRegistration,
  updateRegistrationStatus,
} from "../controllers/registration.controller.js";
import { handleValidation } from "../middleware/handleValidation.js";
import { requireAdmin } from "../middleware/requireAdmin.js";
import { writeLimiter } from "../middleware/writeLimiter.js";

const router = Router();

const registrationBody = [
  body("eventSlug").trim().notEmpty().withMessage("Event is required."),
  body("teamName").trim().notEmpty().withMessage("Team name is required."),
  body("leaderName").trim().notEmpty().withMessage("Team leader name is required."),
  body("leaderEmail").trim().isEmail().withMessage("A valid leader email is required."),
  body("leaderPhone")
    .trim()
    .matches(/^[0-9+\-\s]{7,15}$/)
    .withMessage("A valid phone number is required."),
  body("institution").trim().notEmpty().withMessage("Institution is required."),
  body("teamMembers").optional().isArray().withMessage("Team members must be a list."),
];

router.post("/", writeLimiter, registrationBody, handleValidation, createRegistration);

router.get("/", requireAdmin, listRegistrations);
router.get(
  "/:id",
  requireAdmin,
  param("id").isMongoId(),
  handleValidation,
  getRegistration
);
router.patch(
  "/:id/status",
  requireAdmin,
  [
    param("id").isMongoId(),
    body("status").isIn(["pending", "confirmed", "rejected"]),
  ],
  handleValidation,
  updateRegistrationStatus
);

export default router;