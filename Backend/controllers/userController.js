const User = require('../models/User');

exports.updateLocation = async (req, res) => {
    const { userId, location, serviceRadius } = req.body;
    try {
        const user = await User.findByIdAndUpdate(
            userId,
            { location, serviceRadius },
            { new: true }
        );
        res.status(200).json({ success: true, user });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};
