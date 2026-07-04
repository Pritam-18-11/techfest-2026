import { Router } from "express";
import { body, param } from "express-validator";
import {
  listEvents,
  getEventBySlug,
  getRelatedEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} from "../controllers/event.controller.js";
import { handleValidation } from "../middleware/handleValidation.js";
import { requireAdmin } from "../middleware/requireAdmin.js";

const router = Router();

const slugParam = param("slug").trim().notEmpty().withMessage("Slug is required.");

const eventBody = [
  body("slug").trim().notEmpty().withMessage("Slug is required."),
  body("title").trim().notEmpty().withMessage("Title is required."),
  body("tagline").trim().notEmpty().withMessage("Tagline is required."),
  body("category").trim().notEmpty().withMessage("Category is required."),
  body("accent").optional().isIn(["blue", "cyan", "purple", "magenta"]),
];

router.get("/", listEvents);
router.get("/:slug", slugParam, handleValidation, getEventBySlug);
router.get("/:slug/related", slugParam, handleValidation, getRelatedEvents);

router.post("/", requireAdmin, eventBody, handleValidation, createEvent);
router.put("/:slug", requireAdmin, slugParam, handleValidation, updateEvent);
router.delete("/:slug", requireAdmin, slugParam, handleValidation, deleteEvent);

export default router;