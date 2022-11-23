const mongoose = require("mongoose");

const Schema = mongoose.Schema;

//creating user schema
const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

//create user model from schema

const User = mongoose.model("User", userSchema);

module.exports = User;
