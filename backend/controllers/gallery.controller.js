import { GalleryItem } from "../models/GalleryItem.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

/** GET /api/gallery?year= */
export const listGalleryItems = asyncHandler(async (req, res) => {
  const { year } = req.query;
  const query = year ? { year } : {};
  const items = await GalleryItem.find(query).sort({ createdAt: -1 });
  res.json({ success: true, count: items.length, data: items });
});

/** POST /api/gallery (admin) */
export const createGalleryItem = asyncHandler(async (req, res) => {
  const item = await GalleryItem.create(req.body);
  res.status(201).json({ success: true, data: item });
});

/** PUT /api/gallery/:id (admin) */
export const updateGalleryItem = asyncHandler(async (req, res) => {
  const item = await GalleryItem.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!item) throw new ApiError(404, "Gallery item not found.");
  res.json({ success: true, data: item });
});

/** DELETE /api/gallery/:id (admin) */
export const deleteGalleryItem = asyncHandler(async (req, res) => {
  const item = await GalleryItem.findByIdAndDelete(req.params.id);
  if (!item) throw new ApiError(404, "Gallery item not found.");
  res.json({ success: true, message: "Gallery item deleted." });
});