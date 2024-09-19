import bcrypt from "bcrypt";
import { User } from "../models/User.js";
import TryCatch from "../utils/TryCatch.js";
import generateToken from "../utils/generateToken.js";

//Controller for Register User
export const registerUser = TryCatch(async (req, res) => {

  // console.log(" Api called");
  
  const { name, email, password } = req.body;

  let user = await User.findOne({ email });

  if (user) {
    return res.status(409).json({ message: "User already exists" });
  }

  const hashPassword = await bcrypt.hash(password, 10);

  user = await User.create({
    name,
    email,
    password: hashPassword,
  });

  generateToken(user._id, res);

  res.status(201).json({
    user,
    message: "User Registered",
  });
});

//Controller for Login User
export const loginUser = TryCatch(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({ message: "User doesn't exists" });
  }

  const cmprPassword = await bcrypt.compare(password, user.password);

  if (!cmprPassword) {
    return res.status(401).json({ message: "Password Doesn't match" });
  }

  generateToken(user._id, res);

 return res.status(200).json({
    user,
    message: "User LoggedIn",
  });
});

//Controller for MyProfile
export const getMyProfile = TryCatch(async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  res.status(200).json(user);
});


//Controller for Logout user
export const logoutUser = TryCatch(async (req, res) => {
  res.cookie("token", "", {maxAge: 0});
  res.status(200).json({ message: "User LoggedOut" });
})