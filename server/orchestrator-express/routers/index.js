const router = require("express").Router();
const movieRouter = require("./movie");
const genreRouter = require("./genre");
const userRouter = require("./user");

router.get("/", (req, res) => {
  res.status(200).json({
    message: `Welcome to Orchestrator with DB_URL = ${process.env.PORT}`,
  });
});
router.use("/users", userRouter);
router.use("/movies", movieRouter);
router.use("/genres", genreRouter);

module.exports = router;
