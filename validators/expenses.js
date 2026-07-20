const { body, param } = require('express-validator');

function expenseIdRules() {
  return [
    param('id')
      .trim()
      .isMongoId()
      .withMessage('Expense ID must be a valid MongoDB ObjectId.')
  ];
}

function expenseBodyRules() {
  return [
    body('title')
      .exists()
      .withMessage('Expense title is required.')
      .bail()
      .isString()
      .withMessage('Expense title must be text.')
      .bail()
      .trim()
      .isLength({ min: 2, max: 100 })
      .withMessage('Expense title must contain between 2 and 100 characters.'),

    body('amount')
      .exists()
      .withMessage('Expense amount is required.')
      .bail()
      .isFloat({ gt: 0 })
      .withMessage('Amount must be greater than 0.')
      .toFloat(),

    body('categoryId')
      .exists()
      .withMessage('Category ID is required.')
      .bail()
      .isString()
      .withMessage('Category ID must be text.')
      .bail()
      .trim()
      .isMongoId()
      .withMessage('Category ID must be a valid MongoDB ObjectId.'),

    body('paymentMethod')
      .optional()
      .isString()
      .withMessage('Payment method must be text.')
      .bail()
      .trim()
      .isLength({ min: 2, max: 50 })
      .withMessage('Payment method must contain between 2 and 50 characters.'),

    body('expenseDate')
      .exists()
      .withMessage('Expense date is required.')
      .bail()
      .isISO8601({ strict: true })
      .withMessage('Expense date must use a valid ISO date such as 2026-07-20.'),

    body('description')
      .optional()
      .isString()
      .withMessage('Description must be text.')
      .bail()
      .trim()
      .isLength({ max: 500 })
      .withMessage('Description cannot exceed 500 characters.'),

    body('merchant')
      .optional()
      .isString()
      .withMessage('Merchant must be text.')
      .bail()
      .trim()
      .isLength({ max: 100 })
      .withMessage('Merchant cannot exceed 100 characters.'),

    body('isRecurring')
      .optional()
      .isBoolean()
      .withMessage('isRecurring must be true or false.')
      .toBoolean(),

    body('status')
      .optional()
      .isIn(['paid', 'pending', 'cancelled'])
      .withMessage('Status must be paid, pending, or cancelled.')
  ];
}

module.exports = {
  expenseIdRules,
  expenseBodyRules
};