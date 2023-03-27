const GenreController = require("../controllers/genreController");

const genreRouter = require("express").Router();

genreRouter.get("", GenreController.findAll);
genreRouter.post("/add", GenreController.create);
genreRouter.get("/:id", GenreController.findOne);
genreRouter.delete("/:id", GenreController.delete);
genreRouter.put("/:id", GenreController.update);

module.exports = genreRouter;
