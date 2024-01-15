// Importing the Mongoose library for MongoDB schema and model creation
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Creating a new schema for product statistics
const ProductStatSchema = new Schema(
  {
    // Reference to the product for which the statistics are recorded
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Product"
    },

    // Total sales for the product for the entire year, required field
    yearlySalesTotal: {
      type: Number,
      required: true
    },
    // Total units sold for the product for the entire year, required field
    yearlyTotalSoldUnits: {
      type: Number,
      required: true
    },
    // Year for which the statistics are recorded, required field
    year: {
      type: Number
    },
    // Monthly data for the product, an array of objects with month, total sales, and total units
    monthlyData: [
      {
        month: String,
        totalSales: Number,
        totalUnits: Number
      }
    ],
    // Daily data for the product, an array of objects with date, total sales, and total units
    dailyData: [
      {
        date: String,
        totalSales: Number,
        totalUnits: Number
      }
    ]
  },
  { timestamps: true } // Adding timestamps for createdAt and updatedAt fields
);

// Creating a Mongoose model for the ProductStat schema
const ProductStat = mongoose.model("ProductStat", ProductStatSchema);

// Exporting the ProductStat model for use in other parts of the application
module.exports = ProductStat;
