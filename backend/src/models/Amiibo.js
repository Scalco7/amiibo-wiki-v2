const mongoose = require('mongoose');

const AmiiboSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  type: { type: String, enum: ['Card','Figure','Band'], required: true },
  game: { type: mongoose.Schema.Types.ObjectId, ref: 'Game', required: true },
  releaseDateJapan: { type: Date },
  releaseDateBrazil: { type: Date },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

module.exports = mongoose.model('Amiibo', AmiiboSchema);
