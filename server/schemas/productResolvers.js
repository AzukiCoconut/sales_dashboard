const { Product } = require("../models");

const productResolvers = {
  Query: {
    products: async () => {
      return await Product.find({});
    },
    product: async (_, { _id }) => {
      return await Product.findById(_id);
    }
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
        supply
      });
      await newProduct.save();
      return newProduct;
    },

    updateProducts: async (
      _,
      { _id, name, price, description, category, rating, supply }
    ) => {
      const updateFields = {};
      if (name) updateFields.name = name;
      if (price) updateFields.price = price;
      if (description) updateFields.description = description;
      if (category) updateFields.category = category;
      if (rating) updateFields.rating = rating;
      if (supply) updateFields.supply = supply;
      const updatedProduct = await Product.findByIdAndUpdate(
        _id,
        updateFields,
        {
          new: true
        }
      );
      return updatedProduct;
    },
    deleteProduct: async (_, { _id }) => {
      const deletedProduct = await Product.findByIdAndDelete(_id);
      return deletedProduct;
    }
  }
};

module.exports = productResolvers;
