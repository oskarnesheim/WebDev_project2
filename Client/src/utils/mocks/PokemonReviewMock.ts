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
            rating: 4,
            description: "Denne pokemonen er grov",
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
        description: "Denne pokemonen er legit grov",
        userID: "921124937025316571",
        pokemonID: 1,
      },
    },
    result: {
      data: {
        createReview: [
          {
            rating: 4,
            description: "Denne pokemonen er legit grov",
            userID: "921124937025316571",
            pokemonID: 1,
          },
        ],
      },
    },
  },
];
