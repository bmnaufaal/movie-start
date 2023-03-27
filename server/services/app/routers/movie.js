const MovieController = require("../controllers/movieController");
const authentication = require("../middlewares/authentication");

const movieController = require("express").Router();

movieController.get("", MovieController.findAll);
movieController.post("/add", MovieController.create);
movieController.get("/:id", MovieController.findOne);
movieController.delete("/:id", MovieController.delete);
movieController.put("/:id", MovieController.update);

module.exports = movieController;
