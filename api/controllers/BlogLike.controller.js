import BlogLike from "../models/like.model.js";
import { handleError } from "./../helpers/handleError.js";
export const doLike = async (req, res, next) => {
  try {
    const { userid, blogid } = req.body;

    if (!userid || !blogid) {
      return res
        .status(400)
        .json({ message: "userid and blogid are required" });
    }

    let like = await BlogLike.findOne({ author: userid, blog: blogid });
    let action;

    if (!like) {
      const newLike = new BlogLike({ author: userid, blog: blogid });
      like = await newLike.save();
      action = "liked";
    } else {
      await BlogLike.findByIdAndDelete(like._id);
      action = "unliked";
    }

    const totalLike = await BlogLike.countDocuments({blog: blogid});
    
    res.status(200).json({
      totalLike,
      action,
    });
  } catch (error) {
    console.error(error);
    next(handleError(500, "Error in blog like controller"));
  }
};

// Fetching total like count
export const likeCount = async (req, res, next) => {
  try {
    const { blogid } = req.params;
    const likeCount = await BlogLike.countDocuments({ blog:blogid });
    
    res.status(200).json({ likeCount });
  } catch (error) {
    next(handleError(500, "Error in blog like controller"));
  }
};