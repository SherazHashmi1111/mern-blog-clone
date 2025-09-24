import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
app.use(cookieParser());
app.use(express.json());

// Basic setting
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
dotenv.config();
const PORT = process.env.PORT ;

// Port setting
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
