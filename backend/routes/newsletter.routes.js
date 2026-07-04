import { Router } from "express";
import { body, param } from "express-validator";
import {
  subscribe,
  unsubscribe,
  listSubscribers,
} from "../controllers/newsletter.controller.js";
import { handleValidation } from "../middleware/handleValidation.js";
import { requireAdmin } from "../middleware/requireAdmin.js";
import { writeLimiter } from "../middleware/writeLimiter.js";

const router = Router();

router.post(
  "/",
  writeLimiter,
  body("email").trim().isEmail().withMessage("A valid email is required."),
  handleValidation,
  subscribe
);

router.delete(
  "/:email",
  writeLimiter,
  param("email").isEmail().withMessage("A valid email is required."),
  handleValidation,
  unsubscribe
);

router.get("/", requireAdmin, listSubscribers);

export default router;