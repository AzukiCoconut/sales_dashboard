const { OverallStat, Transaction } = require("../models");

const overallStatResolvers = {
  //all Stats and single Stat with id
  Query: {
    overallStats: async () => await OverallStat.find({}),
    overallStat: async (_, { _id }) => await OverallStat.findById(_id),
    getDashboardStats: async () => {
      const currentMonth = "November";
      const currentYear = "2021";
      const currentDay = "2021-11-15";

      const transactions = await Transaction.find();

      const overallStat = await OverallStat.find({ year: currentYear });

      const {
        totalCustomers,
        yearlyTotalSoldUnits,
        yearlySalesTotal,
        monthlyData
      } = overallStat[0];

      const thisMonthStats = overallStat[0].monthlyData.find(({ month }) => {
        return month === currentMonth;
      });

      const todayStats = overallStat[0].dailyData.find(({ date }) => {
        return date === currentDay;
      });

      const dashboardStats = {
        totalCustomers: totalCustomers,
        yearlyTotalSoldUnits: yearlyTotalSoldUnits,
        yearlySalesTotal: yearlySalesTotal,
        monthlyData: monthlyData,
        thisMonthStats: thisMonthStats,
        todayStats: todayStats,
        transactions
      };

      return dashboardStats;
    }
  }
};

module.exports = overallStatResolvers;
