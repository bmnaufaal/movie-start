const MovieController = require("../controllers/movieController");

const movieRouter = require("express").Router();

movieRouter.get("", MovieController.findAll);
movieRouter.post("/add", MovieController.create);
movieRouter.get("/:id", MovieController.findOne);
movieRouter.delete("/:id", MovieController.delete);
movieRouter.put("/:id", MovieController.update);

module.exports = movieRouter;
