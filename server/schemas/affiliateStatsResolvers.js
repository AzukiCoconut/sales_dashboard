const AffiliateStat = require("../models");

const affiliateStatsResolvers = {
  //all Stats and single Stat with id
  Query: {
    affiliateStats: async () => await affiliateStats.find({}),
    affiliateStat: async (_, { _id }) => await affiliateStats.findById(_id)
  }
};

module.exports = affiliateStatsResolvers;
