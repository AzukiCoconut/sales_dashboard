const { OverallStat } = require("../models");

const overallStatResolvers = {
  //all Stats and single Stat with id
  Query: {
    overallStats: async () => await overallStat.find({}),
    overallStat: async (_, { _id }) => await overallStat.findById(_id)
  }
};

module.exports = overallStatResolvers;
