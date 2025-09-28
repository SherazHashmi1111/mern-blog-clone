import mongoose from "mongoose";

const likeSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    blog: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Blog'
    },
}, { timestamps: true });

const BlogLike = mongoose.model("BlogLike", likeSchema, "likes");
export default BlogLike;