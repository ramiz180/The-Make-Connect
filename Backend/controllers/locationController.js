const Location = require("../models/Location");

exports.saveLocation = async (req, res) => {
  try {
    const location = await Location.create(req.body);
    res.json({ success: true, location });
  } catch (e) {
    res.status(500).json({ success: false, error: e.message });
  }
};

exports.getUserLocations = async (req, res) => {
  const locations = await Location.find({
    userId: req.params.userId,
  });
  res.json(locations);
};
