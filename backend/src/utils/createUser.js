// scripts/createUser.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../src/models/User');
require('dotenv').config();
const connectDB = require('../src/config/db');

(async () => {
  await connectDB();
  const pwHash = await bcrypt.hash('senha123', 12);
  const u = new User({ username: 'professor', passwordHash: pwHash, role: 'admin' });
  await u.save();
  console.log('Usuário criado');
  process.exit(0);
})();
