const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TransactionSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },

    amount: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    cost: {
      type: Number,
      required: true,
    },
    products: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Product',
      },
    ],
  },
  { timestamps: true }
);

const Transactions = mongoose.model('Transaction', TransactionSchema);

module.exports = Transactions;
