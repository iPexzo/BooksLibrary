import { app } from "./app";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); //this will expose env file
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE || "");
    console.log(`connected to mongodb`);
  } catch (error) {
    console.log("mongodb error", error);
  }
};

connectDB();

app.listen(8000, () => {
  console.log("Server is running on Port 8000");
});
