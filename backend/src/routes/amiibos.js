const express = require('express');
const router = express.Router();
const Amiibo = require('../models/Amiibo');
const { body, query, validationResult } = require('express-validator');
const auth = require('../utils/authMiddleware');
const redis = require('../config/cache');

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
      let cached = null;
      try {
        cached = await redis.get(cacheKey);
      } catch (cacheErr) {
        console.warn(`[CACHE ERRO] Falha ao acessar cache: ${cacheErr.message}`);
      }
      if (cached) {
        console.log(`[AMIIBO BUSCA] Cache hit para query: ${JSON.stringify(req.query)} por usuário: ${req.user?.username}`);
        return res.json(JSON.parse(cached));
      }
      const q = { user: req.user.userId };
      if (req.query.name) q.name = { $regex: new RegExp(req.query.name, 'i') };
      if (req.query.game) q.game = req.query.game;
      if (req.query.type) q.type = req.query.type;
      const amiibos = await Amiibo.find(q).populate('game').sort({ createdAt: -1 }).limit(200);
      try {
        await redis.set(cacheKey, JSON.stringify(amiibos), 'EX', 120);
      } catch (cacheErr) {
        console.warn(`[CACHE ERRO] Falha ao salvar no cache: ${cacheErr.message}`);
      }
      console.log(`[AMIIBO BUSCA] Busca realizada por usuário: ${req.user?.username} | Filtros: ${JSON.stringify(q)}`);
      res.json(amiibos);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to fetch amiibos' });
    }
  }
);

router.post(
  '/',
  auth,
  [
    body('name').isString().trim().notEmpty().withMessage('Nome inválido.'),
    body('type').isIn(['Card', 'Figure', 'Band']).withMessage('O tipo de Amiibo deve ser: Card, Figure ou Band.'),
    body('game').isMongoId().withMessage('O ID do jogo é inválido.'),
    body('releaseDateJapan').optional().isISO8601().withMessage('Data de lançamento no japão inválida.'),
    body('releaseDateBrazil').optional().isISO8601().withMessage('Data de lançamento no Brasil inválida.'),
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
        user: req.user.userId,
      });
      await newAmiibo.save();
      await newAmiibo.populate('game');
      try {
         await redis.flushAll();
      } catch (cacheErr) {
        console.warn(`[CACHE ERRO] Falha ao invalidar cache: ${cacheErr.message}`);
      }
      console.log(`[AMIIBO POST] Novo amiibo criado por usuário: ${req.user?.username} | Dados: ${JSON.stringify({ name, type, game })}`);
      res.status(201).json(newAmiibo);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to create amiibo' });
    }
  }
);

module.exports = router;
