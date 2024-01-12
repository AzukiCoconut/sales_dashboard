const { gql } = require('apollo-server-express');

const productStatTypeDefs = gql`
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

  type MonthlyData {
    id: ID!
    month: String!
    totalSales: Float!
    totalUnits: Int!
  }

  type DailyData {
    id: ID!
    date: String!
    totalSales: Float!
    totalUnits: Int!
  }
  type Query {
    productStats: [ProductStat]
    productStat(id: ID!): ProductStat
  }
`;

module.exports = productStatTypeDefs;
