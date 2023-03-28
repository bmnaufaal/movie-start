const UserController = require("../controllers/userController");

const userRouter = require("express").Router();

userRouter.post("/create", UserController.create);
userRouter.delete("/:id", UserController.delete);
userRouter.get("", UserController.findAll);
userRouter.get("/:id", UserController.findOne);

module.exports = userRouter;
