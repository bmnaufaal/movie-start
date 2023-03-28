const router = require("express").Router();
const userRouter = require("./user");

router.get("/", (req, res) => {
  res.status(200).json({
    message: `Welcome to Users Service with DB_URL = ${process.env.PORT}`,
  });
});
router.use("/users", userRouter);

module.exports = router;
