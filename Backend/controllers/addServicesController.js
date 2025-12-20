const Worker = require("../models/Worker");

exports.addServices = async (req, res) => {
  try {
    const { userId, name, price, experience } = req.body;

    if (!userId || !name) {
      return res.status(400).json({
        success: false,
        message: "userId and service name are required",
      });
    }

    // ✅ Find worker by userId
    let worker = await Worker.findOne({ userId });

    // ✅ Create worker if not exists
    if (!worker) {
      worker = new Worker({
        userId,
        services: [],
        isAvailable: true,
        status: "active",
      });
    }

    // ✅ Push new service
    worker.services.push({
      name: name.trim(),
      price,
      experience,
    });

    await worker.save();

    res.json({
      success: true,
      message: "Service added successfully",
      services: worker.services,
    });
  } catch (err) {
    console.error("❌ Add service error:", err);
    res.status(500).json({
      success: false,
      message: "Failed to save services",
      error: err.message,
    });
  }
};
