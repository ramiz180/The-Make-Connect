import express from "express";
import {
  addReview,
  getWorkerReviews,
} from "../controllers/reviewController.js";

const router = express.Router();

// Add a review
router.post("/add", addReview);

// Get worker reviews
router.get("/:id", getWorkerReviews);

export default router;
