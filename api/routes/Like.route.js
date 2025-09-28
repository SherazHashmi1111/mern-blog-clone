import express from "express";
import { doLike, likeCount } from "../controllers/BlogLike.controller.js";
const LikeRoute = express.Router();


LikeRoute.post("/do-like", doLike);
LikeRoute.get("/like-count/:blogid", likeCount);

export default LikeRoute;