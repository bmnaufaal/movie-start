const GenreController = require("../controllers/genreController");
const authentication = require("../middlewares/authentication");

const genreController = require("express").Router();

genreController.get("", GenreController.findAll);
// genreController.post("/add", authentication, GenreController.create);
genreController.get("/:id", GenreController.findOne);
// genreController.delete("/:id", authentication, GenreController.delete);
// genreController.put("/:id", authentication, GenreController.update);

module.exports = genreController;
