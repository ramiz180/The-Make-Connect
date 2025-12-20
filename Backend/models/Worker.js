const mongoose = require("mongoose");

const workerSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    isAvailable: {
      type: Boolean,
      default: true,
    },

    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },

    services: {
      type: [
        {
          name: { type: String, required: true },
          price: Number,
          experience: String,
        },
      ],
      default: [],
    },

    location: {
      latitude: { type: Number, default: null },
      longitude: { type: Number, default: null },
    },

    geoLocation: {
      type: {
        type: String,
        enum: ["Point"],
      },
      coordinates: {
        type: [Number], // [lng, lat]
        validate: {
          validator: (v) => !v || v.length === 2,
          message: "geoLocation.coordinates must be [lng, lat]",
        },
      },
    },

    address: {
      areaName: { type: String, default: "" },
      fullAddress: { type: String, default: "" },
      house: { type: String, default: "" },
      apartment: { type: String, default: "" },
    },

    serviceRadius: {
      type: String,
      default: "5 km",
    },
  },
  { timestamps: true }
);

workerSchema.index({ geoLocation: "2dsphere" });

module.exports = mongoose.model("Worker", workerSchema);
