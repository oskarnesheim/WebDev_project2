// Mongoose model
import { PokemonModel } from "../models/Pokemon.js";
import { ReviewModel } from "../models/Review.js";
import ReviewType from "./ReviewType.js";
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
    reviewsForPokemon: {
      type: new GraphQLList(ReviewType),
      args: {
        pokemonID: { type: GraphQLInt },
      },
      resolve(parent, args) {
        return ReviewModel.find({ pokemonID: args.pokemonID });
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
    createReview: {
      type: ReviewType,
      args: {
        rating: { type: GraphQLInt },
        description: { type: GraphQLString },
        userID: { type: GraphQLString },
        pokemonID: { type: GraphQLInt },
      },
      resolve(parent, args) {
        const pokemon = PokemonModel.findById(args.pokemonID);
        const review = new ReviewModel({
          rating: args.rating,
          description: args.description,
          userID: args.userID,
          pokemonID: args.pokemonID,
        });
        return review.save();
      },
    },
  },
});

const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});

export default schema;
