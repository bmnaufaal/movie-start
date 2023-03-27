const axios = require("axios");
const redis = require("../config/redis");

const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.

  type User {
    _id: String
    id: ID  
    username: String
    email: String
    password: String
    role: String
    phoneNumber: String
    address: String
  }

  type SuccessMutation {
    message: String
  }

  input addUserInput {
    username: String, 
    email: String,  
    password: String, 
    phoneNumber: String, 
    address: String
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    users: [User]
    userDetail(id: ID!): User
  }

  type Mutation {
    addUser(input: addUserInput) : SuccessMutation
    deleteUser(id: String) : SuccessMutation
  }

`;

const resolvers = {
  Query: {
    users: async () => {
      try {
        const userCache = await redis.get("app:users");
        if (userCache) {
          console.log(JSON.parse(userCache));
          res.json(JSON.parse(userCache));
        } else {
          const { data: usersData } = await axios({
            method: "GET",
            url: "http://localhost:4001/users",
          });
          await redis.set("app:users", JSON.stringify(usersData.data));
          return usersData.data;
        }
      } catch (error) {
        throw error;
      }
    },
    userDetail: async (_, args) => {
      try {
        const { id } = args;
        const { data: userData } = await axios({
          method: "GET",
          url: "http://localhost:4001/users/" + id,
        });
        return userData.data;
      } catch (error) {
        throw error;
      }
    },
  },
  Mutation: {
    addUser: async (_, args) => {
      try {
        const { input } = args;
        const { data } = await axios({
          method: "POST",
          url: "http://localhost:4001/users/create",
          data: input,
        });
        await redis.del("app:users");
        return data;
      } catch (error) {
        throw error;
      }
    },

    deleteUser: async (_, args) => {
      try {
        const { id } = args;
        const { data } = await axios({
          method: "DELETE",
          url: "http://localhost:4001/users/" + id,
        });
        await redis.del("app:users");
        return data;
      } catch (error) {
        throw error;
      }
    },
  },
};

module.exports = [typeDefs, resolvers];
