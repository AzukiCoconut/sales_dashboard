const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');
const productTypeDefs = require('./productTypeDefs');
const productResolvers = require('./productResolvers');
const productStatResolvers = require('./productStatResolvers');
const productStatTypeDefs = require('./productStatTypeDefs');
const overallStatResolvers = require('./overallStatResolvers');
const overallStatTypeDefs = require('./overallStatTypeDefs');
const affiliateStatsResolvers = require('./affiliateStatsResolvers');
const affiliateStatsTypeDefs = require('./affiliateStatsTypeDefs');

// Combine type definitions
const combinedTypeDefs = [
  typeDefs,
  productTypeDefs,
  productStatTypeDefs,
  overallStatTypeDefs,
  affiliateStatsTypeDefs,
];

// Combined resolvers.
//Query and Mutation used to combine them into one object, for qury and mutation this is necessary, but for other resolvers it is not!
const combinedResolvers = {
  Query: {
    ...resolvers.Query,
    ...productResolvers.Query,
    ...productStatResolvers.Query,
    ...overallStatResolvers.Query,
    ...affiliateStatsResolvers.Query,
  },
  Mutation: {
    ...resolvers.Mutation,
    ...productResolvers.Mutation,
  },
};

module.exports = { combinedTypeDefs, combinedResolvers };
