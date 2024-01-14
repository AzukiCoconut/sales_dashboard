const { Transaction, Product } = require('../models');

const transactionResolvers = {
  Query: {
    //Fetch all transactions and populate products field
    transactions: async () => {
      return await Transaction.find({});
    },
    transaction: async (_, { id }) => {
      return await Transaction.findById(id);
    },
  },
  // This will be used to create a new transaction
  Transaction: {
    products: async (transaction) => {
      const populatedProducts = await Product.find({
        _id: { $in: transaction.products },
      });
      // Handle null or incomplete products
      return populatedProducts.map(
        (product) => product || { _id: null, name: null }
      );
    },
  },
};

module.exports = transactionResolvers;
