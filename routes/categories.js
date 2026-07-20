const express = require('express');
const categoryController = require('../controllers/categories');

const router = express.Router();

/**
 * Get all categories.
 */
router.get('/', (req, res) => {
  /*
    #swagger.tags = ['Categories']
    #swagger.summary = 'Get all categories'
    #swagger.description = 'Returns every expense category stored in the database.'

    #swagger.responses[200] = {
      description: 'Categories retrieved successfully.',
      schema: [{ $ref: '#/definitions/Category' }]
    }

    #swagger.responses[500] = {
      description: 'Server error.',
      schema: { $ref: '#/definitions/Error' }
    }
  */

  return categoryController.getAllCategories(req, res);
});

/**
 * Get one category by ID.
 */
router.get('/:id', (req, res) => {
  /*
    #swagger.tags = ['Categories']
    #swagger.summary = 'Get a category by ID'
    #swagger.description = 'Returns one expense category using its MongoDB ID.'

    #swagger.parameters['id'] = {
      in: 'path',
      description: 'MongoDB ID of the category.',
      required: true,
      type: 'string'
    }

    #swagger.responses[200] = {
      description: 'Category retrieved successfully.',
      schema: { $ref: '#/definitions/Category' }
    }

    #swagger.responses[400] = {
      description: 'Invalid category ID.',
      schema: { $ref: '#/definitions/Error' }
    }

    #swagger.responses[404] = {
      description: 'Category not found.',
      schema: { $ref: '#/definitions/Error' }
    }

    #swagger.responses[500] = {
      description: 'Server error.',
      schema: { $ref: '#/definitions/Error' }
    }
  */

  return categoryController.getCategoryById(req, res);
});

/**
 * Create a category.
 */
router.post('/', (req, res) => {
  /*
    #swagger.tags = ['Categories']
    #swagger.summary = 'Create a category'
    #swagger.description = 'Creates and saves a new expense category.'

    #swagger.parameters['body'] = {
      in: 'body',
      description: 'Category information.',
      required: true,
      schema: { $ref: '#/definitions/CategoryInput' }
    }

    #swagger.responses[201] = {
      description: 'Category created successfully.',
      schema: {
        message: 'Category created successfully.',
        categoryId: '669f12345678901234567890'
      }
    }

    #swagger.responses[400] = {
      description: 'Required category information is missing.',
      schema: { $ref: '#/definitions/Error' }
    }

    #swagger.responses[500] = {
      description: 'Server error.',
      schema: { $ref: '#/definitions/Error' }
    }
  */

  return categoryController.createCategory(req, res);
});

module.exports = router;