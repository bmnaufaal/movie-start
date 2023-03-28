const router = require("express").Router();
const movieRouter = require("./movie");
const genreRouter = require("./genre");

router.get("/", (req, res) => {
  res.status(200).json({
    message: `Welcome to App Service with DB_URL = ${process.env.PORT} test`,
  });
});
router.use("/movies", movieRouter);
router.use("/genres", genreRouter);

module.exports = router;
