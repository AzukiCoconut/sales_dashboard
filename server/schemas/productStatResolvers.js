const { ProductStat } = require("../models");

const productStatResolvers = {
  //all Stats and single Stat with id
  Query: {
    productStats: async () => await ProductStat.find({}),
    productStat: async (_, { _id }) => await ProductStat.findById(_id)
  }
};

module.exports = productStatResolvers;
