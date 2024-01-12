const affiliateStats = require('../models/affiliateStats');

const affiliateStatsResolvers = {
  //all Stats and single Stat with id
  Query: {
    affiliateStats: async () => await affiliateStats.find({}),
    affiliateStat: async (_, { id }) => await affiliateStats.findById(id),
  },
};

module.exports = affiliateStatsResolvers;
