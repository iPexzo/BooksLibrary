import { model, Schema } from "mongoose";

const booksSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    deleted: {
      type: Boolean,
      default: false,
    },

    authors: { type: Schema.Types.ObjectId, ref: "Author" },
    categories: [{ type: Schema.Types.ObjectId, ref: "Category" }],
  },
  { timestamps: true }
);

const Book = model("Book", booksSchema);

export default Book;
