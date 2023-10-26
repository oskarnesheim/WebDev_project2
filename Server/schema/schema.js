// Mongoose model
import { log } from "console";
import { PokemonModel } from "../models/Pokemon.js";
import PokemonType from "./GetAllPokemons.js";

import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLInt,
  GraphQLList,
} from "graphql";
import { skip } from "node:test";

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    pokemons: {
      args: {
        upperLimit: { type: GraphQLInt },
        lowerLimit: { type: GraphQLInt },
      },
      type: new GraphQLList(PokemonType),
      async resolve(parent, args) {
        return PokemonModel.find();
      },
    },
    pokemon: {
      type: PokemonType,
      args: {
        _id: { type: GraphQLInt },
      },
      resolve(parent, args) {
        return PokemonModel.findById(args._id);
      },
    },
    pokemonsSortedAndFiltered: {
      type: new GraphQLList(PokemonType),
      args: {
        filters: { type: GraphQLList(GraphQLString) },
        sorting: { type: GraphQLList(GraphQLList(GraphQLString)) },
        range: { type: GraphQLList(GraphQLInt) },
      },
      resolve(parent, args) {
        const filters = args.filters;
        const sortingMap = new Map();
        args.sorting.forEach((sort) => {
          sortingMap.set(sort[0], sort[1]);
        });
        const range = args.range;

        if (filters.length === 0) {
          return PokemonModel.find()
            .sort(sortingMap)
            .skip(range[0])
            .limit(range[1]);
        }
        return PokemonModel.find({
          types: {
            $elemMatch: {
              "type.name": { $in: filters },
            },
          },
        })
          .sort(sortingMap)
          .skip(range[0])
          .limit(range[1]);
      },
    },
  },
});

const schema = new GraphQLSchema({
  query: RootQuery,
});

export default schema;
