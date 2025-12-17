// models/Customer.js
const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema(
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
  },
  { timestamps: true }
);

module.exports = mongoose.model("Customer", customerSchema);
