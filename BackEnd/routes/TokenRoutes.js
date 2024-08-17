// routes/tokenRoutes.js
const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const Token = require('../models/Token');
const User = require('../models/user');

router.post('/token', async (req, res) => {
  const { token } = req.body;
  if (!token) return res.sendStatus(401);

  try {
    const storedToken = await Token.findOne({ token });
    if (!storedToken) return res.sendStatus(403);

    jwt.verify(token, 'bookheaven123', (err, user) => {
      if (err) return res.sendStatus(403);
      const accessToken = jwt.sign({ username: user.username, role: user.role }, 'bookheaven123', { expiresIn: '20m' });
      res.json({ accessToken });
    });
  } catch (err) {
    res.sendStatus(500);
  }
});

module.exports = router;
