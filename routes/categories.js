const express = require('express');
const categoryController = require('../controllers/categories');
const validateRequest = require('../middleware/validate');

const {
  categoryIdRules,
  categoryBodyRules
} = require('../validators/categories');

const router = express.Router();

router.get('/', (req, res, next) => {
  /*
    #swagger.tags = ['Categories']
    #swagger.summary = 'Get all categories'
    #swagger.description = 'Returns all expense categories.'

    #swagger.responses[200] = {
      description: 'Categories retrieved successfully.',
      schema: [{ $ref: '#/definitions/Category' }]
    }

    #swagger.responses[500] = {
      description: 'Server error.',
      schema: { $ref: '#/definitions/Error' }
    }
  */

  return categoryController.getAllCategories(req, res, next);
});

router.get(
  '/:id',
  ...categoryIdRules(),
  validateRequest,
  (req, res, next) => {
    /*
      #swagger.tags = ['Categories']
      #swagger.summary = 'Get a category by ID'

      #swagger.parameters['id'] = {
        in: 'path',
        description: 'MongoDB ObjectId of the category.',
        required: true,
        type: 'string'
      }

      #swagger.responses[200] = {
        description: 'Category retrieved successfully.',
        schema: { $ref: '#/definitions/Category' }
      }

      #swagger.responses[400] = {
        description: 'Invalid category ID.',
        schema: { $ref: '#/definitions/ValidationError' }
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

    return categoryController.getCategoryById(req, res, next);
  }
);

router.post(
  '/',
  ...categoryBodyRules(),
  validateRequest,
  (req, res, next) => {
    /*
      #swagger.tags = ['Categories']
      #swagger.summary = 'Create a category'

      #swagger.parameters['body'] = {
        in: 'body',
        description: 'Category information.',
        required: true,
        schema: { $ref: '#/definitions/CategoryInput' }
      }

      #swagger.responses[201] = {
        description: 'Category created successfully.'
      }

      #swagger.responses[400] = {
        description: 'Category validation failed.',
        schema: { $ref: '#/definitions/ValidationError' }
      }

      #swagger.responses[500] = {
        description: 'Server error.',
        schema: { $ref: '#/definitions/Error' }
      }
    */

    return categoryController.createCategory(req, res, next);
  }
);

router.put(
  '/:id',
  ...categoryIdRules(),
  ...categoryBodyRules(),
  validateRequest,
  (req, res, next) => {
    /*
      #swagger.tags = ['Categories']
      #swagger.summary = 'Update a category'
      #swagger.description = 'Updates an existing category using its MongoDB ID.'

      #swagger.parameters['id'] = {
        in: 'path',
        description: 'MongoDB ObjectId of the category.',
        required: true,
        type: 'string'
      }

      #swagger.parameters['body'] = {
        in: 'body',
        description: 'Updated category information.',
        required: true,
        schema: { $ref: '#/definitions/CategoryInput' }
      }

      #swagger.responses[200] = {
        description: 'Category updated successfully.'
      }

      #swagger.responses[400] = {
        description: 'Category validation failed.',
        schema: { $ref: '#/definitions/ValidationError' }
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

    return categoryController.updateCategory(req, res, next);
  }
);

router.delete(
  '/:id',
  ...categoryIdRules(),
  validateRequest,
  (req, res, next) => {
    /*
      #swagger.tags = ['Categories']
      #swagger.summary = 'Delete a category'
      #swagger.description = 'Deletes a category that is not connected to an expense.'

      #swagger.parameters['id'] = {
        in: 'path',
        description: 'MongoDB ObjectId of the category.',
        required: true,
        type: 'string'
      }

      #swagger.responses[200] = {
        description: 'Category deleted successfully.'
      }

      #swagger.responses[400] = {
        description: 'Invalid category ID.',
        schema: { $ref: '#/definitions/ValidationError' }
      }

      #swagger.responses[404] = {
        description: 'Category not found.',
        schema: { $ref: '#/definitions/Error' }
      }

      #swagger.responses[409] = {
        description: 'Category is still being used by an expense.',
        schema: { $ref: '#/definitions/Error' }
      }

      #swagger.responses[500] = {
        description: 'Server error.',
        schema: { $ref: '#/definitions/Error' }
      }
    */

    return categoryController.deleteCategory(req, res, next);
  }
);

module.exports = router;