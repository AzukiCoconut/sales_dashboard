const { AffiliateStats } = require('../models');

const affiliateStatsResolvers = {
  //all Stats and single Stat with id
  Query: {
    affiliateStats: async () => await AffiliateStats.find({}),
    affiliateStat: async (_, { _id }) => await AffiliateStats.findById(_id),
  },
};

module.exports = affiliateStatsResolvers;
