require('dotenv').config();

const express = require('express');
const mongodb = require('./data/database');

const {
  notFoundHandler,
  errorHandler
} = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 3000;
const allowedOrigins = (process.env.CORS_ORIGIN || '*')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

// Parse JSON request bodies.
app.use(express.json());

app.use((req, res, next) => {
  const requestOrigin = req.headers.origin;
  const allowAnyOrigin = allowedOrigins.includes('*');
  const allowedOrigin = allowAnyOrigin
    ? '*'
    : allowedOrigins.find((origin) => origin === requestOrigin);

  if (allowedOrigin) {
    res.setHeader('Access-Control-Allow-Origin', allowedOrigin);
    res.setHeader('Vary', 'Origin');
  }

  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET,POST,PUT,DELETE,OPTIONS'
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Content-Type,Authorization'
  );

  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }

  return next();
});

// Load API routes.
app.use('/', require('./routes'));

// Handle unknown routes.
app.use(notFoundHandler);

// Handle controller, database, and JSON errors.
app.use(errorHandler);

mongodb
  .initDb()
  .then(() => {
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB:', error);
    process.exit(1);
  });
