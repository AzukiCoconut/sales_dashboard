import { Schema, model } from "mongoose";

const TransactionSchema = new Schema(
  {
    userId: {
      type: String,
      required: true
    },
    cost: {
      type: Number,
      required: true
    },
    products: [
      {
        type: Schema.Types.ObjectId,
        ref: "Product"
      }
    ]
  },
  { timestamps: true }
);

const Transactions = model("Transactions", TransactionSchema);

module.exports = Transactions;
