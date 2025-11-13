const mongoose = require('mongoose');

const GameSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  // Adicione outros campos relevantes para o jogo, se necessário
}, { timestamps: true });

module.exports = mongoose.model('Game', GameSchema);
