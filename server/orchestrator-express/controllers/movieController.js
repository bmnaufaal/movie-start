"use strict";
const axios = require("axios");
const redis = require("../config/redis");

class MovieController {
  static async findAll(req, res) {
    try {
      const movieCache = await redis.get("app:movies");
      if (movieCache) {
        console.log(JSON.parse(movieCache));
        res.json(JSON.parse(movieCache));
      } else {
        const { data } = await axios({
          method: "GET",
          url: "http://localhost:4002/movies/",
        });
        await redis.set("app:movies", JSON.stringify(data));
        console.log(data);
        res.json(data);
      }
    } catch (error) {
      console.log(error);
      res.status(error.response.status).json(error.response.data);
    }
  }

  static async findOne(req, res) {
    try {
      const { id } = req.params;
      const { data } = await axios({
        method: "GET",
        url: "http://localhost:4002/movies/" + id,
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
      const { data } = await axios({
        method: "DELETE",
        url: "http://localhost:4002/movies/" + id,
      });
      await redis.del("app:movies");
      res.json(data);
    } catch (error) {
      console.log(error);
      res.status(error.response.status).json(error.response.data);
    }
  }
}

module.exports = MovieController;
