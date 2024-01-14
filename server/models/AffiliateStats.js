// Import the mongoose library for MongoDB schema creation
const mongoose = require('mongoose');

// Destructure the Schema object from mongoose
const { Schema } = mongoose;

// Define a new Mongoose schema for AffiliateStats
const AffiliateStatSchema = new Schema(
  {
    // Define a field for the userId, referencing the 'User' model
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User', // Reference to the 'User' model
    },
    // Define a field for affiliateSales, which is an array of Transaction ObjectId references
    affiliateSales: {
      type: [Schema.Types.ObjectId],
      ref: 'Transaction', // Reference to the 'Transaction' model
    },
  },
  { timestamps: true } // Include timestamps for createdAt and updatedAt
);

// Create a Mongoose model named 'AffiliateStats' using the defined schema
const AffiliateStats = mongoose.model('AffiliateStats', AffiliateStatSchema);

// Export the AffiliateStats model for use in other parts of the application
module.exports = AffiliateStats;
