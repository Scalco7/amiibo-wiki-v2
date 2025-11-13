const jwt = require('jsonwebtoken');
const cache = require('../config/cache');

async function isTokenBlacklisted(token) {
  const exists = await cache.get('blacklist:' + token);
  return !!exists;
}

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'No token' });
  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') return res.status(401).json({ error: 'Invalid token format' });

  const token = parts[1];
  jwt.verify(token, process.env.JWT_SECRET || 'change_this', async (err, payload) => {
    if (err) return res.status(401).json({ error: 'Token invalid' });
    if (await isTokenBlacklisted(token)) return res.status(401).json({ error: 'Token revoked' });
    req.user = payload;
    next();
  });
}

module.exports = authMiddleware;
