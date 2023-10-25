// Mongoose model
import Pokemon from "../models/Pokemon.js";

import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLInt,
  GraphQLList,
} from "graphql";

const pokemonType = new GraphQLObjectType({
  name: "pokemon",
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
      resolve(parent, args) {
        console.log(args);
        return Pokemon.find();
      },
    },
    pokemon: {
      type: pokemonType,
      args: {
        _id: { type: GraphQLInt },
      },
      resolve(parent, args) {
        console.log(args._id);
        console.log(Pokemon.findById(args._id));
        return Pokemon.findById(args._id);
      },
    },
  },
});

const schema = new GraphQLSchema({
  query: RootQuery,
});

export default schema;
