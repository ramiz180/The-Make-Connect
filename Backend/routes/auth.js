const express = require('express');
const admin = require('../firebaseAdmin');

const router = express.Router();

router.post('/verify', async (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ message: 'Token missing' });
  }

  try {
    // 🔥 Verify Firebase ID Token
    const decodedToken = await admin.auth().verifyIdToken(token);

    const userData = {
      uid: decodedToken.uid,
      phone: decodedToken.phone_number,
    };

    // TODO: Save user to DB if not exists

    return res.json({
      success: true,
      user: userData,
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired token',
    });
  }
});

module.exports = router;
