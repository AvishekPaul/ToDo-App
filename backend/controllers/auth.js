const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/users"); //importing user model schema
const createError = require("../utils/createError")

//api function for register POST
const register = async (req, res, next) => {
  if (!req.body.name || !req.body.email || !req.body.password) {
    next(
      createError({
        message: 'Name, Email & password are required',
        statusCode: 400,
      }),
    );
  }

  try {
    const salt = await bcryptjs.genSalt(10); //creating random string to hash the password
    const hashedPassword = await bcryptjs.hash(req.body.password, salt); //hash the password

    //creating new user on database from POST data
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json("New User Created");
  } catch (err) {
    console.log(err, "kdahncvlakfhlkhb.............................");
    next(err);
  }
};

// api function for login POST
const login = async (req, res, next) => {
  if (!req.body.email || !req.body.password) {
    next(
      createError({
        message: 'Email and password are required',
        statusCode: 400,
      }),
    );
  }

  try {
    //find user by email
    const user = await User.findOne({ email: req.body.email }).select(
      "name email password"
    );
    if (!user) {
      next(
        createError({ status: 404, message: 'User not found with the email' }),
      );
    }

    //check if password is correct
    const isPasswordCorrect = await bcryptjs.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect) {
      next(
        createError({ status: 400, message: 'Password is incorrect' }),
      );
    }
    else {
      const payload = {
        id: user._id,
        name: user.name,
      };
  
      //pass payload and secret key for creating token
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });
      res
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .status(200)
        .json({ name: user.name, email: user.email, message: "login success" });
    }
    
  } catch (err) {
    next(err)
  }
};

const logout = (req,res) => {
  res.clearCookie("access_token")
  res.status(200).json({message: "logout Successful"})
}

const isLoggedIn = (req, res) => {
  try {
    const token = req.headers.cookie.split("=")[1];
    jwt.verify(token, process.env.JWT_SECRET, (err) => {
        if (err) {
          res.json(false)
        }
        else {
          res.json(true)
        }
        
      });
}

catch(err){
  res.json(false)
}

}

module.exports = { register, login, logout, isLoggedIn};
