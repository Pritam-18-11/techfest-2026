import mongoose from "mongoose";

const scheduleItemSchema = new mongoose.Schema(
  { time: String, title: String, detail: String },
  { _id: false }
);

const faqSchema = new mongoose.Schema(
  { question: String, answer: String },
  { _id: false }
);

const eventSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    title: { type: String, required: true, trim: true },
    tagline: { type: String, required: true },
    category: { type: String, required: true, index: true },
    accent: {
      type: String,
      enum: ["blue", "cyan", "purple", "magenta"],
      default: "cyan",
    },
    description: [{ type: String }],
    date: String,
    venue: String,
    teamSize: String,
    eligibility: String,
    prizePool: String,
    registrationFee: String,
    rules: [{ type: String }],
    schedule: [scheduleItemSchema],
    faqs: [faqSchema],
    isFeatured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

eventSchema.index({ title: "text", tagline: "text", category: "text" });

export const Event = mongoose.model("Event", eventSchema);