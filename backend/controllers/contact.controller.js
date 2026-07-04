import { ContactMessage } from "../models/ContactMessage.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

/** POST /api/contact */
export const createContactMessage = asyncHandler(async (req, res) => {
  const message = await ContactMessage.create(req.body);
  res.status(201).json({
    success: true,
    message: "Message received. The organizing committee will respond by email.",
    data: message,
  });
});

/** GET /api/contact (admin) — supports ?resolved=true|false */
export const listContactMessages = asyncHandler(async (req, res) => {
  const { resolved } = req.query;
  const query = {};
  if (resolved !== undefined) query.isResolved = resolved === "true";

  const messages = await ContactMessage.find(query).sort({ createdAt: -1 });
  res.json({ success: true, count: messages.length, data: messages });
});

/** PATCH /api/contact/:id/resolve (admin) */
export const resolveContactMessage = asyncHandler(async (req, res) => {
  const message = await ContactMessage.findByIdAndUpdate(
    req.params.id,
    { isResolved: true },
    { new: true }
  );
  if (!message) throw new ApiError(404, "Message not found.");
  res.json({ success: true, data: message });
});