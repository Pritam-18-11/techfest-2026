import { Event } from "../models/Event.js";
import { Registration } from "../models/Registration.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

/** POST /api/registrations */
export const createRegistration = asyncHandler(async (req, res) => {
  const { eventSlug } = req.body;

  const event = await Event.findOne({ slug: eventSlug?.toLowerCase() });
  if (!event) {
    throw new ApiError(404, `No event found with slug "${eventSlug}". Cannot register.`);
  }

  const registration = await Registration.create({
    ...req.body,
    eventSlug: eventSlug.toLowerCase(),
  });

  res.status(201).json({
    success: true,
    message: `Registration received for ${event.title}. Confirmation will be sent by email.`,
    data: registration,
  });
});

/** GET /api/registrations (admin) — supports ?eventSlug= & ?status= */
export const listRegistrations = asyncHandler(async (req, res) => {
  const { eventSlug, status } = req.query;
  const query = {};
  if (eventSlug) query.eventSlug = eventSlug.toLowerCase();
  if (status) query.status = status;

  const registrations = await Registration.find(query).sort({ createdAt: -1 });
  res.json({ success: true, count: registrations.length, data: registrations });
});

/** GET /api/registrations/:id (admin) */
export const getRegistration = asyncHandler(async (req, res) => {
  const registration = await Registration.findById(req.params.id);
  if (!registration) throw new ApiError(404, "Registration not found.");
  res.json({ success: true, data: registration });
});

/** PATCH /api/registrations/:id/status (admin) */
export const updateRegistrationStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const registration = await Registration.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true, runValidators: true }
  );
  if (!registration) throw new ApiError(404, "Registration not found.");
  res.json({ success: true, data: registration });
});