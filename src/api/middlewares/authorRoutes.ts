import express from "express";
import {
  getAllAuthor,
  createAuther,
  getAuthorById,
  updateAuthor,
  deleteAuthor,
} from "./authorController";

const router = express.Router();

router.get("/", getAllAuthor);
router.get("/:id", getAuthorById);
router.post("/", createAuther);
router.put("/:id", updateAuthor);
router.delete("/:id", deleteAuthor);

export default router;
