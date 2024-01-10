import { Schema, model } from "mongoose";

const AffiliateStatSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    affiliateSales: {
      type: [Schema.Types.ObjectId],
      ref: "Transactions"
    }
  },
  { timestamps: true }
);

const AffiliateStats = model("AffiliateStats", AffiliateStatSchema);

module.exports = AffiliateStats;
