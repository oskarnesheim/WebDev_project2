import mongoose from "mongoose";

const { Schema } = mongoose;

const ReviewsSchema = new Schema({
  rating: { type: Number },
  description: { type: String },
  userID: { type: String },
  pokemonID: { type: Number },
});

export const ReviewModel = mongoose.model("review", ReviewsSchema, "reviews");
