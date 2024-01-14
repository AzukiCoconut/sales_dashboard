// Importing the Mongoose library for MongoDB schema and model creation
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Creating a new schema for transactions
const TransactionSchema = new Schema(
  {
    // User ID associated with the transaction, required field
    userId: {
      type: String,
      required: true,
    },
    // Amount of the transaction, required field
    amount: {
      type: Number,
      required: true,
    },
    // Date of the transaction, required field
    date: {
      type: Date,
      required: true,
    },
    // Cost of the transaction, required field
    cost: {
      type: Number,
      required: true,
    },
    // Products associated with the transaction, an array of product IDs referencing the 'Product' model
    products: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Product',
      },
    ],
  },
  { timestamps: true } // Adding timestamps for createdAt and updatedAt fields
);

// Creating a Mongoose model for the Transaction schema
const Transactions = mongoose.model('Transaction', TransactionSchema);

// Exporting the Transactions model for use in other parts of the application
module.exports = Transactions;
