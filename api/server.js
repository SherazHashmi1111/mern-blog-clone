import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import AuthRoute from "./routes/Auth.route.js";
import UserRoute from "./routes/User.routes.js";
import CategoryRoute from "./routes/Category.route.js";
import BlogRoute from "./routes/blog.routes.js";
import CommentRoute from "./routes/Comment.route.js";
import LikeRoute from "./routes/Like.route.js";

dotenv.config();

const app = express();

// Middlewares
app.use(cookieParser());
app.use(express.json());

// Environment variables
const FRONTEND_URL = process.env.FRONTEND_URL || "*"; // fallback for local
const MONGODB_URL = process.env.MONGODB_URL;

app.use(cors({ origin: FRONTEND_URL, credentials: true }));

// Routes
app.use("/api/auth", AuthRoute);
app.use("/api/user", UserRoute);
app.use("/api/category", CategoryRoute);
app.use("/api/blog", BlogRoute);
app.use("/api/comment", CommentRoute);
app.use("/api/like", LikeRoute);

// MongoDB Connection
mongoose
  .connect(MONGODB_URL, { dbName: "mern-blog-clone" })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Global error handler
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({ success: false, statusCode, message });
});
