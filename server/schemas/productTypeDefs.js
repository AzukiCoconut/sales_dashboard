const productTypeDefs = `
  type Product {
    _id: ID!
    name: String!
    price: Float!
    description: String!
    category: String!
    rating: Float!
    supply: Int!

    createdAt: String!
    updatedAt: String!
  }
 type ProductStat {
    _id: ID!
    productId: Product
    yearlySalesTotal: Float!
    yearlyTotalSoldUnits: Int!
    year: Int
    monthlyData: [MonthlyData]
    dailyData: [DailyData]
    createdAt: String!
    updatedAt: String!
  }
  # Define the MonthlyData type
  type MonthlyData {
    _id: ID!
    month: String!
    totalSales: Float!
    totalUnits: Int!
  }
  # Define the DailyData type
  type DailyData {
    _id: ID!
    date: String!
    totalSales: Float!
    totalUnits: Int!
  }

  type Query {
    products: [Product]
    product(id: ID!): Product
    productsWithStats: [ProductStat]
    productStats: [ProductStat]
    productStat(_id: ID!): ProductStat
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
      _id: ID!
      name: String
      price: Float
      description: String
      category: String
      rating: Float
      supply: Int
    ): Product
    deleteProduct(_id: ID!): Product
  }
`;
module.exports = productTypeDefs;
