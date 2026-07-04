import { Router } from "express";
import { body, param } from "express-validator";
import {
  listGalleryItems,
  createGalleryItem,
  updateGalleryItem,
  deleteGalleryItem,
} from "../controllers/gallery.controller.js";
import { handleValidation } from "../middleware/handleValidation.js";
import { requireAdmin } from "../middleware/requireAdmin.js";

const router = Router();

const galleryBody = [
  body("caption").trim().notEmpty().withMessage("Caption is required."),
  body("year").trim().notEmpty().withMessage("Year is required."),
];

router.get("/", listGalleryItems);
router.post("/", requireAdmin, galleryBody, handleValidation, createGalleryItem);
router.put(
  "/:id",
  requireAdmin,
  param("id").isMongoId(),
  handleValidation,
  updateGalleryItem
);
router.delete(
  "/:id",
  requireAdmin,
  param("id").isMongoId(),
  handleValidation,
  deleteGalleryItem
);

export default router;