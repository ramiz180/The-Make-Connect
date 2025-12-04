import Booking from "../models/Booking.js";

export const createBooking = async (req, res) => {
  try {
    const booking = await Booking.create(req.body);
    res.json({ success: true, booking });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateBookingStatus = async (req, res) => {
  try {
    const { bookingId, status } = req.body;

    const updated = await Booking.findByIdAndUpdate(
      bookingId,
      { status },
      { new: true }
    );

    res.json({ success: true, booking: updated });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getCustomerBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ customerId: req.params.id });
    res.json({ success: true, bookings });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getWorkerBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ workerId: req.params.id });
    res.json({ success: true, bookings });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
