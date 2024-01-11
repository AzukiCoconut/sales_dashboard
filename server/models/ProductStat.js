import { Schema, model } from "mongoose";

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
    ]
  },
  { timestamps: true }
);

const ProductStat = model("ProductStat", ProductStatSchema);

module.exports = ProductStat;