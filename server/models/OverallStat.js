const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// SalesByCategory subschema Nested in OverallStatSchema
const SalesByCategorySchema = new Schema({
  category: String,
  totalSales: Number,
  totalUnits: Number,
});

// OverallStatSchema to include the SalesByCategorySchema Primary Schema
const OverallStatSchema = new Schema(
  {
    totalCustomers: {
      type: Number,
      required: true,
    },
    yearlySalesTotal: {
      type: Number,
      required: true,
    },
    yearlyTotalUnitsSold: {
      type: Number,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    monthlyData: [
      {
        month: String,
        totalSales: Number,
        totalUnits: Number,
      },
    ],
    dailyData: [
      {
        date: String,
        totalSales: Number,
        totalUnits: Number,
      },
    ],
    salesByCategory: [SalesByCategorySchema],
  },
  { timestamps: true }
);

const OverallStat = mongoose.model('OverallStat', OverallStatSchema);
module.exports = OverallStat;
