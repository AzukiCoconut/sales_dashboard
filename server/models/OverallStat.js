import { Schema, model } from "mongoose";
const monthlyData = require("./monthlyData.js");
const dailyData = require("./dailyData.js");

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
    monthlyData: [monthlyData],
    dailyData: [dailyData],
    salesByCateory: {
      type: Map,
      of: Number
    }
  },
  { timestamps: true }
);

const OverallStat = model("OverallStat", OverallStatSchema);
module.exports = OverallStat;
