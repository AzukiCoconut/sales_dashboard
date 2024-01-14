// Importing the Mongoose library for MongoDB schema and model creation
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// SalesByCategory subschema Nested in OverallStatSchema
const SalesByCategorySchema = new Schema({
  category: String,
  totalSales: Number,
  totalUnits: Number,
});

// OverallStatSchema to include the SalesByCategorySchema Primary Schema

// Creating a new schema for overall statistics

const OverallStatSchema = new Schema(
  {
    // Total number of customers
    totalCustomers: {
      type: Number,
      required: true,
    },
    // Total sales for the entire year
    yearlySalesTotal: {
      type: Number,
      required: true,
    },
    // Total units sold for the entire year
    yearlyTotalUnitsSold: {
      type: Number,
      required: true,
    },
    // Year for which the statistics are recorded
    year: {
      type: Number,
      required: true,
    },
    // Monthly data, an array of objects containing month-wise sales and units data
    monthlyData: [
      {
        month: String,
        totalSales: Number,
        totalUnits: Number,
      },
    ],
    // Daily data, an array of objects containing date-wise sales and units data
    dailyData: [
      {
        date: String,
        totalSales: Number,
        totalUnits: Number,
      },
    ],
    salesByCategory: [SalesByCategorySchema],
  },
  { timestamps: true } // Adding timestamps for createdAt and updatedAt fields
);

// Creating a Mongoose model for the OverallStat schema
const OverallStat = mongoose.model('OverallStat', OverallStatSchema);

// Exporting the OverallStat model for use in other parts of the application
module.exports = OverallStat;
