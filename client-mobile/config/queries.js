import { useQuery, gql } from "@apollo/client";

export const GET_MOVIES = gql`
  query GetMovies {
    movies {
      id
      title
      genre {
        id
        name
      }
      author {
        _id
        id
        username
        email
        role
      }
      authorId
      casts {
        id
        movieId
        name
        profilePict
      }
      genreId
      imgUrl
      rating
      slug
      synopsis
      trailerUrl
    }
  }
`;

export const GET_GENRES = gql`
  query GetGenres {
    genres {
      id
      name
    }
  }
`;

export const GET_MOVIE_DETAIL = gql`
  query GetMovieDetail($movieDetailId: ID!) {
    movieDetail(id: $movieDetailId) {
      title
      genre {
        name
      }
      rating
      synopsis
      imgUrl
      casts {
        id
        name
        profilePict
      }
      trailerUrl
      author {
        username
      }
    }
  }
`;
