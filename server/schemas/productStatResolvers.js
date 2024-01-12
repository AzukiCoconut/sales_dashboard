const ProductStat = require('../models/ProductStat');

const productStatResolvers = {
  //all Stats and single Stat with id
  Query: {
    productStats: async () => await ProductStat.find({}),
    productStat: async (_, { id }) => await ProductStat.findById(id),
  },
};

module.exports = productStatResolvers;
