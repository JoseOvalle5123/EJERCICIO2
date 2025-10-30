import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const MONGODB_URI = process.env.MONGO_URI || "mongodb+srv://Rocha1:rocha1@cluster0.1jhuu2u.mongodb.net/novenoA";

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI); 
    console.log("MongoDB Connected Successfully!");
  } catch (error) {
    console.error("MongoDB Connection Failed:", error);
  }
};
