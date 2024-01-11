const Product = require('../models/Product');

const productResolvers = {
  Query: {
    products: async () => {
      return await Product.find({});
    },
    product: async (_, { id }) => {
      return await Product.findById(id);
    },
  },
  Mutation: {
    addProduct: async (
      _,
      { name, price, description, category, rating, supply }
    ) => {
      const newProduct = new Product({
        name,
        price,
        description,
        category,
        rating,
        supply,
      });
      await newProduct.save();
      return newProduct;
    },

    updateProducts: async (
      _,
      { id, name, price, description, category, rating, supply }
    ) => {
      const updateFields = {};
      if (name) updateFields.name = name;
      if (price) updateFields.price = price;
      if (description) updateFields.description = description;
      if (category) updateFields.category = category;
      if (rating) updateFields.rating = rating;
      if (supply) updateFields.supply = supply;
      const updatedProduct = await Product.findByIdAndUpdate(id, updateFields, {
        new: true,
      });
      return updatedProduct;
    },
    deleteProduct: async (_, { id }) => {
      const deletedProduct = await Product.findByIdAndDelete(id);
      return deletedProduct;
    },
  },
};

module.exports = productResolvers;
