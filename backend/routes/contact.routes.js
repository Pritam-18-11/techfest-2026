import { Router } from "express";
import { body, param } from "express-validator";
import {
  createContactMessage,
  listContactMessages,
  resolveContactMessage,
} from "../controllers/contact.controller.js";
import { handleValidation } from "../middleware/handleValidation.js";
import { requireAdmin } from "../middleware/requireAdmin.js";
import { writeLimiter } from "../middleware/writeLimiter.js";

const router = Router();

const contactBody = [
  body("name").trim().notEmpty().withMessage("Name is required."),
  body("email").trim().isEmail().withMessage("A valid email is required."),
  body("subject").trim().notEmpty().withMessage("Subject is required."),
  body("message").trim().isLength({ min: 10 }).withMessage("Message must be at least 10 characters."),
];

router.post("/", writeLimiter, contactBody, handleValidation, createContactMessage);

router.get("/", requireAdmin, listContactMessages);
router.patch(
  "/:id/resolve",
  requireAdmin,
  param("id").isMongoId(),
  handleValidation,
  resolveContactMessage
);

export default router;