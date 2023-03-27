"use strict";

const { ObjectId } = require("mongodb");
const { getDatabase } = require("../config/mongoConnection");
const { hashPassword } = require("../helpers/bcrypt");

class UserController {
  static async findAll(req, res, next) {
    try {
      const db = getDatabase();
      const usersCollection = db.collection("users");
      const users = await usersCollection.find({}).toArray();
      users.map((user) => {
        delete user.password;
        return user;
      });
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
      let user = await usersCollection.findOne({ _id: new ObjectId(id) });
      delete user.password;
      res.status(200).json({
        message: "Find Users By Id",
        data: user,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  }

  static async create(req, res, next) {
    try {
      const { username, email, password, phoneNumber, address } = req.body;
      const db = getDatabase();
      const usersCollection = db.collection("users");
      const users = await usersCollection.find({}).toArray();
      await usersCollection.insertOne({
        id: users[users.length - 1].id + 1,
        username: username,
        email: email,
        password: hashPassword(password),
        role: "admin",
        phoneNumber: phoneNumber,
        address: address,
      });
      res.status(201).json({
        message: "Success created user ",
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  }

  static async delete(req, res, next) {
    try {
      const { id } = req.params;
      const db = getDatabase();
      const usersCollection = db.collection("users");
      await usersCollection.deleteOne({
        _id: new ObjectId(id),
      });
      res.status(200).json({
        message: "Success delete user ",
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
