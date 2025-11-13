// src/models/User.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  passwordHash: { type: String, required: true }, // bcrypt hashed
  role: { type: String, enum: ['admin','user'], default: 'user' },
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
