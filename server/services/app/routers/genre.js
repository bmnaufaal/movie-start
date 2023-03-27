const GenreController = require("../controllers/genreController");
const authentication = require("../middlewares/authentication");

const genreController = require("express").Router();

genreController.get("", GenreController.findAll);
genreController.post("/add", GenreController.create);
genreController.get("/:id", GenreController.findOne);
genreController.delete("/:id", GenreController.delete);
genreController.put("/:id", GenreController.update);

module.exports = genreController;
