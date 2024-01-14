const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AffiliateStatSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    affiliateSales: {
      type: [Schema.Types.ObjectId],
      ref: 'Transaction',
    },
  },
  { timestamps: true }
);

const AffiliateStats = mongoose.model('AffiliateStats', AffiliateStatSchema);

module.exports = AffiliateStats;
