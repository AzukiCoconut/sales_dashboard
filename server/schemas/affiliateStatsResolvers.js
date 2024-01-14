const { AffiliateStats } = require('../models');
const { Transaction } = require('../models');

const affiliateStatsResolvers = {
  Query: {
    //Fetch all affiliateStats
    affiliateStats: async () => {
      return await AffiliateStats.find({}).populate('affiliateSales');
    },
    affiliateStat: async (_, { _id }) => {
      return await AffiliateStats.findById(_id).populate('affiliateSales');
    },
  },
  // This will be used to create a new affiliateStats
  AffiliateStats: {
    affiliateSales: async (affiliateStat) => {
      return await Transaction.find({
        _id: { $in: affiliateStat.affiliateSales },
      });
    },
  },
};

module.exports = affiliateStatsResolvers;
