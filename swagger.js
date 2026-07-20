const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    version: '1.0.0',
    title: 'Expense Tracker API',
    description:
      'A REST API for managing personal expenses and expense categories.'
  },


  basePath: '/',


  consumes: ['application/json'],
  produces: ['application/json'],

  tags: [
    {
      name: 'Categories',
      description: 'Operations for managing expense categories.'
    },
    {
      name: 'Expenses',
      description: 'Operations for managing expense records.'
    }
  ],

  definitions: {
    CategoryInput: {
      name: 'Utilities',
      description: 'Electricity, water, internet, and phone bills',
      monthlyBudget: 5000,
      isActive: true
    },

    Category: {
      _id: '669f12345678901234567890',
      name: 'Utilities',
      description: 'Electricity, water, internet, and phone bills',
      monthlyBudget: 5000,
      isActive: true,
      createdAt: '2026-07-20T10:00:00.000Z'
    },

    ExpenseInput: {
      title: 'Electricity Bill',
      amount: 2800,
      categoryId: '669f12345678901234567890',
      paymentMethod: 'GCash',
      expenseDate: '2026-07-20',
      description: 'Monthly electricity payment',
      merchant: 'Electric Cooperative',
      isRecurring: true,
      status: 'paid'
    },

    Expense: {
      _id: '669f98765432109876543210',
      title: 'Electricity Bill',
      amount: 2800,
      categoryId: '669f12345678901234567890',
      paymentMethod: 'GCash',
      expenseDate: '2026-07-20T00:00:00.000Z',
      description: 'Monthly electricity payment',
      merchant: 'Electric Cooperative',
      isRecurring: true,
      status: 'paid',
      createdAt: '2026-07-20T10:00:00.000Z'
    },

    Error: {
      message: 'An error occurred while processing the request.'
    }
  }
};

const outputFile = './swagger-output.json';

// Use the root route file so swagger-autogen can discover the subroutes.
const routes = ['./routes/index.js'];

swaggerAutogen(outputFile, routes, doc)
  .then(() => {
    console.log('Swagger documentation generated successfully.');
  })
  .catch((error) => {
    console.error('Failed to generate Swagger documentation:', error);
    process.exit(1);
  });