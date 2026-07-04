import { Sponsor } from "../models/Sponsor.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const TIER_ORDER = ["Title", "Platinum", "Gold", "Silver"];

/** GET /api/sponsors */
export const listSponsors = asyncHandler(async (req, res) => {
  const sponsors = await Sponsor.find().sort({ name: 1 });
  sponsors.sort((a, b) => TIER_ORDER.indexOf(a.tier) - TIER_ORDER.indexOf(b.tier));
  res.json({ success: true, count: sponsors.length, data: sponsors });
});

/** POST /api/sponsors (admin) */
export const createSponsor = asyncHandler(async (req, res) => {
  const sponsor = await Sponsor.create(req.body);
  res.status(201).json({ success: true, data: sponsor });
});

/** PUT /api/sponsors/:id (admin) */
export const updateSponsor = asyncHandler(async (req, res) => {
  const sponsor = await Sponsor.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!sponsor) throw new ApiError(404, "Sponsor not found.");
  res.json({ success: true, data: sponsor });
});

/** DELETE /api/sponsors/:id (admin) */
export const deleteSponsor = asyncHandler(async (req, res) => {
  const sponsor = await Sponsor.findByIdAndDelete(req.params.id);
  if (!sponsor) throw new ApiError(404, "Sponsor not found.");
  res.json({ success: true, message: "Sponsor deleted." });
});