import  express  from "express";
import { addComment, commentCount, deleteComment, getAllComments, getComments } from "../controllers/Comment.controller.js";


const CommentRoute = express.Router();

CommentRoute.post("/add", addComment);
CommentRoute.get("/all", getComments);
CommentRoute.delete("/delete/:commentid", deleteComment);
CommentRoute.get("/comments/:blogid", getAllComments);
CommentRoute.get("/comment-count/:blogid", commentCount);

export default CommentRoute;