// ===============================
// Imports
// ===============================
import express from "express";
import upload from "../config/multter.js";
import { addBolg, blogByCategory, blogBySearch, deleteBlog, getAllBlogs, getBlog, getBlogDetails, relatedBlog, updateBlog} from "../controllers/Blog.controller.js";

const BlogRoute = express.Router();

// ===============================
// User Routes
// ===============================

// ✅ Get a user by ID
// Example: GET /api/user/get-user/12345
BlogRoute.post("/add", upload.single("file"), addBolg);
BlogRoute.get("/all", getAllBlogs);
BlogRoute.delete("/delete/:blogid", deleteBlog);
BlogRoute.get("/blog/:blogid", getBlog);
BlogRoute.get("/blog-details/:slug", getBlogDetails);
BlogRoute.post("/all", upload.single("file"), deleteBlog);
BlogRoute.put("/edit/:blogid", upload.single("file"), updateBlog);
BlogRoute.get("/related-blog/:category/:blog",  relatedBlog);
BlogRoute.get("/blogs-by-category/:category",  blogByCategory);
BlogRoute.get("/search",  blogBySearch);

// ✅ Update user by ID
// Accepts form-data with optional file upload (`file` field)
// Example: PUT /api/user/update-user/12345
// BlogRoute.put("/update-user/:userid", upload.single("file"), updateUser);

// ===============================
// Export
// ===============================
export default BlogRoute;