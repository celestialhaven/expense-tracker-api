const express = require('express');
const expenseController = require('../controllers/expenses');
const validateRequest = require('../middleware/validate');

const {
  expenseIdRules,
  expenseBodyRules
} = require('../validators/expenses');

const router = express.Router();

router.get('/', (req, res, next) => {
  /*
    #swagger.tags = ['Expenses']
    #swagger.summary = 'Get all expenses'
    #swagger.description = 'Returns all expense records.'

    #swagger.responses[200] = {
      description: 'Expenses retrieved successfully.',
      schema: [{ $ref: '#/definitions/Expense' }]
    }

    #swagger.responses[500] = {
      description: 'Server error.',
      schema: { $ref: '#/definitions/Error' }
    }
  */

  return expenseController.getAllExpenses(req, res, next);
});

router.get(
  '/:id',
  ...expenseIdRules(),
  validateRequest,
  (req, res, next) => {
    /*
      #swagger.tags = ['Expenses']
      #swagger.summary = 'Get an expense by ID'

      #swagger.parameters['id'] = {
        in: 'path',
        description: 'MongoDB ObjectId of the expense.',
        required: true,
        type: 'string'
      }

      #swagger.responses[200] = {
        description: 'Expense retrieved successfully.',
        schema: { $ref: '#/definitions/Expense' }
      }

      #swagger.responses[400] = {
        description: 'Invalid expense ID.',
        schema: { $ref: '#/definitions/ValidationError' }
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

    return expenseController.getExpenseById(req, res, next);
  }
);

router.post(
  '/',
  ...expenseBodyRules(),
  validateRequest,
  (req, res, next) => {
    /*
      #swagger.tags = ['Expenses']
      #swagger.summary = 'Create an expense'

      #swagger.parameters['body'] = {
        in: 'body',
        description: 'Expense information.',
        required: true,
        schema: { $ref: '#/definitions/ExpenseInput' }
      }

      #swagger.responses[201] = {
        description: 'Expense created successfully.'
      }

      #swagger.responses[400] = {
        description: 'Expense validation failed.',
        schema: { $ref: '#/definitions/ValidationError' }
      }

      #swagger.responses[404] = {
        description: 'Selected category does not exist.',
        schema: { $ref: '#/definitions/Error' }
      }

      #swagger.responses[500] = {
        description: 'Server error.',
        schema: { $ref: '#/definitions/Error' }
      }
    */

    return expenseController.createExpense(req, res, next);
  }
);

router.put(
  '/:id',
  ...expenseIdRules(),
  ...expenseBodyRules(),
  validateRequest,
  (req, res, next) => {
    /*
      #swagger.tags = ['Expenses']
      #swagger.summary = 'Update an expense'
      #swagger.description = 'Updates an existing expense using its MongoDB ID.'

      #swagger.parameters['id'] = {
        in: 'path',
        description: 'MongoDB ObjectId of the expense.',
        required: true,
        type: 'string'
      }

      #swagger.parameters['body'] = {
        in: 'body',
        description: 'Updated expense information.',
        required: true,
        schema: { $ref: '#/definitions/ExpenseInput' }
      }

      #swagger.responses[200] = {
        description: 'Expense updated successfully.'
      }

      #swagger.responses[400] = {
        description: 'Expense validation failed.',
        schema: { $ref: '#/definitions/ValidationError' }
      }

      #swagger.responses[404] = {
        description: 'Expense or selected category not found.',
        schema: { $ref: '#/definitions/Error' }
      }

      #swagger.responses[500] = {
        description: 'Server error.',
        schema: { $ref: '#/definitions/Error' }
      }
    */

    return expenseController.updateExpense(req, res, next);
  }
);

router.delete(
  '/:id',
  ...expenseIdRules(),
  validateRequest,
  (req, res, next) => {
    /*
      #swagger.tags = ['Expenses']
      #swagger.summary = 'Delete an expense'

      #swagger.parameters['id'] = {
        in: 'path',
        description: 'MongoDB ObjectId of the expense.',
        required: true,
        type: 'string'
      }

      #swagger.responses[200] = {
        description: 'Expense deleted successfully.'
      }

      #swagger.responses[400] = {
        description: 'Invalid expense ID.',
        schema: { $ref: '#/definitions/ValidationError' }
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

    return expenseController.deleteExpense(req, res, next);
  }
);

module.exports = router;