
// src/routes/auth.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const cache = require('../config/cache');

// POST /api/auth/logout
router.post('/logout', async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'No token' });
  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') return res.status(401).json({ error: 'Invalid token format' });
  const token = parts[1];
  try {
    // Decodifica o token para pegar o tempo de expiração
    const decoded = jwt.decode(token);
    if (!decoded || !decoded.exp) return res.status(400).json({ error: 'Invalid token' });
    const ttl = decoded.exp - Math.floor(Date.now() / 1000);
    if (ttl > 0) {
      await cache.set('blacklist:' + token, '1', 'EX', ttl);
    }
    res.json({ message: 'Logout realizado com sucesso' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao fazer logout' });
  }
});

// POST /api/auth/login
router.post('/login', 
  body('username').isString().trim().notEmpty(),
  body('password').isString().notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.warn(`[LOGIN] Falha de validação para usuário: ${req.body.username}`);
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      console.warn(`[LOGIN] Usuário não encontrado: ${username}`);
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const match = await bcrypt.compare(password, user.passwordHash);
    if (!match) {
      console.warn(`[LOGIN] Senha incorreta para usuário: ${username}`);
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    console.log(`[LOGIN] Sucesso para usuário: ${username}`);
    const token = jwt.sign({ userId: user._id, username: user.username, role: user.role }, process.env.JWT_SECRET || 'change_this', { expiresIn: '2h' });
    res.json({ token });
  }
);

module.exports = router;
