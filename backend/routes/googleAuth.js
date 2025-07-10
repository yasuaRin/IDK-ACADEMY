const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const router = express.Router();

router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    // Buat JWT token
    const token = jwt.sign(
      { id: req.user._id, isVerified: req.user.isVerified },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Redirect ke frontend dengan token
    res.redirect(`${process.env.CLIENT_URL}/?token=${token}`);
  }
);

module.exports = router;
