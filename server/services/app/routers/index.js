const router = require("express").Router();
const movieRouter = require("./movie");
const genreRouter = require("./genre");

router.use("/movies", movieRouter);
router.use("/genres", genreRouter);

module.exports = router;
