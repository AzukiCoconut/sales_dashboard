const typeDefs = `
  type User {
    _id: ID!
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

  type locationFormatted {
    id: String
    value: Int
  }

  type salesPerformance {
    user: User
    sales: [Transaction]
  }
  type Auth {
    token: ID
    user: User
  }

  type NavigationItem {
    text: String
  }

  type Query {
    users: [User]
    user(_id: ID!): User
    customers: [User]
    getGeography: [locationFormatted]
    getAdmins: [User]
    navigationData: [NavigationItem]
    getUserPerformance(_id: ID!): salesPerformance
    me: User
  }

  type Mutation {
    createUser(name: String!, email: String!, password: String!, city: String, state: String, country: String, occupation: String, phoneNumber: String, role: String): Auth
    login(email: String!, password: String!): Auth
    updateUser(_id: ID!, name: String, email: String, password: String): User
  }
`;

module.exports = typeDefs;
