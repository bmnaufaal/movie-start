"use strict";

const { ObjectId } = require("mongodb");
const { mongoConnect, getDatabase } = require("../config/mongoConnection");

class UserController {
  static async findAll(req, res, next) {
    try {
      const db = getDatabase();
      const usersCollection = db.collection("users");
      const users = await usersCollection.find({}).toArray();
      res.status(200).json({
        message: "Find All Users",
        data: users,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  }

  static async findOne(req, res, next) {
    try {
      const { id } = req.params;
      const db = getDatabase();
      const usersCollection = db.collection("users");
      const users = await usersCollection.findOne({ _id: new ObjectId(id) });
      res.status(200).json({
        message: "Find Users By Id",
        data: users,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  }
}

module.exports = UserController;