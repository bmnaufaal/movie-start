"use strict";
const axios = require("axios");
const redis = require("../config/redis");

class MovieController {
  static async findAll(req, res) {
    try {
      const movieCache = await redis.get("app:movies");
      if (movieCache) {
        res.json(JSON.parse(movieCache));
      } else {
        const { data: movies } = await axios({
          method: "GET",
          url: process.env.APP_SERVICE_URL + "/movies/",
        });

        for (let index = 0; index < movies.length; index++) {
          const { data: user } = await axios({
            method: "GET",
            url:
              process.env.USER_SERVICE_URL + "/users/" + movies[index].authorId,
          });
          movies[index].author = user.data;
          movies[index].genre = movies[index].Genre;
          movies[index].casts = movies[index].Casts;
        }
        // console.log(movies);
        await redis.set("app:movies", JSON.stringify(movies));
        res.json(movies);
      }
    } catch (error) {
      console.log(error);
      res.status(error.response.status).json(error.response.data);
    }
  }

  static async findOne(req, res) {
    try {
      const { id } = req.params;
      const { data: movie } = await axios({
        method: "GET",
        url: process.env.APP_SERVICE_URL + "/movies/" + id,
      });
      const { data: user } = await axios({
        method: "GET",
        url: process.env.USER_SERVICE_URL + "/users/" + movie.authorId,
      });
      movie.Author = user.data;
      console.log(movie);
      res.json(movie);
    } catch (error) {
      console.log(error);
      res.status(error.response.status).json(error.response.data);
    }
  }

  static async create(req, res) {
    try {
      const {
        title,
        synopsis,
        trailerUrl,
        imgUrl,
        rating,
        genreId,
        castsName,
        castsPicture,
        castsId,
        authorId,
      } = req.body;
      const { data } = await axios({
        method: "POST",
        url: process.env.APP_SERVICE_URL + "/movies/add",
        data: {
          title: title,
          synopsis: synopsis,
          trailerUrl: trailerUrl,
          imgUrl: imgUrl,
          rating: rating,
          genreId: genreId,
          castsName: castsName,
          castsPicture: castsPicture,
          castsId: castsId,
          authorId: authorId,
        },
      });
      await redis.del("app:movies");
      res.json(data);
    } catch (error) {
      console.log(error);
      res.status(error.response.status).json(error.response.data);
    }
  }

  static async update(req, res) {
    try {
      const { id } = req.params;
      const {
        title,
        synopsis,
        trailerUrl,
        imgUrl,
        rating,
        genreId,
        castsName,
        castsPicture,
        castsId,
      } = req.body;
      const { data } = await axios({
        method: "PUT",
        url: process.env.APP_SERVICE_URL + "/movies/" + id,
        data: {
          title: title,
          synopsis: synopsis,
          trailerUrl: trailerUrl,
          imgUrl: imgUrl,
          rating: rating,
          genreId: genreId,
          castsName: castsName,
          castsPicture: castsPicture,
          castsId: castsId,
        },
      });
      console.log(data);
      await redis.del("app:movies");
      res.json(data);
    } catch (error) {
      console.log(error);
      res.status(error.response.status).json(error.response.data);
    }
  }

  static async delete(req, res) {
    try {
      const { id } = req.params;
      const { data: deletedMovie } = await axios({
        method: "DELETE",
        url: process.env.APP_SERVICE_URL + "/movies/" + id,
      });
      await redis.del("app:movies");
      res.json(deletedMovie);
    } catch (error) {
      console.log(error);
      res.status(error.response.status).json(error.response.data);
    }
  }
}

module.exports = MovieController;
