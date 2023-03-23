"use strict";
const axios = require("axios");

class MovieController {
  static async findAll(req, res) {
    try {
      let { data } = await axios({
        method: "GET",
        url: "http://localhost:4002/movies/",
      });
      res.json(data);
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
      res.json(data);
    } catch (error) {
      res.status(error.response.status).json(error.response.data);
    }
  }
}

module.exports = MovieController;
