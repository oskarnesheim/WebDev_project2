import mongoose from "mongoose";

const PokemonSchema = new mongoose.Schema({
  _id: {
    type: Number,
  },
  name: {
    type: String,
  },
  height: {
    type: Number,
  },
  weight: {
    type: Number,
  },
  base_experience: {
    type: Number,
  },
});

export default mongoose.model("pokemon", PokemonSchema);
