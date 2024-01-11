const typeDefs = require('./typeDefs');
const productTypeDefs = require('./productTypeDefs');
const resolvers = require('./resolvers');
const productResolvers = require('./productResolvers');

// Combine type definitions
const combinedTypeDefs = [typeDefs, productTypeDefs];

// Combine resolvers
const combinedResolvers = {
  ...resolvers,
  ...productResolvers,
};

module.exports = { combinedTypeDefs, combinedResolvers };
