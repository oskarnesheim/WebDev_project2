import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLInt,
} from "graphql";

import data from "../public/data.json" assert { type: "json" };
import { log } from "console";

const Pokemon = new GraphQLObjectType({
  name: "pokemon",
  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    height: { type: GraphQLInt },
    weight: { type: GraphQLInt },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    pokemon: {
      type: Pokemon,
      args: {
        id: { type: GraphQLInt },
      },
      resolve(parent, args) {
        const foundPokemon = data.find((pokemon) => pokemon.id == args.id);
        return foundPokemon ? foundPokemon : null;
      },
    },
  },
});

const schema = new GraphQLSchema({
  query: RootQuery,
});

export default schema;
