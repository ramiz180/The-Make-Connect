const express = require("express");
const router = express.Router();
const controller = require("../controllers/bookingController");

router.post("/create", controller.createBooking);
router.get("/customer/:customerId", controller.getCustomerBookings);
router.get("/worker/:workerId", controller.getWorkerBookings);

router.post("/accept", controller.acceptBooking);
router.post("/reject", controller.rejectBooking);
router.post("/complete", controller.completeBooking);
router.post("/cancel", controller.cancelBooking);

module.exports = router;
