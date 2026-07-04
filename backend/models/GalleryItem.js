import mongoose from "mongoose";

const galleryItemSchema = new mongoose.Schema(
  {
    caption: { type: String, required: true },
    year: { type: String, required: true, index: true },
    imageUrl: { type: String }, // populated once real photography is uploaded
    gradient: { type: String, default: "from-signal-blue to-signal-purple" },
  },
  { timestamps: true }
);

export const GalleryItem = mongoose.model("GalleryItem", galleryItemSchema);