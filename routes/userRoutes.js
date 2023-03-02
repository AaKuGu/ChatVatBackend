const {
  register,
  deleteAll,
  login,
  setAvatar,
  getAllUser,
} = require("../controllers/userController");

const userRouter = require("express").Router();

userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.delete("/deleteAll", deleteAll);
userRouter.post("/setAvatar/:id", setAvatar);
userRouter.get("/getAllUser", getAllUser);
module.exports = userRouter;
