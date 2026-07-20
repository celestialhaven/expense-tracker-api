const { ObjectId } = require('mongodb');
const mongodb = require('../data/database');

async function getAllCategories(req, res, next) {
  try {
    const categories = await mongodb
      .getDb()
      .collection('categories')
      .find()
      .sort({ name: 1 })
      .toArray();

    return res.status(200).json(categories);
  } catch (error) {
    return next(error);
  }
}

async function getCategoryById(req, res, next) {
  try {
    const categoryId = new ObjectId(req.params.id);

    const category = await mongodb
      .getDb()
      .collection('categories')
      .findOne({ _id: categoryId });

    if (!category) {
      return res.status(404).json({
        message: 'Category not found.'
      });
    }

    return res.status(200).json(category);
  } catch (error) {
    return next(error);
  }
}

async function createCategory(req, res, next) {
  try {
    const {
      name,
      description,
      monthlyBudget,
      isActive
    } = req.body;

    const category = {
      name,
      description: description || '',
      monthlyBudget,
      isActive: isActive ?? true,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const result = await mongodb
      .getDb()
      .collection('categories')
      .insertOne(category);

    return res.status(201).json({
      message: 'Category created successfully.',
      categoryId: result.insertedId
    });
  } catch (error) {
    return next(error);
  }
}

async function updateCategory(req, res, next) {
  try {
    const categoryId = new ObjectId(req.params.id);

    const {
      name,
      description,
      monthlyBudget,
      isActive
    } = req.body;

    const updatedCategory = {
      name,
      description: description || '',
      monthlyBudget,
      isActive: isActive ?? true,
      updatedAt: new Date()
    };

    const result = await mongodb
      .getDb()
      .collection('categories')
      .updateOne(
        { _id: categoryId },
        { $set: updatedCategory }
      );

    if (result.matchedCount === 0) {
      return res.status(404).json({
        message: 'Category not found.'
      });
    }

    return res.status(200).json({
      message: 'Category updated successfully.',
      categoryId,
      modifiedCount: result.modifiedCount
    });
  } catch (error) {
    return next(error);
  }
}

async function deleteCategory(req, res, next) {
  try {
    const categoryId = new ObjectId(req.params.id);

    const category = await mongodb
      .getDb()
      .collection('categories')
      .findOne({ _id: categoryId });

    if (!category) {
      return res.status(404).json({
        message: 'Category not found.'
      });
    }

    // Prevent deleting a category that is still being used.
    const linkedExpense = await mongodb
      .getDb()
      .collection('expenses')
      .findOne({ categoryId });

    if (linkedExpense) {
      return res.status(409).json({
        message:
          'This category cannot be deleted because one or more expenses are using it. Delete or update those expenses first.'
      });
    }

    const result = await mongodb
      .getDb()
      .collection('categories')
      .deleteOne({ _id: categoryId });

    if (result.deletedCount === 0) {
      return res.status(404).json({
        message: 'Category not found.'
      });
    }

    return res.status(200).json({
      message: 'Category deleted successfully.',
      categoryId
    });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory
};