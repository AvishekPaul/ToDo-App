const { register, login, logout, isLoggedIn } = require("../controllers/auth");
const express = require("express");

const Router = express.Router();

Router.post("/register", register); //api functions for register post request
Router.post("/login", login); ////api functions for login post request
Router.get("/logout", logout); ////api functions for logout get request
Router.get("/isloggedin", isLoggedIn); ////api functions for checking whether is logging in

module.exports = Router;
