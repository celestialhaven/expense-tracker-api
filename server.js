require('dotenv').config();

const express = require('express');
const mongodb = require('./data/database');

const app = express();
const PORT = process.env.PORT || 3000;

// Allow the server to receive JSON request bodies.
app.use(express.json());

// Load all API routes.
app.use('/', require('./routes'));

// Handle routes that do not exist.
app.use((req, res) => {
  res.status(404).json({
    message: 'Route not found.'
  });
});

// Connect to MongoDB before starting the server.
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