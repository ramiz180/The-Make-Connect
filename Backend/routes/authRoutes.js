const express = require("express");
const {
  sendOtp,
  verifyOtp,
  saveRole,  
  saveName,    // ✅ ADD THIS

} = require("../controllers/authController");

const router = express.Router();

router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);
router.post("/save-role", saveRole);
router.post("/save-name", saveName);
module.exports = router;
