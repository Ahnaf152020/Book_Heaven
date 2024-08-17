const express = require('express');
const { signUp, signIn, refreshToken } = require('../Controllers/authController');
const { verifyAccessToken } = require('../middleware/authMiddleware');

const router = express.Router();

// Public routes
router.post('/sign-up', signUp);
router.post('/sign-in', signIn);
router.post('/refresh-token', refreshToken);

// Protected route example
router.get('/protected', verifyAccessToken, (req, res) => {
  res.json({ message: 'This is a protected route', userId: req.user });
});

module.exports = router;
