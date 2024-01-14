const productStatTypeDefs = `
  # Define the ProductStat type
  type ProductStat {
    _id: ID!
    productId: ID!
    yearlySalesTotal: Float!
    yearlyTotalSoldUnits: Int!
    year: Int!
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

  # Define the Query type
  type Query {
    productStats: [ProductStat]
    productStat(_id: ID!): ProductStat
  }
`;

module.exports = productStatTypeDefs;
