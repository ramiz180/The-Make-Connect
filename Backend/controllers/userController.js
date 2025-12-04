import User from "../models/User.js";

export const updateUserDetails = async (req, res) => {
  try {
    const { userId, name, role } = req.body;

    const updated = await User.findByIdAndUpdate(
      userId,
      { name, role },
      { new: true }
    );

    res.json({ success: true, user: updated });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const saveLocation = async (req, res) => {
  try {
    const { userId, latitude, longitude, address } = req.body;

    const updated = await User.findByIdAndUpdate(
      userId,
      {
        location: { latitude, longitude, address },
      },
      { new: true }
    );

    res.json({ success: true, user: updated });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
