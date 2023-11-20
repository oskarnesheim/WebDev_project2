import { getReviews } from "../../functions/GraphQLQueries";

export const ReviewMock = [
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
        ],
      },
    },
  },
];
