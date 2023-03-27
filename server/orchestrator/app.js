const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const axios = require("axios");

const [userTypeDefs, userResolvers] = require("./schema/UserSchema");
const [movieTypeDefs, movieResolvers] = require("./schema/MovieSchema");
const [genreTypeDefs, genreResolvers] = require("./schema/GenreSchema");

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs: [userTypeDefs, movieTypeDefs, genreTypeDefs],
  resolvers: [userResolvers, movieResolvers, genreResolvers],
  introspection: true,
});

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
startStandaloneServer(server, {
  listen: { port: process.env.PORT || 4000 },
}).then(({ url }) => {
  console.log(`🚀  Server ready at: ${url}`);
});
