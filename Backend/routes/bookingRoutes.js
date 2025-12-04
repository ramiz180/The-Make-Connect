import express from "express";
import {
  createBooking,
  updateBookingStatus,
  getCustomerBookings,
  getWorkerBookings,
} from "../controllers/bookingController.js";

const router = express.Router();

// Create a new booking
router.post("/create", createBooking);

// Accept / Reject / Complete booking
router.post("/update-status", updateBookingStatus);

// Get bookings of a customer
router.get("/customer/:id", getCustomerBookings);

// Get bookings for a worker
router.get("/worker/:id", getWorkerBookings);

export default router;
