import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/novenoA";
//Si yo no pongo un env aqui lo va a tomar como la configuración del servidor
export const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB Connected Succesfully!");
  } catch (error) {
    console.error("Mongo DB Connection Failed");
  }
};
