const router = require("express").Router();
const movieRouter = require("./movie");
const genreRouter = require("./genre");
const userRouter = require("./user");

router.use("/users", userRouter);
router.use("/movies", movieRouter);
router.use("/genres", genreRouter);

module.exports = router;
