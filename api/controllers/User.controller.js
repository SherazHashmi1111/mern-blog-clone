// All imports
import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import cloudinary from "../config/cloudinary.js";
import { handleError } from "./../helpers/handleError.js";

// Getting All users data
export const getAllUser = async (req, res, next) => {
  
  try {
    const users = await User.find().lean().exec();
    if (!users) return next(handleError(404, "Users not found"));
    delete users.password;
    res.status(200).json({
      success: true,
      message: "User data found",
      users,
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};
// Getting user data
export const deleteUser = async (req, res, next) => {
  const { userid } = req.params; // <-- extract id string here
  try {
    const user = await User.findByIdAndDelete(userid);
    if (!user) {
      return next(handleError(404, "User not found"));
    }
    res.status(200).json({
      success: true,
      message: "User deleted successfully!",
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};

// Updating user data
export const updateUser = async (req, res, next) => {    
  try {
    const data = JSON.parse(req.body.data);
    const { userid } = req.params;

    const user = await User.findById(userid);
    user.name = data.name;
    user.email = data.email;
    user.bio = data.bio;

    if (data.password) {
      if (data.password.length < 8) {
        throw new Error("Password must be at least 8 characters long");
      }

      const hashedPassword = bcryptjs.hashSync(data.password, 10); // use salt rounds
      user.password = hashedPassword;
    }

    if (req.file) {
      // Upload an image
      const uploadResult = await cloudinary.uploader
        .upload(req.file.path, {
          folder: "mern-blog-clone",
          resource_type: "auto",
        })
        .catch((error) => {
          next(handleError(500, error.message));
        });

      user.avatar = uploadResult.secure_url;
    }
    await user.save();
    const newUser = user.toObject({ getters: true });
    delete newUser.password;
    res.status(200).json({
      success: true,
      message: "Updated successfully!",
      newUser,
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};