import express from "express";
import {
  updateUserDetails,
  saveLocation,
} from "../controllers/userController.js";

const router = express.Router();

// Update name, role
router.post("/update", updateUserDetails);

// Save user location
router.post("/location", saveLocation);

export default router;
