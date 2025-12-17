// models/Worker.js
const mongoose = require("mongoose");

const workerSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    location: {
      latitude: Number,
      longitude: Number,
    },

    address: {
      areaName: String,
      fullAddress: String,
      house: String,
      apartment: String,
    },

    serviceRadius: {
      type: String,
      default: "5 km",
    },

    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Worker", workerSchema);
