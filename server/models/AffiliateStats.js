const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const model = mongoose.model;

const AffiliateStatSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    affiliateSales: {
      type: [Schema.Types.ObjectId],
      ref: 'Transactions',
    },
  },
  { timestamps: true }
);

const AffiliateStats = model('AffiliateStats', AffiliateStatSchema);

module.exports = AffiliateStats;
