/*const twilio = require("twilio");
const User = require("../models/User");

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);


exports.sendOtp = async (req, res) => {
  const { phone } = req.body;

  try {
    await client.verify.v2
      .services(process.env.TWILIO_VERIFY_SID)
      .verifications.create({
        to: `+91${phone}`,
        channel: "sms",
      });

    res.json({ success: true, message: "OTP sent" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};


exports.verifyOtp = async (req, res) => {
  const { phone, otp } = req.body;

  try {
    const check = await client.verify.v2
      .services(process.env.TWILIO_VERIFY_SID)
      .verificationChecks.create({
        to: `+91${phone}`,
        code: otp,
      });

    if (check.status !== "approved") {
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }

    let user = await User.findOne({ phone });
    if (!user) {
      user = await User.create({ phone });
    }

    res.json({
      success: true,
      userId: user._id,
      phone: user.phone,
      role: user.role,
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};*/







const twilio = require("twilio");
const User = require("../models/User");

// =========================
// TWILIO CLIENT
// =========================
const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

/**
 * =========================
 * SEND OTP
 * =========================
 */
exports.sendOtp = async (req, res) => {
  const { phone } = req.body;

  if (!phone) {
    return res.status(400).json({
      success: false,
      message: "Phone number is required",
    });
  }

  try {
    await client.verify.v2
      .services(process.env.TWILIO_VERIFY_SID)
      .verifications.create({
        to: `+91${phone}`,
        channel: "sms",
      });

    res.json({
      success: true,
      message: "OTP sent successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

/**
 * =========================
 * VERIFY OTP + CREATE USER
 * =========================
 */
exports.verifyOtp = async (req, res) => {
  const { phone, otp } = req.body;

  if (!phone || !otp) {
    return res.status(400).json({
      success: false,
      message: "Phone and OTP are required",
    });
  }

  try {
    const check = await client.verify.v2
      .services(process.env.TWILIO_VERIFY_SID)
      .verificationChecks.create({
        to: `+91${phone}`,
        code: otp,
      });

    if (check.status !== "approved") {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    // 🔹 Find or create user
    let user = await User.findOne({ phone });
    if (!user) {
      user = await User.create({ phone });
    }

    res.json({
      success: true,
      message: "OTP verified successfully",
      userId: user._id,
      phone: user.phone,
      role: user.role,
      name: user.name,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

/**
 * =========================
 * SAVE / UPDATE ROLE
 * =========================
 */
exports.saveRole = async (req, res) => {
  const { userId, role } = req.body;

  if (!userId || !role) {
    return res.status(400).json({
      success: false,
      message: "User ID and role are required",
    });
  }

  if (!["customer", "worker"].includes(role)) {
    return res.status(400).json({
      success: false,
      message: "Invalid role",
    });
  }

  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { role },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.json({
      success: true,
      message: "Role saved successfully",
      user,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

/**
 * =========================
 * SAVE / UPDATE NAME
 * =========================
 */
exports.saveName = async (req, res) => {
  const { userId, name } = req.body;

  if (!userId || !name) {
    return res.status(400).json({
      success: false,
      message: "User ID and name are required",
    });
  }

  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { name },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.json({
      success: true,
      message: "Name saved successfully",
      user,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};
