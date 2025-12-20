const mongoose = require("mongoose");
const Booking = require("../models/Booking");

/* =========================
   CREATE BOOKING (CUSTOMER)
========================= */
exports.createBooking = async (req, res) => {
  try {
    const { customerId, workerId, service, date, time, address, notes } = req.body;

    /* ---------- VALIDATION ---------- */
    if (
      !mongoose.Types.ObjectId.isValid(customerId) ||
      !mongoose.Types.ObjectId.isValid(workerId)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid customer or worker ID",
      });
    }

    if (!service?.name || !date || !time || !address) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    /* ---------- CREATE BOOKING ---------- */
    const booking = await Booking.create({
      customerId,
      workerId,
      service: {
        name: service.name,
        price: Number(service.price || 0),
      },
      date,
      time,
      address,
      notes: notes || "",
      status: "pending",
    });

    /* 🔥 REAL-TIME EVENT → WORKER */
    if (global.io) {
      global.io
        .to(workerId.toString())
        .emit("booking:new", booking);
    }

    return res.json({
      success: true,
      message: "Booking created",
      booking,
    });
  } catch (err) {
    console.error("❌ Create booking error:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to create booking",
    });
  }
};

/* =========================
   CUSTOMER BOOKINGS
========================= */
exports.getCustomerBookings = async (req, res) => {
  try {
    const { customerId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(customerId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid customer ID",
      });
    }

    const bookings = await Booking.find({ customerId })
      .populate("workerId", "name phone")
      .sort({ createdAt: -1 });

    return res.json({ success: true, bookings });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to load bookings" });
  }
};

/* =========================
   WORKER BOOKINGS
========================= */
exports.getWorkerBookings = async (req, res) => {
  try {
    const { workerId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(workerId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid worker ID",
      });
    }

    const bookings = await Booking.find({ workerId })
      .populate("customerId", "name phone")
      .sort({ createdAt: -1 });

    return res.json({ success: true, bookings });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to load bookings" });
  }
};

/* =========================
   WORKER → ACCEPT BOOKING
========================= */
exports.acceptBooking = async (req, res) => {
  const { bookingId } = req.body;

  const booking = await Booking.findByIdAndUpdate(
    bookingId,
    { status: "accepted" },
    { new: true }
  );

  /* 🔥 REAL-TIME → CUSTOMER */
  if (global.io && booking) {
    global.io
      .to(booking.customerId.toString())
      .emit("booking:updated", booking);
  }

  res.json({ success: true, booking });
};

/* =========================
   WORKER → REJECT BOOKING
========================= */
exports.rejectBooking = async (req, res) => {
  const { bookingId } = req.body;

  const booking = await Booking.findByIdAndUpdate(
    bookingId,
    { status: "rejected" },
    { new: true }
  );

  /* 🔥 REAL-TIME → CUSTOMER */
  if (global.io && booking) {
    global.io
      .to(booking.customerId.toString())
      .emit("booking:updated", booking);
  }

  res.json({ success: true, booking });
};

/* =========================
   WORKER → COMPLETE BOOKING
========================= */
exports.completeBooking = async (req, res) => {
  const { bookingId } = req.body;

  const booking = await Booking.findByIdAndUpdate(
    bookingId,
    { status: "completed" },
    { new: true }
  );

  /* 🔥 REAL-TIME → CUSTOMER */
  if (global.io && booking) {
    global.io
      .to(booking.customerId.toString())
      .emit("booking:updated", booking);
  }

  res.json({ success: true, booking });
};

/* =========================
   CUSTOMER → CANCEL BOOKING
========================= */
exports.cancelBooking = async (req, res) => {
  const { bookingId } = req.body;

  const booking = await Booking.findByIdAndUpdate(
    bookingId,
    { status: "cancelled" },
    { new: true }
  );

  /* 🔥 REAL-TIME → WORKER */
  if (global.io && booking) {
    global.io
      .to(booking.workerId.toString())
      .emit("booking:updated", booking);
  }

  res.json({ success: true, booking });
};
