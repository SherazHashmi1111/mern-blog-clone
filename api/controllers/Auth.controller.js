import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { handleError } from "./../helpers/handleError.js";

// Register user
export const Register = async (req, res, next) => {
  
  try {
    const { name, email, password } = req.body;

    // Basic Validation
    if (!name) {
      return next(handleError(400, "Name is required"));
    }
    if (!email) {
      return next(handleError(400, "Email is required"));
    }
    if (!password || password.length < 6) {
      return next(
        handleError(400, "Password must be at least 6 characters long")
      );
    }

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(handleError(400, "Email has already been taken"));
    }

    // Hashing password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    // Create new user
    const user = new User({ name, email, password: hashPassword });
    await user.save();

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
    });
  } catch (error) {
    return next(handleError(500, "Server error in AuthController"));
  }
};
// Login user
export const Login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Basic Validation
    if (!email) {
      return next(handleError(400, "Email is required"));
    }
    if (!password || password.length < 6) {
      return next(
        handleError(400, "Password must be at least 6 characters long")
      );
    }

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return next(handleError(400, "Invalid email or password"));
    }

    // Match password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return next(handleError(400, "Invalid email or password"));
    }

    // Create Jsonwebtoken
    const token = jwt.sign(
      {
        name: user.name,
        email: user.email,
        _id: user._id,
        avatar: user.avatar,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // Save in cookies
    res.cookie("access_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      path: "/",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    // Successful login
    return res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    return next(handleError(500, "Server error in AuthController"));
  }
};
// Logout user
export const Logout = async (req, res, next) => {
  
  try {
    res.clearCookie("access_token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      path: "/",
    });

    return res.status(200).json({
      success: true,
      message: "Logout successful",
    });
  } catch (error) {
    return next(handleError(500, "Server error in AuthController"));
  }
};

