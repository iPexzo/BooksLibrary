import express from "express";
import {
  createBook,
  deleteBook,
  getAllBook,
  getBookById,
  updateBook,
} from "./booksController";
import upload from "./multer";

const router = express.Router();

router.get("/", getAllBook);
router.get("/:id", getBookById);
router.post("/", upload.single("image"), createBook);
router.put("/:id", updateBook);
router.delete("/:id", deleteBook);

export default router;
