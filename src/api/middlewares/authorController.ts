import { NextFunction, Request, Response } from "express";
import Author from "../../models/Author";
import Book from "../../models/Books";
import { title } from "process";

export const getAllAuthor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authors = await Author.find().populate("books", "title");
    res.status(200).json({
      success: true,
      message: "All authors fetched succeddfully",
      authors,
    });
  } catch (error) {
    next(error);
  }
};
export const getAuthorById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const authoriD = await Author.findById(id);
    if (!authoriD) {
      res.status(404).json({ message: "Author not found" });
    }
    res.status(200).json(authoriD);
  } catch (error) {
    next(error);
  }
};

export const createAuther = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, country, books } = req.body;
    const author = await Author.create({ name, country, books });
    const bookId = await Book.findByIdAndUpdate(books, {
      $push: { author: author._id },
    });
    res.status(201).json({
      success: true,
      message: "Author created and linked to books successfully",
      data: {
        id: author._id,
        name: author.name,
        country: author.country,
        booksLinked: bookId,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const updateAuthor = async (
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
    const foundAuthor = await Author.findById(id);
    if (!foundAuthor) {
      res.status(404).json({ message: "Author not found" });
    } else {
      await foundAuthor.updateOne(req.body, { image: imagePath });
      res.json({ message: "Author updated successfully" });
    }
  } catch (error) {
    next(error);
  }
};

export const deleteAuthor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    await Author.findByIdAndDelete(id);
    res.json({ message: "Author deleted successfully" });
  } catch (error) {
    next(error);
  }
};
