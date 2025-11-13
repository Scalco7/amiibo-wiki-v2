// server.js
require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./src/config/db');

const app = express();
connectDB(); // conecta ao MongoDB

// Middlewares
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(mongoSanitize());
app.use(xss());
app.use(cors({ origin: true }));
app.use(morgan('combined'));

const limiter = rateLimit({ windowMs: 15*60*1000, max: 200 });
app.use(limiter);

// Rotas
app.use('/api/auth', require('./src/routes/auth'));
app.use('/api/amiibos', require('./src/routes/amiibos'));

// error handler & logging (simplified)
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal Server Error' });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
