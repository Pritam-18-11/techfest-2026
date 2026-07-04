import mongoose from "mongoose";

const sponsorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    tier: {
      type: String,
      enum: ["Title", "Platinum", "Gold", "Silver"],
      required: true,
      index: true,
    },
    website: { type: String, trim: true },
    logoUrl: { type: String },
  },
  { timestamps: true }
);

export const Sponsor = mongoose.model("Sponsor", sponsorSchema);