const User = require("../models/users")

const userInfo = async(req, res, next) => {
    try {
        const data = await User.findById(req.user.id)
          .select('name email');
        res.status(200).json(data);
      } catch (err) {
        next(err);
      }
}

const updateUserInfo = async (req, res, next) => {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.user.id,
        {
          name: req.body.name,
          email: req.body.email,
        },
        {
          new: true,
        },
      ).select('name email');
      res.status(200).json(updatedUser);
    } catch (err) {
      next(err);
    }
  };

module.exports = {userInfo, updateUserInfo};