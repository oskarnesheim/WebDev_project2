// Mongoose model
import { PokemonModel } from "../models/Pokemon.js";
import PokemonType from "./GetAllPokemons.js"

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
      args:{
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
    pokemonsSortedAndFiltered:{
        type: new GraphQLList(PokemonType),
        args: {
            filters: { type: GraphQLList(GraphQLString) },
            sorting: { type: GraphQLList(GraphQLString) },
            range: { type: GraphQLList(GraphQLInt) },
        },
        resolve(parent, args) {
          console.log(args);
            const filters = args.filters.split(',');
            // todo Finne en måte å hente data fra databasen basert på filters. Bruke mongoose til dette. Men hvordan???
            return PokemonModel.find().getFilter(args);
        },
    },
  },
});

const schema = new GraphQLSchema({
  query: RootQuery,
});

export default schema;
