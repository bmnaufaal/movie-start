const axios = require("axios");

const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.

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

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    movies: [Movie]
    movieDetail(id: ID!): Movie
  }

  type Mutation {
    addMovie(input: addMovieInput) : SuccessMutation
    editMovie(id: ID, input: editMovieInput) : SuccessMutation
    deleteMovie(id: ID) : SuccessMutation
  }

`;

const resolvers = {
  Query: {
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
  },
  Mutation: {
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
  },
};

module.exports = [typeDefs, resolvers];
