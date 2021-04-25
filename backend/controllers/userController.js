const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

// @desc GET users
// @route /api/users
// @access protected && admin

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password -__v");
    if (!users && users.length === 0) {
      return res.status(400).json({
        message: "There are no users.",
      });
    }

    return res.status(200).json(users);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: error,
    });
  }
};

// @desc POST/register a new user
// @route /api/users/regiser
// @access Public
exports.register = async (req, res) => {
  // checking the user input!
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: errors.array()[0].msg,
    });
  }
  // First we have to check if user is alreday exist

  const { name, email, password, isAdmin } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      res.status(400).json({
        message: "Email is already taken.",
      });
    }

    // Crerateing a new user
    user = new User({
      name,
      email,
      password,
      isAdmin,
    });

    // After creating an instanse from User Class, we have to salt the password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();
    const generateToken = (id) => {
      return jwt.sign({ id }, process.env.JWT_KEY);
    };

    res.status(201).json({
      name,
      email,
      password,
      isAdmin,
      token: generateToken(user._id),
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error,
    });
  }
};

// @desc POST user login
// @route /api/users/login
// @access Public
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    // Mathching the password witch comes from the userSchema
    if (user && (await user.verifyPassword(password))) {
      const generatedToken = (id) => {
        return jwt.sign({ id }, process.env.JWT_KEY);
      };

      return res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        profilePic: user.profilePic,
        backgroundPic: user.backgroundPic,
        token: generatedToken(user._id),
      });
    }
    return res.status(401).json({
      message: "Invalid credential",
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: error,
    });
  }
};

// @desc GET user based on the id IS NOT PROFLE
// @route /api/users:id
// @access proteced && Admin

// exports.getUser = async (req, res) => {
//   try {
//     const user = await User.findById(req.params.id).select("-password -__v");
//     if (!user) {
//       return res.status(404).json({
//         message: user.name + "is not exist!",
//       });
//     }

//     res.status(200).json(user);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({
//       message: error,
//     });
//   }
// };

// @desc GET Profile
// @route /api/users
// @access proteced || Admin

exports.profile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id); // commes from Token
    if (!user) {
      return res.status(404).json({
        message: "No user found!",
      });
    }
    return res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      profilePic: user.profilePic,
      backgroundPic: user.backgroundPic,
      created: user.created,
      isAdmin: user.isAdmin,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error,
    });
  }
};

// @desc Update user profile
// @route /api/users/profile
// @access proteced || Admin

exports.profileUpdate = async (req, res) => {
  try {
    // const { name, email, password, isAdmin } = req.body;
    const user = await User.findById(req.user._id); //logged in user!!

    console.log("user: ", req.user._id);
    if (!user) {
      return res.status(404).json({
        message: "No user found!",
      });
    }
    (user.name = req.body.name || user.name),
      (user.email = req.body.email || user.email);

    if (req.body.password) {
      user.password = req.body.password;

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
    }
    // console.log(user.password);

    const uptadedUser = await user.save();
    const generateToken = (id) => {
      return jwt.sign({ id }, process.env.JWT_KEY);
    };

    res.json({
      _id: uptadedUser._id,
      name: uptadedUser.name,
      email: uptadedUser.email,
      isAdmin: uptadedUser.isAdmin,
      token: generateToken(uptadedUser._id),
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error,
    });
  }
};

// @desc DELETE a user
// @route /api/users:id
// @access proteced && Admin
exports.delete = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({
        message: "This user is not exist!",
      });
    }
    await user.deleteOne({
      _id: user._id,
    });
    res.status(200).json({
      message: user.name + " is deleted",
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: error,
    });
  }
};
