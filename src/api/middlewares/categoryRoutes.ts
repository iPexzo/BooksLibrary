import express from "express";
import {
  createCategory,
  deletCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
} from "./categoryController";

const router = express.Router();

router.get("/", getAllCategories);
router.get("/:id", getCategoryById);
router.post("/", createCategory);
router.put("/:id", updateCategory);
router.delete("/:id", deletCategory);

export default router;
