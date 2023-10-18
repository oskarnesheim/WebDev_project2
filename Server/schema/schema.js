import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLInt,
  GraphQLList,
} from "graphql";

import data from "../beedrill.js";

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
        return data.id.find((id) => data.id === data.id);
      },
    },
  },
});

const schema = new GraphQLSchema({
  query: RootQuery,
});

export default schema;
