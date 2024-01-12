const { gql } = require('apollo-server-express');

const productStatTypeDefs = gql`
  # Define the ProductStat type
  type ProductStat {
    id: ID!
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
    id: ID!
    month: String!
    totalSales: Float!
    totalUnits: Int!
  }
  # Define the DailyData type
  type DailyData {
    id: ID!
    date: String!
    totalSales: Float!
    totalUnits: Int!
  }

  # Define the Query type
  type Query {
    productStats: [ProductStat]
    productStat(id: ID!): ProductStat
  }
`;

module.exports = productStatTypeDefs;
