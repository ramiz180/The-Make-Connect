import Worker from "../models/Worker.js";
import User from "../models/User.js";

export const createOrUpdateWorker = async (req, res) => {
  try {
    const { userId, ...data } = req.body;

    let worker = await Worker.findOne({ userId });

    if (worker) {
      worker = await Worker.findOneAndUpdate({ userId }, data, { new: true });
    } else {
      worker = await Worker.create({ userId, ...data });
    }

    // Mark user as worker
    await User.findByIdAndUpdate(userId, { role: "worker" });

    res.json({ success: true, worker });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getWorkerProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    const worker = await Worker.findOne({ userId });

    res.json({ success: true, worker });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const completeWorkerSetup = async (req, res) => {
  try {
    const { userId } = req.body;

    await User.findByIdAndUpdate(userId, {
      isProfileComplete: true,
      role: "worker",
    });

    res.json({ success: true, message: "Worker setup completed!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
