// Import necessary modules
require("dotenv").config();
const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const path = require("path");
const mongoose = require("mongoose");
const db = require("./config/connection");
const { authMiddleware } = require("./utils/authMiddleware");
// Import GraphQL type definitions and resolvers
const { combinedTypeDefs, combinedResolvers } = require("./schemas");

const PORT = process.env.PORT || 3001;
const app = express();

// Create a new Apollo server and pass combined schema data
const server = new ApolloServer({
  typeDefs: combinedTypeDefs,
  resolvers: combinedResolvers,
  context: async ({ req }) => await authMiddleware({ req }),
  introspection: true,
  persistedQueries: false
});

// start the Apollo Server
async function startApolloServer() {
  await server.start();

  //This code ensures that Express will understand GraphQL requests when it sees them and that it will respond with the correct data.
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  //this middleware to authenticate requests to the GraphQL API
  server.applyMiddleware({ app });

  // Serve static assets
  app.use("/images", express.static(path.join(__dirname, "../client/images")));

  app.use(express.static(path.join(__dirname, "../client/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/dist/index.html"));
  });

  db.once("open", () => {
    app.listen(PORT, () => {
      console.log(`API server running on port http://localhost:${PORT}`);
      console.log(
        `Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`
      );
    });
  });
}

startApolloServer();
