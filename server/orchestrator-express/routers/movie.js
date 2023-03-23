const MovieController = require("../controllers/movieController");

const movieController = require("express").Router();

movieController.get("", MovieController.findAll);
// movieController.post("/add", authentication, MovieController.create);
movieController.get("/:id", MovieController.findOne);
// movieController.delete("/:id", authentication, MovieController.delete);
// movieController.put("/:id", authentication, MovieController.update);

module.exports = movieController;
