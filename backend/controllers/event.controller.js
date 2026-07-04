import { Event } from "../models/Event.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

/** GET /api/events?search=&category=&accent= */
export const listEvents = asyncHandler(async (req, res) => {
  const { search, category, accent } = req.query;
  const query = {};

  if (category) query.category = category;
  if (accent) query.accent = accent;
  if (search) {
    query.$or = [
      { title: { $regex: search, $options: "i" } },
      { tagline: { $regex: search, $options: "i" } },
      { category: { $regex: search, $options: "i" } },
    ];
  }

  const events = await Event.find(query).sort({ createdAt: 1 });
  res.json({ success: true, count: events.length, data: events });
});

/** GET /api/events/:slug */
export const getEventBySlug = asyncHandler(async (req, res) => {
  const event = await Event.findOne({ slug: req.params.slug.toLowerCase() });
  if (!event) throw new ApiError(404, `No event found with slug "${req.params.slug}".`);
  res.json({ success: true, data: event });
});

/** GET /api/events/:slug/related?count=3 */
export const getRelatedEvents = asyncHandler(async (req, res) => {
  const count = Math.min(Number(req.query.count) || 3, 8);
  const related = await Event.find({ slug: { $ne: req.params.slug.toLowerCase() } })
    .limit(count)
    .select("slug title category accent");
  res.json({ success: true, data: related });
});

/** POST /api/events (admin) */
export const createEvent = asyncHandler(async (req, res) => {
  const event = await Event.create(req.body);
  res.status(201).json({ success: true, data: event });
});

/** PUT /api/events/:slug (admin) */
export const updateEvent = asyncHandler(async (req, res) => {
  const event = await Event.findOneAndUpdate(
    { slug: req.params.slug.toLowerCase() },
    req.body,
    { new: true, runValidators: true }
  );
  if (!event) throw new ApiError(404, `No event found with slug "${req.params.slug}".`);
  res.json({ success: true, data: event });
});

/** DELETE /api/events/:slug (admin) */
export const deleteEvent = asyncHandler(async (req, res) => {
  const event = await Event.findOneAndDelete({ slug: req.params.slug.toLowerCase() });
  if (!event) throw new ApiError(404, `No event found with slug "${req.params.slug}".`);
  res.json({ success: true, message: "Event deleted." });
});