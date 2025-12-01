const User = require('../models/User');

// Signup / Role Selection
exports.signup = async (req, res) => {
    const { name, phone, role } = req.body;
    try {
        let user = await User.findOne({ phone });
        if (!user) {
            user = new User({ name, phone, role });
            await user.save();
        }
        res.status(200).json({ success: true, user });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};
