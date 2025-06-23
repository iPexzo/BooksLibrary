import { model, Schema } from "mongoose";

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    // multi accounts
    books: [{ type: Schema.Types.ObjectId, ref: "Book" }],
  },
  { timestamps: true }
);

const Category = model("Category", categorySchema);

export default Category;
