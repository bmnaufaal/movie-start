const MovieController = require("../controllers/movieController");

const movieRouter = require("express").Router();

movieRouter.get("", MovieController.findAll);
// movieRouter.post("/add", authentication, MovieController.create);
movieRouter.get("/:id", MovieController.findOne);
// movieRouter.delete("/:id", authentication, MovieController.delete);
// movieRouter.put("/:id", authentication, MovieController.update);

module.exports = movieRouter;
