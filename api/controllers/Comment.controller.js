import Comment from "../models/comment.model.js";
import { handleError } from "./../helpers/handleError.js";

// Add category logic goes here
export const addComment = async (req, res, next) => {
  try {
    const data = req.body;
    
    const newComment = new Comment({
      comment: data.comment,
      author: data.userid,
      blogid: data.blogid,
    });

    await newComment.save();

    res.status(200).json({
      success: true,
      message: "Comment submitted",
      comment: newComment,
    });
  } catch (error) {
    next(handleError(500, "Error from comment controller"));
  }
};
// Get all comments
export const getAllComments = async (req, res, next) => {
  try {
    const { blogid } = req.params;

    // Validate that blogid is provided
    if (!blogid) {
      return next(handleError(400, "Blog ID is required"));
    }

    // Find comments by blog ID
    const comments = await Comment.find({ blogid })
      .sort({ createdAt: -1 })
      .populate("author", "name avatar")
      .lean()
      .exec();

    // Return 404 only if blog ID is valid but no comments exist
    if (!comments || comments.length === 0) {
      return next(handleError(404, "No comments found for this blog"));
    }

    // Success response
    res.status(200).json({ comments });
  } catch (error) {
    next(handleError(500, "Error fetching comments"));
  }
};
// Get all comments
export const getComments = async (req, res, next) => {
  
  try {
    // Find comments 
    const comments = await Comment.find()
      .populate("author", "name avatar").populate("blogid", "title")
      .lean()
      .exec();

    // Return 404 only if blog ID is valid but no comments exist
    if (!comments || comments.length === 0) {
      return next(handleError(404, "No comments found for this blog"));
    }

    // Success response
    res.status(200).json({ comments });
  } catch (error) {
    next(handleError(500, "Error fetching comments"));
  }
};
// Comments count
export const commentCount = async (req, res, next) => {
  try {
    const { blogid } = req.params;

    // Validate that blogid is provided
    if (!blogid) {
      return next(handleError(400, "Blog ID is required"));
    }

    // Find comments by blog ID
    const commentCount = await Comment.countDocuments({ blogid });

    // Success response
    res.status(200).json({ commentCount });
  } catch (error) {
    next(handleError(500, "Error fetching comments"));
  }
};
// Delete comment
export const deleteComment = async (req, res, next) => {
  try {
    const { commentid } = req.params;
    await Comment.findByIdAndDelete(commentid);

    res.status(200).json({
      success: true,
      message: "Comment deleted",
    });
  } catch (error) {
    next(handleError(500, "Error from comment controller"));
  }
};