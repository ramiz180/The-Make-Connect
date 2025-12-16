const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    role: { type: String, enum: ["customer", "worker"], required: true },

    latitude: Number,
    longitude: Number,
    areaName: String,
    fullAddress: String,
    house: String,
    apartment: String,
    directions: String,
    label: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Location", locationSchema);
