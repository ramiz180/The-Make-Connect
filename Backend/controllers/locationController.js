const Location = require("../models/Location");

exports.saveLocation = async (req, res) => {
  const { userId, role, address } = req.body;

  if (!userId || !role || !address) {
    return res.status(400).json({ success: false });
  }

  await Location.findOneAndUpdate(
    { userId, role },
    { userId, role, ...address },
    { upsert: true, new: true }
  );

  res.json({ success: true });
};
