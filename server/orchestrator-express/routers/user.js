const UserController = require("../controllers/userController");

const userRouter = require("express").Router();

userRouter.get("", UserController.findAll);
userRouter.post("/add", UserController.create);
userRouter.get("/:id", UserController.findOne);
userRouter.delete("/:id", UserController.delete);

module.exports = userRouter;
