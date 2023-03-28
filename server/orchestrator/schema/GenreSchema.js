const axios = require("axios");
const redis = require("../config/redis");

const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.

  type Genre {
    id: ID
    name: String
  }

  type SuccessMutation {
    message: String
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    genres: [Genre]
    genreDetail(id: ID!): Genre
  }

  type Mutation {
    addGenre(name: String) : SuccessMutation
    editGenre(id: ID, name: String) : SuccessMutation
    deleteGenre(id: ID) : SuccessMutation
  }
`;

const resolvers = {
  Query: {
    genres: async () => {
      try {
        const genreCache = await redis.get("app:genres_graphql");
        if (genreCache) {
          console.log(JSON.parse(genreCache));
          return (JSON.parse(genreCache));
        } else {
          const { data: genresData } = await axios({
            method: "GET",
            url: process.env.APP_SERVICE_URL + "/genres",
          });
          await redis.set("app:genres_graphql", JSON.stringify(genresData));
          return genresData;
        }
      } catch (error) {
        throw error;
      }
    },
    genreDetail: async (_, args) => {
      try {
        console.log("genre detail by id");
        const { id } = args;
        const { data: genreData } = await axios({
          method: "GET",
          url: process.env.APP_SERVICE_URL + "/genres/" + id,
        });
        return genreData;
      } catch (error) {
        throw error;
      }
    },
  },
  Mutation: {
    addGenre: async (_, args) => {
      try {
        const { name } = args;
        const { data } = await axios({
          method: "POST",
          url: process.env.APP_SERVICE_URL + "/genres/add",
          data: {
            name: name,
          },
        });
        console.log(data);
        await redis.del("app:genres_graphql");
        return data;
      } catch (error) {
        throw error;
      }
    },

    editGenre: async (_, args) => {
      try {
        const { name, id } = args;
        const { data } = await axios({
          method: "PUT",
          url: process.env.APP_SERVICE_URL + "/genres/" + id,
          data: {
            name: name,
          },
        });
        console.log(data);
        await redis.del("app:genres_graphql");
        return data;
      } catch (error) {
        throw error;
      }
    },

    deleteGenre: async (_, args) => {
      try {
        const { id } = args;
        const { data } = await axios({
          method: "DELETE",
          url: process.env.APP_SERVICE_URL + "/genres/" + id,
        });
        await redis.del("app:genres_graphql");
        return data;
      } catch (error) {
        throw error;
      }
    },
  },
};

module.exports = [typeDefs, resolvers];
