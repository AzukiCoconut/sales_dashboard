import { Schema, model } from "mongoose";

const OverallStatSchema = new Schema(
  {
    totalCustomers: {
      type: Number,
      required: true
    },
    yearlySalesTotal: {
      type: Number,
      required: true
    },
    yearlyTotalUnitsSold: {
      type: Number,
      required: true
    },
    year: {
      type: Number,
      required: true
    },
    monthlyData: [
      {
        month: String,
        totalSales: Number,
        totalUnits: Number
      }
    ],
    dailyData: [
      {
        date: String,
        totalSales: Number,
        totalUnits: Number
      }
    ],
    salesByCateory: {
      type: Map,
      of: Number
    }
  },
  { timestamps: true }
);

const OverallStat = model("OverallStat", OverallStatSchema);
module.exports = OverallStat;
