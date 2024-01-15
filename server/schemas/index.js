const typeDefs = require("./typeDefs");
const resolvers = require("./resolvers");
const productTypeDefs = require("./productTypeDefs");
const productResolvers = require("./productResolvers");
const overallStatResolvers = require("./overallStatResolvers");
const overallStatTypeDefs = require("./overallStatTypeDefs");
const affiliateStatsResolvers = require("./affiliateStatsResolvers");
const affiliateStatsTypeDefs = require("./affiliateStatsTypeDefs");
const transactionResolvers = require("./transactionResolvers");
const transactionTypeDefs = require("./transactionTypeDefs");

// Combine type definitions
const combinedTypeDefs = [
  typeDefs,
  productTypeDefs,
  overallStatTypeDefs,
  affiliateStatsTypeDefs,
  transactionTypeDefs
];

// Combined resolvers.
//Query and Mutation, Transaction, AffiliateStats used to combine them into one object, for qury and mutation this is necessary, but for other resolvers it is not!
const combinedResolvers = {
  Query: {
    ...resolvers.Query,
    ...productResolvers.Query,
    ...overallStatResolvers.Query,
    ...affiliateStatsResolvers.Query,
    ...transactionResolvers.Query
  },
  Mutation: {
    ...resolvers.Mutation,
    ...productResolvers.Mutation
  },
  Transaction: {
    ...transactionResolvers.Transaction
  },
  AffiliateStats: {
    ...affiliateStatsResolvers.AffiliateStats
  }
};

module.exports = { combinedTypeDefs, combinedResolvers };
