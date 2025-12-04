import express from "express";
import {
  createOrUpdateWorker,
  getWorkerProfile,
  completeWorkerSetup,
} from "../controllers/workerController.js";

const router = express.Router();

// Save Each Step of Worker Setup
router.post("/setup", createOrUpdateWorker);

// Worker Profile
router.get("/profile/:userId", getWorkerProfile);

// Mark worker setup complete
router.post("/complete-setup", completeWorkerSetup);

export default router;
