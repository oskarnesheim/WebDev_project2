import { GraphQLString, GraphQLInt, GraphQLObjectType } from "graphql";

const ReviewType = new GraphQLObjectType({
  name: "Review",
  fields: {
    rating: { type: GraphQLInt },
    description: { type: GraphQLString },
    userID: { type: GraphQLString },
    pokemonID: { type: GraphQLInt },
  },
});

export default ReviewType;
