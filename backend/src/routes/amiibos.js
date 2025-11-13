// src/routes/amiibos.js
const express = require('express');
const router = express.Router();
const Amiibo = require('../models/Amiibo');
const { body, query, validationResult } = require('express-validator');
const auth = require('../utils/authMiddleware');
const redis = require('../config/cache');

// 🔹 GET /api/amiibos?name=&game=&type=
router.get(
  '/',
  auth,
  [
    query('name').optional().isString().trim(),
    query('game').optional().isString().trim(),
    query('type').optional().isString().trim(),
  ],
  async (req, res) => {
    try {
      const cacheKey = 'amiibos:' + JSON.stringify(req.query);
      const cached = await redis.get(cacheKey);


      if (cached) {
        console.log(`[AMIIBO BUSCA] Cache hit para query: ${JSON.stringify(req.query)} por usuário: ${req.user?.username}`);
        return res.json(JSON.parse(cached));
      }

      const q = {};
      if (req.query.name) q.name = { $regex: new RegExp(req.query.name, 'i') };
      if (req.query.game) q.game = req.query.game;
      if (req.query.type) q.type = req.query.type;

      const amiibos = await Amiibo.find(q).sort({ createdAt: -1 }).limit(200);

      // salva no cache por 2 minutos
      await redis.set(cacheKey, JSON.stringify(amiibos), 'EX', 120);

      console.log(`[AMIIBO BUSCA] Busca realizada por usuário: ${req.user?.username} | Filtros: ${JSON.stringify(q)}`);
      res.json(amiibos);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to fetch amiibos' });
    }
  }
);

// 🔹 POST /api/amiibos
router.post(
  '/',
  auth,
  [
    body('name').isString().trim().notEmpty(),
    body('type').isIn(['card', 'figure', 'other']),
    body('game').isString().trim().notEmpty(),
    body('releaseDateJapan').optional().isISO8601(),
    body('releaseDateBrazil').optional().isISO8601(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, type, game, releaseDateJapan, releaseDateBrazil } = req.body;

    try {
      const newAmiibo = new Amiibo({
        name,
        type,
        game,
        releaseDateJapan: releaseDateJapan || null,
        releaseDateBrazil: releaseDateBrazil || null,
      });

      await newAmiibo.save();

      // 🔹 Invalida o cache (para manter os dados consistentes)
      await redis.flushAll();

      console.log(`[AMIIBO POST] Novo amiibo criado por usuário: ${req.user?.username} | Dados: ${JSON.stringify({ name, type, game })}`);
      res.status(201).json(newAmiibo);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to create amiibo' });
    }
  }
);

module.exports = router;
