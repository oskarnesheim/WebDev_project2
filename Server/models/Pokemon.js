import mongoose from "mongoose";

const { Schema } = mongoose;

const AbilitySchema = new Schema({
  name: String,
  url: String,
  is_hidden: Boolean,
  slot: Number,
});

const FormSchema = new Schema({
  name: String,
  url: String,
});

const VersionSchema = new Schema({
  name: String,
  url: String,
});

const VersionDetailSchema = new Schema({
  rarity: Number,
  version: VersionSchema,
});

const GameIndexSchema = new Schema({
  game_index: Number,
  version: VersionSchema,
});

const VersionGroupDetailSchema = new Schema({
  level_learned_at: Number,
  move_learn_method: VersionSchema,
  version_group: VersionSchema,
});

const MoveSchema = new Schema({
  name: String,
  url: String,
});

const SpeciesSchema = new Schema({
  name: String,
  url: String,
});

const DreamWorldSchema = new Schema({
  front_default: String,
  front_female: String,
});

const HomeSchema = new Schema({
  front_default: String,
  front_female: String,
  front_shiny: String,
  front_shiny_female: String,
});

const OfficialArtworkSchema = new Schema({
  front_default: String,
  front_shiny: String,
});

const GenerationIIconsSchema = new Schema({
  back_default: String,
  back_gray: String,
  front_default: String,
  front_gray: String,
});

const GenerationISchema = new Schema({
  red_blue: GenerationIIconsSchema,
  yellow: GenerationIIconsSchema,
});

const GenerationVIIIIconsSchema = new Schema({
  front_default: String,
  front_female: String,
});

const AbilityTypeSchema = new Schema({
  slot: Number,
  type: VersionSchema,
});

const TypeSlotSchema = new Schema({
  slot: Number,
  type: VersionSchema,
});

const PastTypeSchema = new Schema({
  generation: VersionSchema,
  types: [TypeSlotSchema],
});

const OtherSpritesSchema = new Schema({
  dream_world: DreamWorldSchema,
  home: HomeSchema,
  official_artwork: OfficialArtworkSchema,
});

const VersionsSchema = new Schema({
  generation_i: GenerationISchema,
  generation_viii: GenerationVIIIIconsSchema,
});

const StatSchema = new Schema({
  base_stat: Number,
  effort: Number,
  stat: VersionSchema,
});

const TypeSchema = new Schema({
  slot: Number,
  type: VersionSchema,
});

const HeldItemSchema = new Schema({
  item: VersionSchema,
  version_details: [VersionDetailSchema],
});

const SpritesSchema = new Schema({
  back_default: String,
  back_female: String,
  back_shiny: String,
  back_shiny_female: String,
  front_default: String,
  front_female: String,
  front_shiny: String,
  front_shiny_female: String,
  other: OtherSpritesSchema,
  versions: VersionsSchema,
});

const ReviewsSchema = new Schema({
  rating: Number,
  description: String,
  userID: String,
});

const PokemonSchema = new Schema({
  _id: Number,
  name: String,
  base_experience: Number,
  height: Number,
  is_default: Boolean,
  order: Number,
  weight: Number,
  abilities: [AbilitySchema],
  forms: [FormSchema],
  game_indices: [GameIndexSchema],
  held_items: [HeldItemSchema],
  location_area_encounters: String,
  moves: [MoveSchema],
  species: SpeciesSchema,
  sprites: SpritesSchema,
  stats: [StatSchema],
  types: [TypeSchema],
  past_types: [PastTypeSchema],
  reviews: [ReviewsSchema],
});

export const PokemonModel = mongoose.model("pokemon", PokemonSchema, "pokemon");
