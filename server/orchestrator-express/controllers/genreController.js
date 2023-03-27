"use strict";

const { default: axios } = require("axios");
const redis = require("../config/redis");

class GenreController {
  static async findAll(req, res) {
    try {
      const genreCache = await redis.get("app:genres");
      if (genreCache) {
        console.log(JSON.parse(genreCache));
        res.json(JSON.parse(genreCache));
      } else {
        const { data } = await axios({
          method: "GET",
          url: "http://localhost:4002/genres/",
        });
        await redis.set("app:genres", JSON.stringify(data));
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
      const { data } = await axios("http://localhost:4002/genres/" + id, {
        method: "GET",
      });
      console.log(data);
      res.json(data);
    } catch (error) {
      res.status(error.response.status).json(error.response.data);
    }
  }

  static async create(req, res) {
    try {
      const { name } = req.body;
      const { data } = await axios({
        method: "POST",
        url: "http://localhost:4002/genres/add",
        data: {
          name: name,
        },
      });
      await redis.del("app:genres");
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
        url: "http://localhost:4002/genres/" + id,
      });
      await redis.del("app:genres");
      res.json(data);
    } catch (error) {
      console.log(error);
      res.status(error.response.status).json(error.response.data);
    }
  }

  static async update(req, res) {
    try {
      const { id } = req.params;
      const { name } = req.body;
      const { data } = await axios({
        method: "PUT",
        url: "http://localhost:4002/genres/" + id,
        data: {
          name: name,
        },
      });
      await redis.del("app:genres");
      res.json(data);
    } catch (error) {
      console.log(error);
      res.status(error.response.status).json(error.response.data);
    }
  }
}

module.exports = GenreController;
