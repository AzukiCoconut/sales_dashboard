import { Schema } from "mongoose";

const dailyDataSchema = new Schema(
  {
    date: {
      type: String,
      required: true
    },
    totalSales: {
      type: Number,
      required: true
    },
    totalUnits: {
      type: Number,
      required: true
    }
  },
  {
    timestamps: true,
    toJSON: { getters },
    id: false
  }
);

module.exports = dailyDataSchema;
