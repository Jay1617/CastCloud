import jwt from "jsonwebtoken";
import { User } from "../models/User.js";

export const isAuth = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(403).json({
        message: "Please Login",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    req.user = await User.findById(decoded.id);

    if (!req.user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    next();
  } catch (error) {
    return res.status(403).json({
      message:
        error.name === "TokenExpiredError"
          ? "Session Expired!"
          : "Invalid Token",
    });
  }
};
