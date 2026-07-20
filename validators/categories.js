const { body, param } = require('express-validator');

function categoryIdRules() {
  return [
    param('id')
      .trim()
      .isMongoId()
      .withMessage('Category ID must be a valid MongoDB ObjectId.')
  ];
}

function categoryBodyRules() {
  return [
    body('name')
      .exists()
      .withMessage('Category name is required.')
      .bail()
      .isString()
      .withMessage('Category name must be text.')
      .bail()
      .trim()
      .isLength({ min: 2, max: 50 })
      .withMessage('Category name must contain between 2 and 50 characters.'),

    body('description')
      .optional()
      .isString()
      .withMessage('Description must be text.')
      .bail()
      .trim()
      .isLength({ max: 250 })
      .withMessage('Description cannot exceed 250 characters.'),

    body('monthlyBudget')
      .exists()
      .withMessage('Monthly budget is required.')
      .bail()
      .isFloat({ min: 0 })
      .withMessage('Monthly budget must be a number equal to or greater than 0.')
      .toFloat(),

    body('isActive')
      .optional()
      .isBoolean()
      .withMessage('isActive must be true or false.')
      .toBoolean()
  ];
}

module.exports = {
  categoryIdRules,
  categoryBodyRules
};