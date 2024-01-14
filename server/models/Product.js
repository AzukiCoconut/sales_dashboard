// Importing the Mongoose library for MongoDB schema and model creation
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Creating a new schema for products
const ProductSchema = new Schema(
  {
    // Name of the product, required field
    name: {
      type: String,
      required: true,
    },
    // Price of the product, required field
    price: {
      type: Number,
      required: true,
    },
    // Description of the product, required field
    description: {
      type: String,
      required: true,
    },
    // Category to which the product belongs, required field
    category: {
      type: String,
      required: true,
    },
    // Rating of the product, required field with a default value of 0
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    // Available supply of the product, required field with a default value of 0
    supply: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true } // Adding timestamps for createdAt and updatedAt fields
);

// Creating a Mongoose model for the Product schema
const Product = mongoose.model('Product', ProductSchema);

// Exporting the Product model for use in other parts of the application
module.exports = Product;
