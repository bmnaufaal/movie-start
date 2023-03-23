"use strict";

const { default: axios } = require("axios");

class GenreController {
  static async findAll(req, res) {
    try {
      const { data } = await axios("http://localhost:4002/genres", {
        method: "GET",
      });
      console.log(data);
      res.json(data);
    } catch (error) {
      res.status(error.response.status).json(error.response.data);
    }
  }

  static async findOne(req, res) {
    try {
      const { id } = req.params;
      const { data } = await axios("http://localhost:4002/genres/" + id, {
        method: "GET",
      });
      console.log(data);
      res.json(data);
    } catch (error) {
      res.status(error.response.status).json(error.response.data);
    }
  }
}

module.exports = GenreController;
