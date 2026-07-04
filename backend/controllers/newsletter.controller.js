import { NewsletterSubscriber } from "../models/NewsletterSubscriber.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

/** POST /api/newsletter */
export const subscribe = asyncHandler(async (req, res) => {
  const email = req.body.email.toLowerCase().trim();

  const existing = await NewsletterSubscriber.findOne({ email });
  if (existing) {
    return res.status(200).json({
      success: true,
      message: "You're already subscribed.",
      data: existing,
    });
  }

  const subscriber = await NewsletterSubscriber.create({ email });
  res.status(201).json({
    success: true,
    message: "Subscribed. Watch your inbox for updates.",
    data: subscriber,
  });
});

/** DELETE /api/newsletter/:email */
export const unsubscribe = asyncHandler(async (req, res) => {
  const email = req.params.email.toLowerCase().trim();
  const result = await NewsletterSubscriber.findOneAndDelete({ email });
  if (!result) throw new ApiError(404, "No subscription found for this email.");
  res.json({ success: true, message: "Unsubscribed." });
});

/** GET /api/newsletter (admin) */
export const listSubscribers = asyncHandler(async (req, res) => {
  const subscribers = await NewsletterSubscriber.find().sort({ createdAt: -1 });
  res.json({ success: true, count: subscribers.length, data: subscribers });
});