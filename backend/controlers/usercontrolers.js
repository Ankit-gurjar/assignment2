const expressAsyncHandler = require("express-async-handler");
const User = require("../models/usermodel.js");
const generateToken = require("../config/generatetoken.js");
const registerUser = expressAsyncHandler(async (req, res) => {
  const { name, mobile_no, email_id, password } = req.body;
  if (!name || !mobile_no || !email_id || !password) {
    res.status(400).send("Enter All Detail's to Succesfull Registration");
  }
  var existuser = await User.findOne({ email_id });
  existuser = await User.findOne({ mobile_no });

  if (existuser) res.status(400).send("User Already EXIST'S");

  const user = await User.create({ name, mobile_no, email_id, password });
  if (user) {
    res.status(200).json({
      message: "User Registered",
      ID: user._id,
      Name: user.name,
      token: generateToken(user._id),
    });
  } else {
    res.status(400).send("Failed To register user 😔");
  }
});

const authUser = expressAsyncHandler(async (req, res) => {
  const { email_id, password } = req.body;
  var userExist = await User.findOne({ email_id });
  if (userExist && userExist.matchPassword(password)) {
    res.status(200).json({
      message: "User Registered",
      ID: user._id,
      Name: user.name,
      token: generateToken(userExist._id),
    });
  } else {
    res.status(400).send("Uhmm Wrong Credentials");
  }
});

module.exports = { registerUser, authUser };
