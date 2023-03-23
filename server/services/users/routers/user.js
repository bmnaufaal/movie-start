const UserController = require("../controllers/userController");

const userRouter = require("express").Router();

userRouter.get("/users", UserController.findAll);
userRouter.get("/users/:id", UserController.findOne);

module.exports = userRouter;
