import cloudinary from "../config/cloudinary.js";
import Blog from "../models/blog.model.js";
import Category from "../models/category.model.js";
import { handleError } from "./../helpers/handleError.js";
import { encode } from "entities";

// Add blog logic goes here
export const addBolg = async (req, res, next) => {
  const data = JSON.parse(req.body.data);

  try {
    // Parse blog data from body
    const data = JSON.parse(req.body.data);

    // Upload featured image (if provided)
    let featuredImage = "";
    if (req.file) {
      try {
        const uploadResult = await cloudinary.uploader.upload(req.file.path, {
          folder: "mern-blog",
          resource_type: "auto",
        });
        featuredImage = uploadResult.secure_url;
      } catch (err) {
        return next(handleError(500, "Image upload failed: " + err.message));
      }
    }

    // Save blog to DB
    const blog = new Blog({
      category: data.category,
      title: data.title,
      author: data.author,
      slug: data.slug,
      featuredImage,
      blogContent: encode(data.blogContent || ""),
    });

    await blog.save();

    res.status(201).json({
      success: true,
      message: "New blog added successfully",
      blog,
    });
  } catch (error) {
    next(handleError(500, "Error in add blog controller"));
  }
};
// Show all blog logic goes here
export const getAllBlogs = async (req, res, next) => {
  try {
    const blogs = await Blog.find()
      .populate("author", "name avatar")
      .populate("category", "name slug")
      .sort({ created_at: -1 })
      .lean()
      .exec();

    res.status(200).json({
      blogs,
    });
  } catch (error) {
    next(handleError(500, "Error from blog controller"));
  }
};
// // Get one blog by id
export const getBlog = async (req, res, next) => {
  try {
    const { blogid } = req.params;

    const blog = await Blog.findById(blogid)
      .populate("author", "name")
      .populate("category", "name")
      .lean()
      .exec();
    if (!blog) return next(handleError(404, "Blog not found"));

    res.status(200).json({
      blog,
    });
  } catch (error) {
    next(handleError(500, "Error from blog controller"));
  }
};
// // Get blog by slug
export const getBlogDetails = async (req, res, next) => {
  try {
    const { slug } = req.params;

    const blog = await Blog.findOne({ slug })
      .populate("author", "name avatar role")
      .populate("category", "name slug")
      .sort({ createdAt: -1 })
      .lean()
      .exec();
    if (!blog) return next(handleError(404, "Blog not found"));

    res.status(200).json({
      blog,
    });
  } catch (error) {
    next(handleError(500, "Error from blog controller"));
  }
};
// Update blog logic
export const updateBlog = async (req, res, next) => {
  try {
    const data = JSON.parse(req.body.data);
    const { blogid } = req.params;

    let updateFields = {
      category: data.category,
      title: data.title,
      slug: data.slug,
      blogContent: encode(data.blogContent || ""),
    };

    // Upload featured image (if provided)
    if (req.file) {
      try {
        const uploadResult = await cloudinary.uploader.upload(req.file.path, {
          folder: "mern-blog",
          resource_type: "auto",
        });
        updateFields.featuredImage = uploadResult.secure_url;
      } catch (err) {
        return next(handleError(500, "Image upload failed: " + err.message));
      }
    }

    // Update and return new blog
    const blog = await Blog.findByIdAndUpdate(blogid, updateFields, {
      new: true, // return updated doc
      runValidators: true, // ensure schema validation runs
    });

    if (!blog) {
      return next(handleError(404, "Blog not found"));
    }

    res.status(200).json({
      success: true,
      message: "Blog updated successfully",
      blog,
    });
  } catch (error) {
    next(handleError(500, "Error in update blog controller: " + error.message));
  }
};

// // Delete blog logic goes here
export const deleteBlog = async (req, res, next) => {
  try {
    const { blogid } = req.params;
    await Blog.findByIdAndDelete(blogid);

    res.status(200).json({
      success: true,
      message: "Blog deleted",
    });
  } catch (error) {
    next(handleError(500, "Error from blog controller"));
  }
};
// // Get one blog by id
export const relatedBlog = async (req, res, next) => {
  try {
    const { category, blog } = req.params;

    const categoryData = await Category.findOne({ slug: category });
    if (!categoryData) {
      return next(404, "Category data not found");
    }
    const categoryId = categoryData._id;

    const relatedBlogs = await Blog.find({
      category: categoryId,
      slug: { $ne: blog },
    })
      .populate("category", "slug")
      .lean()
      .exec();

    res.status(200).json({
      relatedBlogs,
    });
  } catch (error) {
    next(handleError(500, "Error from blog controller"));
  }
};
// // Get one blog by id
export const blogByCategory = async (req, res, next) => {
  try {
    const { category } = req.params;

    const categoryData = await Category.findOne({ slug: category });
    if (!categoryData) {
      return next(404, "Category data not found");
    }
    const categoryId = categoryData._id;

    const relatedBlogs = await Blog.find({
      category: categoryId,
    })
      .populate("category", "slug")
      .populate("author", "name avatar")
      .lean()
      .exec();

    res.status(200).json({
      relatedBlogs,
      categoryData
    });
  } catch (error) {
    next(handleError(500, "Error from blog controller"));
  }
};
// // Get one blog by id
export const blogBySearch = async (req, res, next) => {
  try {
    const { q } = req.query;
    
    
    const blogs = await Blog.find({title :  {$regex: q, $options: 'i'}})
      .populate("category", "slug")
      .populate("author", "name avatar")
      .lean()
      .exec();
    
    res.status(200).json({
      blogs
    });
  } catch (error) {
    next(handleError(500, "Error from blog controller"));
  }
};