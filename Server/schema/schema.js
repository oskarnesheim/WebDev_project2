// Mongoose model
import { PokemonModel } from "../models/Pokemon.js";
import PokemonType from "./GetAllPokemons.js";

import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLInputObjectType,
} from "graphql";

const ReviewInputType = new GraphQLInputObjectType({
  name: "ReviewInput",
  fields: {
    rating: { type: new GraphQLNonNull(GraphQLInt) },
    description: { type: new GraphQLNonNull(GraphQLString) },
    userID: { type: new GraphQLNonNull(GraphQLString) },
  },
});

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
        search: { type: GraphQLString },
        range: { type: GraphQLList(GraphQLInt) },
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
    numberOfPokemonsThatMatchesSearch: {
      type: GraphQLInt,
      args: {
        filters: { type: GraphQLList(GraphQLString) },
        sorting: { type: GraphQLList(GraphQLList(GraphQLString)) },
        search: { type: GraphQLString },
      },
      resolve(parent, args) {
        const sortingMap = new Map();
        args.sorting.forEach((sort) => {
          sortingMap.set(sort[0], sort[1]);
        });

        if (args.filters.length === 0) {
          return PokemonModel.countDocuments({
            name: { $regex: args.search, $options: "i" },
          });
        }
        return PokemonModel.countDocuments({
          types: {
            $elemMatch: {
              // ? $elemMatch for multiple filters.
              "type.name": { $in: args.filters }, // ? $in for multiple filters. We check if the pokemon is in the filters array.
            },
          },
          name: { $regex: args.search, $options: "i" },
        });
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    updatePokemonReviews: {
      type: PokemonType,
      args: {
        _id: { type: GraphQLNonNull(GraphQLInt) },
        reviews: {
          type: new GraphQLList(ReviewInputType),
        },
      },
      resolve(parent, args) {
        return PokemonModel.findByIdAndUpdate(args._id, {
          $set: { reviews: args.reviews },
        });
      },
    },
  },
});

const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});

export default schema;
