"use strict";

const axios = require("axios");
const redis = require("../config/redis");

class UserController {
  static async findAll(req, res) {
    try {
      const userCache = await redis.get("app:users");
      if (userCache) {
        console.log(JSON.parse(userCache));
        res.json(JSON.parse(userCache));
      } else {
        const { data: users } = await axios({
          method: "GET",
          url: "http://localhost:4001/users",
        });
        console.log(users.data);
        await redis.set("app:users", JSON.stringify(users.data));
        res.json(users.data);
      }
    } catch (error) {
      console.log(error);
      res.status(error.response.status).json(error.response.data);
    }
  }

  static async findOne(req, res) {
    try {
      const { id } = req.params;
      const { data: user } = await axios("http://localhost:4001/users/" + id, {
        method: "GET",
      });
      console.log(user.data);
      res.json(user.data);
    } catch (error) {
      res.status(error.response.status).json(error.response.data);
    }
  }

  static async create(req, res) {
    try {
      const { username, email, password, phoneNumber, address } = req.body;
      const { data } = await axios({
        method: "POST",
        url: "http://localhost:4001/users/create",
        data: {
          username,
          email,
          password,
          phoneNumber,
          address,
        },
      });
      await redis.del("app:users");
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
        url: "http://localhost:4001/users/" + id,
      });
      await redis.del("app:users");
      res.json(data);
    } catch (error) {
      console.log(error);
      res.status(error.response.status).json(error.response.data);
    }
  }
}

module.exports = UserController;
