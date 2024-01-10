import { Schema, model } from "mongoose";

const ProductSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    category: {
      type: String,
      required: true
    },
    rating: {
      type: Number,
      required: true,
      default: 0
    },
    supply: {
      type: Number,
      required: true,
      default: 0
    }
  },
  { timestamps: true }
);

const Product = model("Product", ProductSchema);

module.exports = Product;
