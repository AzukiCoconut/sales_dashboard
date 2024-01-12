const { gql } = require('apollo-server-express');

const overallStatTypeDefs = gql`
  type OverallStat {
    id: ID!
    totalCustomers: Int!
    yearlySalesTotal: Float!
    yearlyTotalUnitsSold: Int!
    year: Int!
    monthlyData: [MonthlyData]
    dailyData: [DailyData]
    salesByCategory: [SalesByCategory]
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

  type SalesByCategory {
    id: ID!
    category: String!
    totalSales: Float!
    totalUnits: Int!
  }

  type Query {
    overallStats: [OverallStat]
    overallStat(id: ID!): OverallStat
  }
`;

module.exports = overallStatTypeDefs;
