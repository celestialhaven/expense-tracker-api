require('dotenv').config();

const express = require('express');
const mongodb = require('./data/database');

const {
  notFoundHandler,
  errorHandler
} = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 3000;

// Parse JSON request bodies.
app.use(express.json());

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