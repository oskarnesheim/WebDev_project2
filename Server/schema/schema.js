// Mongoose model
import { PokemonModel } from "../models/Pokemon.js";

import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLInt,
  GraphQLList,
} from "graphql";

const pokemonType = new GraphQLObjectType({
  name: "pokemons",
  fields: () => ({
    _id: { type: GraphQLInt },
    name: { type: GraphQLString },
    height: { type: GraphQLInt },
    weight: { type: GraphQLInt },
    base_experience: { type: GraphQLInt },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    pokemons: {
      type: new GraphQLList(pokemonType),
      async resolve(parent, args) {
        return PokemonModel.find();
      },
    },
    pokemon: {
      type: pokemonType,
      args: {
        _id: { type: GraphQLInt },
      },
      resolve(parent, args) {
        return PokemonModel.findById(args._id);
      },
    },
  },
});

const schema = new GraphQLSchema({
  query: RootQuery,
});

export default schema;
