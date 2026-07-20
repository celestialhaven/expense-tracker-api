const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to the Expense Tracker API.',
    documentation: '/api-docs',
    endpoints: {
      expenses: '/expenses',
      categories: '/categories'
    }
  });
});

// Swagger documentation
router.use('/api-docs', require('./swagger'));

// API routes
router.use('/expenses', require('./expenses'));
router.use('/categories', require('./categories'));

module.exports = router;