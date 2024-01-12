const overallStat = require('../models/OverallStat');

const overallStatResolvers = {
  //all Stats and single Stat with id
  Query: {
    overallStats: async () => await overallStat.find({}),
    overallStat: async (_, { id }) => await overallStat.findById(id),
  },
};

module.exports = overallStatResolvers;
