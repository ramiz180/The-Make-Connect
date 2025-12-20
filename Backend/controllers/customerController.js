const Worker = require("../models/Worker");

exports.getNearbyWorkers = async (req, res) => {
  try {
    const { latitude, longitude } = req.query;

    if (!latitude || !longitude) {
      return res.status(400).json({
        success: false,
        message: "Latitude & longitude required",
      });
    }

    const lat = parseFloat(latitude);
    const lng = parseFloat(longitude);

    const workers = await Worker.find({
      isAvailable: true,
      status: "active",
      geoLocation: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [lng, lat],
          },
          $maxDistance: 5000, // 5 KM
        },
      },
      services: { $exists: true, $ne: [] }, // 🔥 MUST HAVE SERVICES
    })
      .populate("userId", "name phone")
      .lean();

    return res.json({
      success: true,
      workers,
    });
  } catch (err) {
    console.error("Nearby workers error:", err);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: err.message,
    });
  }
};
