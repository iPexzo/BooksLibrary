import { NextFunction, Request, Response } from "express";
import Author from "../../models/Author";
import Book from "../../models/Books";
import Category from "../../models/Category";
import mongoose from "mongoose";

export const getAllBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { authors, categories, title, includeDeleted } = req.query;

    const filter: any = {};

    if (authors) {
      filter.authors = authors;
    }

    if (categories) {
      filter.categories = { $in: categories };
    }

    if (title) {
      filter.title = { $regex: title, $options: "i" };
    }
    if (includeDeleted !== "true") {
      filter.deleted = { $ne: true };
    }

    const books = await Book.find(filter)
      .populate("authors")
      .populate("categories");

    res.status(200).json(books);
  } catch (error) {
    next(error);
  }
};

export const getBookById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const booksiD = await Book.findById(id);
    if (!booksiD) {
      res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json(booksiD);
  } catch (error) {
    next(error);
  }
};

export const createBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, authors, categories } = req.body;
    let imagePath;

    console.log("image from file", req.file);
    if (req.file) {
      imagePath = `/uploads/${req.file.filename}`;
    }
    const books = await Book.create({
      title,
      authors,
      categories,
      image: imagePath,
    });
    const authorId = new mongoose.Types.ObjectId(authors);
    const categoryId = new mongoose.Types.ObjectId(categories);

    const AuthorId = await Author.findByIdAndUpdate(authorId, {
      $push: { books: books._id },
    });
    const CategoryId = await Category.findByIdAndUpdate(categoryId, {
      $push: { books: books._id },
    });
    if (!AuthorId || !CategoryId) {
      res.status(400).json({ message: "Author or Category not found" });
    }
    res.status(201).json({ books, AuthorId, CategoryId });
  } catch (error) {
    next(error);
  }
};

export const updateBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    let imagePath;
    if (req.file) {
      imagePath = `/uploads/${req.file.filename}`;
    }
    const foundBook = await Book.findById(id);
    if (!foundBook) {
      res.status(404).json({ message: "Book not found" });
    } else {
      await foundBook.updateOne(req.body, { image: imagePath });
      res.json({ message: "Book updated successfully" });
    }
  } catch (error) {
    next(error);
  }
};

export const deleteBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    await Book.findByIdAndUpdate(id, { deleted: true });
    res.json({ message: "Book deleted successfully" });
  } catch (error) {
    next(error);
  }
};
