const { MongoClient } = require('mongodb');

let database;
let client;

async function initDb() {
  if (database) {
    return database;
  }

  if (!process.env.MONGODB_URI) {
    throw new Error('MONGODB_URI is missing from the .env file.');
  }

  client = new MongoClient(process.env.MONGODB_URI);

  await client.connect();

  database = client.db(process.env.DB_NAME || 'expense_tracker');

  console.log('Connected successfully to MongoDB.');

  return database;
}

function getDb() {
  if (!database) {
    throw new Error('MongoDB has not been initialized.');
  }

  return database;
}

module.exports = {
  initDb,
  getDb
};