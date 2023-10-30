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

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    pokemons: {
      //todo Denne skal fjernes
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
              // ? $elemMatch for multiple filters.
              "type.name": { $in: filters }, // ? $in for multiple filters. We check if the pokemon is in the filters array.
            },
          },
        })
          .sort(sortingMap)
          .skip(range[0])
          .limit(range[1]);
      },
    },
    pokemonSearch: {
      type: new GraphQLList(PokemonType),
      args: {
        search: { type: GraphQLString },
        range: { type: GraphQLList(GraphQLInt) },
      },
      resolve(parent, args) {
        const range = args.range;
        const search = args.search;

        return PokemonModel.find({
          name: { $regex: search, $options: "i" }, //? i for case insensitive, regex for partial search.
        })
          .sort({ name: 1 })
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
