const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Manual Register & Login
router.post('/register', authController.register);
router.get('/verify/:token', authController.verifyEmail);
router.post('/login', authController.login);

module.exports = router;
