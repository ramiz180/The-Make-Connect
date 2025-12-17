const mongoose = require("mongoose");

const LocationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    latitude: Number,
    longitude: Number,
    areaName: String,
    fullAddress: String,
    house: String,
    apartment: String,
    label: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Location", LocationSchema);
