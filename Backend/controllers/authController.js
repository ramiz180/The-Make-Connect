const twilio = require("twilio");
const User = require("../models/User");
const Customer = require("../models/Customer");
const Worker = require("../models/Worker");

/* =========================
   TWILIO CLIENT
========================= */
const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

// 🔐 In-memory store for DEV OTPs
global.devOtps = global.devOtps || {};

/* =========================
   SEND OTP
========================= */
exports.sendOtp = async (req, res) => {
  const { phone } = req.body;

  if (!phone) {
    return res.status(400).json({
      success: false,
      message: "Phone number is required",
    });
  }

  try {
    // ✅ DEV MODE
    if (process.env.DEV_MODE === "true") {
      const otp = "123456";
      global.devOtps[phone] = otp;
      console.log(`🔐 DEV OTP for ${phone}: ${otp}`);

      return res.json({
        success: true,
        message: "OTP sent (DEV MODE)",
      });
    }

    // 🚀 PROD MODE
    await client.verify.v2
      .services(process.env.TWILIO_VERIFY_SID)
      .verifications.create({
        to: `+91${phone}`,
        channel: "sms",
      });

    res.json({ success: true, message: "OTP sent successfully" });
  } catch (err) {
    console.error("Send OTP error:", err.message);
    res.status(500).json({ success: false, error: err.message });
  }
};

/* =========================
   VERIFY OTP
========================= */
exports.verifyOtp = async (req, res) => {
  const { phone, otp } = req.body;

  if (!phone || !otp) {
    return res.status(400).json({
      success: false,
      message: "Phone and OTP are required",
    });
  }

  try {
    if (process.env.DEV_MODE === "true") {
      if (global.devOtps[phone] !== otp) {
        return res.status(400).json({
          success: false,
          message: "Invalid OTP",
        });
      }
    } else {
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
    }

    let user = await User.findOne({ phone });
    if (!user) user = await User.create({ phone });

    res.json({
      success: true,
      userId: user._id,
      phone: user.phone,
      role: user.role,
      name: user.name,
    });
  } catch (err) {
    console.error("Verify OTP error:", err.message);
    res.status(500).json({ success: false, error: err.message });
  }
};

/* =========================
   SAVE ROLE (FIXED)
========================= */
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

    /* ---------- CUSTOMER ---------- */
    if (role === "customer") {
      const exists = await Customer.findOne({ userId });
      if (!exists) {
        await Customer.create({ userId });
      }
    }

    /* ---------- WORKER (SAFE CREATE) ---------- */
    if (role === "worker") {
      const exists = await Worker.findOne({ userId });

      if (!exists) {
        await Worker.create({
          userId,
          isAvailable: true,
          status: "active",
          services: [],
          serviceRadius: "5 km",
          location: {
            latitude: null,
            longitude: null,
          },
          address: {
            areaName: "",
            fullAddress: "",
            house: "",
            apartment: "",
          },
          // ❌ DO NOT SET geoLocation HERE
        });
      }
    }

    res.json({
      success: true,
      message: "Role saved & profile created",
      user,
    });
  } catch (err) {
    console.error("Save role error:", err.message);
    res.status(500).json({ success: false, error: err.message });
  }
};

/* =========================
   SAVE NAME
========================= */
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
    console.error("Save name error:", err.message);
    res.status(500).json({ success: false, error: err.message });
  }
};
