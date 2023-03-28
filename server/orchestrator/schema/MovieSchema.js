const axios = require("axios");
const redis = require("../config/redis");

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
    authorId: String
    genreId: Int
    author: User
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
        const movieCache = await redis.get("app:movies_graphql");
        if (movieCache) {
          console.log(JSON.parse(movieCache));
          return JSON.parse(movieCache);
        } else {
          let { data: moviesData } = await axios({
            method: "GET",
            url: process.env.APP_SERVICE_URL + "/movies",
          });

          for (let index = 0; index < moviesData.length; index++) {
            const { data: user } = await axios({
              method: "GET",
              url: process.env.USER_SERVICE_URL + "/users/" + moviesData[index].authorId,
            });
            moviesData[index].author = user.data;
            moviesData[index].genre = moviesData[index].Genre;
            moviesData[index].casts = moviesData[index].Casts;
          }

          await redis.set("app:movies_graphql", JSON.stringify(moviesData));
          return moviesData;
        }
      } catch (error) {
        throw error;
      }
    },
    movieDetail: async (_, args) => {
      try {
        const { id } = args;
        const { data: movieData } = await axios({
          method: "GET",
          url: process.env.APP_SERVICE_URL + "/movies/" + id,
        });
        const { data: user } = await axios({
          method: "GET",
          url: process.env.USER_SERVICE_URL + "/users/" + movieData.authorId,
        });
        movieData.author = user.data;
        movieData.genre = movieData.Genre;
        movieData.casts = movieData.Casts;
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
          url: process.env.APP_SERVICE_URL + "/movies/add",
          data: input,
        });
        console.log(input.trailerUrl);
        await redis.del("app:movies_graphql");
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
          url: process.env.APP_SERVICE_URL + "/movies/" + id,
          data: input,
        });
        console.log(data);
        await redis.del("app:movies_graphql");
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
          url: process.env.APP_SERVICE_URL + "/movies/" + id,
        });
        await redis.del("app:movies_graphql");
        return data;
      } catch (error) {
        throw error;
      }
    },
  },
};

module.exports = [typeDefs, resolvers];
