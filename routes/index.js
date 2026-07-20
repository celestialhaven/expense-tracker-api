const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  /*
    #swagger.tags = ['General']
    #swagger.summary = 'Expense Tracker API home'
    #swagger.description = 'Returns the available API resources.'

    #swagger.responses[200] = {
      description: 'API information retrieved successfully.'
    }
  */

  return res.status(200).json({
    message: 'Welcome to the Expense Tracker API.',
    documentation: '/api-docs',
    endpoints: {
      expenses: '/expenses',
      categories: '/categories'
    }
  });
});

router.get('/health', (req, res) => {
  /*
    #swagger.tags = ['General']
    #swagger.summary = 'API health check'
    #swagger.description = 'Returns a lightweight deployment health status.'

    #swagger.responses[200] = {
      description: 'API is running.'
    }
  */

  return res.status(200).json({
    status: 'ok',
    service: 'expense-tracker-api'
  });
});

router.use('/api-docs', require('./swagger'));
router.use('/expenses', require('./expenses'));
router.use('/categories', require('./categories'));

module.exports = router;
