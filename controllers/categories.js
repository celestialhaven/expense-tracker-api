const { ObjectId } = require('mongodb');
const mongodb = require('../data/database');

/**
 * Get all categories.
 */
async function getAllCategories(req, res) {
  try {
    const categories = await mongodb
      .getDb()
      .collection('categories')
      .find()
      .toArray();

    res.status(200).json(categories);
  } catch (error) {
    console.error('Error retrieving categories:', error);

    res.status(500).json({
      message: 'An error occurred while retrieving categories.'
    });
  }
}

/**
 * Get one category using its MongoDB ID.
 */
async function getCategoryById(req, res) {
  try {
    const categoryId = req.params.id;

    if (!ObjectId.isValid(categoryId)) {
      return res.status(400).json({
        message: 'Invalid category ID.'
      });
    }

    const category = await mongodb
      .getDb()
      .collection('categories')
      .findOne({
        _id: new ObjectId(categoryId)
      });

    if (!category) {
      return res.status(404).json({
        message: 'Category not found.'
      });
    }

    res.status(200).json(category);
  } catch (error) {
    console.error('Error retrieving category:', error);

    res.status(500).json({
      message: 'An error occurred while retrieving the category.'
    });
  }
}

/**
 * Create a new category.
 */
async function createCategory(req, res) {
  try {
    const {
      name,
      description,
      monthlyBudget,
      isActive
    } = req.body;

    if (!name || monthlyBudget === undefined) {
      return res.status(400).json({
        message: 'Name and monthlyBudget are required.'
      });
    }

    const category = {
      name: name.trim(),
      description: description || '',
      monthlyBudget: Number(monthlyBudget),
      isActive: isActive ?? true,
      createdAt: new Date()
    };

    const result = await mongodb
      .getDb()
      .collection('categories')
      .insertOne(category);

    res.status(201).json({
      message: 'Category created successfully.',
      categoryId: result.insertedId
    });
  } catch (error) {
    console.error('Error creating category:', error);

    res.status(500).json({
      message: 'An error occurred while creating the category.'
    });
  }
}

module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory
};