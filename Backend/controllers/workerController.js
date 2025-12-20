const Worker = require("../models/Worker");

exports.saveWorkerLocation = async (req, res) => {
  try {
    const {
      userId,
      latitude,
      longitude,
      address,
      serviceRadius,
    } = req.body;

    if (!userId || latitude == null || longitude == null) {
      return res.status(400).json({
        success: false,
        message: "userId, latitude and longitude required",
      });
    }

    const worker = await Worker.findOneAndUpdate(
      { userId },
      {
        isAvailable: true,
        status: "active",
        location: {
          latitude: Number(latitude),
          longitude: Number(longitude),
        },
        geoLocation: {
          type: "Point",
          coordinates: [
            Number(longitude), // lng first
            Number(latitude),  // lat second
          ],
        },
        address,
        serviceRadius,
      },
      { new: true, upsert: true }
    );

    res.json({
      success: true,
      message: "Worker location saved",
      worker,
    });
  } catch (err) {
    console.error("Save worker location error:", err);
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};
