import bcrypt from 'bcrypt'
import { User } from "../models/User.js";
import TryCatch from "../utils/TryCatch.js";
import generateToken from '../utils/generateToken.js';

export const registerUser = TryCatch(async (req, res) => {
  const { name, email, password } = req.body;

  let user = await User.findOne({ email });

  if (user) {
    return res.status(400).json({ message: "User already exists" });
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
    message: 'User Registered'
  });
});
 