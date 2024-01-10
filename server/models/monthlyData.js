import { Schema } from "mongoose";

const monthlyDataSchema = new Schema(
  {
    month: {
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
    toJSON: {
      getters: true
    },
    id: false
  }
);

module.exports = monthlyDataSchema;
