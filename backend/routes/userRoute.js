const express = require("express");
const {userInfo, updateUserInfo} = require("../controllers/user")

const userRouter = express.Router();

userRouter.get("/me", userInfo);
userRouter.put("/me", updateUserInfo);

module.exports = userRouter;
