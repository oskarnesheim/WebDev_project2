import { AddReview, getReviews } from "../../functions/GraphQLQueries";

export const ReviewMutationMock = [
  {
    request: {
      query: getReviews,
      variables: {
        pokemonID: 1,
      },
    },
    result: {
      data: {
        reviewsForPokemon: [
          {
            rating: 4,
            description: "dafa",
            userID: "921124937025316500",
            pokemonID: 1,
          },
          {
            rating: 3,
            description: "This is a great Pokemon!",
            userID: "921124937025316501",
            pokemonID: 1,
          },
        ],
      },
    },
  },
  {
    request: {
      query: AddReview,
      variables: {
        rating: 4,
        description: "This is the most awesome pokemon ever!",
        userID: "696969696969696969",
        pokemonID: 1,
      },
    },
    result: {
      data: {
        createReview: [
          {
            rating: 4,
            description: "This is the most awesome pokemon ever!",
            userID: "69696969696969",
            pokemonID: 1,
          },
        ],
      },
    },
  },
];
