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

// Combine resolvers
const combinedResolvers = {
  ...resolvers,
  ...productResolvers,
  ...productStatResolvers,
  ...overallStatResolvers,
  ...affiliateStatsResolvers,
};

module.exports = { combinedTypeDefs, combinedResolvers };
