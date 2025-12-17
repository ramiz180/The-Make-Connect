const WorkerLocation = require("../models/WorkerLocation");

// ✅ Save / Update worker location
exports.saveWorkerLocation = async (req, res) => {
  try {
    const {
      userId,
      latitude,
      longitude,
      areaName,
      fullAddress,
      house,
      apartment,
      directions,
      label,
      serviceRadius,
    } = req.body;

    const location = await WorkerLocation.findOneAndUpdate(
      { userId },
      {
        latitude,
        longitude,
        areaName,
        fullAddress,
        house,
        apartment,
        directions,
        label,
        serviceRadius,
      },
      { upsert: true, new: true }
    );

    res.json({
      success: true,
      message: "Worker location saved",
      location,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to save worker location",
      error: error.message,
    });
  }
};

// ✅ Get worker location
exports.getWorkerLocation = async (req, res) => {
  try {
    const { userId } = req.params;

    const location = await WorkerLocation.findOne({ userId });

    res.json({
      success: true,
      location,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
