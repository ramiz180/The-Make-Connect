const Worker = require("../models/Worker");
const User = require("../models/User");

exports.getNearbyWorkers = async (req, res) => {
  try {
    const { latitude, longitude } = req.query;

    if (!latitude || !longitude) {
      return res.status(400).json({
        success: false,
        message: "Latitude & longitude required",
      });
    }

    const workers = await Worker.find({
      isAvailable: true,
      services: { $exists: true, $not: { $size: 0 } },
      geoLocation: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [Number(longitude), Number(latitude)],
          },
          $maxDistance: 5000, // 5 km
        },
      },
    }).populate("userId", "name phone");

    res.json({
      success: true,
      workers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
