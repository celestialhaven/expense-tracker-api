const { ObjectId } = require('mongodb');
const mongodb = require('../data/database');

/**
 * Get all expense records.
 */
async function getAllExpenses(req, res) {
  try {
    const expenses = await mongodb
      .getDb()
      .collection('expenses')
      .find()
      .toArray();

    res.status(200).json(expenses);
  } catch (error) {
    console.error('Error retrieving expenses:', error);

    res.status(500).json({
      message: 'An error occurred while retrieving expenses.'
    });
  }
}

/**
 * Get one expense using its MongoDB ID.
 */
async function getExpenseById(req, res) {
  try {
    const expenseId = req.params.id;

    if (!ObjectId.isValid(expenseId)) {
      return res.status(400).json({
        message: 'Invalid expense ID.'
      });
    }

    const expense = await mongodb
      .getDb()
      .collection('expenses')
      .findOne({
        _id: new ObjectId(expenseId)
      });

    if (!expense) {
      return res.status(404).json({
        message: 'Expense not found.'
      });
    }

    res.status(200).json(expense);
  } catch (error) {
    console.error('Error retrieving expense:', error);

    res.status(500).json({
      message: 'An error occurred while retrieving the expense.'
    });
  }
}

/**
 * Create a new expense.
 */
async function createExpense(req, res) {
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

    if (!title || amount === undefined || !categoryId || !expenseDate) {
      return res.status(400).json({
        message:
          'Title, amount, categoryId, and expenseDate are required.'
      });
    }

    if (!ObjectId.isValid(categoryId)) {
      return res.status(400).json({
        message: 'The categoryId must be a valid MongoDB ID.'
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
        message: 'The selected category does not exist.'
      });
    }

    const expense = {
      title: title.trim(),
      amount: Number(amount),
      categoryId: new ObjectId(categoryId),
      paymentMethod: paymentMethod || 'Cash',
      expenseDate: new Date(expenseDate),
      description: description || '',
      merchant: merchant || '',
      isRecurring: isRecurring ?? false,
      status: status || 'paid',
      createdAt: new Date()
    };

    const result = await mongodb
      .getDb()
      .collection('expenses')
      .insertOne(expense);

    res.status(201).json({
      message: 'Expense created successfully.',
      expenseId: result.insertedId
    });
  } catch (error) {
    console.error('Error creating expense:', error);

    res.status(500).json({
      message: 'An error occurred while creating the expense.'
    });
  }
}

module.exports = {
  getAllExpenses,
  getExpenseById,
  createExpense
};