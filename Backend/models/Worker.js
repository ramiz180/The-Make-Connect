import mongoose from "mongoose";

const workerSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    // Step 1 — Basic Info
    gender: String,
    age: Number,
    experience: String,
    description: String,

    // Step 2 — Category / Skills
    category: String,
    subCategories: [String],

    // Step 3 — Portfolio Images
    portfolio: [String], // image URLs

    // Step 4 — Verification
    aadharNumber: String,
    aadharFront: String,
    aadharBack: String,
    isVerified: { type: Boolean, default: false },

    // Step 5 — Work Range
    serviceRadius: Number,

    // Ratings
    rating: { type: Number, default: 0 },
    totalReviews: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export default mongoose.model("Worker", workerSchema);
