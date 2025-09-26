// ===============================
// Imports
// ===============================
import express from "express";
import { getAllUser, updateUser,deleteUser } from "../controllers/User.controller.js";
import upload from "../config/multter.js";

const UserRoute = express.Router();

// ===============================
// User Routes
// ===============================

// ✅ Get a user by ID
// Example: GET /api/user/get-user/12345
UserRoute.get("/all", getAllUser);
UserRoute.delete("/delete/:userid", deleteUser);

// ✅ Update user by ID
// Accepts form-data with optional file upload (`file` field)
// Example: PUT /api/user/update-user/12345
UserRoute.put("/update-user/:userid", upload.single("file"), updateUser);

// ===============================
// Export
// ===============================
export default UserRoute;