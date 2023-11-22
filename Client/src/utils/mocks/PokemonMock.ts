import { findSinglePokemon } from "../../functions/GraphQLQueries";

export const PokemonMock = [
  {
    request: {
      query: findSinglePokemon,
      variables: {
        _id: 1,
      },
    },
    result: {
      data: {
        pokemon: {
          _id: 1,
          name: "bulbasaur",
          base_experience: 64,
          weight: 69,
          types: [
            {
              type: {
                name: "grass",
              },
            },
            {
              type: {
                name: "poison",
              },
            },
          ],
          sprites: {
            front_default:
              "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
          },
        },
      },
    },
  },
];
