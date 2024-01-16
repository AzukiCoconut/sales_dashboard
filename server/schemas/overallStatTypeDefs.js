const overallStatTypeDefs = `
type OverallStat {
  _id: ID!
  totalCustomers: Int
  yearlySalesTotal: Float
  yearlyTotalSoldUnits: Float
  year: Int
  monthlyData: [MonthlyData]
  dailyData: [DailyData]
  createdAt: String!
  updatedAt: String!
}

type MonthlyData {
  _id: ID!
  month: String
  totalSales: Float
  totalUnits: Int
}

type DailyData {
  _id: ID!
  date: String
  totalSales: Float
  totalUnits: Int
}

type dashboardStats {
  totalCustomers: Int
  yearlyTotalSoldUnits: Int
  yearlySalesTotal: Int
  monthlyData: [MonthlyData]
  dailyData: [DailyData]
  thisMonthStats: MonthlyData
  todayStats: DailyData
  transactions: [Transaction]
}
type Query {
  overallStats: [OverallStat]
  overallStat(_id: ID!): OverallStat
  getDashboardStats: dashboardStats
}
`;

module.exports = overallStatTypeDefs;
