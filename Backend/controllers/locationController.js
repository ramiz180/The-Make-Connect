const Location = require("../models/Location");
const Worker = require("../models/Worker");

/* =====================================================
   SAVE LOCATION (COMMON – CUSTOMER / WORKER)
   (Existing logic kept)
===================================================== */
exports.saveLocation = async (req, res) => {
  try {
    const location = await Location.create(req.body);
    res.json({ success: true, location });
  } catch (e) {
    res.status(500).json({ success: false, error: e.message });
  }
};

/* =====================================================
   GET USER LOCATIONS (UNCHANGED)
===================================================== */
exports.getUserLocations = async (req, res) => {
  const locations = await Location.find({
    userId: req.params.userId,
  });
  res.json(locations);
};

/* =====================================================
   SAVE WORKER LOCATION (NEW + REQUIRED)
   🔥 THIS FIXES NEARBY SEARCH
===================================================== */
exports.saveWorkerLocation = async (req, res) => {
  try {
    const { userId, latitude, longitude, address } = req.body;

    if (!userId || !latitude || !longitude) {
      return res.status(400).json({
        success: false,
        message: "userId, latitude and longitude are required",
      });
    }

    const worker = await Worker.findOne({ userId });
    if (!worker) {
      return res.status(404).json({
        success: false,
        message: "Worker not found",
      });
    }

    /* ---------- OLD FORMAT (KEEP) ---------- */
    worker.location = {
      latitude: Number(latitude),
      longitude: Number(longitude),
    };

    /* ---------- NEW GEO FORMAT (IMPORTANT) ---------- */
    worker.geoLocation = {
      type: "Point",
      coordinates: [
        Number(longitude), // lng
        Number(latitude),  // lat
      ],
    };

    /* ---------- ADDRESS ---------- */
    if (address) {
      worker.address = address;
    }

    await worker.save();

    res.json({
      success: true,
      message: "Worker location saved successfully",
    });
  } catch (err) {
    console.error("Save worker location error:", err);
    res.status(500).json({
      success: false,
      message: "Failed to save worker location",
      error: err.message,
    });
  }
};
