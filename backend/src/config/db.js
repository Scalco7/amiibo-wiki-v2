// src/config/db.js
const mongoose = require('mongoose');

module.exports = async function connectDB() {
  const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/Amiibo';
  try {
    await mongoose.connect(uri, {
      // mongoose faz pooling automaticamente; você pode ajustar poolSize via options
      // useNewUrlParser: true, useUnifiedTopology: true  // não necessário em versões mais recentes
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error', err);
    process.exit(1);
  }
};
