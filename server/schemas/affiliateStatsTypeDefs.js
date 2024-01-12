const { gql } = require('apollo-server-express');

const affiliateStatTypeDefs = gql`
  type AffiliateStats {
    id: ID!
    userId: ID!
    affiliateSales: [Transactions]
  }

  type Transactions {
    id: ID!
    amount: Float
    date: String
  }

  type Query {
    affiliateStats: [AffiliateStats]
    affiliateStat(id: ID!): AffiliateStats
  }
`;

module.exports = affiliateStatTypeDefs;
