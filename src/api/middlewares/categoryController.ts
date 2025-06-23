import { NextFunction, Request, Response } from "express";

import Book from "../../models/Books";
import Category from "../../models/Category";

export const getAllCategories = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const category = await Category.find().populate("books", "title");
    res.status(200).json(category);
  } catch (error) {
    next(error);
  }
};
export const getCategoryById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const CategoryId = await Category.findById(id);
    if (!CategoryId) {
      res.status(404).json({ message: "Category not found" });
    }
    res.status(200).json(CategoryId);
  } catch (error) {
    next(error);
  }
};

export const createCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, books } = req.body;
    const category = await Category.create({ name, books });
    const updateBook = await Book.findByIdAndUpdate(
      books,
      {
        $push: { categories: category._id },
      },
      { new: true }
    );
    res.status(201).json({
      success: true,
      message: "Category created and linked to books successfully",
      data: {
        id: category._id,
        name: category.name,
        booksLinked: updateBook,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const updateCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    let imagePath;
    if (req.file) {
      imagePath = req.file.path;
    }
    const foundCategory = await Category.findById(id);
    if (!foundCategory) {
      res.status(404).json({ message: "Category not found" });
    } else {
      await foundCategory.updateOne(req.body, { image: imagePath });
      res.json({ message: "Category updated successfully" });
    }
  } catch (error) {
    next(error);
  }
};

export const deletCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    await Category.findByIdAndDelete(id);
    res.json({ message: "Category deleted successfully" });
  } catch (error) {
    next(error);
  }
};
