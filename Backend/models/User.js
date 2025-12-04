import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    phone: { type: String, required: true, unique: true },
    name: { type: String },
    role: { type: String, enum: ["customer", "worker"], required: true },

    // Location
    location: {
      latitude: Number,
      longitude: Number,
      address: String,
    },

    // OTP auth
    otp: String,
    otpExpires: Date,

    // Only for worker setup completion
    isProfileComplete: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
