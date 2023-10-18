import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLInt,
  GraphQLList,
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
    pokemons: {
      type: new GraphQLList(Pokemon),
      resolve(parent, args) {
        return data;
      },
    },
    pokemon: {
      type: Pokemon,
      args: {
        id: { type: GraphQLInt },
      },
      resolve(parent, args) {
        return data.find((pokemon) => pokemon.id == args.id);
      },
    },
  },
});

const schema = new GraphQLSchema({
  query: RootQuery,
});

export default schema;
