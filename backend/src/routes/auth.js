// src/routes/auth.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');

// POST /api/auth/login
router.post('/login', 
  body('username').isString().trim().notEmpty(),
  body('password').isString().notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });

    const match = await bcrypt.compare(password, user.passwordHash);
    if (!match) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ userId: user._id, username: user.username, role: user.role }, process.env.JWT_SECRET || 'change_this', { expiresIn: '2h' });
    res.json({ token });
  }
);

module.exports = router;
