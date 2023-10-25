import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

// Start mongoDB by running "mongo pokemon_db" in terminal or "mongosh".

const connectDB = async () => {
  console.log("MONGO_URI:", process.env.MONGO_URI);
  const conn = await mongoose.connect(process.env.MONGO_URI);
  console.log(`MongoDB Connected: ${conn.connection.host}`);
};

export default connectDB;
