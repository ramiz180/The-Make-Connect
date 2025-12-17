const mongoose = require("mongoose");

const WorkerLocationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Worker",
    },

    latitude: {
      type: Number,
      required: true,
    },

    longitude: {
      type: Number,
      required: true,
    },

    areaName: {
      type: String,
    },

    fullAddress: {
      type: String,
    },

    house: {
      type: String,
    },

    apartment: {
      type: String,
    },

    directions: {
      type: String,
    },

    label: {
      type: String,
      enum: ["home", "work", "other", "friends"],
      default: "work",
    },

    serviceRadius: {
      type: String, // "2 km", "5 km", "10 km", "City-wide"
      default: "5 km",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("WorkerLocation", WorkerLocationSchema);
