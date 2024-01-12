const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');
const productTypeDefs = require('./productTypeDefs');
const productResolvers = require('./productResolvers');
const productStatResolvers = require('./productStatResolvers');
const productStatTypeDefs = require('./productStatTypeDefs');
const overallStatResolvers = require('./overallStatResolvers');
const overallStatTypeDefs = require('./overallStatTypeDefs');

// Combine type definitions
const combinedTypeDefs = [
  typeDefs,
  productTypeDefs,
  productStatTypeDefs,
  overallStatTypeDefs,
];

// Combine resolvers
const combinedResolvers = {
  ...resolvers,
  ...productResolvers,
  ...productStatResolvers,
  ...overallStatResolvers,
};

module.exports = { combinedTypeDefs, combinedResolvers };
