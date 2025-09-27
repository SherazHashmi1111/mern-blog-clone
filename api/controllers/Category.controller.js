// All imports
import Category from "../models/category.model.js";
import { handleError } from "./../helpers/handleError.js";

// Adding Category
export const addCategory = async (req, res, next) => {
  try {
    const { name, slug } = req.body;

    if (!name) {
      return next(handleError(400, "Category name not found"));
    }
    if (!slug) {
      return next(handleError(400, "Category slug not found"));
    }

    const existingSlug = await Category.findOne({ slug }).lean().exec();
    if (existingSlug) {
      return next(handleError(400, "This category already exists"));
    }

    const category = new Category({ name, slug });
    await category.save();

    res.status(200).json({
      success: true,
      message: "Category added successfully",
    });
  } catch (error) {
    handleError(400, error.message);
  }
};
// Get all categories
export const getAllCategory = async (req, res, next) => {
  try {
    const categories = await Category.find().sort({ name: 1 }).lean().exec();
    if (!categories) {
      return next(handleError(404, "No category found"));
    }

    res.status(200).json({
      success: true,
      categories,
    });
  } catch (error) {
    handleError(400, error.message);
  }
};
// Get category details
export const getCategoryDetails = async (req, res, next) => {
   try {
    const { categoryid } = req.params;
    
    const category = await Category.findById(categoryid);
    if (!category) return next(handleError(404, "Category not found"));

    res.status(200).json({
      category,
    });
  } catch (error) {
    next(handleError(500, "Error from category controller"));
  }
};
// Delete Categories
export const deleteCategory = async (req, res, next) => {
  try {
    const { categoryid } = req.params;
    const deletedCategory = await Category.findByIdAndDelete(categoryid);

    if (!deletedCategory) {
      return next(handleError(404, "Category not found"));
    }

    res.status(200).json({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error) {
    return next(handleError(400, error.message || "Error deleting category!"));
  }
};
// Update category logic goes here
export const updateCategory = async (req, res, next) => {
  try {
    const { name, slug } = req.body;
    const { categoryid } = req.params;
    const category = await Category.findByIdAndUpdate(
      categoryid,
      {
        name,
        slug,
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Category updated",
      category,
    });
  } catch (error) {
    next(handleError(500, "Error from category controller"));
  }
};