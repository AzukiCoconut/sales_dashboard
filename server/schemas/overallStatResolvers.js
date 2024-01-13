const { OverallStat } = require('../models');

const overallStatResolvers = {
  //all Stats and single Stat with id
  Query: {
    overallStats: async () => await OverallStat.find({}),
    overallStat: async (_, { _id }) => await OverallStat.findById(_id),
  },
};

module.exports = overallStatResolvers;
