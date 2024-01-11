const { gql } = require('apollo-server-express');

const productTypeDefs = gql`
  type Product {
    id: ID!
    name: String!
    price: Float!
    description: String!
    category: String!
    rating: Float!
    supply: Int!
    createdAt: String!
    updatedAt: String!
  }

  type Query {
    products: [Product]
    product(id: ID!): Product
  }

  type Mutation {
    addProduct(
      name: String!
      price: Float!
      description: String!
      category: String!
      rating: Float!
      supply: Int!
    ): Product
    updateProducts(
      id: ID!
      name: String
      price: Float
      description: String
      category: String
      rating: Float
      supply: Int
    ): Product
    deleteProduct(id: ID!): Product
  }
`;
module.exports = productTypeDefs;
