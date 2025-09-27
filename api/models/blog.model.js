import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Category",
    },
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, trim: true},
    blogContent: { type: String, },
    featuredImage: { type: String, trim: true },
  },
  { timestamps: true }
);

const Blog = mongoose.model("Blog", blogSchema, "blogs");
export default Blog;