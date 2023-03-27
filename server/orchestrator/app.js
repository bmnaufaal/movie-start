const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const axios = require("axios");

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

  type Genre {
    id: ID
    name: String
  }

  type Movie {
    id: ID
    title: String
    slug: String
    synopsis: String
    trailerUrl: String
    imgUrl: String
    rating: Int
    genreId: Int
    userMongoId: String
    authors: User
    genre: Genre
    casts: [Cast]
  }

  type Cast {
    id: ID
    movieId: Int
    name: String
    profilePict: String
  }

  type SuccessMutation {
    message: String
  }

  input addMovieInput {
    title: String, 
    synopsis: String, 
    trailerUrl: String, 
    imgUrl: String, 
    rating: Int, 
    genreId: Int, 
    castsName: [String],
    castsPicture: [String],
    castsId: [Int],
    authorId: String
  }

  input editMovieInput {
    title: String, 
    synopsis: String, 
    trailerUrl: String, 
    imgUrl: String, 
    rating: Int, 
    genreId: Int, 
    castsName: [String],
    castsPicture: [String],
    castsId: [Int]
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
    movies: [Movie]
    movieDetail(id: ID!): Movie
    genres: [Genre]
    genreDetail(id: ID!): Genre
    casts: [Cast]
  }

  type Mutation {
    addMovie(input: addMovieInput) : SuccessMutation
    editMovie(id: ID, input: editMovieInput) : SuccessMutation
    deleteMovie(id: ID) : SuccessMutation
    addGenre(name: String) : SuccessMutation
    editGenre(id: ID, name: String) : SuccessMutation
    deleteGenre(id: ID) : SuccessMutation
    addUser(input: addUserInput) : SuccessMutation
    deleteUser(id: String) : SuccessMutation
  }

`;

const resolvers = {
  Query: {
    users: async () => {
      try {
        const { data: usersData } = await axios({
          method: "GET",
          url: "http://localhost:4001/users",
        });
        return usersData.data;
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
    movies: async () => {
      try {
        let { data: moviesData } = await axios({
          method: "GET",
          url: "http://localhost:4002/movies",
        });
        moviesData.map((data) => {
          data.authors = data.Author;
          data.genre = data.Genre;
          data.casts = data.Casts;
          return data;
        });
        return moviesData;
      } catch (error) {
        console;
        throw error;
      }
    },
    movieDetail: async (_, args) => {
      try {
        const { id } = args;
        const { data: movieData } = await axios({
          method: "GET",
          url: "http://localhost:4002/movies/" + id,
        });
        return movieData;
      } catch (error) {
        throw error;
      }
    },
    genres: async () => {
      try {
        const { data: genresData } = await axios({
          method: "GET",
          url: "http://localhost:4002/genres",
        });
        return genresData;
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
          url: "http://localhost:4002/genres/" + id,
        });
        return genreData;
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
        return data;
      } catch (error) {
        throw error;
      }
    },

    addMovie: async (_, args) => {
      try {
        const { input } = args;
        const { data } = await axios({
          method: "POST",
          url: "http://localhost:4002/movies/add",
          data: input,
        });
        console.log(input.trailerUrl);
        return data;
      } catch (error) {
        throw error;
      }
    },

    editMovie: async (_, args) => {
      try {
        const { id, input } = args;
        const { data } = await axios({
          method: "PUT",
          url: "http://localhost:4002/movies/" + id,
          data: input,
        });
        console.log(data);
        return data;
      } catch (error) {
        throw error;
      }
    },

    deleteMovie: async (_, args) => {
      try {
        const { id } = args;
        const { data } = await axios({
          method: "DELETE",
          url: "http://localhost:4002/movies/" + id,
        });
        return data;
      } catch (error) {
        throw error;
      }
    },

    addGenre: async (_, args) => {
      try {
        const { name } = args;
        const { data } = await axios({
          method: "POST",
          url: "http://localhost:4002/genres/add",
          data: {
            name: name,
          },
        });
        console.log(data);
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
          url: "http://localhost:4002/genres/" + id,
          data: {
            name: name,
          },
        });
        console.log(data);
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
          url: "http://localhost:4002/genres/" + id,
        });
        return data;
      } catch (error) {
        throw error;
      }
    },
  },
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs,
  resolvers,
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
