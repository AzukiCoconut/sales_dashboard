// Importing various models representing MongoDB collections
const User = require('./User');              // Importing the 'User' model
const ProductStat = require('./ProductStat'); // Importing the 'ProductStat' model
const Product = require('./Product');         // Importing the 'Product' model
const OverallStat = require('./OverallStat'); // Importing the 'OverallStat' model
const AffiliateStats = require('./AffiliateStats'); // Importing the 'AffiliateStats' model
const Transaction = require('./Transaction'); // Importing the 'Transaction' model

// Exporting an object containing all the imported models for easy access
module.exports = {
  User,            // Exporting the 'User' model
  ProductStat,     // Exporting the 'ProductStat' model
  Product,         // Exporting the 'Product' model
  OverallStat,     // Exporting the 'OverallStat' model
  AffiliateStats,  // Exporting the 'AffiliateStats' model
  Transaction,     // Exporting the 'Transaction' model
};
