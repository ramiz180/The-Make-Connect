import User from "../models/User.js";
import crypto from "crypto";

// Temporary OTP function (later replace with SMS API)
const generateOTP = () => Math.floor(1000 + Math.random() * 9000).toString();

export const sendOTP = async (req, res) => {
  try {
    const { phone } = req.body;
    if (!phone) return res.status(400).json({ message: "Phone required" });

    const otp = generateOTP();
    const otpExpires = Date.now() + 5 * 60 * 1000; // 5 min

    let user = await User.findOne({ phone });
    if (!user) {
      user = await User.create({ phone, role: "customer" }); // default until role selected
    }

    user.otp = otp;
    user.otpExpires = otpExpires;
    await user.save();

    console.log("OTP:", otp); // Replace with SMS API

    res.status(200).json({
      success: true,
      message: "OTP sent successfully",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const verifyOTP = async (req, res) => {
  try {
    const { phone, otp } = req.body;

    const user = await User.findOne({ phone });
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.otp !== otp || user.otpExpires < Date.now()) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    user.otp = null;
    user.otpExpires = null;
    await user.save();

    res.json({
      success: true,
      message: "OTP verified",
      userId: user._id,
      role: user.role,
      name: user.name || "",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
