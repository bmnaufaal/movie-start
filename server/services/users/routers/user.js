const UserController = require("../controllers/userController");

const userRouter = require("express").Router();

userRouter.post("/users/create", UserController.create);
userRouter.delete("/users/:id", UserController.delete);
userRouter.get("/users", UserController.findAll);
userRouter.get("/users/:id", UserController.findOne);

module.exports = userRouter;
