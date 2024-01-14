const overallStatTypeDefs = `
type OverallStat {
  _id: ID!
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
  _id: ID
  month: String
  totalSales: Float
  totalUnits: Int
}

type DailyData {
  _id: ID
  date: String
  totalSales: Float
  totalUnits: Int
}

type SalesByCategory {
  _id: ID
  category: String
  totalSales: Float
  totalUnits: Int
}

type Query {
  overallStats: [OverallStat]
  overallStat(_id: ID!): OverallStat
}
`;

module.exports = overallStatTypeDefs;
