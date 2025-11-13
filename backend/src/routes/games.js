// GET /api/games?name= - Listar games com filtro por nome
router.get(
  '/',
  auth,
  async (req, res) => {
    try {
      const { name } = req.query;
      const filter = {};
      if (name) {
        filter.name = { $regex: new RegExp(name, 'i') };
      }
      const games = await Game.find(filter).sort({ name: 1 });
      res.json(games);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Erro ao buscar games' });
    }
  }
);
const express = require('express');
const router = express.Router();
const Game = require('../models/Game');
const { body, validationResult } = require('express-validator');
const auth = require('../utils/authMiddleware');

// POST /api/games - Cadastrar novo game
router.post(
  '/',
  auth,
  [
    body('name').isString().trim().notEmpty(),
    // Adicione outros validadores se necessário
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { name } = req.body;
      const newGame = new Game({ name });
      await newGame.save();
      res.status(201).json(newGame);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Erro ao cadastrar game' });
    }
  }
);

module.exports = router;
