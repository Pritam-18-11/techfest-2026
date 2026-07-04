import mongoose from "mongoose";

const teamMemberSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, trim: true, lowercase: true },
  },
  { _id: false }
);

const registrationSchema = new mongoose.Schema(
  {
    eventSlug: { type: String, required: true, index: true },
    teamName: { type: String, required: true, trim: true },
    leaderName: { type: String, required: true, trim: true },
    leaderEmail: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Invalid email address"],
    },
    leaderPhone: { type: String, required: true, trim: true },
    institution: { type: String, required: true, trim: true },
    teamMembers: [teamMemberSchema],
    status: {
      type: String,
      enum: ["pending", "confirmed", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

registrationSchema.index({ eventSlug: 1, leaderEmail: 1 }, { unique: true });

export const Registration = mongoose.model("Registration", registrationSchema);