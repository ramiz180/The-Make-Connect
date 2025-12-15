/*const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      enum: ["customer", "worker"],
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);*/




const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      default: null,
    },
    role: {
      type: String,
      enum: ["customer", "worker"],
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);

