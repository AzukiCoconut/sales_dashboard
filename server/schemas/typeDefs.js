const { gql } = require('apollo-server-express');
const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    password: String!
    city: String
    state: String
    country: String
    occupation: String
    phoneNumber: String
    transactions: [String]
    role: String
    createdAt: String
    updatedAt: String
  }

  type Auth {
    token: String!
    user: User
  }

  type Query {
    users: [User]
    user(id: ID!): User
    me: User
  }

  type Mutation {
    createUser(name: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    updateUser(id: ID!, name: String, email: String, password: String): User
  }
`;

module.exports = typeDefs;
