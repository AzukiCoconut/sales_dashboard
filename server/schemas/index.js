const typeDefs = require('./typeDefs');
const productTypeDefs = require('./productTypeDefs');
const resolvers = require('./resolvers');
const productResolvers = require('./productResolvers');
const productStatResolvers = require('./productStatResolvers');
const productStatTypeDefs = require('./productStatTypeDefs');

// Combine type definitions
const combinedTypeDefs = [typeDefs, productTypeDefs, productStatTypeDefs];

// Combine resolvers
const combinedResolvers = {
  ...resolvers,
  ...productResolvers,
  ...productStatResolvers,
};

module.exports = { combinedTypeDefs, combinedResolvers };
