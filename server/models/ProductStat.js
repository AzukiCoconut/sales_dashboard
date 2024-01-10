import { Schema, model } from "mongoose";
const monthlyData = require("./monthlyData.js");
const dailyData = require("./dailyData.js");

const ProductStatSchema = new Schema(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Product"
    },

    yearlySalesTotal: {
      type: Number,
      required: true
    },
    yearlyTotalSoldUnits: {
      type: Number,
      required: true
    },
    year: {
      type: Number,
      required: true
    },
    monthlyData: [monthlyData],
    dailyData: [dailyData]
  },
  { timestamps: true }
);

const ProductStat = model("ProductStat", ProductStatSchema);

module.exports = ProductStat;
