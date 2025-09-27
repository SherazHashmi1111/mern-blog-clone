import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import AuthRoute from "./routes/Auth.route.js";
import UserRoute from "./routes/User.routes.js";
import CategoryRoute from "./routes/Category.route.js";
const app = express();
dotenv.config();

app.use(cookieParser());
app.use(express.json());

const FRONTEND_URL = process.env.FRONTEND_URL;
const MONGODB_URL = process.env.MONGODB_URL;

// Basic setting
app.use(cors({ origin: FRONTEND_URL, credentials: true }));
const PORT = process.env.PORT;

// Routes 
app.use("/api/auth", AuthRoute)
app.use("/api/user", UserRoute)
app.use("/api/category", CategoryRoute)


// MongoDB Connection 
mongoose
  .connect(MONGODB_URL, { dbName: "mern-blog-clone" })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log(error);
  });

// Port setting
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



// Global error 
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
