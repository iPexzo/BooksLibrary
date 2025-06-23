import express from "express";
import cors from "cors";
import morgan from "morgan";
import { NotFoundHandler } from "./api/middlewares/NotFound";
import { ErrorHandler } from "./api/middlewares/ErrorHandler";
import authorRoutes from "./api/middlewares/authorRoutes";
import bookRoutes from "./api/middlewares/booksRouter";
import path from "path";
import CategoryRouter from "./api/middlewares/categoryRoutes";

export const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.use("/authors", authorRoutes);
app.use("/books", bookRoutes);
app.use("/categories", CategoryRouter);
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

app.use(NotFoundHandler);
app.use(ErrorHandler);
