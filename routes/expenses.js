const express = require('express');
const expenseController = require('../controllers/expenses');

const router = express.Router();

/**
 * Get all expenses.
 */
router.get('/', (req, res) => {
  /*
    #swagger.tags = ['Expenses']
    #swagger.summary = 'Get all expenses'
    #swagger.description = 'Returns every expense stored in the database.'

    #swagger.responses[200] = {
      description: 'Expenses retrieved successfully.',
      schema: [{ $ref: '#/definitions/Expense' }]
    }

    #swagger.responses[500] = {
      description: 'Server error.',
      schema: { $ref: '#/definitions/Error' }
    }
  */

  return expenseController.getAllExpenses(req, res);
});

/**
 * Get one expense by ID.
 */
router.get('/:id', (req, res) => {
  /*
    #swagger.tags = ['Expenses']
    #swagger.summary = 'Get an expense by ID'
    #swagger.description = 'Returns one expense using its MongoDB ID.'

    #swagger.parameters['id'] = {
      in: 'path',
      description: 'MongoDB ID of the expense.',
      required: true,
      type: 'string'
    }

    #swagger.responses[200] = {
      description: 'Expense retrieved successfully.',
      schema: { $ref: '#/definitions/Expense' }
    }

    #swagger.responses[400] = {
      description: 'Invalid expense ID.',
      schema: { $ref: '#/definitions/Error' }
    }

    #swagger.responses[404] = {
      description: 'Expense not found.',
      schema: { $ref: '#/definitions/Error' }
    }

    #swagger.responses[500] = {
      description: 'Server error.',
      schema: { $ref: '#/definitions/Error' }
    }
  */

  return expenseController.getExpenseById(req, res);
});

/**
 * Create an expense.
 */
router.post('/', (req, res) => {
  /*
    #swagger.tags = ['Expenses']
    #swagger.summary = 'Create an expense'
    #swagger.description = 'Creates and saves a new expense record.'

    #swagger.parameters['body'] = {
      in: 'body',
      description: 'Expense information.',
      required: true,
      schema: { $ref: '#/definitions/ExpenseInput' }
    }

    #swagger.responses[201] = {
      description: 'Expense created successfully.',
      schema: {
        message: 'Expense created successfully.',
        expenseId: '669f98765432109876543210'
      }
    }

    #swagger.responses[400] = {
      description: 'Invalid or missing expense information.',
      schema: { $ref: '#/definitions/Error' }
    }

    #swagger.responses[404] = {
      description: 'The selected category does not exist.',
      schema: { $ref: '#/definitions/Error' }
    }

    #swagger.responses[500] = {
      description: 'Server error.',
      schema: { $ref: '#/definitions/Error' }
    }
  */

  return expenseController.createExpense(req, res);
});

module.exports = router;