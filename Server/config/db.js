import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

// Start mongoDB by running "mongo pokemon_db" in terminal or "mongosh".

const connectDB = async () => {
  console.log("MONGO_URI:", process.env.MONGO_URI);
  const conn = await mongoose.connect(
    // Should get the mongo uri from .env file, but atm this does not work
    // Replace my string with yours (comment out mine)
    "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.0.2"
    // process.env.MONGO_URI
  );
  console.log(`MongoDB Connected: ${conn.connection.host}`);
};

export default connectDB;
