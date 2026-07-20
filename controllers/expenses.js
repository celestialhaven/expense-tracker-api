const { ObjectId } = require('mongodb');
const mongodb = require('../data/database');

async function getAllExpenses(req, res, next) {
  try {
    const expenses = await mongodb
      .getDb()
      .collection('expenses')
      .find()
      .sort({ expenseDate: -1 })
      .toArray();

    return res.status(200).json(expenses);
  } catch (error) {
    return next(error);
  }
}

async function getExpenseById(req, res, next) {
  try {
    const expenseId = new ObjectId(req.params.id);

    const expense = await mongodb
      .getDb()
      .collection('expenses')
      .findOne({ _id: expenseId });

    if (!expense) {
      return res.status(404).json({
        message: 'Expense not found.'
      });
    }

    return res.status(200).json(expense);
  } catch (error) {
    return next(error);
  }
}

async function createExpense(req, res, next) {
  try {
    const {
      title,
      amount,
      categoryId,
      paymentMethod,
      expenseDate,
      description,
      merchant,
      isRecurring,
      status
    } = req.body;

    const categoryObjectId = new ObjectId(categoryId);

    const category = await mongodb
      .getDb()
      .collection('categories')
      .findOne({ _id: categoryObjectId });

    if (!category) {
      return res.status(404).json({
        message: 'The selected category does not exist.'
      });
    }

    const expense = {
      title,
      amount,
      categoryId: categoryObjectId,
      paymentMethod: paymentMethod || 'Cash',
      expenseDate: new Date(expenseDate),
      description: description || '',
      merchant: merchant || '',
      isRecurring: isRecurring ?? false,
      status: status || 'paid',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const result = await mongodb
      .getDb()
      .collection('expenses')
      .insertOne(expense);

    return res.status(201).json({
      message: 'Expense created successfully.',
      expenseId: result.insertedId
    });
  } catch (error) {
    return next(error);
  }
}

async function updateExpense(req, res, next) {
  try {
    const expenseId = new ObjectId(req.params.id);

    const {
      title,
      amount,
      categoryId,
      paymentMethod,
      expenseDate,
      description,
      merchant,
      isRecurring,
      status
    } = req.body;

    const categoryObjectId = new ObjectId(categoryId);

    const category = await mongodb
      .getDb()
      .collection('categories')
      .findOne({ _id: categoryObjectId });

    if (!category) {
      return res.status(404).json({
        message: 'The selected category does not exist.'
      });
    }

    const updatedExpense = {
      title,
      amount,
      categoryId: categoryObjectId,
      paymentMethod: paymentMethod || 'Cash',
      expenseDate: new Date(expenseDate),
      description: description || '',
      merchant: merchant || '',
      isRecurring: isRecurring ?? false,
      status: status || 'paid',
      updatedAt: new Date()
    };

    const result = await mongodb
      .getDb()
      .collection('expenses')
      .updateOne(
        { _id: expenseId },
        { $set: updatedExpense }
      );

    if (result.matchedCount === 0) {
      return res.status(404).json({
        message: 'Expense not found.'
      });
    }

    return res.status(200).json({
      message: 'Expense updated successfully.',
      expenseId,
      modifiedCount: result.modifiedCount
    });
  } catch (error) {
    return next(error);
  }
}

async function deleteExpense(req, res, next) {
  try {
    const expenseId = new ObjectId(req.params.id);

    const result = await mongodb
      .getDb()
      .collection('expenses')
      .deleteOne({ _id: expenseId });

    if (result.deletedCount === 0) {
      return res.status(404).json({
        message: 'Expense not found.'
      });
    }

    return res.status(200).json({
      message: 'Expense deleted successfully.',
      expenseId
    });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  getAllExpenses,
  getExpenseById,
  createExpense,
  updateExpense,
  deleteExpense
};