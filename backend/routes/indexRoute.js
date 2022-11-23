const express = require("express");

const checkAuth = require("../utils/checkAuth");

const authRouter = require("./authRoute");
const userRouter = require("./userRoute");
const taskRouter = require("./taskRoute");

const Router = express.Router();

Router.use("/auth", authRouter); //authentication route
Router.use("/user", checkAuth, userRouter); //user route
Router.use("/tasks", checkAuth, taskRouter); //main dashboard route

module.exports = Router;
