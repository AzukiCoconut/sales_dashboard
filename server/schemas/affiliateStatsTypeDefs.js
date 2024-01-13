const affiliateStatTypeDefs = `
  type AffiliateStats {
    _id: ID!
    userId: ID!
    affiliateSales: [Transactions]
  }

  type Transactions {
    _id: ID!
    amount: Float
    date: String
  }

  type Query {
    affiliateStats: [AffiliateStats]
    affiliateStat(_id: ID!): AffiliateStats
  }
`;

module.exports = affiliateStatTypeDefs;
