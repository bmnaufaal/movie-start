"use strict";
const axios = require("axios");

class MovieController {
  static async findAll(req, res) {
    try {
      const { data: movies } = await axios({
        method: "GET",
        url: "http://localhost:4002/movies/",
      });
      console.log(movies);
      res.json(movies);
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
        url: "http://localhost:4002/movies/" + id,
      });
      const { data: user } = await axios({
        method: "GET",
        url: "http://localhost:4001/users/" + movie.authorId,
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
        url: "http://localhost:4002/movies/add",
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
        url: "http://localhost:4002/movies/" + id,
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
        url: "http://localhost:4002/movies/" + id,
      });
      res.json(deletedMovie);
    } catch (error) {
      console.log(error);
      res.status(error.response.status).json(error.response.data);
    }
  }
}

module.exports = MovieController;
