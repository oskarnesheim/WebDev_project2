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
        search: { type: GraphQLString },
      },
      resolve(parent, args) {
        const sortingMap = new Map();
        args.sorting.forEach((sort) => {
          sortingMap.set(sort[0], sort[1]);
        });

        if (args.filters.length === 0) {
          return PokemonModel.find({
            name: { $regex: args.search, $options: "i" },
          })
            .sort(sortingMap)
            .skip(args.range[0])
            .limit(args.range[1]);
        }
        return PokemonModel.find({
          types: {
            $elemMatch: {
              // ? $elemMatch for multiple filters.
              "type.name": { $in: args.filters }, // ? $in for multiple filters. We check if the pokemon is in the filters array.
            },
          },
          name: { $regex: args.search, $options: "i" },
        })
          .sort(sortingMap)
          .skip(args.range[0])
          .limit(args.range[1]);
      },
    },
  },
});

const schema = new GraphQLSchema({
  query: RootQuery,
});

export default schema;
