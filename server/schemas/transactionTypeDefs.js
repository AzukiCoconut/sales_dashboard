const transactionTypeDefs = `
  type Transaction {
    _id: ID!
    userId: String
    cost: Float
    amount: Float
    date: String
    products: [Product]
    createdAt: String
    updatedAt: String
  }

  type Query {
    transactions: [Transaction]
    transaction(_id: ID!): Transaction
  }
`;

module.exports = transactionTypeDefs;
