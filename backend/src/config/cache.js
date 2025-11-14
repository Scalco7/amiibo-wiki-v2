let redisAvailable = false;
let redisClient = null;

try {
  const Redis = require('ioredis');
  redisClient = new Redis({
    host: process.env.REDIS_HOST || '127.0.0.1',
    port: process.env.REDIS_PORT || 6379,
  });
  redisClient.on('error', () => {
    console.warn('[cache] Redis not available, fallback to memory cache');
    redisAvailable = false;
  });
  redisClient.on('connect', () => {
    console.log('[cache] Redis connected');
    redisAvailable = true;
  });
} catch {
  console.warn('[cache] Redis package not found, fallback to memory cache');
}

const memoryCache = new Map();

module.exports = {
  async get(key) {
    if (redisAvailable) return redisClient.get(key);
    return memoryCache.get(key) || null;
  },
  async set(key, value, mode, ttl) {
    if (redisAvailable) return redisClient.set(key, value, mode, ttl);
    memoryCache.set(key, value);
  },
  async del(key) {
    if (redisAvailable) return redisClient.del(key);
    memoryCache.delete(key);
  },
};
