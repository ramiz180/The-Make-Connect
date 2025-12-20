const Worker = require("../models/Worker");

/* ===============================
   ADD / UPDATE SERVICES
================================ */
exports.addOrUpdateServices = async (req, res) => {
  try {
    const { userId, services } = req.body;

    if (!userId || !Array.isArray(services)) {
      return res.status(400).json({
        success: false,
        message: "Invalid payload",
      });
    }

    const worker = await Worker.findOneAndUpdate(
      { userId },
      { $set: { services } },
      { new: true, upsert: true }
    );

    res.json({
      success: true,
      message: "Services saved successfully",
      services: worker.services,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to save services",
      error: error.message,
    });
  }
};

/* ===============================
   GET WORKER SERVICES
================================ */
exports.getMyServices = async (req, res) => {
  try {
    const { userId } = req.query;

    const worker = await Worker.findOne({ userId });

    res.json({
      success: true,
      services: worker?.services || [],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
